// Package handler provides HTTP handlers for the portfolio site.
package handler

import (
	"net/http"

	"tahasadough.com/internal/views"
)

const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>https://www.tahasadough.com</loc>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
</urlset>`

func Home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	_ = views.HomePage().Render(r.Context(), w)
}

func Offline(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	_ = views.OfflinePage().Render(r.Context(), w)
}

func Sitemap(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/xml; charset=utf-8")
	_, _ = w.Write([]byte(sitemapXML))
}
