# AntonisPat — Composer Portfolio

Personal portfolio website for **AntonisPat**, a film, game, and music composer.

The site showcases:

- Film scoring work
- Game / OST compositions
- Arrangements
- Audio samples
- Composer information and contact details
- Links to social and music platforms

The project is also a personal frontend/web-development project built to demonstrate HTML, CSS, TypeScript, DOM APIs, Web Components, and custom audio-player functionality.

## Tech stack

- HTML5
- CSS3
- TypeScript
- Native Web Components / Custom Elements
- HTML `<audio>` API
- GitHub Pages

No frontend framework is required.

## Project structure

```text
.
├── index.html
├── style.css
├── script.ts
├── script.js
├── tsconfig.json
├── package.json
├── package-lock.json
├── imgs/
├── audio/
└── README.md
```

### TypeScript files and JSON files

- `script.ts` — the TypeScript source code.
- `script.js` — the compiled JavaScript that the browser loads when the site is published directly from the repository.
- `tsconfig.json` — TypeScript compiler configuration.
- `package.json` — project metadata and development dependencies/scripts.
- `package-lock.json` — locks the exact npm dependency versions for reproducible installs.

## Local development

Install dependencies:

```bash
npm install
```

Compile TypeScript:

```bash
npm run build
```

Watch for TypeScript changes while developing:

```bash
npm run watch
```

The website itself is static and can be tested with a local web server such as VS Code Live Server.

## GitHub Pages

This project is designed to work as a static GitHub Pages site. GitHub Pages serves the HTML/CSS/JavaScript and other static assets from the configured publishing source.

For a simple deployment, keep the compiled `script.js` in the repository and publish the repository root (or `/docs`) from the chosen branch.

If you later want a cleaner build pipeline, the project can be changed to use GitHub Actions so that TypeScript is compiled during deployment and only the build output is published.

## Audio and copyright

The audio files in this repository are portfolio samples and are **not licensed for free redistribution**.

Access to the website or the ability to stream an audio sample does not grant permission to download, copy, re-upload, distribute, sample, modify, synchronize, sell, or otherwise exploit the music.

The repository uses a restrictive, all-rights-reserved license for the original project materials. See [`LICENSE`](./LICENSE).

### Important technical limitation

Because this is a client-side/static website, an audio file that is streamed by a browser must be delivered to that browser. Therefore, the site can discourage casual downloading, but it cannot technically guarantee that a determined visitor will be unable to save the audio.

For stronger protection, original/master files should not be published to the public repository. Portfolio versions should preferably be compressed preview files, with masters stored privately/offline or behind a separate server-controlled storage solution.

## Third-party content

Some content may be embedded from third-party services such as YouTube or SoundCloud. Those services and their content remain subject to their respective terms and licenses.

## License

The website/code/design and the original music are owned by different rights holders. See [`LICENSE`](./LICENSE) for the full terms.
