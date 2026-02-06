import { readFileSync } from 'fs';

const version = process.argv[2];
if (!version) {
    console.error('Usage: node extractChangelog.mjs <version>');
    process.exit(1);
}

const changelog = readFileSync('CHANGELOG.md', 'utf8');
const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(`^# \\[${escapedVersion}\\].*?\\n([\\s\\S]*?)(?=^# \\[|$)`, 'm');
const match = changelog.match(regex);

if (match) {
    console.log(match[1].trim());
} else {
    console.log(`Release v${version}`);
}
