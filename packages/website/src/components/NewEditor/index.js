import { useEffect, useRef } from 'react';
import sdk from '@stackblitz/sdk';

// Delay before embedding to ensure DOM is ready and prevent race conditions
const EMBED_DELAY_MS = 50;

/**
 * StackBlitz editor component for interactive UI5 Web Components samples.
 *
 * @param {Object} props
 * @param {Array<{name: string, content: string}>} props.files - Array of files to include in the project
 * @param {string} props.mainFile - The main file to highlight (default: "index.js")
 * @param {boolean} props.mainFileSelected - Whether to open mainFile by default (default: false, opens index.html)
 */
export default function NewEditor({ files = [], mainFile = "index.js", mainFileSelected = false }) {
	const editorRef = useRef(null);
	const vmRef = useRef(null);

	useEffect(() => {
		const element = editorRef.current;

		// Ensure element exists and is in the DOM
		if (!element || !document.contains(element)) {
			return;
		}

		// Clear any existing content (important for navigation)
		element.innerHTML = '';

		// Prepare project files from files array
		const projectFiles = {};
		files.forEach(file => {
			projectFiles[file.name] = file.content;
		});

		// Add package.json with UI5 Web Components dependencies
		if (!projectFiles['package.json']) {
			projectFiles['package.json'] = JSON.stringify({
				name: 'ui5-webcomponents-sample',
				version: '1.0.0',
				description: 'UI5 Web Components interactive sample',
				dependencies: {
					"@ui5/webcomponents": "^2.20.0",
					"@ui5/webcomponents-fiori": "^2.20.0",
					"@ui5/webcomponents-icons": "^2.20.0"
				}
			}, null, 2);
		}

		// Add index.js entry point if missing
		if (!projectFiles['index.js']) {
			projectFiles['index.js'] = "";
		}

		// Create project configuration
		const project = {
			title: 'UI5 Web Components Sample',
			description: 'UI5 Web Components interactive sample',
			template: 'javascript',
			dependencies: projectFiles['package.json'] ? JSON.parse(projectFiles['package.json']).dependencies : {},
			files: projectFiles,
			settings: {
				compile: {
					trigger: 'auto',
					clearConsole: false,
				},
			},
		};

		// Track if component is still mounted
		let isMounted = true;

		// Embed StackBlitz with a delay to ensure DOM is ready and prevent race conditions
		const embedTimeout = setTimeout(() => {
			// Double-check element is still valid before embedding
			if (!isMounted || !element || !document.contains(element)) {
				return;
			}

			sdk.embedProject(element, project, {
				forceEmbedLayout: true,
				clickToLoad: false,
				openFile: mainFileSelected ? mainFile : 'index.html',
				view: 'preview',
				theme: 'light',
				height: 600,
				hideNavigation: false,
				hideDevTools: false,
			}).then(vm => {
				if (isMounted) {
					vmRef.current = vm;
				}
			}).catch(err => {
				// Suppress errors during navigation/unmount
				if (isMounted) {
					console.error('StackBlitz embed error:', err);
				}
			});
		}, EMBED_DELAY_MS);

		// Cleanup
		return () => {
			isMounted = false;
			clearTimeout(embedTimeout);

			// Remove the iframe that StackBlitz created
			if (element && document.contains(element)) {
				const iframe = element.querySelector('iframe');
				if (iframe) {
					iframe.remove();
				}
				element.innerHTML = '';
			}

			vmRef.current = null;
		};
	}, [files, mainFile, mainFileSelected]);

	return (
		<div
			ref={editorRef}
			style={{
				width: '100%',
				height: '600px',
				border: '1px solid #ddd',
				borderRadius: '4px',
			}}
		/>
	);
}
