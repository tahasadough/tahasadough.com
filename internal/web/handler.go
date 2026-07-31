package web

import (
	"net/http"

	"github.com/tahasadough/tahasadough.com/internal/web/pages"
)

const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>https://tahasadough.com</loc>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
</urlset>`

const htmlCache = "public, max-age=3600"

func Home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", htmlCache)
	_ = pages.Home().Render(r.Context(), w)
}

func Sitemap(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/xml; charset=utf-8")
	w.Header().Set("Cache-Control", htmlCache)
	_, _ = w.Write([]byte(sitemapXML))
}
