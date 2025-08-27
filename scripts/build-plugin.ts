#!/usr/bin/env node

/// <reference types="node" />

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

interface PackageJson {
	version: string;
	[key: string]: any;
}

interface BuildResult {
	version: string;
	releaseDir: string;
	zipPath: string;
	zipName: string;
}

function buildPlugin(): BuildResult {
	try {
		console.log('🚀 Starting plugin build process...');

		// Get current version
		const packageJson: PackageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));
		const version: string = packageJson.version;
		console.log(`📦 Building version ${version}`);

		// Create build directory
		const buildDir: string = join(rootDir, 'dist');
		const releaseDir: string = join(buildDir, 'release');

		if (existsSync(buildDir)) {
			execSync(`rmdir /s /q "${buildDir}"`, { stdio: 'inherit' });
		}
		mkdirSync(releaseDir, { recursive: true });

		// Build the project
		console.log('🔨 Building project...');
		execSync('pnpm run build', { cwd: rootDir, stdio: 'inherit' });

		// Copy essential files and directories
		const filesToCopy: string[] = ['package.json', 'plugin.json', 'requirements.txt', 'README.md'];

		const directoriesToCopy: string[] = ['frontend', 'webkit', 'backend', 'styles'];

		// Copy files
		filesToCopy.forEach((file: string) => {
			const srcPath: string = join(rootDir, file);
			const destPath: string = join(releaseDir, file);
			if (existsSync(srcPath)) {
				cpSync(srcPath, destPath);
				console.log(`✓ Copied ${file}`);
			} else {
				console.log(`⚠ Warning: ${file} not found, skipping...`);
			}
		});

		// Copy directories
		directoriesToCopy.forEach((dir: string) => {
			const srcPath: string = join(rootDir, dir);
			const destPath: string = join(releaseDir, dir);
			if (existsSync(srcPath)) {
				cpSync(srcPath, destPath, { recursive: true });
				console.log(`✓ Copied ${dir}/`);
			} else {
				console.log(`⚠ Warning: ${dir}/ not found, skipping...`);
			}
		});

		// Copy dist contents if exists (excluding release directory to avoid circular copy)
		const distPath: string = join(rootDir, 'dist');
		if (existsSync(distPath)) {
			// Only copy dist contents if this isn't the release directory itself
			const distContents = readdirSync(distPath);
			const filteredContents = distContents.filter((item: string) => item !== 'release');

			if (filteredContents.length > 0) {
				// Copy each item in dist except the release folder
				filteredContents.forEach((item: string) => {
					const srcItemPath = join(distPath, item);
					const destItemPath = join(releaseDir, 'dist', item);
					mkdirSync(dirname(destItemPath), { recursive: true });
					cpSync(srcItemPath, destItemPath, { recursive: true });
				});
				console.log('✓ Copied dist/ (excluding release folder)');
			} else {
				console.log('⚠ Warning: dist/ contains only release folder, skipping...');
			}
		}

		// Copy LICENSE if exists
		const licensePath: string = join(rootDir, 'LICENSE');
		if (existsSync(licensePath)) {
			cpSync(licensePath, join(releaseDir, 'LICENSE'));
			console.log('✓ Copied LICENSE');
		}

		// Create ZIP package
		console.log('📦 Creating ZIP package...');
		const zipName: string = `csstats-extension-v${version}.zip`;
		const zipPath: string = join(buildDir, zipName);

		// Use PowerShell to create zip on Windows
		const zipCommand: string = `Compress-Archive -Path '${releaseDir}\\*' -DestinationPath '${zipPath}' -Force`;
		execSync(`powershell -Command "${zipCommand}"`, { stdio: 'inherit' });

		console.log(`✅ Plugin build complete!`);
		console.log(`📁 Release files: ${releaseDir}`);
		console.log(`📦 ZIP package: ${zipPath}`);
		console.log(`🔢 Version: ${version}`);

		return {
			version,
			releaseDir,
			zipPath,
			zipName,
		};
	} catch (error: any) {
		console.error('❌ Build failed:', error.message);
		process.exit(1);
		// This line should never be reached, but TypeScript requires it
		throw new Error('Build failed');
	}
}

// Run if called directly
if (import.meta.url.startsWith('file:') && process.argv[1] === fileURLToPath(import.meta.url)) {
	buildPlugin();
}

export default buildPlugin;
