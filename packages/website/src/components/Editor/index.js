import NewEditor from '../NewEditor';

export default function Editor({ html, js, css, react, mainFile = "main.js", canShare = false, standalone = false, mainFileSelected = false }) {
	// Convert old format (html, js, css, react) to new format (files array)
	const files = [];

	if (html) {
		files.push({ name: 'index.html', content: html });
	}

	if (js) {
		files.push({ name: "index.js", content: js });
	}

	if (css) {
		files.push({ name: 'index.css', content: css });
	}

	if (react) {
		files.push({ name: 'App.jsx', content: react });
	}

	// Proxy to NewEditor with converted files
	return <NewEditor files={files} />;
}
