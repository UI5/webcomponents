import { readConfig, ConfigLoaderError } from '@web/config-loader';
import fs from 'fs';
import path from 'path';
import commandLineArgs from 'command-line-args';
import { has } from './index.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { version } = require('../../package.json');

const IGNORE = [
  '!node_modules/**/*.*',
  '!bower_components/**/*.*',
  '!**/*.test.{js,ts}',
  '!**/*.suite.{js,ts}',
  '!**/*.config.{js,ts}',
  '!**/*.d.ts',
];

export function mergeGlobsAndExcludes(defaults, userConfig, cliConfig) {
  const hasProvidedCliGlobs = has(cliConfig?.globs) || has(userConfig?.globs);

  if(hasProvidedCliGlobs) {
    defaults.globs = defaults.globs.filter(glob => glob !== '**/*.{js,ts,tsx}');
  }

  const merged = [
    ...defaults.globs,
    ...(userConfig?.globs || []),
    ...(cliConfig?.globs || []),
    ...(userConfig?.exclude?.map((i) => `!${i}`) || []),
    ...(cliConfig?.exclude?.map((i) => `!${i}`) || []),
    ...IGNORE,
  ];

  return merged;
}

export async function getUserConfig(configPath, cwd) {
  let userConfig = {};
  try {
    userConfig = await readConfig('custom-elements-manifest.config', configPath, cwd);
  } catch (error) {
    if (error instanceof ConfigLoaderError) {
      console.error(error.message);
      return;
    }
    console.error(error);
    return;
  }
  return userConfig || {};
}

export const DEFAULTS = {
  outdir: '',
  globs: ['**/*.{js,ts,tsx}'],
  dev: false,
  quiet: false,
  packagejson: true,
  watch: false,
  litelement: false,
  stencil: false,
  fast: false,
  catalyst: false,
  'catalyst-major-2': false,
}

export function getCliConfig(argv) {
  const optionDefinitions = [
    { name: 'config', type: String},
    { name: 'globs', type: String, multiple: true },
    { name: 'exclude', type: String, multiple: true },
    { name: 'outdir', type: String },
    { name: 'dev', type: Boolean },
    { name: 'quiet', type: Boolean },
    { name: 'dependencies', type: Boolean },
    { name: 'packagejson', type: Boolean },
    { name: 'watch', type: Boolean },
    { name: 'litelement', type: Boolean },
    { name: 'stencil', type: Boolean },
    { name: 'fast', type: Boolean },
    { name: 'catalyst', type: Boolean },
    { name: 'catalyst-major-2', type: Boolean },
  ];

  return commandLineArgs(optionDefinitions, { argv });
}

export async function addFrameworkPlugins(mergedOptions) {
  let plugins = [];
  if(mergedOptions?.litelement) {
    const { litPlugin } = await import('../features/framework-plugins/lit/lit.js');
    plugins = [...(litPlugin() || [])]
  }

  if(mergedOptions?.fast) {
    const { fastPlugin } = await import('../features/framework-plugins/fast/fast.js');
    plugins = [...(fastPlugin() || [])]
  }

  if(mergedOptions?.stencil) {
    const { stencilPlugin } = await import('../features/framework-plugins/stencil/stencil.js');
    plugins.push(stencilPlugin());
  }

  if(mergedOptions?.catalyst) {
    const { catalystPlugin } = await import('../features/framework-plugins/catalyst/catalyst.js');
    plugins = [...(catalystPlugin() || [])]
  }

  if(mergedOptions?.['catalyst-major-2']) {
    const { catalystPlugin2 } = await import('../features/framework-plugins/catalyst-major-2/catalyst.js');
    plugins = [...(catalystPlugin2() || [])]
  }

  return plugins;
}

export function timestamp() {
  const date = new Date();
  return date.toLocaleTimeString();
}

export function addCustomElementsPropertyToPackageJson(outdir) {
  const packageJsonPath = `${process.cwd()}${path.sep}package.json`;
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
  const manifestPath = path.posix.join(outdir, 'custom-elements.json');
  if(packageJson?.customElements) {
    if(packageJson?.customElements !== manifestPath) {
      packageJson.customElements = manifestPath;
      fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
    }
    return;
  } else {
    packageJson.customElements = manifestPath;
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  }
}

export const MENU = `
@custom-elements-manifest/analyzer (${version})

Available commands:
    | Command/option     | Type       | Description                                                 | Example                                                 |
    | ------------------ | ---------- | ----------------------------------------------------------- | ------------------------------------------------------- |
    | analyze            |            | Analyze your components                                     |                                                         |
    | --config           | string     | Path to custom config location                              | \`--config "../custom-elements-manifest.config.js"\`    |
    | --globs            | string[]   | Globs to analyze                                            | \`--globs "foo.js"\`                                    |
    | --exclude          | string[]   | Globs to exclude                                            | \`--exclude "foo.js"\`                                  |
    | --outdir           | string     | Directory to output the Manifest to                         | \`--outdir dist\`                                       |
    | --dependencies     | boolean    | Include third party custom elements manifests               | \`--dependencies\`                                      |
    | --packagejson      | boolean    | Output CEM path to \`package.json\`, defaults to true       | \`--packagejson\`                                       |
    | --watch            | boolean    | Enables watch mode, generates a new manifest on file change | \`--watch\`                                             |
    | --dev              | boolean    | Enables extra logging for debugging                         | \`--dev\`                                               |
    | --quiet            | boolean    | Hides all logging                                           | \`--quiet\`                                             |
    | --litelement       | boolean    | Enable special handling for LitElement syntax               | \`--litelement\`                                        |
    | --fast             | boolean    | Enable special handling for FASTElement syntax              | \`--fast\`                                              |
    | --stencil          | boolean    | Enable special handling for Stencil syntax                  | \`--stencil\`                                           |
    | --catalyst         | boolean    | Enable special handling for Catalyst syntax                 | \`--catalyst\`                                          |
    | --catalyst-major-2 | boolean    | Enable special handling for Catalyst syntax ^2.0.0          | \`--catalyst-major-2\`                                  |

Examples:
    custom-elements-manifest analyze --litelement --globs "**/*.js" --exclude "foo.js" "bar.js"
`