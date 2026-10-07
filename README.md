# Marginalia

An interactive study companion for business books. The first book is Richard P. Rumelt's *Good Strategy Bad Strategy*.

This is a clickable static mockup: plain HTML, CSS and JavaScript with no build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```

## What's here

| Page | Route | What it does |
| --- | --- | --- |
| Library | `#shelf` | A shelf of 3D books. Good Strategy Bad Strategy is open; the others are placeholders. |
| Book home | `#book` | Thesis, entry points, a map of all 18 chapters, and the cases Rumelt uses. |
| The kernel | `#kernel` | A concept page with an interactive figure (general form, Desert Storm, Apple 1997), sidenotes and definition pop-ups. |
| Workbench | `#builder` | Write a diagnosis, guiding policy and actions. Rule-based checks flag goals posing as strategy, buzzwords, unlinked actions and policies that rule nothing out. Drafts save to `localStorage`. |

## Layout

```
index.html          page shell (header, footer, script tags)
assets/styles.css   design tokens (light and dark) and all styles
assets/content.js   every piece of book content, as data
assets/app.js       hash router, page renderers, workbench logic
```

Content lives in `assets/content.js` so that adding a book or concept means adding data, not page code. Summaries are written in our own words. Keep quotations short and attributed.
