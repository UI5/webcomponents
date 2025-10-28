import ts from 'typescript';
import { decorator } from '../../../utils/index.js';
import { createAttributeFromField } from '../../analyse-phase/creators/createAttribute.js';
import { hasPropertyDecorator, isAlsoAttribute, getAttributeName, reflects } from './utils.js';

import { extractMixinNodes, isMixin } from '../../../utils/mixins.js';
import { handleName } from '../../analyse-phase/creators/createMixin.js';

/**
 * PROPERTY
 * 
 * Handles the property decorator
 * @example @property({});
 */
export function propertyDecoratorPlugin() {
  return {
    name: 'CORE - LIT-PROPERTY-DECORATOR',
    analyzePhase({ts, node, moduleDoc}){
      switch (node.kind) {
        case ts.SyntaxKind.VariableStatement:
        case ts.SyntaxKind.FunctionDeclaration:
          if(isMixin(node)) {
            const { mixinFunction, mixinClass } = extractMixinNodes(node);
            const { name } = handleName({}, mixinFunction);
            handlePropertyDecorator(mixinClass, moduleDoc, name);
          }
          break;

        case ts.SyntaxKind.ClassDeclaration:    
          handlePropertyDecorator(node, moduleDoc);
          break;
        }
      }
  }
}


function handlePropertyDecorator(classNode, moduleDoc, mixinName = null) {
  let className;
  if(!mixinName) {
    className = classNode?.name?.getText();
  } else {
    className = mixinName;
  }

  const currClass = moduleDoc?.declarations?.find(declaration => declaration.name === className);
  /**
   * Find members with @property decorator
   */
  classNode?.members?.forEach(member => {
    if (hasPropertyDecorator(member)) {
      const propertyDecorator = member.modifiers.find(decorator('property'));
      const propertyOptions = propertyDecorator?.expression?.arguments?.find(arg => ts.isObjectLiteralExpression(arg));

      /**
       * If property does _not_ have `attribute: false`, also create an attribute based on the field
       */
      if (isAlsoAttribute(propertyOptions)) {
        const field = currClass.members.find(classMember => classMember.name === member.name.getText());
        /** If a `field` was not found on the `currClass`, that's because it has a @internal jsdoc notation */
        if(!field) {
          return;
        }
        const attribute = createAttributeFromField(field);

        /**
         * If an attribute name is provided
         * @example @property({attribute:'my-foo'})
         */
        const attributeName = getAttributeName(propertyOptions);
        if(attributeName) {
          attribute.name = attributeName;
          field.attribute = attributeName;
        } else {
          field.attribute = field.name;
        }

        
        if(reflects(propertyOptions)) {
          field.attribute = attribute.name;
          field.reflects = true;
        }

        const existingAttribute = currClass?.attributes?.find(attr => attr.name === attribute.name);

        if(!existingAttribute) {
          currClass.attributes.push(attribute);
        } else {
          currClass.attributes = currClass?.attributes?.map(attr => attr.name === attribute.name ? ({...attr, ...attribute}) : attr);
        }
      }
    }
  });
}