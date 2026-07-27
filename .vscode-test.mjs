import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
  // Scoped to the plain suite so the Positron-only tests (out/test/positron/)
  // aren't run in vanilla VS Code, where the real Positron API is absent.
  files: 'out/test/suite/**/*.test.js',
  mocha: {
    ui: 'tdd',
    timeout: 20000
  }
});