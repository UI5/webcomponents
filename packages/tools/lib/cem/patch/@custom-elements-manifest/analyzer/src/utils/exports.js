import ts from 'typescript';
import { has } from './index.js';

/**
 * UTILITIES RELATED TO MODULE EXPORTS
 */

export function hasExportModifier(node) {
  if (has(node?.modifiers)) {
    if (node.modifiers.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword)) {
      return true;
    }
  }
  return false;
}

export function hasDefaultModifier(node) {
  if (has(node?.modifiers)) {
    if (node.modifiers.some(mod => mod.kind === ts.SyntaxKind.DefaultKeyword)) {
      return true;
    }
  }
  return false;
}

/**
 * @example export { var1, var2 };
 */
export function hasNamedExports(node) {
  if (has(node?.exportClause?.elements)) {
    return true;
  }
  return false;
}

/**
 * @example export { var1, var2 } from 'foo';
 */
export function isReexport(node) {
  if (node?.moduleSpecifier !== undefined) {
    return true;
  }
  return false;
}