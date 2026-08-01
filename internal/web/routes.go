package web

import (
	"net/http"

	"github.com/tahasadough/tahasadough.com/static"
)

func Routes(mux *http.ServeMux) {
	mux.Handle("GET /{$}", Handler(Home))
	mux.Handle("GET /sitemap.xml", Handler(Sitemap))
}

func StaticRoutes(mux *http.ServeMux) {
	fs := http.FileServer(http.FS(static.FS))
	mux.Handle("/", cache(fs, "public, max-age=31536000, immutable"))
}

func cache(h http.Handler, value string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", value)
		h.ServeHTTP(w, r)
	})
}
