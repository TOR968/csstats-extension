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
	return (
		<Field label="Plugin Settings" description="This is a description of the plugin settings." icon={<IconsModule.Settings />} bottomSeparator="standard" focusable>
			<DialogButton
				onClick={() => {
					console.log('Button clicked!');
				}}
			>
				Click Me
			</DialogButton>
		</Field>
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
