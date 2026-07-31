APP_NAME     = tahasadough
BUILD_DIR    = bin/
ENTRY_POINT  = ./cmd/$(APP_NAME)/
BINARY       = $(BUILD_DIR)$(APP_NAME)
VERSION      = $(shell git describe --tags --always --dirty 2>/dev/null || echo "dev")
LDFLAGS      = -ldflags="-X main.Version=$(VERSION)"

UNAME_S       = $(shell uname -s)
UNAME_M       = $(shell uname -m)
ifeq ($(UNAME_S),Darwin)
  TW_ASSET    = $(if $(filter arm64,$(UNAME_M)),macos-arm64,macos-x64)
else
  TW_ASSET    = $(if $(filter aarch64,$(UNAME_M)),linux-arm64,linux-x64)
endif
TAILWIND_STAMP = $(BUILD_DIR).tailwindcss-version
TAILWIND       = $(BUILD_DIR)tailwindcss
TW_RELEASES    = https://api.github.com/repos/tailwindlabs/tailwindcss/releases/latest
TW_URL         = https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-$(TW_ASSET)

.PHONY: all build run dev css templ-gen clean build-cf check fmt lint test tidy vet FORCE

all: check build

# --- Build ---
$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

build: css templ-gen | $(BUILD_DIR)
	go build $(LDFLAGS) -o $(BINARY) $(ENTRY_POINT)

run: build
	./$(BINARY)

dev: $(TAILWIND)
	./$(TAILWIND) -i ./style.css -o ./static/style.css --watch &
	go run github.com/a-h/templ/cmd/templ@v0.3.1020 generate --watch &
	go run $(ENTRY_POINT)

FORCE:

$(TAILWIND): $(TAILWIND_STAMP) | $(BUILD_DIR)
	curl -fsSL $(TW_URL) -o $@.tmp
	mv $@.tmp $@
	chmod +x $@

$(TAILWIND_STAMP): FORCE | $(BUILD_DIR)
	@latest=$$(curl -fsSL $(TW_RELEASES) 2>/dev/null | grep -m1 '"tag_name"' | sed 's/.*"tag_name" *: *"\([^"]*\)".*/\1/'); \
	if [ -n "$$latest" ] && [ "$$(cat $@ 2>/dev/null)" != "$$latest" ]; then \
		printf '%s\n' "$$latest" > $@; \
	fi

css: $(TAILWIND)
	./$(TAILWIND) -i ./style.css -o ./static/style.css --minify

templ-gen:
	go run github.com/a-h/templ/cmd/templ@v0.3.1020 generate

build-cf: css templ-gen | $(BUILD_DIR)
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
	rm -f _site/embed.go; \
	kill $$pid 2>/dev/null; \
	rm -f $(BINARY)

# --- Quality ---
check: fmt lint

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
	rm -rf $(BUILD_DIR) static/style.css _site
