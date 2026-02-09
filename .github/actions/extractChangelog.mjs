import { promises as fs } from 'node:fs';

/**
 * Extracts the changelog section for a specific version from CHANGELOG.md
 * @param {string} changelog - The full changelog content
 * @param {string} version - The version to extract (e.g., "2.19.0")
 * @returns {string} The changelog section for that version
 */
const extractVersionChangelog = (changelog, version) => {
	const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const regex = new RegExp(`^# \\[${escapedVersion}\\].*?\\n([\\s\\S]*?)(?=^# \\[|$)`, 'm');
	const match = changelog.match(regex);

	if (match) {
		return match[1].trim();
	}

	return `Release v${version}`;
};

export default async function run() {
	const lerna = await fs.readFile(new URL('../../lerna.json', import.meta.url), 'utf8');
	const { version } = JSON.parse(lerna);

	try {
		const changelog = await fs.readFile(new URL('../../CHANGELOG.md', import.meta.url), 'utf8');
		const body = extractVersionChangelog(changelog, version);

		console.log(body);
		return body;
	} catch (error) {
		console.error('Error extracting changelog:', error);
		return `Release v${version}`;
	}
}
