# alejnp.github.io

Personal CV site, live at [alejnp.github.io](https://alejnp.github.io).
Courtesy of [RenderCV](https://rendercv.com) and GitHub Pages!

## How it works

1. [`Resume.yaml`](Resume.yaml) describes the content and structure of the CV,
   as well as RenderCV settings.
2. Pushes to `master` will trigger CI, which:
   - Installs [RenderCV](https://rendercv.com) from `requirements.txt`.
   - Runs `rendercv render Resume.yaml`, writing the PDF to `pages/alejnp_cv.pdf`.
   - Deploys the `pages/` directory to GitHub Pages.
3. Pages are available at [alejnp.github.io](https://alejnp.github.io)!

## Local preview

```bash
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 -m rendercv render Resume.yaml
python3 -m http.server -d pages # open browser
```
