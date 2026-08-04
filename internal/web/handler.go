package web

import (
	"bytes"
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"syscall"

	"github.com/tahadx/tahasadough.com/internal/web/pages"
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

type Handler func(http.ResponseWriter, *http.Request) error

func (h Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if err := h(w, r); err != nil {
		log.Printf("web: %s %s: %v", r.Method, r.URL.Path, err)
		if errors.Is(err, syscall.EPIPE) || errors.Is(err, syscall.ECONNRESET) || errors.Is(err, net.ErrClosed) {
			return
		}
		writeError(w, r, http.StatusInternalServerError)
	}
}

func Home(w http.ResponseWriter, r *http.Request) error {
	var buf bytes.Buffer
	if err := pages.Home().Render(r.Context(), &buf); err != nil {
		return fmt.Errorf("render home page: %w", err)
	}
	w.Header().Set("Cache-Control", htmlCache)
	return writeResponse(w, r, "text/html; charset=utf-8", buf.Bytes())
}

func Sitemap(w http.ResponseWriter, r *http.Request) error {
	w.Header().Set("Cache-Control", htmlCache)
	return writeResponse(w, r, "application/xml; charset=utf-8", []byte(sitemapXML))
}
