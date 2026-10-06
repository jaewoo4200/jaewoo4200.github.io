# Jaewoo Lee — Research & Software

Personal portfolio: **https://jaewoo4200.github.io/**

English-first bilingual portfolio with six project case studies, image galleries and research publications.

## Edit and preview

- `dist/projects.json`: bilingual project descriptions, images, metrics, process steps and links.
- `dist/content.json`: shared bilingual copy.
- `scripts/build.py`: page template and page-level copy; generates `dist/index.html` and `dist/data.js`.
- `dist/styles.css`: responsive layout and motion.
- `dist/app.js`: language selection, case-study routing, galleries and keyboard navigation.
- `SOURCES.md`: content and asset provenance.

No package installation is needed. After editing:

```sh
python3 scripts/build.py
node --check dist/app.js
node --check dist/data.js
python3 -m http.server 8000 --directory dist
```

## Deploy

GitHub Pages uses `.github/workflows/pages.yml`. Every push to `main` rebuilds the site and deploys only `dist/`. It can also be triggered manually from the Actions tab.

The public website uses the account domain directly, without a repository path. Project links use fragments, for example `https://jaewoo4200.github.io/#project/capstone`.

The default language is English. Explicit language preferences are remembered in browser storage. The site supports reduced motion, keyboard process tabs and Escape to close case studies.

Third-party license notices for project screenshots are preserved under `dist/assets/`.
