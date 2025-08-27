/**
 * You have a limited version of the Millennium API available to you in the webkit context.
 */
type Millennium = {
	callServerMethod: (methodName: string, kwargs?: any) => Promise<any>;
	findElement: (privateDocument: Document, querySelector: string, timeOut?: number) => Promise<NodeListOf<Element>>;
};

declare const Millennium: Millennium;

export default async function WebkitMain() {
	const debugMode = true; // Set to false to disable debug overlay
	
	let debugContainer: HTMLElement | null = null;
	
	function createDebugOverlay() {
		if (!debugMode) return;
		
		// Remove existing debug container
		const existing = document.getElementById('csstats-debug');
		if (existing) existing.remove();
		
		debugContainer = document.createElement('div');
		debugContainer.id = 'csstats-debug';
		debugContainer.style.cssText = `
			position: fixed;
			top: 10px;
			right: 10px;
			width: 300px;
			max-height: 200px;
			background-color: rgba(0, 0, 0, 0.9);
			color: #00ff00;
			font-family: monospace;
			font-size: 11px;
			padding: 10px;
			border-radius: 5px;
			border: 1px solid #333;
			overflow-y: auto;
			z-index: 999999;
			pointer-events: none;
		`;
		document.body.appendChild(debugContainer);
	}
	
	function addDebugLog(message: string) {
		const timestamp = new Date().toLocaleTimeString();
		const logMessage = `[${timestamp}] CSStats: ${message}`;
		
		console.log(logMessage);
		
		if (debugContainer && debugMode) {
			const logElement = document.createElement('div');
			logElement.textContent = logMessage;
			logElement.style.marginBottom = '2px';
			debugContainer.appendChild(logElement);
			
			// Keep only last 10 logs
			while (debugContainer.children.length > 10) {
				debugContainer.removeChild(debugContainer.firstChild!);
			}
			
			// Auto scroll to bottom
			debugContainer.scrollTop = debugContainer.scrollHeight;
		}
	}

	try {
		createDebugOverlay();
		addDebugLog('CSStats.gg webkit module loading...');

		// Check if Millennium API is available
		if (typeof Millennium === 'undefined') {
			addDebugLog('ERROR: Millennium API not available in webkit context');
			return;
		}

		addDebugLog('Millennium API available, proceeding...');
		addDebugLog('Current URL: ' + window.location.href);

		const styles = `
        .csstats-btn {
            background-color: #1a1a1a;
            border-radius: 5px;
            padding: 8px 12px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            color: #ffffff;
            font-family: 'Motiva Sans', sans-serif;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .csstats-btn:hover {
            background-color: #2d3748;
            border-color: #4a5568;
        }
    `;

		const styleSheet = document.createElement('style');
		styleSheet.innerText = styles;
		document.head.appendChild(styleSheet);
		addDebugLog('Styles injected successfully');

		const rightCol = await Millennium.findElement(document, '.profile_rightcol');
		addDebugLog(`Found ${rightCol.length} profile_rightcol elements`);

		if (rightCol.length > 0) {
			const parser = new DOMParser();
			const profileUrl = `${window.location.href}/?xml=1`;
			addDebugLog(`Fetching profile data from ${profileUrl}`);

			const profileResponse = await fetch(profileUrl);
			if (!profileResponse.ok) {
				addDebugLog(`ERROR: Failed to fetch profile data: ${profileResponse.status} ${profileResponse.statusText}`);
				return;
			}

			const profileXmlText = await profileResponse.text();
			const profileXmlDoc = parser.parseFromString(profileXmlText, 'application/xml');

			const steamID64 = profileXmlDoc.querySelector('steamID64')?.textContent || '0';
			addDebugLog(`Extracted SteamID64: ${steamID64}`);

			if (!steamID64 || steamID64 === '0') {
				addDebugLog('ERROR: Could not parse steamID64 from URL');
				return;
			}

			const statsContainer = document.createElement('div');
			statsContainer.className = 'account-row';

			const button = document.createElement('div');
			button.className = 'csstats-btn';
			button.innerHTML = '🎯 CSStats.gg';
			button.onclick = () => {
				addDebugLog(`Opening CSStats for SteamID: ${steamID64}`);
				window.open(`https://csstats.gg/player/${steamID64}`, '_self', 'noopener,noreferrer');
			};

			statsContainer.appendChild(button);
			rightCol[0].insertBefore(statsContainer, rightCol[0].children[1]);
			addDebugLog('Button successfully added to profile');
		} else {
			addDebugLog('ERROR: Parent container ".profile_rightcol" not found');
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		addDebugLog(`FATAL ERROR: ${errorMessage}`);
		if (error instanceof Error && error.stack) {
			addDebugLog(`Stack trace: ${error.stack}`);
		}
		console.error('CSStats.gg: Error in WebkitMain:', error);
	}
}
