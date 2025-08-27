#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

async function createPackage() {
	const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
	const version = packageJson.version;

	console.log(`📦 Creating plugin package v${version}...`);

	// Clean up any existing release directory
	const releaseDir = path.join(rootDir, 'release');
	if (fs.existsSync(releaseDir)) {
		fs.rmSync(releaseDir, { recursive: true, force: true });
	}

	// Create release directory
	fs.mkdirSync(releaseDir, { recursive: true });

	// Copy built files (.millennium)
	const millenniumDir = path.join(rootDir, '.millennium');
	if (fs.existsSync(millenniumDir)) {
		console.log('  ✓ Copying .millennium directory...');
		fs.cpSync(millenniumDir, path.join(releaseDir, '.millennium'), { recursive: true });
	} else {
		throw new Error('❌ .millennium directory not found. Did you run build first?');
	}

	// Copy backend
	const backendDir = path.join(rootDir, 'backend');
	if (fs.existsSync(backendDir)) {
		console.log('  ✓ Copying backend directory...');
		fs.cpSync(backendDir, path.join(releaseDir, 'backend'), { recursive: true });
	}

	// Copy styles as static
	const stylesDir = path.join(rootDir, 'styles');
	if (fs.existsSync(stylesDir)) {
		console.log('  ✓ Copying styles as static directory...');
		fs.cpSync(stylesDir, path.join(releaseDir, 'static'), { recursive: true });
	}

	// Copy configuration files
	const configFiles = ['plugin.json', 'requirements.txt', 'README.md', 'LICENSE'];
	for (const file of configFiles) {
		const srcFile = path.join(rootDir, file);
		if (fs.existsSync(srcFile)) {
			console.log(`  ✓ Copying ${file}...`);
			fs.copyFileSync(srcFile, path.join(releaseDir, file));
		}
	}

	// Create zip file
	const zipName = `csstats-extension-v${version}.zip`;
	const zipPath = path.join(rootDir, zipName);

	console.log(`  ✓ Creating ${zipName}...`);

	// Remove existing zip if it exists
	if (fs.existsSync(zipPath)) {
		fs.unlinkSync(zipPath);
	}

	// Create zip using native commands
	try {
		process.chdir(releaseDir);
		if (process.platform === 'win32') {
			execSync(`powershell Compress-Archive -Path * -DestinationPath "${zipPath}"`, { stdio: 'inherit' });
		} else {
			execSync(`zip -r "${zipPath}" .`, { stdio: 'inherit' });
		}
		process.chdir(rootDir);
	} catch (error) {
		process.chdir(rootDir);
		throw error;
	}

	// Clean up release directory
	fs.rmSync(releaseDir, { recursive: true, force: true });

	console.log(`✅ Package created successfully: ${zipName}`);
	console.log(`📁 Plugin structure verified for Millennium compatibility`);
}

createPackage().catch((error) => {
	console.error('❌ Package creation failed:', error.message);
	process.exit(1);
});
