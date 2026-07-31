package web

import (
	"net/http"

	"github.com/tahasadough/tahasadough.com/static"
)

func Routes(mux *http.ServeMux) {
	mux.Handle("GET /{$}", http.HandlerFunc(Home))
	mux.Handle("GET /sitemap.xml", http.HandlerFunc(Sitemap))
}

func StaticRoutes(mux *http.ServeMux) {
	fs := http.FileServer(http.FS(static.FS))
	mux.Handle("/", cache(fs, "public, max-age=86400"))
}

func cache(h http.Handler, value string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", value)
		h.ServeHTTP(w, r)
	})
}
