# pedrobraiti.com

Personal portfolio of Pedro Alessandrini Braiti. Static site, no build step,
served directly by GitHub Pages from the `main` branch.

**Live:** https://pedrobraiti.com/

## Structure

```
.
├── index.html              # Page markup only
├── projects.json           # Project catalog (data source for the cards)
├── profile_picture.jpg
├── CNAME                   # Custom domain for GitHub Pages
├── assets/
│   ├── css/                # Styles split by concern
│   │   ├── variables.css   # Theme tokens + reset
│   │   ├── base.css        # Document base, container, matrix canvas
│   │   ├── layout.css      # Header, nav, hero
│   │   ├── components.css  # Buttons, tags, 3D tilt wrappers
│   │   ├── projects.css    # Project cards, category switcher, embeds
│   │   ├── dropdowns.css   # About/Contact panels + animations
│   │   └── ghost.css       # Hero ghost animation
│   └── js/                 # ES modules, one feature per file
│       ├── main.js             # Entry point, wires every module
│       ├── matrixBackground.js # Animated canvas background
│       ├── tiltEffect.js       # Hero + contact card 3D tilt
│       ├── navigation.js       # Dropdown navigation
│       ├── projectCatalog.js   # Loads projects.json, renders cards
│       └── clipboard.js        # Copy email to clipboard
└── projetos/               # Embedded sub-projects (e.g. cave generator)
```

## Adding a project

Edit `projects.json`. Each category (`coding`, `modeling`, `hardware`,
`experiences`) holds a list of project objects. Standard projects use
`image` + `link`; interactive ones use `type: "page"` with an iframe `url`
and optional `variables` (rendered as live controls that `postMessage` the
embedded sketch).

## Running locally

ES modules and `fetch` need to be served over HTTP (opening `index.html`
directly with `file://` will not load the projects). From the repo root:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

GitHub Pages serves `main` at the repository root with no build pipeline.
Pushing to `main` publishes the site as-is.
