import { getDeclarationInFile, hasIgnoreJSDoc } from '../../utils/ast-helpers.js';
import {
  hasExportModifier,
  hasDefaultModifier,
  hasNamedExports,
  isReexport,
} from '../../utils/exports.js';
import { isBareModuleSpecifier } from '../../utils/index.js';

/**
 * EXPORTS
 * 
 * Analyzes a modules exports and adds them to the moduleDoc
 */
export function exportsPlugin() {
  return {
    name: 'CORE - EXPORTS',
    analyzePhase({ts, node, moduleDoc}){
      if(hasIgnoreJSDoc(node)) return;

      /**
       * @example export const foo = '';
       */
      if(hasExportModifier(node) && ts.isVariableStatement(node)) {
        node?.declarationList?.declarations?.forEach(declaration => {
          const _export = {          
            kind: 'js',
            name: declaration.name.getText(),
            declaration: {
              name: declaration.name.getText(),
              module: moduleDoc.path,
            },
          };

          moduleDoc.exports = [...(moduleDoc.exports || []), _export];
        });
      }

      /**
       * @example export default var1;
       */
      if (node.kind === ts.SyntaxKind.ExportAssignment) {
        const _export = {
          kind: 'js',
          name: 'default',
          declaration: {
            name: node.expression.text,
            module: moduleDoc.path,
          },
        };
        moduleDoc.exports = [...(moduleDoc.exports || []), _export];
      }

      if (node.kind === ts.SyntaxKind.ExportDeclaration) {

        /**
         * @example export { var1, var2 };
         */
        if (hasNamedExports(node) && !isReexport(node)) {
          node.exportClause?.elements?.forEach((element) => {
            if (hasIgnoreJSDoc(element) || hasIgnoreJSDoc(getDeclarationInFile(element, node.getSourceFile())))
              return;

            const _export = {
              kind: 'js',
              name: element.name.getText(),
              declaration: {
                name: element.propertyName?.getText() || element.name.getText(),
                module: moduleDoc.path,
              },
            };

            moduleDoc.exports = [...(moduleDoc.exports || []), _export];
          });
        }

        /**
         * @example export * from 'foo';
         * @example export * from './my-module.js';
         */
        if (isReexport(node) && !hasNamedExports(node)) {
          const _export = {
            kind: 'js',
            name: '*',
            declaration: {
              name: '*',
              package: node.moduleSpecifier.getText().replace(/'/g, ''),
            },
          };
          moduleDoc.exports = [...(moduleDoc.exports || []), _export];
        }

        /**
         * @example export { var1, var2 } from 'foo';
         * @example export { var1, var2 } from './my-module.js';
         */
        if (isReexport(node) && hasNamedExports(node)) {
          node.exportClause?.elements?.forEach((element) => {
            const _export = {
              kind: 'js',
              name: element.name.getText(),
              declaration: {
                name: element.propertyName?.getText() || element.name.getText(),
              },
            };

            if (isBareModuleSpecifier(node.moduleSpecifier.getText())) {
              _export.declaration.package = node.moduleSpecifier.getText().replace(/'/g, '');
            } else {
              _export.declaration.module = node.moduleSpecifier.getText().replace(/'/g, '');
            }

            moduleDoc.exports = [...(moduleDoc.exports || []), _export];
          });
        }
      }

      /**
       * @example export function foo() {}
       */
      if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
        if (hasExportModifier(node)) {
          const isDefault = hasDefaultModifier(node);
          const _export = {
            kind: 'js',
            name: isDefault ? 'default' : node.name?.getText() || '',
            declaration: {
              name: node.name?.getText() || '',
              module: moduleDoc.path,
            },
          };

          moduleDoc.exports = [...(moduleDoc.exports || []), _export];
        }
      }

      /**
       * @example export class Class1 {}
       */
      if (node.kind === ts.SyntaxKind.ClassDeclaration) {
        if (hasExportModifier(node)) {
          const isDefault = hasDefaultModifier(node);
          const _export = {
            kind: 'js',
            name: isDefault ? 'default' : node?.name?.text || '',
            declaration: {
              name: node?.name?.text || '',
              module: moduleDoc.path,
            },
          };
          moduleDoc.exports = [...(moduleDoc.exports || []), _export];
        }
      }
    }
  }
}