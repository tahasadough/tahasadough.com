package web

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/tahasadough/tahasadough.com/internal/web/pages"
)

func writeResponse(w http.ResponseWriter, r *http.Request, contentType string, body []byte) error {
	w.Header().Set("Content-Type", contentType)
	w.Header().Add("Vary", "Accept-Encoding")
	if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
		w.Header().Set("Content-Encoding", "gzip")
		gz := gzip.NewWriter(w)
		if _, err := gz.Write(body); err != nil {
			return fmt.Errorf("write gzip body: %w", err)
		}
		if err := gz.Close(); err != nil {
			return fmt.Errorf("close gzip writer: %w", err)
		}
		return nil
	}
	if _, err := w.Write(body); err != nil {
		return fmt.Errorf("write response body: %w", err)
	}
	return nil
}

func writeError(w http.ResponseWriter, r *http.Request, status int) {
	var buf bytes.Buffer
	errPage := pages.ErrorPage(status)
	if err := errPage.Render(r.Context(), &buf); err != nil {
		log.Printf("web: render error page: %v", err)
		http.Error(w, http.StatusText(status), status)
		return
	}
	w.Header().Set("Cache-Control", "no-store")
	_ = writeResponse(w, r, "text/html; charset=utf-8", buf.Bytes())
}
