APP_NAME     = tahasadough
BUILD_DIR    = bin/
ENTRY_POINT  = ./cmd/$(APP_NAME)/
BINARY       = $(BUILD_DIR)$(APP_NAME)
VERSION      = $(shell git describe --tags --always --dirty 2>/dev/null || echo "dev")
LDFLAGS      = -ldflags="-X main.Version=$(VERSION)"

.PHONY: all build run dev css templ-gen clean build-cf check fmt lint test tidy vet

all: check build

# --- Build ---
$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

build: css templ-gen | $(BUILD_DIR)
	go build $(LDFLAGS) -o $(BINARY) $(ENTRY_POINT)

run: build
	./$(BINARY)

dev:
	npx @tailwindcss/cli -i ./css/input.css -o ./static/css/style.css --watch &
	templ generate --watch &
	go run $(ENTRY_POINT)

css:
	npx @tailwindcss/cli -i ./css/input.css -o ./static/css/style.css --minify

templ-gen:
	templ generate

build-cf: css | $(BUILD_DIR)
	go build $(LDFLAGS) -o $(BINARY) $(ENTRY_POINT)
	rm -rf _site
	./$(BINARY) & \
	pid=$$!; \
	sleep 2; \
	mkdir -p _site/offline; \
	curl -s http://localhost:8080/sitemap.xml > _site/sitemap.xml; \
	curl -s http://localhost:8080/offline > _site/offline/index.html; \
	curl -s http://localhost:8080/ > _site/index.html; \
	cp -r static/* _site/; \
	kill $$pid 2>/dev/null; \
	rm -f $(BINARY)

# --- Quality ---
check: fmt vet lint

fmt:
	gofmt -w -s ./cmd/ ./internal/

vet:
	go vet ./...

lint:
	golangci-lint run

test:
	go test -v -race -count=1 ./...

tidy:
	go mod tidy

fix:
	go fix ./...

clean:
	rm -rf $(BUILD_DIR) static/css _site
