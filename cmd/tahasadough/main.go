package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/tahasadough/tahasadough.com/internal/web"
)

var Version = "1.0.0"

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /", web.Home)
	mux.HandleFunc("GET /offline", web.Offline)
	mux.HandleFunc("GET /sitemap.xml", web.Sitemap)

	registerStaticRoutes(mux)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	go func() {
		log.Printf("tahasadough %s — listening on :%s", Version, port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	<-ctx.Done()
	log.Println("shutting down...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	return srv.Shutdown(shutdownCtx)
}

func registerStaticRoutes(mux *http.ServeMux) {
	fs := http.FileServer(http.Dir("static"))
	year := 365 * 24 * time.Hour

	mux.Handle("GET /images/", web.Cache(year, true)(fs))
	mux.Handle("GET /style.css", web.Cache(year, true)(fs))
	mux.Handle("GET /js/", web.Cache(year, true)(fs))
	mux.Handle("GET /favicon.ico", web.Cache(year, true)(fs))
	mux.Handle("GET /apple-touch-icon.png", web.Cache(year, true)(fs))
	mux.Handle("GET /pwa-192.png", web.Cache(year, true)(fs))
	mux.Handle("GET /pwa-512.png", web.Cache(year, true)(fs))

	mux.Handle("GET /manifest.json", web.Cache(1*time.Hour, false)(fs))
	mux.Handle("GET /robots.txt", web.Cache(1*time.Hour, false)(fs))
	mux.Handle("GET /service_worker.js", fs)
}
