# Promiedos Collapser

A small Firefox-first Manifest V3 extension that persists which tournaments are collapsed on promiedos.com.ar so the UI stays consistent across navigations.

## Quick overview

- Built with TypeScript, bundled by Vite, tested with Vitest.
- Persists collapsed tournament ids to `browser.storage.local` and reconciles the page when it updates.

## Quick start

1. Install dependencies (pnpm recommended):

```bash
pnpm install
```

2. Run tests:

```bash
pnpm run test
```

3. Build for development (watch):

```bash
pnpm run dev
```

4. Build production bundle:

```bash
pnpm run build
```

## Load in Firefox (temporary)

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click `Load Temporary Add-on...` and select `dist/manifest.json` after building.

## Behavior

- Uses the site's native toggle controls and only triggers clicks when the saved state differs from the current DOM state.
- Resilient to dynamic DOM updates (MutationObserver + reconcile logic).
- Stores persisted state in `browser.storage.local`.

## Testing

- Unit tests use Vitest. Key areas covered: id normalization, state parsing, and click/resolver logic.

Run the test suite locally with:

```bash
pnpm run test
```

## Contributing

- The project includes a Husky `pre-commit` hook to run tests locally before a commit (install hooks with `pnpm run prepare`).

## License

MIT
