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
				prepareCmd: 'node scripts/sync-version.js ${nextRelease.version}',
			},
		],
		[
			'@semantic-release/github',
			{
				assets: [
					{
						path: 'csstats-extension-*.zip',
						label: 'Plugin Package (${nextRelease.gitTag})',
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
