// Package server wires the HTTP server, routes, and middleware.
package server

import (
	"compress/gzip"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/tahasadough/tahasadough.com/internal/handler"
)

var Version = "1.0.0"

func cache(dur time.Duration, immutable bool) func(http.Handler) http.Handler {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			v := fmt.Sprintf("public, max-age=%d", int(dur.Seconds()))
			if immutable {
				v += ", immutable"
			}
			w.Header().Set("Cache-Control", v)
			h.ServeHTTP(w, r)
		})
	}
}

type gzipWriter struct {
	http.ResponseWriter
	gz *gzip.Writer
}

func (w *gzipWriter) Write(b []byte) (int, error) { return w.gz.Write(b) }

func (w *gzipWriter) WriteHeader(code int) {
	w.Header().Del("Content-Length")
	w.ResponseWriter.WriteHeader(code)
}

func gzipMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
			next.ServeHTTP(w, r)
			return
		}
		w.Header().Set("Content-Encoding", "gzip")
		w.Header().Set("Vary", "Accept-Encoding")
		gz := gzip.NewWriter(w)
		defer func() {
			_ = gz.Close()
		}()
		next.ServeHTTP(&gzipWriter{ResponseWriter: w, gz: gz}, r)
	})
}

func New() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /", handler.Home)
	mux.HandleFunc("GET /offline", handler.Offline)
	mux.HandleFunc("GET /sitemap.xml", handler.Sitemap)

	fs := http.FileServer(http.Dir("static"))
	year := 365 * 24 * time.Hour

	mux.Handle("GET /images/", cache(year, true)(fs))
	mux.Handle("GET /style.css", cache(year, true)(fs))
	mux.Handle("GET /js/", cache(year, true)(fs))
	mux.Handle("GET /favicon.ico", cache(year, true)(fs))
	mux.Handle("GET /apple-touch-icon.png", cache(year, true)(fs))
	mux.Handle("GET /pwa-192.png", cache(year, true)(fs))
	mux.Handle("GET /pwa-512.png", cache(year, true)(fs))

	mux.Handle("GET /manifest.json", cache(1*time.Hour, false)(fs))
	mux.Handle("GET /robots.txt", cache(1*time.Hour, false)(fs))
	mux.Handle("GET /service-worker.js", fs)

	return gzipMiddleware(mux)
}
