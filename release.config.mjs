export default {
	branches: ['main', 'master'],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/changelog',
			{
				changelogFile: 'CHANGELOG.md',
			},
		],
		[
			'@semantic-release/npm',
			{
				npmPublish: false,
			},
		],
		[
			'@semantic-release/exec',
			{
				prepareCmd:
					'npx tsx scripts/sync-version.ts ${nextRelease.version} && npm run build && mkdir -p release && cp -r .millennium release/ && cp -r backend release/ && cp -r styles release/static && cp plugin.json release/ && cp requirements.txt release/ && cp README.md release/ && cp LICENSE release/ && cd release && zip -r ../csstats-extension-v${nextRelease.version}.zip . && cd .. && rm -rf release',
			},
		],
		[
			'@semantic-release/github',
			{
				assets: [
					{
						path: 'csstats-extension-*.zip',
						label: 'CSStats Extension Plugin (${nextRelease.gitTag})',
					},
				],
			},
		],
		[
			'@semantic-release/git',
			{
				assets: ['package.json', 'plugin.json', 'CHANGELOG.md'],
				message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
	],
};
