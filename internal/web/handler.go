package web

import (
	"net/http"

	"github.com/tahasadough/tahasadough.com/internal/web/pages"
)

func Home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	_ = pages.HomePage().Render(r.Context(), w)
}

func Offline(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	_ = pages.OfflinePage().Render(r.Context(), w)
}

func Sitemap(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/xml; charset=utf-8")
	_, _ = w.Write([]byte(sitemapXML))
}
