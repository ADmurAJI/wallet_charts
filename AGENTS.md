# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, organized by domain: `app/` for global providers and styling, `shared/` for reusable hooks/lib/ui/types, `features/` for wallet, chart, and timeframe modules with `model/` and `ui/` subfolders, and `pages/` for routed screens (`pages/trade/ui/TradePage.tsx`). Configuration files (`vite.config.ts`, `tsconfig*.json`, `eslint.config.js`) sit at the repo root. Static assets belong under `public/`. Add future tests alongside the modules they validate (e.g., `src/features/chart/model/__tests__`).

## Build, Test, and Development Commands
- `npm run dev` – start Vite in watch mode at http://localhost:5173 with hot reload.
- `npm run build` – run TypeScript project references followed by a production Vite build in `dist/`.
- `npm run preview` – serve the production build locally for smoke-testing.
- `npm run lint` – execute ESLint across the repo; run before commits to ensure consistency.

## Coding Style & Naming Conventions
Use TypeScript and React function components. Prefer PascalCase for components/files (`TradePage.tsx`), camelCase for variables and hooks (`useWalletState`), and kebab-case for directories. Keep modules self-contained inside their domain folder and export from `index.ts` barrels when modules grow. Follow prettier-like formatting: 2-space indentation, trailing commas where valid, and double quotes in JSON. Use descriptive prop and hook names that communicate intent.

## Testing Guidelines
No test harness is enabled yet; plan for Vitest or Jest colocated with the code under test (`model/__tests__/wallet.spec.ts`). Mirror file names with `.test.ts` or `.spec.ts` suffixes. Aim for unit coverage of wallet math, timeframe conversions, and chart data shaping. Integration tests should render page-level components via React Testing Library. Document new test commands in `package.json`.

## Commit & Pull Request Guidelines
Follow conventional commits (`feat: add timeframe controls`, `fix: correct wallet balance format`). Write concise, imperative messages describing what and why. Pull requests should include: summary of changes, testing notes (commands run), linked issue or task ID, and screenshots/GIFs for UI-visible changes. Keep PRs scoped to a single feature or fix, prioritize additivity (avoid unrelated formatting), and ensure lint/build pass before requesting review.***
