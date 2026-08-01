package web

import (
	"bytes"
	"compress/gzip"
	"net/http"
	"strings"

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
	var buf bytes.Buffer
	_ = pages.Home().Render(r.Context(), &buf)
	writeResponse(w, r, "text/html; charset=utf-8", buf.Bytes())
}

func Sitemap(w http.ResponseWriter, r *http.Request) {
	writeResponse(w, r, "application/xml; charset=utf-8", []byte(sitemapXML))
}

func writeResponse(w http.ResponseWriter, r *http.Request, contentType string, body []byte) {
	w.Header().Set("Content-Type", contentType)
	w.Header().Set("Cache-Control", htmlCache)
	w.Header().Add("Vary", "Accept-Encoding")
	if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
		w.Header().Set("Content-Encoding", "gzip")
		gz := gzip.NewWriter(w)
		_, _ = gz.Write(body)
		_ = gz.Close()
		return
	}
	_, _ = w.Write(body)
}
