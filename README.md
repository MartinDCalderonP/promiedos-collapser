# Promiedos Collapser

Firefox-first MV3 extension that persists collapsed tournaments on promiedos.com.ar.

## Stack

- Manifest V3
- TypeScript
- Vite
- Vitest

## Scripts

- `pnpm run dev`: incremental build watch
- `pnpm run typecheck`: TypeScript check
- `pnpm run test`: unit tests
- `pnpm run build`: production build to dist
- `pnpm run package`: zip build output

## Local Run (Firefox)

1. Install dependencies (pnpm recommended):

```bash
pnpm install
```

2. Build the extension:

```bash
pnpm run build
```

3. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
4. Click `Load Temporary Add-on...`.
5. Select `dist/manifest.json`.
6. Open promiedos.com.ar and collapse tournaments you do not want.
7. Navigate between dates; state remains synchronized.

## Behavior

- Uses native tournament buttons and only clicks when current state differs from saved state.
- Persists collapsed ids in `browser.storage.local`.
- Re-applies state after dynamic DOM updates with a debounced MutationObserver.
- Uses resilient selector fallbacks and multiple state signals.

## Tests

Current unit tests cover:

- Tournament id normalization.
- Chevron transform parsing.
- aria-expanded priority when reading state.

## Using pnpm

This repository includes a `pnpm-lock.yaml`. To use pnpm locally you can enable
Corepack (recommended) or install pnpm globally:

```bash
# enable corepack (bundled with modern Node versions)
corepack enable

# or install pnpm globally if you prefer
npm install -g pnpm

# then install dependencies
pnpm install
```

After install, run scripts with `pnpm run <script>` (e.g. `pnpm run test`).
