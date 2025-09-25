import { fetchGist } from "./githubAPI.js";

/**
 * Extract gist ID from URL hash
 */
export const getGistIdFromURL = () => {
	if (!location.pathname.includes("/play")) {
		return null;
	}

	// check for gist id in hash, f.e: #gist=e16211951641a1197026a3f9cfb2965d
	const hash = location.hash;
	if (hash.startsWith("#gist=")) {
		return hash.substring(6); // remove "#gist=" prefix
	}

	return null;
};

/**
 * Copy text to clipboard with fallback
 */
export const copyToClipboard = async (text) => {
	await navigator.clipboard.writeText(text);
};
