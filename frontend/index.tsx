import React from 'react';
import { Millennium, IconsModule, definePlugin, Field, DialogButton } from '@steambrew/client';
import { PluginSettings } from './settings';

class classname {
	static method(country: string, age: number) {
		console.log(`age: ${age}, country: ${country}`);
		return 'method called';
	}
}

// export classname class to global context
Millennium.exposeObj({ classname });

function windowCreated(context: any) {
	// window create event.
	// you can interact directly with the document and monitor it with dom observers
	// you can then render components in specific pages.
	console.log('CSStats Extension: Window created event triggered:', context);
	console.log('CSStats Extension: Current URL:', window.location.href);
}

// Declare a function that exists on the backend
// const backendMethod = callable<[{ message: string; status: boolean; count: number }], boolean>('Backend.receive_frontend_message');

const SettingsContent = () => {
	const [logs, setLogs] = React.useState<string[]>([]);
	const [isLogging, setIsLogging] = React.useState(false);

	const addLog = (message: string) => {
		const timestamp = new Date().toLocaleTimeString();
		const logEntry = `[${timestamp}] ${message}`;
		setLogs((prev) => [...prev.slice(-9), logEntry]); // Keep last 10 logs
		console.log('CSStats Extension:', message);
	};

	React.useEffect(() => {
		addLog('Settings UI loaded');
	}, []);

	const testPlugin = () => {
		setIsLogging(true);
		addLog('Testing plugin functionality...');
		addLog(`Current settings: ${JSON.stringify(PluginSettings)}`);
		addLog('Plugin test completed');
		setIsLogging(false);
	};

	const clearLogs = () => {
		setLogs([]);
		addLog('Logs cleared');
	};

	return (
		<>
			<Field
				label="Plugin Settings"
				description="CSStats.gg Extension configuration and debugging."
				icon={<IconsModule.Settings />}
				bottomSeparator="standard"
				focusable
			>
				<DialogButton onClick={testPlugin} disabled={isLogging}>
					{isLogging ? 'Testing...' : 'Test Plugin'}
				</DialogButton>
			</Field>

			<Field label="Debug Logs" description="Real-time plugin logging for debugging." icon={<IconsModule.Console />} bottomSeparator="standard" focusable>
				<div
					style={{
						backgroundColor: '#1a1a1a',
						color: '#00ff00',
						padding: '10px',
						borderRadius: '5px',
						fontFamily: 'monospace',
						fontSize: '12px',
						maxHeight: '200px',
						overflowY: 'auto',
						border: '1px solid #333',
					}}
				>
					{logs.length === 0 ? (
						<div style={{ color: '#666', fontStyle: 'italic' }}>No logs yet...</div>
					) : (
						logs.map((log, index) => (
							<div key={index} style={{ marginBottom: '2px' }}>
								{log}
							</div>
						))
					)}
				</div>
				<DialogButton onClick={clearLogs} style={{ marginTop: '10px' }}>
					Clear Logs
				</DialogButton>
			</Field>
		</>
	);
};

export default definePlugin(() => {
	console.log('CSStats Extension: Frontend plugin initializing...');

	try {
		PluginSettings.numberTextInput += 1;
		console.log('CSStats Extension: Settings updated:', PluginSettings.numberTextInput);

		// Call the backend method
		// backendMethod({
		// 	message: 'Hello World From Frontend!',
		// 	status: true,
		// 	count: 69,
		// }).then((message) => {
		// 	console.log('Result from callServerMethod:', message);
		// });

		Millennium.AddWindowCreateHook(windowCreated);
		console.log('CSStats Extension: Window create hook registered successfully');

		console.log('CSStats Extension: Frontend plugin initialized successfully');
	} catch (error) {
		console.error('CSStats Extension: Error during frontend initialization:', error);
	}

	return {
		title: 'CSStats Extension',
		icon: <IconsModule.Settings />,
		content: <SettingsContent />,
	};
});
