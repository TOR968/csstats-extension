import { useState, useEffect } from 'react';
import { definePlugin, Toggle } from '@steambrew/client';
import { buildInjectionCode } from './inject';
import { initSettings, getSettings, saveSettings, InjectionMode } from './services/settings';

const PROFILE_URL_PATTERN = /steamcommunity\.com\/(id|profiles)\//;
const CONTAINER = '.csstats-extension-container';

type Injector = 'webkit' | 'cdp' | 'none';

const getCDP = () => (window as any).MILLENNIUM_API?.ChromeDevToolsProtocol;

async function evalInTarget(CDP: any, targetId: string, expression: string, params: object = {}) {
	const { sessionId } = (await CDP.send('Target.attachToTarget', { targetId, flatten: true })) ?? {};
	if (!sessionId) return undefined;
	return CDP.send('Runtime.evaluate', { expression, ...params }, sessionId);
}

async function getProfileTargets(CDP: any): Promise<any[]> {
	const { targetInfos } = await CDP.send('Target.getTargets', {});
	return (targetInfos ?? []).filter((t: any) => PROFILE_URL_PATTERN.test(t?.url ?? ''));
}

async function detectActiveInjector(): Promise<Injector> {
	const CDP = getCDP();
	if (!CDP) return 'none';
	try {
		for (const t of await getProfileTargets(CDP)) {
			const res = await evalInTarget(CDP, t.targetId,
				`document.querySelector('${CONTAINER}')?.getAttribute('data-injector') || ''`,
				{ returnByValue: true });
			const val = res?.result?.value;
			if (val === 'webkit' || val === 'cdp') return val;
		}
	} catch (e) {
		console.error('[CSStats] detect injector failed:', e);
	}
	return 'none';
}

let reloadOpenProfiles: () => Promise<void> = async () => {};

async function setupCommunityInjection() {
	const CDP = getCDP();
	if (!CDP) { console.error('[CSStats] No CDP available'); return; }

	await initSettings();
	await CDP.send('Target.setDiscoverTargets', { discover: true });

	const pending = new Map<string, ReturnType<typeof setTimeout>>();

	const injectIntoTarget = (targetId: string) => {
		const { openExternal, injectionMode } = getSettings();
		if (injectionMode === 'webkit') return Promise.resolve(undefined);
		return evalInTarget(CDP, targetId, buildInjectionCode(openExternal), { awaitPromise: true });
	};

	reloadOpenProfiles = async () => {
		for (const t of await getProfileTargets(CDP)) {
			try { await evalInTarget(CDP, t.targetId, 'location.reload()'); }
			catch (e) { console.error('[CSStats] reload error:', e); }
		}
	};

	const processTarget = (targetInfo: any) => {
		if (!PROFILE_URL_PATTERN.test(targetInfo?.url ?? '')) return;
		const targetId: string = targetInfo.targetId;
		clearTimeout(pending.get(targetId));
		pending.set(targetId, setTimeout(() => {
			pending.delete(targetId);
			injectIntoTarget(targetId).catch((e: any) => console.error('[CSStats] injection error:', e));
		}, 200));
	};

	CDP.on('Target.targetCreated', (e: any) => processTarget(e?.targetInfo));
	CDP.on('Target.targetInfoChanged', (e: any) => processTarget(e?.targetInfo));

	for (const t of await getProfileTargets(CDP)) processTarget(t);
}

const CSStatsIcon = () => (
	<div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontFamily: 'sans-serif' }}>
		CS<span style={{ color: '#3872fc' }}>stats</span>
	</div>
);

const INJECTOR_INFO: Record<Injector | 'loading', { label: string; color: string }> = {
	loading: { label: 'Detecting…', color: '#7a8b9a' },
	webkit: { label: 'Webkit (native)', color: '#5ba32b' },
	cdp: { label: 'CDP (fallback)', color: '#e0a526' },
	none: { label: 'Unknown — open a profile page', color: '#7a8b9a' },
};

const InjectorBadge = ({ status }: { status: Injector | 'loading' }) => {
	const info = INJECTOR_INFO[status];
	return (
		<div style={{
			display: 'flex', alignItems: 'center', gap: '10px',
			padding: '10px 12px', marginBottom: '14px', borderRadius: '6px',
			background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${info.color}`,
		}}>
			<span style={{
				width: '8px', height: '8px', borderRadius: '50%',
				background: info.color, boxShadow: `0 0 6px ${info.color}`, flexShrink: 0,
			}} />
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.06em', color: '#8f98a0' }}>Active injection mode</span>
				<span style={{ fontWeight: 'bold', color: info.color }}>{info.label}</span>
			</div>
		</div>
	);
};

const MODES: { value: InjectionMode; label: string }[] = [
	{ value: 'auto', label: 'Auto' },
	{ value: 'webkit', label: 'Webkit' },
	{ value: 'cdp', label: 'CDP' },
];

const ModeSelector = ({ mode, onSelect }: { mode: InjectionMode; onSelect: (m: InjectionMode) => void }) => (
	<div style={{ display: 'flex', gap: '6px' }}>
		{MODES.map(m => {
			const active = mode === m.value;
			return (
				<button key={m.value} onClick={() => onSelect(m.value)} style={{
					flex: 1, padding: '8px 0', borderRadius: '4px', border: 'none', cursor: 'pointer',
					fontWeight: 'bold', fontSize: '13px',
					background: active ? '#a99cf5' : 'rgba(255,255,255,0.06)',
					color: active ? '#1a1a1a' : '#cfd3d8',
				}}>{m.label}</button>
			);
		})}
	</div>
);

const Settings = () => {
	const [openExternal, setOpenExternal] = useState<boolean>(getSettings().openExternal);
	const [mode, setMode] = useState<InjectionMode>(getSettings().injectionMode);
	const [injector, setInjector] = useState<Injector | 'loading'>('loading');
	useEffect(() => { void detectActiveInjector().then(setInjector); }, []);

	const onToggle = (checked: boolean) => {
		setOpenExternal(checked);
		void saveSettings({ ...getSettings(), openExternal: checked }).then(() => reloadOpenProfiles());
	};
	const onMode = (m: InjectionMode) => {
		setMode(m);
		void saveSettings({ ...getSettings(), injectionMode: m }).then(() => reloadOpenProfiles());
	};

	return (
		<div style={{ padding: '16px' }}>
			<InjectorBadge status={injector} />

			<div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Injection mode</div>
			<ModeSelector mode={mode} onSelect={onMode} />
			<div style={{ fontSize: '12px', lineHeight: '1.4', color: '#969696', margin: '6px 0 16px' }}>
				Auto uses whichever path loads first. Webkit or CDP forces that path only.
			</div>

			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
				<span style={{ fontWeight: 'bold' }}>Open in external browser</span>
				<Toggle value={openExternal} onChange={onToggle} />
			</div>
			<div style={{ fontSize: '12px', lineHeight: '1.4', color: '#969696' }}>
				Open CSStats.gg in your system browser instead of Steam's built-in browser. Open profile pages reload automatically when you change this.
			</div>
		</div>
	);
};

export default definePlugin(() => {
	setupCommunityInjection().catch(e => console.error('[CSStats] setup error:', e));
	return { name: 'csstats-extension', title: 'CSStats.gg Extension', icon: <CSStatsIcon />, content: <Settings /> };
});
