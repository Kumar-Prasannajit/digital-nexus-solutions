# Digital Nexus Solutions — website

Static site, ready to deploy on Netlify as-is (no build step required).

## Structure

```
index.html                 All markup (single page, section by section)
css/style.css               All styles
js/script.js                 Mobile nav, smooth scroll, callback time-chips,
                              Netlify Forms AJAX submit, back-to-top button
assets/img/                  Team photos + favicon.svg
assets/files/                Resume PDF
```

## Deploying to Netlify

Drag-and-drop this whole folder onto app.netlify.com, or connect the repo
and set:
- Build command: *(none)*
- Publish directory: `.`

That's it — Netlify Forms detects the `contact` and `callback` forms in
`index.html` automatically at deploy time (that's what `data-netlify="true"`
does). Submissions show up under **Site settings → Forms** in your Netlify
dashboard, and you can turn on email notifications there so they land in
your inbox too.

## Things to update

- **Testimonials** (`index.html`, `id="testimonials"` section): the three
  quotes are clearly-marked placeholders — swap the name, role, and quote
  text for each `.testi-card` once you have real ones. Structure/classes
  can stay as-is.
- **Resume**: `assets/files/Kumar-Prasannajit-Sahu-Resume.pdf` — replace
  this file (same name) whenever your resume updates, no HTML changes
  needed.
- **Team photos**: `assets/img/kumar-prasannajit-sahu.jpg` and
  `assets/img/saroj-kumar-sahu.jpg` — already resized/compressed for web
  (under 45KB each). Replace with same filenames to swap photos.

## Notes

- No `og:image` is set yet (a proper 1200×630 social share banner is worth
  adding later — currently link previews on WhatsApp/social will show text
  only, no image).
- The old single-file version (`digital-nexus-solutions final digital
  nexus.html`) is left in the project root untouched — safe to delete once
  you've confirmed the new site looks right.
