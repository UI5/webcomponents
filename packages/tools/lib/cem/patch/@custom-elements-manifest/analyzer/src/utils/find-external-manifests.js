import fs from 'fs';
import path from 'path';
import { findDependencies, splitPath } from '@custom-elements-manifest/find-dependencies';

/**
 * @typedef {import('custom-elements-manifest/schema').Package} Package
 */

/**
 * @param {string[]} paths
 * @param {{
 *  nodeModulesDepth?: number,
 *  basePath?: string,
 * }} [options]
 */
export async function findExternalManifests(paths, {basePath = process.cwd(), nodeModulesDepth}) {
  /** @type {Package[]} */
  const cemsToMerge = [];
  const visited = new Set();

  const dependencies = await findDependencies(paths, {basePath, nodeModulesDepth});

  dependencies?.forEach((dependencyPath) => {
    const isCurrentPackageRegex = new RegExp(`^${basePath}\\${path.sep}(?!.*node_modules).*`);
    if (isCurrentPackageRegex.test(dependencyPath)) {
      // Make sure that we do not look for custom-elements.json in our own package
      return;
    }

    const { packageRoot, packageName } = splitPath(dependencyPath);

    if(visited.has(packageName)) return;
    visited.add(packageName);

    const packageJsonPath = `${packageRoot}${path.sep}package.json`;
    const cemPath = `${packageRoot}${path.sep}custom-elements.json`;

    /** Try to find `custom-elements.json` at `node_modules/specifier/custom-elements.json` */
    if(fs.existsSync(cemPath)) {
      try {
        const cem = JSON.parse(fs.readFileSync(cemPath).toString());
        cemsToMerge.push(cem);
        return;
      } catch(e) {
        throw new Error(`Failed to read custom-elements.json at path "${cemPath}". \n\n${e.stack}`);
      }
    }

    /** See if the `package.json` has a `customElements` field or if it has listed `./customElements` in its export map */
    if(fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
      const cemLocation = packageJson?.customElements || packageJson?.exports?.['./customElements'];

      if(cemLocation) {
        try {
          const cemPath = path.resolve(packageRoot, cemLocation);
          const cem = JSON.parse(fs.readFileSync(cemPath).toString());
          cemsToMerge.push(cem);
        } catch(e) {
          throw new Error(`Failed to read custom-elements.json at path "${cemPath}". \n\n${e.stack}`);
        }
      }
    }
  });

  return cemsToMerge;
}
