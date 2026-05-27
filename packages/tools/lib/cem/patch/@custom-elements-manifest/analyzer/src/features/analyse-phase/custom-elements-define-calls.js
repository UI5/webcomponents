import { getDeclarationInFile, hasIgnoreJSDoc, isCustomElementsDefineCall } from '../../utils/ast-helpers.js';
import { resolveModuleOrPackageSpecifier } from '../../utils/index.js';
import { createClass } from './creators/createClass.js';

/**
 * CUSTOM-ELEMENTS-DEFINE-CALLS
 * 
 * Analyzes calls for:
 * @example customElements.define()
 * @example window.customElements.define()
 */
export function customElementsDefineCallsPlugin() {
  let counter;
  return {
    name: 'CORE - CUSTOM-ELEMENTS-DEFINE-CALLS',
    analyzePhase({ts, node, moduleDoc, context}){    
      if(node?.kind === ts.SyntaxKind.SourceFile) {
        counter = 0;
      }

      if (hasIgnoreJSDoc(node))
        return;

      /** 
       * @example customElements.define('my-el', MyEl); 
       * @example window.customElements.define('my-el', MyEl);
       */
      if(isCustomElementsDefineCall(node)) {
        const classArg = node.parent.arguments[1];
        let isAnonymousClass = classArg?.kind === ts.SyntaxKind.ClassExpression;
        let isUnnamed = classArg?.name === undefined;

        if(isAnonymousClass) {
          const klass = createClass(classArg, moduleDoc, context);

          if(isUnnamed) {
            klass.name = `anonymous_${counter}`;
          }
          moduleDoc.declarations.push(klass);
        }

        let elementClass;

        /** 
         * @example customElements.define('m-e', class extends HTMLElement{}) 
         *                                            ^
         */
        if(isUnnamed) {
          elementClass = `anonymous_${counter}`;
          counter = counter + 1;
        }

        /** 
         * @example customElements.define('m-e', MyElement) 
         *                                       ^^^^^^^^^
         */
        if(node?.parent?.arguments?.[1]?.text) {
          elementClass = node.parent.arguments[1].text;
        }

        /** 
         * @example customElements.define('m-e', class MyElement extends HTMLElement{}) 
         *                                             ^^^^^^^^^
         */
        if(classArg?.name) {
          elementClass = classArg?.name?.getText();
        }

        const elementTag = node.parent.arguments[0].text;

        const klass = getDeclarationInFile(elementClass, node?.getSourceFile());

        if (hasIgnoreJSDoc(klass))
          return;

        const definitionDoc = {
          kind: 'custom-element-definition',
          name: elementTag,
          declaration: {
            name: elementClass,
            ...resolveModuleOrPackageSpecifier(moduleDoc, context, elementClass)
          },
        };
    
        moduleDoc.exports = [...(moduleDoc.exports || []), definitionDoc];
      }
    }
  }
}

