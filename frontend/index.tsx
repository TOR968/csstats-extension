import { definePlugin } from '@steambrew/client';

export default definePlugin(() => {
	console.log('CSStats Extension: Frontend plugin initializing...');

	const icon = window.SP_REACT.createElement('div', null, 'CSStats.gg');

	return {
		icon,
		onDismount() {
			console.log('CSStats Extension: Frontend plugin dismounted...');
		},
	};
});
