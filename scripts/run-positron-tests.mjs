// Launcher for the Positron-only integration tests (src/test/positron/).
//
// Downloads (or reuses a cached) Positron build under .positron-test/ and
// runs the compiled Mocha entry point (out/test/positron/index.js) inside
// its extension host, via @posit-dev/positron-test-electron -- the Positron
// analog of @vscode/test-electron.
//
// Run with `npm run test-positron` (which compiles first).

import { runTests } from '@posit-dev/positron-test-electron';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
	// Extension root (contains package.json); scripts/ lives one level below.
	const extensionDevelopmentPath = path.resolve(__dirname, '..');

	// Compiled Mocha entry point that discovers and runs the Positron tests.
	const extensionTestsPath = path.resolve(
		extensionDevelopmentPath,
		'out',
		'test',
		'positron',
		'index.js'
	);

	const code = await runTests({
		channel: 'stable',
		extensionDevelopmentPath,
		extensionTestsPath
	});

	process.exit(code);
}

main().catch((err) => {
	console.error('Failed to run Positron integration tests:');
	console.error(err);
	process.exit(1);
});
