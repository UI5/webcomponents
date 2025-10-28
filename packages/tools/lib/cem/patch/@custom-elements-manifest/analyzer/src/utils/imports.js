import { has } from './index.js';

/**
 * UTILITIES RELATED TO MODULE IMPORTS
 */

/** @example import defaultExport from 'foo'; */
export function hasDefaultImport(node) {
  return !!node?.importClause?.name;
}

/** @example import {namedA, namedB} from 'foo'; */
export function hasNamedImport(node) {
  return has(node?.importClause?.namedBindings?.elements);
}

/** @example import * as name from './my-module.js'; */
export function hasAggregatingImport(node) {
  return !!node?.importClause?.namedBindings?.name && !hasNamedImport(node);
}

/** @example import './my-module.js'; */
export function hasSideEffectImport(node) {
  return 'importClause' in node && node.importClause == null;
}
