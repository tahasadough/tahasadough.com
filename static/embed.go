// Package static embeds the site's static assets so the binary is self-contained.
package static

import "embed"

//go:embed *
var FS embed.FS
