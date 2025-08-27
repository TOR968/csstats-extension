#!/usr/bin/env node

/// <reference types="node" />

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import buildPlugin from './build-plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

type ReleaseType = 'patch' | 'minor' | 'major';

interface PackageJson {
	version: string;
	[key: string]: any;
}

interface PluginJson {
	version: string;
	[key: string]: any;
}

interface BuildResult {
	version: string;
	releaseDir: string;
	zipPath: string;
	zipName: string;
}

function getReleaseType(): ReleaseType {
	const args: string[] = process.argv.slice(2);
	const releaseType: string = args[0];

	if (!releaseType || !['patch', 'minor', 'major'].includes(releaseType)) {
		console.error('Usage: node scripts/release.js <patch|minor|major>');
		console.error('');
		console.error('Examples:');
		console.error('  node scripts/release.js patch   # 1.0.0 -> 1.0.1');
		console.error('  node scripts/release.js minor   # 1.0.0 -> 1.1.0');
		console.error('  node scripts/release.js major   # 1.0.0 -> 2.0.0');
		process.exit(1);
	}

	return releaseType as ReleaseType;
}

function incrementVersion(currentVersion: string, releaseType: ReleaseType): string {
	const [major, minor, patch] = currentVersion.split('.').map(Number);

	switch (releaseType) {
		case 'patch':
			return `${major}.${minor}.${patch + 1}`;
		case 'minor':
			return `${major}.${minor + 1}.0`;
		case 'major':
			return `${major + 1}.0.0`;
		default:
			throw new Error(`Unknown release type: ${releaseType}`);
	}
}

function updateVersion(newVersion: string): string {
	// Update package.json
	const packagePath: string = join(rootDir, 'package.json');
	const packageJson: PackageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
	const oldVersion: string = packageJson.version;
	packageJson.version = newVersion;
	writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

	// Update plugin.json
	const pluginPath: string = join(rootDir, 'plugin.json');
	const pluginJson: PluginJson = JSON.parse(readFileSync(pluginPath, 'utf8'));
	pluginJson.version = newVersion;
	writeFileSync(pluginPath, JSON.stringify(pluginJson, null, '\t') + '\n');

	return oldVersion;
}

function createRelease(): void {
	try {
		const releaseType: ReleaseType = getReleaseType();

		console.log('🚀 Starting manual release process...');
		console.log(`📈 Release type: ${releaseType}`);

		// Get current version
		const packageJson: PackageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));
		const currentVersion: string = packageJson.version;
		const newVersion: string = incrementVersion(currentVersion, releaseType);

		console.log(`🔢 Version: ${currentVersion} -> ${newVersion}`);

		// Check if working directory is clean
		try {
			const status: string = execSync('git status --porcelain', { encoding: 'utf8', cwd: rootDir });
			if (status.trim()) {
				console.error('❌ Working directory is not clean. Please commit or stash changes first.');
				process.exit(1);
			}
		} catch (error: any) {
			console.log('⚠ Git status check failed, continuing anyway...');
		}

		// Update versions
		console.log('📝 Updating version numbers...');
		const oldVersion: string = updateVersion(newVersion);

		// Build plugin
		console.log('🔨 Building plugin...');
		const buildResult: BuildResult = buildPlugin();

		// Commit version changes
		try {
			console.log('💾 Committing version changes...');
			execSync(`git add package.json plugin.json`, { cwd: rootDir, stdio: 'inherit' });
			execSync(`git commit -m "chore(release): ${newVersion}"`, { cwd: rootDir, stdio: 'inherit' });

			// Create git tag
			console.log('🏷 Creating git tag...');
			execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`, { cwd: rootDir, stdio: 'inherit' });

			console.log('✅ Manual release complete!');
			console.log('');
			console.log('📋 Next steps:');
			console.log(`   1. Push changes: git push origin main`);
			console.log(`   2. Push tag: git push origin v${newVersion}`);
			console.log(`   3. Create GitHub release with: ${buildResult.zipName}`);
			console.log(`   4. Upload ZIP file: ${buildResult.zipPath}`);
		} catch (error: any) {
			console.error('❌ Git operations failed:', error.message);
			console.log('⚠ Rolling back version changes...');
			updateVersion(oldVersion);
			process.exit(1);
		}
	} catch (error: any) {
		console.error('❌ Release failed:', error.message);
		process.exit(1);
	}
}

if (import.meta.url.startsWith('file:') && process.argv[1] === fileURLToPath(import.meta.url)) {
	createRelease();
}
