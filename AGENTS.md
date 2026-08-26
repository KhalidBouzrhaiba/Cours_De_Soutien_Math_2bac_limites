# Project Deployment & Environment Rules

## 1. Project Initialization & Path Rules
- **Set Base Path Early**: Always set the `base` property in `vite.config.ts` to match the target GitHub repository subpath (e.g., `base: '/Cours_De_Soutien/'`).
- **Router Base Name**: If `react-router-dom` is used, configure `<BrowserRouter basename="/<repository-name>">`.
- **Relative Imports**: Ensure all static assets and images use relative paths (`./assets/...`) or ESM imports (`import logo from './logo.png'`) rather than absolute root paths (`/logo.png`).

## 2. Repository & GitHub Settings
- **Commit Lock Files**: Always ensure `package-lock.json` is preserved and committed to avoid CI divergence.
- **GitHub Actions Deployment Source**: Use GitHub Actions as the deployment source for GitHub Pages.

## 3. GitHub Actions Workflow Configuration
- Keep `.github/workflows/deploy.yml` in the main branch configured with `actions/checkout@v4`, Node 20, `npx vite build`, and `actions/deploy-pages@v4`.

## 4. Deployment Checklist
- [x] `vite.config.ts` base path configured
- [x] All routes and assets relative to repository base
- [x] `.github/workflows/deploy.yml` present in repository
