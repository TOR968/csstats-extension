#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync } from 'fs';
import { join } from 'path';

const version = process.argv[2];
if (!version) {
	console.error('Version is required as first argument');
	process.exit(1);
}

const rootDir = process.cwd();
const releaseDir = join(rootDir, 'release');
const zipName = `csstats-extension-v${version}.zip`;

console.log(`Building plugin version ${version}...`);

try {
	// Clean up any existing release directory
	if (existsSync(releaseDir)) {
		rmSync(releaseDir, { recursive: true, force: true });
	}

	// Create release directory
	mkdirSync(releaseDir, { recursive: true });

	// Copy necessary files and directories
	const filesToCopy = [
		{ src: '.millennium', dest: '.millennium' },
		{ src: 'backend', dest: 'backend' },
		{ src: 'plugin.json', dest: 'plugin.json' },
		{ src: 'requirements.txt', dest: 'requirements.txt' },
		{ src: 'README.md', dest: 'README.md' },
	];

	// Check if LICENSE file exists and add it if it does
	if (existsSync(join(rootDir, 'LICENSE'))) {
		filesToCopy.push({ src: 'LICENSE', dest: 'LICENSE' });
	}

	// Copy styles if they exist
	if (existsSync(join(rootDir, 'styles'))) {
		mkdirSync(join(releaseDir, 'static'), { recursive: true });
		cpSync(join(rootDir, 'styles'), join(releaseDir, 'static'), { recursive: true });
	}

	// Copy all files
	for (const { src, dest } of filesToCopy) {
		const srcPath = join(rootDir, src);
		const destPath = join(releaseDir, dest);

		if (existsSync(srcPath)) {
			cpSync(srcPath, destPath, { recursive: true });
			console.log(`Copied ${src} to release directory`);
		} else {
			console.warn(`Warning: ${src} does not exist, skipping...`);
		}
	}

	// Create zip file
	console.log('Creating zip file...');
	execSync(`cd "${releaseDir}" && zip -r "../${zipName}" .`, { stdio: 'inherit' });

	// Clean up release directory
	rmSync(releaseDir, { recursive: true, force: true });

	console.log(`✅ Successfully created ${zipName}`);
} catch (error) {
	console.error('❌ Build failed:', error);

	// Clean up on error
	if (existsSync(releaseDir)) {
		rmSync(releaseDir, { recursive: true, force: true });
	}

	process.exit(1);
}
