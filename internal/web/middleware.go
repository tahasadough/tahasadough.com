package web

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"net/http"
)

func CacheControl(value string) func(http.Handler) http.Handler {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Cache-Control", value)
			h.ServeHTTP(w, r)
		})
	}
}

func ETag() func(http.Handler) http.Handler {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			bw := &bufferedWriter{ResponseWriter: w}
			h.ServeHTTP(bw, r)
			if bw.status != http.StatusOK || bw.body.Len() == 0 {
				w.WriteHeader(bw.status)
				_, _ = w.Write(bw.body.Bytes())
				return
			}
			sum := sha256.Sum256(bw.body.Bytes())
			etag := fmt.Sprintf(`"sha256-%x"`, sum[:8])
			w.Header().Set("ETag", etag)
			if r.Header.Get("If-None-Match") == etag {
				w.WriteHeader(http.StatusNotModified)
				return
			}
			_, _ = w.Write(bw.body.Bytes())
		})
	}
}

type bufferedWriter struct {
	http.ResponseWriter
	body   bytes.Buffer
	status int
}

func (w *bufferedWriter) WriteHeader(code int) {
	w.status = code
}

func (w *bufferedWriter) Write(b []byte) (int, error) {
	if w.status == 0 {
		w.status = http.StatusOK
	}
	return w.body.Write(b)
}
