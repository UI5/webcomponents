import ts from 'typescript';
import { createFunctionLike } from './createFunctionLike.js';
import { createAttribute, createAttributeFromField } from './createAttribute.js';
import { createField } from './createClassField.js';
import { handleHeritage, handleJsDoc, handleAttrJsDoc, handleTypeInference, handleDefaultValue } from './handlers.js';
import { hasAttrAnnotation, hasIgnoreJSDoc, isDispatchEvent, isBindCall, isProperty, isReturnStatement } from '../../../utils/ast-helpers.js';
import { resolveModuleOrPackageSpecifier } from '../../../utils/index.js';


/**
 * Creates a classDoc
 */
export function createClass(node, moduleDoc, context) {
  let classTemplate = {
    kind: 'class',
    description: '',
    /**
     * In case of a class node?.name?.getText()
     * In case of a mixin node?.parent?.parent?.name?.getText()
     */
    name: node?.name?.getText() || node?.parent?.parent?.name?.getText() || '',
    cssProperties: [],
    cssParts: [],
    slots: [],
    members: [],
    events: [],
    attributes: [],
    cssStates: [],
  };

  node?.members?.forEach(member => {
    /**
     * Handle attributes
     */
    if (isProperty(member)) {
      if (member?.name?.getText() === 'observedAttributes') {
        /**
         * @example static observedAttributes
         */
        if (ts.isPropertyDeclaration(member)) {
          member?.initializer?.elements?.forEach((element) => {
            if (ts.isStringLiteral(element)) {
              const attribute = createAttribute(element);
              classTemplate.attributes.push(attribute);
            }
          });
        }

        /**
         * @example static get observedAttributes() {}
         */
        if (ts.isGetAccessor(member)) {
          const returnStatement = member?.body?.statements?.find(isReturnStatement);

          returnStatement?.expression?.elements?.forEach((element) => {
            if (ts.isStringLiteral(element)) {
              const attribute = createAttribute(element);
              classTemplate.attributes.push(attribute);
            }
          });
        }
      }
    }
  });

  /**
   * Second pass through a class's members.
   * We do this in two passes, because we need to know whether or not a class has any
   * attributes, so we handle those first.
   */
  node?.members?.forEach(member => {
    /**
     * Handle class methods
     */
    if (ts.isMethodDeclaration(member) && !hasIgnoreJSDoc(member)) {
      const method = createFunctionLike(member);
      classTemplate.members.push(method);
    }

    /**
     * Handle fields
     */
    if (isProperty(member) && !hasIgnoreJSDoc(member)) {
      const field = createField(member);

      /** If a member has only a getAccessor, it means it's readonly */
      if(ts.isGetAccessor(member)) {
        const hasSetter = node.members.some(m => ts.isSetAccessor(m) && m.name.getText() === field.name);
        if(!hasSetter) {
          field.readonly = true;
        }
      }

      /** Flag class fields that get assigned a variable, so we can resolve it later (in the RESOLVE-INITIALIZERS plugin) */
      if (member?.initializer?.kind === ts.SyntaxKind.Identifier) {
        field.resolveInitializer = {
          ...resolveModuleOrPackageSpecifier(moduleDoc, context, member?.initializer?.getText()),
        }
      }

      /**
       * Handle @attr
       * If a field has a @attr annotation, also create an attribute for it
       */
      if (hasAttrAnnotation(member)) {
        let attribute = createAttributeFromField(field);
        attribute = handleAttrJsDoc(member, attribute);
        field.attribute = attribute.name;

        /**
         * If the attribute already exists, merge it together with the extra
         * information we got from the field (like type, summary, description, etc)
         */
        let attrAlreadyExists = classTemplate.attributes.find(attr => attr.name === attribute.name);

        if (attrAlreadyExists) {
          classTemplate.attributes = classTemplate.attributes.map(attr => {
            return attr.name === attribute.name ? { ...attrAlreadyExists, ...attribute } : attr;
          });
        } else {
          classTemplate.attributes.push(attribute);
        }
      }

      /**
       * A class can have a static prop and an instance prop with the same name,
       * both should be output in the CEM
       *
       * If not a static prop, we merge getter and setter pairs here
       */
      if (field?.static) {
        classTemplate.members.push(field);
      } else {
        const fieldExists = classTemplate.members
          .filter(mem => !mem?.static)
          .find(mem => mem?.name === member?.name?.getText());

        if (fieldExists) {
          classTemplate.members = classTemplate.members.map(mem => mem?.name === member?.name?.getText() && !mem?.static ? { ...mem, ...field } : mem);
        } else {
          classTemplate.members.push(field);
        }
      }
    }

    /**
     * Handle events
     *
     * In order to find `this.dispatchEvent` calls, we have to traverse a method's AST
     */
    if (ts.isMethodDeclaration(member)) {
      eventsVisitor(member, classTemplate);
    }
  });

  getDefaultValuesFromConstructorVisitor(node, classTemplate, context);

  classTemplate.members = classTemplate?.members?.filter(mem => !mem.ignore);

  /**
   * Inheritance
   */
  classTemplate = handleHeritage(classTemplate, moduleDoc, context, node);

  return classTemplate;
}

