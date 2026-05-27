import { getElementNameFromDecorator } from '../../../utils/ast-helpers.js';
import { has, decorator, resolveModuleOrPackageSpecifier } from '../../../utils/index.js';

/**
 * CUSTOMELEMENT
 * 
 * Handles the customElement decorator
 * @example @customElement('my-el');
 */
export function customElementDecoratorPlugin() {
  return {
    name: 'CORE - CUSTOM-ELEMENT-DECORATOR',
    analyzePhase({node, moduleDoc, context}){
      if (has(node.modifiers)) {
        const customElementDecorator = node.modifiers?.find(decorator('customElement'));

        if(customElementDecorator) {
          const className = node.name.text;
          const tagName = getElementNameFromDecorator(customElementDecorator);

          const definitionDoc = {
            kind: 'custom-element-definition',
            name: tagName,
            declaration: {
              name: className,
              ...resolveModuleOrPackageSpecifier(moduleDoc, context, className)
            },
          };

          moduleDoc.exports = [...(moduleDoc.exports || []), definitionDoc];
        }
      }
    }
  }
}

