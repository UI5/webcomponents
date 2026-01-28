/**
 * This file is the entrypoint for rollup to correctly bundle the analyzer for the browser.
 * Do not use directly, but import from ./browser/index.js
 */

import ts from 'typescript';

import { create } from './create.js';
import { catalystPlugin } from './features/framework-plugins/catalyst/catalyst.js';
import { catalystPlugin2 } from './features/framework-plugins/catalyst-major-2/catalyst.js';
import { stencilPlugin } from './features/framework-plugins/stencil/stencil.js';
import { litPlugin } from './features/framework-plugins/lit/lit.js';
import { fastPlugin } from './features/framework-plugins/fast/fast.js';

export { 
  ts,
  create,
  catalystPlugin,
  catalystPlugin2,
  stencilPlugin,
  litPlugin,
  fastPlugin
};