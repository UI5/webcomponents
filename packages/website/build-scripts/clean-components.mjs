/**
 * Deletes all generated files from docs/components/{package} folders
 * while preserving the hand-authored samples.json files.
 */
import { rimraf } from "rimraf";
import { readdirSync } from "fs";
import path from "path";

const packages = ["fiori", "main", "compat", "ai"];

for (const pkg of packages) {
    const dir = `./docs/components/${pkg}`;
    const entries = readdirSync(dir).filter(f => f !== "samples.json");
    await rimraf(entries.map(f => path.join(dir, f)));
}
