#!/usr/bin/env node

/**
 * Debug script to test plugin logging functionality
 * Run with: node scripts/debug-logs.js
 */

import fs from 'fs';
import path from 'path';

const debugInfo = {
  timestamp: new Date().toISOString(),
  message: 'CSStats Extension Debug Test',
  status: 'running'
};

console.log('🔍 CSStats Extension Debug Information:');
console.log('=====================================');
console.log(`Timestamp: ${debugInfo.timestamp}`);
console.log(`Message: ${debugInfo.message}`);
console.log(`Status: ${debugInfo.status}`);
console.log('');

console.log('📁 Plugin Structure Check:');
console.log('==========================');

const checkFiles = [
  'backend/main.py',
  'backend/logger.py', 
  'frontend/index.tsx',
  'webkit/index.tsx',
  'plugin.json'
];

checkFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

console.log('');
console.log('🔧 Logging Tips:');
console.log('================');
console.log('1. Backend logs: Check Millennium console for "CSStats Extension:" messages');
console.log('2. Frontend logs: Press F12 in Steam, check Console tab');
console.log('3. Webkit logs: Press F12 on Steam profile pages, look for "CSStats.gg:" messages');
console.log('4. Build plugin: npm run build');
console.log('5. Test package: npm run package');
console.log('');
console.log('Debug complete! 🎯');