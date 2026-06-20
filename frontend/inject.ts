function csstatsInjectMain() {
	if (document.querySelector('.csstats-extension-container')) return;
	if (!/steamcommunity\.com\/(id|profiles)\//.test(location.href)) return;

	const STEAMID64_BASE = BigInt('76561197960265728');

	async function getSteamId() {
		const win = window as any;
		const candidates = [win.g_rgProfileData?.steamid64, win.g_rgProfileData?.steamid];
		for (const v of candidates) {
			if (typeof v === 'string' && v !== '0' && v.trim()) return v.trim();
		}
		const miniId = document.querySelector('[data-miniprofile]')?.getAttribute('data-miniprofile');
		if (miniId && miniId !== '0') {
			try { return (STEAMID64_BASE + BigInt(miniId)).toString(); } catch { /* ignore */ }
		}
		try {
			const xmlUrl = location.href.replace(/[?#].*/, '').replace(/\/$/, '') + '/?xml=1';
			const res = await fetch(xmlUrl);
			const text = await res.text();
			const dom = new DOMParser().parseFromString(text, 'application/xml');
			const id = dom.querySelector('steamID64')?.textContent;
			if (id && id !== '0') return id;
		} catch { /* ignore */ }
		return null;
	}

	async function inject() {
		const col = document.querySelector('.profile_rightcol');
		if (!col || col.querySelector('.csstats-extension-container')) return;
		const steamId = await getSteamId();
		if (!steamId) { console.warn('[CSStats] No SteamID'); return; }

		if (!document.getElementById('csstats-extension-style')) {
			const s = document.createElement('style');
			s.id = 'csstats-extension-style';
			s.textContent = "@import url('https://fonts.googleapis.com/css2?family=Cairo:slnt,wght@11,800&display=swap');.csstats-btn{display:flex;width:100%;height:3rem;align-items:center;justify-content:center;font-size:20px;color:#fff;font-weight:800;font-family:'Cairo',sans-serif;font-variation-settings:'slnt' -11;transition:all .5s cubic-bezier(.23,1,.32,1);text-transform:uppercase;background-color:#1a1a1a;border-radius:5px;cursor:pointer;text-decoration:none;border:none;outline:none;margin:10px 0}.csstats-btn:hover{background-color:#2d3748;text-decoration:none!important}.csstats-btn:hover .stats{color:#eb4b4b}.csstats-btn .stats{transition:all .5s cubic-bezier(.23,1,.32,1);color:#3872fc;display:inline-block}";
			document.head?.appendChild(s);
		}

		const div = document.createElement('div');
		div.className = 'account-row csstats-extension-container';
		const a = document.createElement('a');
		a.href = 'https://csstats.gg/player/' + steamId;
		a.className = 'csstats-btn';
		a.innerHTML = 'CS<span class="stats">stats</span>.gg';
		div.appendChild(a);
		col.insertBefore(div, col.children[1] ?? null);
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

export const INJECTION_CODE = `(${csstatsInjectMain.toString()})()`;