function eventsVisitor(source, classTemplate) {
  visitNode(source);

  function visitNode(node) {
    switch (node.kind) {
      case ts.SyntaxKind.CallExpression:

        /** If callexpression is `this.dispatchEvent` */
        if (isDispatchEvent(node) && !hasIgnoreJSDoc(node.parent)) {
          node?.arguments?.forEach((arg) => {
            if (arg.kind === ts.SyntaxKind.NewExpression) {
              /** e.g. `selected-changed` */
              const eventName = arg?.arguments?.[0]?.text;
              /**
               * Check if event already exists
               */
              const eventExists = classTemplate?.events?.some(event => event.name === eventName);

              if (!eventExists) {
                let eventDoc = {
                  ...(eventName ? { name: eventName } : {}),
                  type: {
                    text: arg.expression.text,
                  },
                };

                eventDoc = handleJsDoc(eventDoc, node?.parent);
                delete eventDoc.privacy;
                classTemplate.events.push(eventDoc);
              }
            }
          });

        }
    }

    ts.forEachChild(node, visitNode);
  }
}

export function getDefaultValuesFromConstructorVisitor(source, classTemplate, context) {
  visitNode(source);

  function visitNode(node) {
    switch (node.kind) {
      case ts.SyntaxKind.Constructor:
        /**
         * For every member that was added in the classDoc, we want to add a default value if we can
         * To do this, we visit a class's constructor, and loop through the statements
         */
        node.body?.statements?.filter((statement) => statement.kind === ts.SyntaxKind.ExpressionStatement)
          .filter((statement) => statement.expression.kind === ts.SyntaxKind.BinaryExpression)
          .forEach((statement) => mapClassMember(source, classTemplate, context, node, statement, statement.expression));

        break;
    }

    ts.forEachChild(node, visitNode);
  }
}

function mapClassMember(source, classTemplate, context, node, statement, expression) {
  let existingMember = classTemplate?.members?.find(member => expression?.left?.name?.getText() === member.name && member.kind === 'field');

  // If the source is minified, or otherwise has a comma separated prop initialization
  if (expression?.operatorToken?.kind === ts.SyntaxKind.CommaToken) {
    if (expression.left.kind === ts.SyntaxKind.BinaryExpression) {
      mapClassMember(source, classTemplate, context, node, statement, expression.left);
    }
    if (expression.right.kind === ts.SyntaxKind.BinaryExpression) {
      mapClassMember(source, classTemplate, context, node, statement, expression.right);
    }
    return;
  }

  if (!existingMember) {
    if (hasIgnoreJSDoc(statement)) return;
    if (isBindCall(statement)) return;

    existingMember = {
      kind: 'field',
      name: expression?.left?.name?.getText(),
    }

    if(!classTemplate.members){
      classTemplate.members = [];
    }

    classTemplate.members.push(existingMember);
  }

  if (existingMember) {
    if (hasIgnoreJSDoc(statement)) {
      // schedule for deletion
      existingMember.ignore = true;
    }

    if (!existingMember?.type) {
      existingMember = handleTypeInference(existingMember, expression?.right);
    }

    existingMember = handleJsDoc(existingMember, statement);
    existingMember = handleDefaultValue(existingMember, statement, expression);

    /** Flag class fields that get assigned a variable, so we can resolve it later (in the RESOLVE-INITIALIZERS plugin) */
    if (expression?.right?.kind === ts.SyntaxKind.Identifier) {
      existingMember.resolveInitializer = {
        ...resolveModuleOrPackageSpecifier({ path: source.getSourceFile().fileName }, context, expression?.right?.getText()),
      }
    }

    if (hasAttrAnnotation(statement)) {
      const field = existingMember
      let attribute = createAttributeFromField(field);
      attribute = handleAttrJsDoc(statement, attribute);

      field.attribute = attribute.name;

      /**
        * If the attribute already exists, merge it together with the extra
        * information we got from the field (like type, summary, description, etc)
        */
      let attrAlreadyExists = classTemplate.attributes.find(attr => attr.name === attribute.name);

      if (attrAlreadyExists) {
        classTemplate.attributes = classTemplate.attributes.map(attr => {
          return attr.name === attribute.name ? { ...attrAlreadyExists, ...attribute } : attr;
        });
      } else {
        classTemplate.attributes.push(attribute);
      }
    }
  }
}
