package web

import (
	"net/http"

	"github.com/tahasadough/tahasadough.com/static"
)

const (
	cacheHTML       = "public, max-age=300, must-revalidate"
	cacheRevalidate = "public, max-age=3600, must-revalidate"
	cacheImmutable  = "public, max-age=31536000, immutable"
)

func Routes(mux *http.ServeMux) {
	html := CacheControl(cacheHTML)
	etag := ETag()
	mux.Handle("GET /{$}", html(etag(http.HandlerFunc(Home))))
	mux.Handle("GET /offline", html(etag(http.HandlerFunc(Offline))))
	mux.Handle("GET /sitemap.xml", html(etag(http.HandlerFunc(Sitemap))))
}

func StaticRoutes(mux *http.ServeMux) {
	fs := http.FileServer(http.FS(static.FS))
	revalidate := CacheControl(cacheRevalidate)
	etag := ETag()

	staticMux := http.NewServeMux()
	staticMux.Handle("GET /images/", CacheControl(cacheImmutable)(fs))
	staticMux.Handle("GET /style.css", revalidate(etag(fs)))
	staticMux.Handle("GET /js/", revalidate(etag(fs)))
	staticMux.Handle("GET /favicon.ico", CacheControl(cacheImmutable)(fs))
	staticMux.Handle("GET /apple-touch-icon.png", CacheControl(cacheImmutable)(fs))
	staticMux.Handle("GET /pwa-192.png", CacheControl(cacheImmutable)(fs))
	staticMux.Handle("GET /pwa-512.png", CacheControl(cacheImmutable)(fs))
	staticMux.Handle("GET /manifest.json", revalidate(etag(fs)))
	staticMux.Handle("GET /robots.txt", revalidate(etag(fs)))

	mux.Handle("GET /sw.js", fs)
	mux.Handle("/", CacheControl(cacheRevalidate)(staticMux))
}
