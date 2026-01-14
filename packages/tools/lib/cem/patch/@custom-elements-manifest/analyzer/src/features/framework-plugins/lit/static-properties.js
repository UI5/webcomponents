import { createAttributeFromField } from '../../analyse-phase/creators/createAttribute.js';
import { getDefaultValuesFromConstructorVisitor } from '../../analyse-phase/creators/createClass.js';
import { handleJsDoc } from '../../analyse-phase/creators/handlers.js';
import {
  isAlsoAttribute,
  hasStaticKeyword,
  getPropertiesObject,
  getAttributeName,
  reflects,
  getType,
} from './utils.js';

import { extractMixinNodes, isMixin } from '../../../utils/mixins.js';
import { handleName } from '../../analyse-phase/creators/createMixin.js';

/**
 * STATIC-PROPERTIES
 *
 * Handles `static get properties()` and `static properties`
 */
export function staticPropertiesPlugin() {
  return {
    name: 'CORE - LIT-STATIC-PROPERTIES',
    analyzePhase({ ts, node, moduleDoc, context }) {
      switch (node.kind) {
        case ts.SyntaxKind.VariableStatement:
        case ts.SyntaxKind.FunctionDeclaration:
          if (isMixin(node)) {
            const { mixinFunction, mixinClass } = extractMixinNodes(node);
            const { name } = handleName({}, mixinFunction);
            handleStaticProperties(mixinClass, moduleDoc, context, name, ts);
          }
          break;

        case ts.SyntaxKind.ClassDeclaration:
          handleStaticProperties(node, moduleDoc, context, null, ts);
          break;
      }
    },
  };
}

function handleStaticProperties(classNode, moduleDoc, context, mixinName = null, ts) {
  let className;
  if (!mixinName) {
    className = classNode?.name?.getText();
  } else {
    className = mixinName;
  }
  const currClass = moduleDoc?.declarations?.find(declaration => declaration.name === className);

  classNode?.members?.forEach(member => {
    if (hasStaticKeyword(member) && member.name.text === 'properties') {
      const propertiesObject = getPropertiesObject(member);
      propertiesObject?.properties?.forEach(property => {
        if (property.kind !== ts.SyntaxKind.PropertyAssignment) return;

        let classMember = {
          kind: 'field',
          name: property?.name?.getText() || '',
          privacy: 'public',
        };

        const type = getType(property);
        if (type) {
          classMember.type = { text: type }
        }

        classMember = handleJsDoc(classMember, property);

        const memberIndex = currClass?.members?.findIndex(field => field.name === classMember.name);
        if (memberIndex >= 0) {
          classMember = { ...classMember, ...currClass.members[memberIndex] };
        }

        if (isAlsoAttribute(property)) {
          const attribute = createAttributeFromField(classMember);

          /**
           * If an attribute name is provided
           * @example @property({attribute:'my-foo'})
           */
          const attributeName = getAttributeName(property);
          if (attributeName) {
            attribute.name = attributeName;
            classMember.attribute = attributeName;
          } else {
            classMember.attribute = classMember.name;
          }

          if (reflects(property)) {
            classMember.attribute = attribute.name;
            classMember.reflects = true;
          }

          const attributeIndex = currClass?.attributes?.findIndex(
            attr => attr.name === attribute.name,
          );
          if (attributeIndex >= 0) {
            currClass.attributes[attributeIndex] = {
              ...currClass.attributes[attributeIndex],
              ...attribute,
            };
          } else {
            currClass.attributes.push(attribute);
          }
        }

        if (memberIndex >= 0) {
          currClass.members[memberIndex] = classMember;
        } else {
          currClass.members.push(classMember);
        }
      });
      return;
    }
  });

  /** Get default values */
  getDefaultValuesFromConstructorVisitor(classNode, currClass, context);
}
