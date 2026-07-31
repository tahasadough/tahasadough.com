// Package static embeds the site's static assets so the binary is self-contained.
package static

import "embed"

//go:embed *
var FS embed.FS

// StyleCSS is the full stylesheet wrapped in <style> tags for inlining in the
// document head, so the initial render never waits on a stylesheet request.
var StyleCSS = func() string {
	b, err := FS.ReadFile("style.css")
	if err != nil {
		panic("static: missing generated style.css — run `make css`")
	}
	return "<style>\n" + string(b) + "\n</style>"
}()
