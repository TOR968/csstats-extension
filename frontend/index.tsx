import { definePlugin } from '@steambrew/client';
import { INJECTION_CODE } from './inject';

const PROFILE_URL_PATTERN = /steamcommunity\.com\/(id|profiles)\//;

async function setupCommunityInjection() {
	const CDP = (window as any).MILLENNIUM_API?.ChromeDevToolsProtocol;
	if (!CDP) { console.error('[CSStats] No CDP available'); return; }

	await CDP.send('Target.setDiscoverTargets', { discover: true });

	const pending = new Map<string, ReturnType<typeof setTimeout>>();

	const injectIntoTarget = async (targetId: string) => {
		const res = await CDP.send('Target.attachToTarget', { targetId, flatten: true });
		const sessionId = res?.sessionId;
		if (!sessionId) return;
		await CDP.send('Runtime.evaluate', { expression: INJECTION_CODE, awaitPromise: true }, sessionId);
	};

	const processTarget = (targetInfo: any) => {
		const url: string = targetInfo?.url ?? '';
		if (!PROFILE_URL_PATTERN.test(url)) return;
		const targetId: string = targetInfo.targetId;
		clearTimeout(pending.get(targetId));
		pending.set(targetId, setTimeout(() => {
			pending.delete(targetId);
			injectIntoTarget(targetId).catch(e => console.error('[CSStats] injection error:', e));
		}, 200));
	};

	CDP.on('Target.targetCreated', (e: any) => processTarget(e?.targetInfo));
	CDP.on('Target.targetInfoChanged', (e: any) => processTarget(e?.targetInfo));

	const { targetInfos } = await CDP.send('Target.getTargets', {});
	for (const t of targetInfos ?? []) processTarget(t);
}

const CSStatsIcon = () => (
	<div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontFamily: 'sans-serif' }}>
		CS<span style={{ color: '#3872fc' }}>stats</span>
	</div>
);

export default definePlugin(() => {
	setupCommunityInjection().catch(e => console.error('[CSStats] setup error:', e));
	return { name: 'csstats-extension', title: 'CSStats.gg Extension', icon: <CSStatsIcon /> };
});
