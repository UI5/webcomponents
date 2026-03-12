import { useEffect, useRef } from 'react';
import sdk from '@stackblitz/sdk';

export default function NewEditor({ files = [], mainFile = "main.js", standalone = false, mainFileSelected = false }) {
	const editorRef = useRef(null);
	const vmRef = useRef(null);

	useEffect(() => {
		if (!editorRef.current) return;

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
					"@ui5/webcomponents-icons": "^2.20.0"
				}
			}, null, 2);
		}

		// Add package.json with UI5 Web Components dependencies
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

		// Embed StackBlitz
		sdk.embedProject(editorRef.current, project, {
			forceEmbedLayout: true,
			clickToLoad: false,
			openFile: mainFileSelected ? mainFile : 'index.html',
			view: 'preview',
			theme: 'light',
			height: 600,
			hideNavigation: false,
			hideDevTools: false,
		}).then(vm => {
			vmRef.current = vm;
		});

		// Cleanup
		return () => {
			if (vmRef.current) {
				vmRef.current = null;
			}
		};
	}, [files, mainFile, mainFileSelected]);

	return (
		<div
			ref={editorRef}
			style={{
				width: '100%',
				height: standalone ? '100vh' : '600px',
				border: '1px solid #ddd',
				borderRadius: '4px',
			}}
		/>
	);
}
