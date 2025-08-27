#!/usr/bin/env node

/**
 * Debug script to test plugin logging functionality
 * Run with: npx tsx scripts/debug-logs.ts
 */

import { existsSync } from 'fs';

interface DebugInfo {
	timestamp: string;
	message: string;
	status: string;
}

const debugInfo: DebugInfo = {
	timestamp: new Date().toISOString(),
	message: 'CSStats Extension Debug Test',
	status: 'running',
};

console.log('🔍 CSStats Extension Debug Information:');
console.log('=====================================');
console.log(`Timestamp: ${debugInfo.timestamp}`);
console.log(`Message: ${debugInfo.message}`);
console.log(`Status: ${debugInfo.status}`);
console.log('');

console.log('📁 Plugin Structure Check:');
console.log('==========================');

const checkFiles: string[] = ['backend/main.py', 'backend/logger.py', 'frontend/index.tsx', 'webkit/index.tsx', 'plugin.json'];

checkFiles.forEach((file: string) => {
	const exists: boolean = existsSync(file);
	console.log(`${exists ? '✅' : '❌'} ${file}`);
});

console.log('');
console.log('🔧 How to View Logs:');
console.log('==================');
console.log('1. 🖥️  Backend logs (Python):');
console.log('   - Run Steam from command line: "C:\\Program Files (x86)\\Steam\\steam.exe" -dev -console');
console.log('   - Or check Millennium console/terminal window');
console.log('   - Look for "CSStats Extension:" messages');
console.log('');
console.log('2. 🌐 Frontend logs (React):');
console.log('   - Open Steam Settings → CSStats Extension');
console.log('   - Check "Debug Logs" section in plugin settings');
console.log('   - Or press F12 in Steam, check Console tab');
console.log('');
console.log('3. 🎯 Webkit logs (Profile pages):');
console.log('   - Go to any Steam profile page');
console.log('   - Look for green debug overlay in top-right corner');
console.log('   - Or press F12 on profile page, check Console');
console.log('');
console.log('4. 🚀 Quick Start:');
console.log('   a) Build plugin: npm run build');
console.log('   b) Copy to Steam: Copy .millennium/, backend/, static/, plugin.json');
console.log('   c) Restart Steam with console: steam.exe -dev -console');
console.log('   d) Enable plugin in Millennium settings');
console.log('');
console.log('5. 🔍 Troubleshooting:');
console.log('   - If no logs visible: Check if plugin is actually loaded');
console.log('   - If green overlay missing: Check browser console for errors');
console.log('   - If backend silent: Verify Steam started with -console flag');
console.log('');
console.log('Debug complete! 🎯');
