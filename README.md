# Untrusted Page Reader

Built by [Trevor Heshka](https://trevorheshka.com).

A small teaching demo that keeps **your notes** (green, trusted) apart from **outside page text** (orange, untrusted) so an LLM prompt treats the page as data, not instructions.

![Marked injection sample](docs/screenshot-marked.png)

## Prerequisites

- [Node.js](https://nodejs.org) 18 or newer
- A modern browser
- No `npm install`. There are no dependencies.

## Install and run

```bash
git clone https://github.com/YardPhantom/untrusted-page-reader.git
cd untrusted-page-reader
node server.js
```

Then open <http://localhost:3000>.

The server is only needed for URL fetches (`/fetch?url=`). Pasting HTML works without it: open `public/index.html` directly.

## Try it

1. Click **Load injection sample** (or paste the contents of a file from `fixtures/`).
   - `fixtures/benign.html`: a normal page
   - `fixtures/injection.html`: a page with hidden prompt-injection text
2. Edit **Your notes** if you want.
3. Click **Mark it**. Suspicious lines are highlighted in red. The combined prompt appears below.
4. Click **Copy** and paste the prompt into the LLM of your choice.

Empty state:

![Empty state](docs/screenshot-empty.png)

## How it works

1. The HTML is parsed with `DOMParser`. Scripts, styles, and comments are dropped, and the visible text is extracted.
2. Lines that look like instructions ("ignore previous", "you are now", "system:") are flagged.
3. Fence-like markers in the page text are neutralized so the page can't close its own fence.
4. The prompt is built in this order: your notes, a policy line, then the fenced untrusted text.

## License

MIT. This is a teaching toy, **not a security boundary**.
