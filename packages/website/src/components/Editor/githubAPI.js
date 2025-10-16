/**
 * GitHub API utility functions for the playground
 */

const NETLIFY_BASE_URL = "https://ui5-webc-playground-server.netlify.app/.netlify/functions";

export const fetchAuthUrl = async () => {
	const response = await fetch(`${NETLIFY_BASE_URL}/github-auth-url`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error(`failed to get oauth url: ${response.status}`);
	}

	return response.json();
};

export const exchangeCodeForToken = async (code, state) => {
	const response = await fetch(`${NETLIFY_BASE_URL}/github-token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ code, state })
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `token exchange failed: ${response.status}`);
	}

	return response.json();
};

export const createGist = async (token, files, description = "ui5 web components playground example") => {
	const response = await fetch(`${NETLIFY_BASE_URL}/github-create-gist`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({ files, description })
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `server error: ${response.status}`);
	}

	return response.json();
};

/**
 * Load and convert gist files to playground format
 */
export const loadGist = async (gistId) => {
	try {
		console.log(`loading gist: ${gistId}`);
		const response = await fetch(`${NETLIFY_BASE_URL}/github-get-gist?id=${gistId}`, {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`failed to load gist: ${response.status}`);
		}

		const gist = await response.json();
		console.log(`gist loaded: ${gist.description}`, Object.keys(gist.files));
		
		// convert gist files to playground format 
		const playgroundFiles = {};
		Object.keys(gist.files).forEach(filename => {
			const gistFile = gist.files[filename];
			playgroundFiles[filename] = {
			name: filename,
			content: gistFile.content,
			hidden: filename === 'playground-support.js'
			};
		});
		
		console.log('converted playground files:', Object.keys(playgroundFiles));
		return playgroundFiles;
	} catch (error) {
		console.error('failed to load gist:', error);
		throw error;
	}
};
