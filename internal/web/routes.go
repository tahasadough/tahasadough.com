package web

import (
	"net/http"
	"time"

	"github.com/tahasadough/tahasadough.com/static"
)

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("GET /{$}", Home)
	mux.HandleFunc("GET /offline", Offline)
	mux.HandleFunc("GET /sitemap.xml", Sitemap)
}

func StaticRoutes(mux *http.ServeMux) {
	fs := http.FileServer(http.FS(static.FS))

	staticMux := http.NewServeMux()
	staticMux.Handle("GET /images/", fs)
	staticMux.Handle("GET /style.css", fs)
	staticMux.Handle("GET /js/", fs)
	staticMux.Handle("GET /favicon.ico", fs)
	staticMux.Handle("GET /apple-touch-icon.png", fs)
	staticMux.Handle("GET /pwa-192.png", fs)
	staticMux.Handle("GET /pwa-512.png", fs)
	staticMux.Handle("GET /manifest.json", fs)
	staticMux.Handle("GET /robots.txt", fs)

	mux.Handle("GET /sw.js", fs)
	mux.Handle("/", Cache(365*24*time.Hour, true)(staticMux))
}
