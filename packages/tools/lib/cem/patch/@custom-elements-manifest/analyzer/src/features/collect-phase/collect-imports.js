import {
  hasDefaultImport,
  hasNamedImport,
  hasAggregatingImport,
  hasSideEffectImport,
} from '../../utils/imports.js';
import { isBareModuleSpecifier } from '../../utils/index.js';

/**
 * COLLECT-IMPORTS
 * 
 * Collects a modules imports so that declarations can later be resolved to their module/package.
 */
export function collectImportsPlugin() {
  const files = {};
  let currModuleImports;

  return {
    name: 'CORE - IMPORTS',
    collectPhase({ts, node}) {
      if(node.kind === ts.SyntaxKind.SourceFile) {
        /**
         * Create an empty array for each module we visit
         */
        files[node.fileName] = [];
        currModuleImports = files[node.fileName];
      }

      /** 
       * @example import defaultExport from 'foo'; 
       */
      if (hasDefaultImport(node)) {
        const importTemplate = {
          name: node.importClause.name.text,
          kind: 'default',
          importPath: node.moduleSpecifier.text,
          isBareModuleSpecifier: isBareModuleSpecifier(node.moduleSpecifier.text),
          isTypeOnly: !!node?.importClause?.isTypeOnly
        };
        currModuleImports.push(importTemplate);
      }

      /**
       * @example import { export1, export2 } from 'foo';
       * @example import { export1 as alias1 } from 'foo';
       * @example import { export1, export2 as alias2 } from 'foo';
       */
      if (hasNamedImport(node)) {
        node.importClause.namedBindings.elements.forEach((element) => {
          const importTemplate = {
            name: element.name.text,
            kind: 'named',
            importPath: node.moduleSpecifier.text,
            isBareModuleSpecifier: isBareModuleSpecifier(node.moduleSpecifier.text),
            isTypeOnly: !!node?.importClause?.isTypeOnly
          };
          currModuleImports.push(importTemplate);
        });
      }

      /**
       * @example import * as name from './my-module.js'; 
       */
      if (hasAggregatingImport(node)) {
        const importTemplate = {
          name: node.importClause.namedBindings.name.text,
          kind: 'aggregate',
          importPath: node.moduleSpecifier.text,
          isBareModuleSpecifier: isBareModuleSpecifier(node.moduleSpecifier.text),
          isTypeOnly: !!node?.importClause?.isTypeOnly
        };
        currModuleImports.push(importTemplate);
      }

      /**
       * @example import './my-module.js';
       */
      if(hasSideEffectImport(node)) {
        const importTemplate = {
          kind: 'side-effect',
          importPath: node.moduleSpecifier.text,
          isBareModuleSpecifier: isBareModuleSpecifier(node.moduleSpecifier.text),
          isTypeOnly: false
        };
        currModuleImports.push(importTemplate);
      }
    },
    analyzePhase({ts, node, context}) {
      if(node.kind === ts.SyntaxKind.SourceFile) {
        
        /** Makes the imports available on the context object for a given module */
        context.imports = files[node.fileName];
      }
    },
    packageLinkPhase({context}) {
      /** Reset */
      context.imports = [];
    }
  }
}

