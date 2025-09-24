import fs from "fs/promises";
import path from "path";
import ignore from "ignore";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------
// FNV-1a 32-bit hash
// -------------------
function fnv1aHash(str) {
	let hash = 0x811c9dc5;
	for (let i = 0; i < str.length; i++) {
		hash ^= str.charCodeAt(i);
		hash = (hash * 0x01000193) >>> 0;
	}
	return hash.toString(16);
}

async function findGitignoreFiles(startDir) {
	const gitignores = [];
	let currentDir = path.resolve(startDir);
	while (true) {
		const candidate = path.join(currentDir, ".gitignore");
		try {
			await fs.access(candidate);
			gitignores.push(candidate);
		} catch { }
		const parentDir = path.dirname(currentDir);
		if (parentDir === currentDir) break;
		currentDir = parentDir;
	}
	return gitignores;
}

async function loadIgnoreRules(dir) {
	const files = await findGitignoreFiles(dir);
	const ig = ignore();
	for (const file of files) {
		const content = await fs.readFile(file, "utf8");
		ig.add(content);
	}
	return ig;
}

async function walkDir(dir, ig, baseDir) {
	const results = [];
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const absPath = path.join(dir, entry.name);
		let relPath = path.relative(baseDir, absPath).replace(/\\/g, "/"); // normalize for .gitignore

		if (ig.ignores(relPath) || relPath.startsWith("dist/")) continue;

		if (entry.isDirectory()) {
			results.push(...await walkDir(absPath, ig, baseDir));
		} else {
			results.push(relPath);
		}
	}
	return results;
}

// Hash file content + mtime
async function hashFile(filePath) {
	const stat = await fs.stat(filePath);
	const content = await fs.readFile(filePath, "utf8");
	return fnv1aHash(String(stat.mtimeMs) + content);
}

function getRepoName(repoPath) {
	return repoPath.split("/").pop();
}

async function computeHashes(repoPath, ig) {
	const files = await walkDir(repoPath, ig, repoPath);
	const hashEntries = await Promise.all(
		files.map(async (file) => {
			const absPath = path.join(repoPath, file);
			const hash = await hashFile(absPath);
			return [path.relative(process.cwd(), absPath), hash];
		})
	);
	return Object.fromEntries(hashEntries);
}

async function saveHashes(repoPath, ig) {
	const distPath = path.join(repoPath, "dist");
	await fs.mkdir(distPath, { recursive: true });
	const ui5iconsHashPath = path.join(distPath, ".ui5iconsHash");

	// Cache the hashes for both the icons and tools packages, since the output depends on the content of both.
	const hashes = {
		...(await computeHashes(repoPath, ig)),
		...(await computeHashes(path.resolve(__dirname, "../../"), ig)),
	};

	await fs.writeFile(ui5iconsHashPath, JSON.stringify(hashes, null, 2), "utf8");
	console.log(`Saved build hashes for the ${getRepoName(repoPath)} package.`);
}

async function checkHashes(repoPath, ig) {
	const ui5iconsHashPath = path.join(repoPath, "dist", ".ui5iconsHash");
	let oldHashes = {};
	try {
		const raw = await fs.readFile(ui5iconsHashPath, "utf8");
		oldHashes = JSON.parse(raw);
	} catch {
		console.log(`No build hashes found for the ${getRepoName(repoPath)} package. Building it now.`);
		process.exit(1);
	}

	// Compare the hashes for both the icons and tools packages, since the output depends on the content of both.
	const newHashes = {
		...(await computeHashes(repoPath, ig)),
		...(await computeHashes(path.resolve(__dirname, "../../"), ig)),
	};

	let changed = false;
	for (const file of new Set([...Object.keys(oldHashes), ...Object.keys(newHashes)])) {
		if (oldHashes[file] !== newHashes[file]) {
			changed = true;
		}
	}

	if (!changed) {
		console.log(`No changes detected in the ${getRepoName(repoPath)} package.`);
	} else {
		console.log(`Changes detected in the ${getRepoName(repoPath)} package. Rebuilding it.`);
		process.exit(1);
	}
}

async function main() {
	const mode = process.argv[2];
	if (!["save", "check"].includes(mode)) {
		throw new Error("Usage: node hashes.js <save|check>");
	}

	const repoPath = process.cwd();
	const ig = await loadIgnoreRules(repoPath);

	if (mode === "save") await saveHashes(repoPath, ig);
	if (mode === "check") await checkHashes(repoPath, ig);
}

main().catch(console.error);
