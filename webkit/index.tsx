/**
 * You have a limited version of the Millennium API available to you in the webkit context.
 */
type Millennium = {
	callServerMethod: (methodName: string, kwargs?: any) => Promise<any>;
	findElement: (privateDocument: Document, querySelector: string, timeOut?: number) => Promise<NodeListOf<Element>>;
};

declare const Millennium: Millennium;

export default async function WebkitMain() {
	try {
		console.log('CSStats.gg webkit module loading...');

		// Check if Millennium API is available
		if (typeof Millennium === 'undefined') {
			console.error('CSStats.gg: Millennium API not available in webkit context');
			return;
		}

		console.log('CSStats.gg webkit module loaded successfully.');

		const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:slnt,wght@11,800&display=swap');

        .csstats-btn {
            display: flex;
            width: 100%;
            height: 3rem;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #FFF;
            font-weight: 800;
            font-family: 'Cairo', sans-serif;
            font-variation-settings: "slnt" -11;
            transition: all 0.5s cubic-bezier(.23, 1, .32, 1);
            text-transform: uppercase;
            background-color: #1a1a1a;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            border: none;
            outline: none;
        }

        .csstats-btn:hover {
            background-color: #2d3748;
            text-decoration: none !important;
        }

        .csstats-btn:hover .stats {
            color: #EB4B4B;
        }

        .csstats-btn .stats {
            transition: all 0.5s cubic-bezier(.23, 1, .32, 1);
            color: #3872FC;
            display: inline-block;
        }`;

		const styleSheet = document.createElement('style');
		styleSheet.innerText = styles;
		document.head.appendChild(styleSheet);
		console.log('CSStats.gg: Styles injected successfully');

		const rightCol = await Millennium.findElement(document, '.profile_rightcol');
		console.log(`CSStats.gg: Found ${rightCol.length} profile_rightcol elements`);

		if (rightCol.length > 0) {
			const parser = new DOMParser();
			const profileUrl = `${window.location.href}/?xml=1`;
			console.log(`CSStats.gg: Fetching profile data from ${profileUrl}`);

			const profileResponse = await fetch(profileUrl);
			if (!profileResponse.ok) {
				console.error(`CSStats.gg: Failed to fetch profile data: ${profileResponse.status} ${profileResponse.statusText}`);
				return;
			}

			const profileXmlText = await profileResponse.text();
			const profileXmlDoc = parser.parseFromString(profileXmlText, 'application/xml');

			const steamID64 = profileXmlDoc.querySelector('steamID64')?.textContent || '0';
			console.log(`CSStats.gg: Extracted SteamID64: ${steamID64}`);

			if (!steamID64 || steamID64 === '0') {
				console.error('CSStats.gg: Could not parse steamID64 from URL.');
				return;
			}

			const statsContainer = document.createElement('div');
			statsContainer.className = 'account-row';

			const button = document.createElement('div');
			button.className = 'csstats-btn';
			button.innerHTML = 'CS<span class="stats">stats</span>.gg';
			button.onclick = () => {
				window.open(`https://csstats.gg/player/${steamID64}`, '_self', 'noopener,noreferrer');
			};

			statsContainer.appendChild(button);
			rightCol[0].insertBefore(statsContainer, rightCol[0].children[1]);
			console.log('CSStats.gg: Button successfully added to profile');
		} else {
			console.error('CSStats.gg: Parent container ".profile_rightcol" not found');
		}
	} catch (error) {
		console.error('CSStats.gg: Error in WebkitMain:', error);
		console.error('CSStats.gg: Stack trace:', error.stack);
	}
}
