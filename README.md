# Untrusted Page Reader

A small teaching demo. Paste a URL or an HTML snippet along with your own notes. The app wraps the page text in clearly labeled **OUTSIDE / UNTRUSTED** fences and keeps your notes in a separate **YOUR NOTES** section. The result is a prompt where an LLM is told to treat page content as data, not instructions.

Built by [Trevor Heshka](https://trevorheshka.com).

## Run locally

```bash
node server.js        # Node 18+, no dependencies
# open http://localhost:3000
```

The server is only needed for the URL fetch (`/fetch?url=`). Pasting HTML works client-side, even if you open `public/index.html` directly.

## How it works

1. The HTML is parsed with `DOMParser`. Scripts, styles, and comments are dropped, and the visible text is extracted.
2. Lines that look like instructions ("ignore previous", "you are now", "system:") are flagged.
3. Any fence-like markers in the page text are neutralized, so the page can't close its own fence.
4. A combined prompt is built: your notes, a policy line, then the fenced untrusted text.

`fixtures/` contains sample pages, including a prompt-injection example.

This is a teaching toy, not a security boundary.

## License

MIT
