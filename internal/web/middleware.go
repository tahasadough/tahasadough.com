package web

import (
	"fmt"
	"net/http"
	"time"
)

const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>https://www.tahasadough.com</loc>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
</urlset>`

func Cache(dur time.Duration, immutable bool) func(http.Handler) http.Handler {
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
