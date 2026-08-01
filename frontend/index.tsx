import { useState } from 'react';
import { definePlugin, ToggleField } from '@steambrew/client';
import { initSettings, getSettings, saveSettings } from './services/settings';

const CSStatsIcon = () => (
	<div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontFamily: 'sans-serif' }}>
		CS<span style={{ color: '#3872fc' }}>stats</span>
	</div>
);

const Settings = () => {
	const [openExternal, setOpenExternal] = useState<boolean>(getSettings().openExternal);

	const onToggle = async (checked: boolean) => {
		setOpenExternal(checked);
		await saveSettings({ ...getSettings(), openExternal: checked });
		setOpenExternal(getSettings().openExternal);
	};

	return (
		<ToggleField
			label="Open in external browser"
			description="Open CSStats.gg in your system browser instead of Steam's built-in browser. Useful when the target site is behind Cloudflare, which can block the in-app browser. Reopen profile pages to apply changes."
			checked={openExternal}
			onChange={onToggle}
		/>
	);
};

export default definePlugin(async () => {
	await initSettings();
	return { name: 'csstats-extension', title: 'CSStats.gg Extension', icon: <CSStatsIcon />, content: <Settings /> };
});
