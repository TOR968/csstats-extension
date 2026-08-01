const STEAMID64_BASE = BigInt('76561197960265728');
const STEAMID64_PATTERN = /^\d{17}$/;
const PROFILE_HOST_PATTERN = /(^|\.)steamcommunity\.com$/;
const PROFILE_PATH_PATTERN = /^\/(id|profiles)\//;

function asSteamId64(value: unknown): string | null {
	const id = typeof value === 'string' ? value.trim() : '';
	return STEAMID64_PATTERN.test(id) ? id : null;
}

async function getSteamId(): Promise<string | null> {
	const win = window as any;
	for (const v of [win.g_rgProfileData?.steamid64, win.g_rgProfileData?.steamid]) {
		const id = asSteamId64(v);
		if (id) return id;
	}
	const miniId = document.querySelector('[data-miniprofile]')?.getAttribute('data-miniprofile');
	if (miniId && /^\d+$/.test(miniId) && miniId !== '0') {
		try {
			const id = asSteamId64((STEAMID64_BASE + BigInt(miniId)).toString());
			if (id) return id;
		} catch { }
	}
	try {
		const xmlUrl = location.href.replace(/[?#].*/, '').replace(/\/$/, '') + '/?xml=1';
		const res = await fetch(xmlUrl);
		const text = await res.text();
		const dom = new DOMParser().parseFromString(text, 'application/xml');
		return asSteamId64(dom.querySelector('steamID64')?.textContent);
	} catch { }
	return null;
}

export function csstatsInjectMain(openExternal: boolean) {
	if (document.querySelector('.csstats-extension-container')) return;
	if (!PROFILE_HOST_PATTERN.test(location.hostname)) return;
	if (!PROFILE_PATH_PATTERN.test(location.pathname)) return;

	async function inject() {
		const col = document.querySelector('.profile_rightcol');
		if (!col || col.querySelector('.csstats-extension-container')) return;

		const div = document.createElement('div');
		div.className = 'account-row csstats-extension-container';
		col.insertBefore(div, col.children[1] ?? null);

		const steamId = await getSteamId();
		if (!steamId) { console.warn('[CSStats] No SteamID'); div.remove(); return; }

		if (!document.getElementById('csstats-extension-style')) {
			const s = document.createElement('style');
			s.id = 'csstats-extension-style';
			s.textContent = "@import url('https://fonts.googleapis.com/css2?family=Cairo:slnt,wght@11,800&display=swap');.csstats-btn{display:flex;width:100%;height:3rem;align-items:center;justify-content:center;font-size:20px;color:#fff;font-weight:800;font-family:'Cairo',sans-serif;font-variation-settings:'slnt' -11;transition:all .5s cubic-bezier(.23,1,.32,1);text-transform:uppercase;background-color:#1a1a1a;border-radius:5px;cursor:pointer;text-decoration:none;border:none;outline:none;margin:10px 0}.csstats-btn:hover{background-color:#2d3748;text-decoration:none!important}.csstats-btn:hover .stats{color:#eb4b4b}.csstats-btn .stats{transition:all .5s cubic-bezier(.23,1,.32,1);color:#3872fc;display:inline-block}";
			document.head?.appendChild(s);
		}

		const profileUrl = 'https://csstats.gg/player/' + encodeURIComponent(steamId);
		const a = document.createElement('a');
		a.href = openExternal ? 'steam://openurl_external/' + profileUrl : profileUrl;
		a.className = 'csstats-btn';
		a.innerHTML = 'CS<span class="stats">stats</span>.gg';
		div.appendChild(a);
	}

	if (document.querySelector('.profile_rightcol')) {
		inject();
	} else {
		const obs = new MutationObserver(() => {
			if (document.querySelector('.profile_rightcol')) {
				obs.disconnect();
				inject();
			}
		});
		obs.observe(document.documentElement, { childList: true, subtree: true });
		setTimeout(() => obs.disconnect(), 15000);
	}
}
