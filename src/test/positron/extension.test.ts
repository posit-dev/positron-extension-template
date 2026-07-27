// Positron-only integration test.
//
// Unlike the plain VS Code suite (src/test/suite/), which mocks the Positron
// API, this runs inside a real Positron build (see
// scripts/run-positron-tests.mjs) and exercises the live API surface the
// extension depends on.

import * as assert from 'assert';
import * as vscode from 'vscode';
import { tryAcquirePositronApi, inPositron } from '@posit-dev/positron';

suite('Positron API', () => {
	test('the tests are running inside Positron', () => {
		assert.strictEqual(inPositron(), true);
	});

	test('the Positron API is reachable', () => {
		const positron = tryAcquirePositronApi();
		assert.ok(positron, 'tryAcquirePositronApi() should return the Positron API');
	});

	test('the extension activates in Positron', async () => {
		const ext = vscode.extensions.getExtension('your-publisher-name.positron-extension-template');
		assert.ok(ext, 'the extension should be present in the Positron extension host');

		await ext.activate();
		assert.ok(ext.isActive, 'the extension should activate without error');
	});
});
