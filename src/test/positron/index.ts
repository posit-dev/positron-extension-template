// Mocha entry point for the Positron-only integration tests. It is loaded
// inside the Positron extension host by @posit-dev/positron-test-electron
// (see scripts/run-positron-tests.mjs), which requires this module and calls
// run().
//
// Kept separate from the plain VS Code suite (src/test/suite/) because these
// tests need the real Positron API, which only exists when running inside
// Positron rather than vanilla VS Code.

import * as fs from 'fs';
import * as path from 'path';
import * as Mocha from 'mocha';

export function run(): Promise<void> {
	const mocha = new Mocha({
		ui: 'tdd',
		color: true,
		// Extension activation on a cold CI machine can be slow.
		timeout: 120000
	});

	const testsRoot = __dirname;
	for (const file of fs.readdirSync(testsRoot)) {
		if (file.endsWith('.test.js')) {
			mocha.addFile(path.resolve(testsRoot, file));
		}
	}

	return new Promise((resolve, reject) => {
		try {
			mocha.run((failures) => {
				if (failures > 0) {
					reject(new Error(`${failures} test(s) failed.`));
				} else {
					resolve();
				}
			});
		} catch (err) {
			reject(err);
		}
	});
}
