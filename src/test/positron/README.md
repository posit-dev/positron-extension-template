# Positron API Tests

Integration tests that run this extension inside a real
[Positron](https://positron.posit.co/) build and exercise the live Positron
API — code paths the plain VS Code suite (`src/test/suite/`) can't reach,
because there the Positron API is mocked.

## How it works

- `scripts/run-positron-tests.mjs` uses
  [`@posit-dev/positron-test-electron`](https://github.com/posit-dev/positron-test-electron)
  to download (and cache, under `.positron-test/`) a stable Positron build,
  then runs the compiled Mocha entry point (`out/test/positron/index.js`)
  inside its extension host — the Positron analog of `@vscode/test-electron`.
- `index.ts` is that entry point: it discovers `*.test.js` files in this
  directory and runs them with Mocha (tdd UI).
- The plain VS Code suite is scoped to `out/test/suite/` (see
  `.vscode-test.mjs`), so `npm test` never picks these up in vanilla VS Code
  (where they would fail — there is no real Positron API).

## Running locally

```bash
npm run test-positron
```

## Adding tests

Add a `<name>.test.ts` file in this directory using Mocha's tdd UI
(`suite`/`test`). Reach the Positron API through the helpers from
`@posit-dev/positron` (`tryAcquirePositronApi`, `inPositron`) — the same way
the extension does in `src/extension.ts`.
