import ts from 'typescript';
import { parse } from 'comment-parser';

import { has, resolveModuleOrPackageSpecifier, safe } from '../../../utils/index.js';
import { handleJsDocType, normalizeDescription } from '../../../utils/jsdoc.js';
import { isWellKnownType } from '../../../utils/ast-helpers.js';

/**
 * @example static foo;
 * @example public foo;
 * @example private foo;
 * @example protected foo;
 */
export function handleModifiers(doc, node) {
  node?.modifiers?.forEach(modifier => {
    if(modifier?.kind === ts.SyntaxKind.StaticKeyword) {
      doc.static = true;
    }

    if (modifier?.kind === ts.SyntaxKind.ReadonlyKeyword) {
      doc.readonly = true;
    }

    switch (modifier.kind) {
      case ts.SyntaxKind.PublicKeyword:
        doc.privacy = 'public';
        break;
      case ts.SyntaxKind.PrivateKeyword:
        doc.privacy = 'private';
        break;
      case ts.SyntaxKind.ProtectedKeyword:
        doc.privacy = 'protected';
        break;
    }
  });

  if (node.name?.text?.startsWith('#')) {
    doc.privacy = 'private';
  }

  return doc;
}

/**
 * Handles JsDoc
 */
export function handleJsDoc(doc, node) {
  node?.jsDoc?.forEach(jsDocComment => {
    if(jsDocComment?.comment) {
      if(has(jsDocComment?.comment)) {
        doc.description = jsDocComment.comment.map(com => `${safe(() => com?.name?.getText()) ?? ''}${com.text}`).join('');
      } else {
        doc.description = normalizeDescription(jsDocComment.comment);
      }
    }

    jsDocComment?.tags?.forEach(tag => {
      /** @readonly */
      if(tag.kind === ts.SyntaxKind.JSDocReadonlyTag) {
        doc.readonly = true;
      }

      /** @param */
      if(tag.kind === ts.SyntaxKind.JSDocParameterTag) {
        const parameter = doc?.parameters?.find(parameter => parameter.name === tag.name.text);
        const parameterAlreadyExists = !!parameter;
        const parameterTemplate = parameter || {};

        if(tag?.comment) {
          parameterTemplate.description = normalizeDescription(tag.comment);
        }

        if(tag?.name) {
          parameterTemplate.name = tag.name.getText();
        }

        /**
         * If its bracketed, that means its optional
         * @example [foo]
         */
        if(tag?.isBracketed) {
          parameterTemplate.optional = true;
        }

        if(tag?.typeExpression) {
          parameterTemplate.type = {
            text: handleJsDocType(tag.typeExpression.type.getText())
          }
        }

        if(!parameterAlreadyExists) {
          doc.parameters = [...(doc?.parameters || []), parameterTemplate];
        }
      }

      /** @returns */
      if(tag.kind === ts.SyntaxKind.JSDocReturnTag) {
        doc.return = {
          type: {
            text: handleJsDocType(tag?.typeExpression?.type?.getText())
          }
        }
      }

      /** @type */
      if(tag.kind === ts.SyntaxKind.JSDocTypeTag) {
        if(tag?.comment) {
          doc.description = normalizeDescription(tag.comment);
        }

        doc.type = {
          text: handleJsDocType(tag.typeExpression.type.getText())
        }
      }

      /** @reflect */
      if(safe(() => tag?.tagName?.getText()) === 'reflect' && doc?.kind === 'field') {
        doc.reflects = true;
      }

      /** @summary */
      if(safe(() => tag?.tagName?.getText()) === 'summary') {
        doc.summary = tag.comment;
      }

      /** @deprecated */
      if(safe(() => tag?.tagName?.getText()) === 'deprecated') {
        doc.deprecated = tag.comment || "true";
      }

      /** @default */
      if (safe(() => tag?.tagName?.getText()) === 'default' && doc?.kind === 'field') {
        doc.default ??= tag.comment;
      }

      /**
       * Overwrite privacy
       * @public
       * @private
       * @protected
       */
      switch(tag.kind) {
        case ts.SyntaxKind.JSDocPublicTag:
          doc.privacy = 'public';
          break;
        case ts.SyntaxKind.JSDocPrivateTag:
          doc.privacy = 'private';
          break;
        case ts.SyntaxKind.JSDocProtectedTag:
          doc.privacy = 'protected';
          break;
      }
    });
  });

  return doc;
}



/**
 * Creates a mixin for inside a classDoc
 */
export function createClassDeclarationMixin(name, moduleDoc, context) {
  const mixin = {
    name,
    ...resolveModuleOrPackageSpecifier(moduleDoc, context, name)
  };
  return mixin;
}

/**
 * Handles mixins and superclass
 */
export function handleHeritage(classTemplate, moduleDoc, context, node) {
  node?.heritageClauses?.forEach((clause) => {
    /* Ignoring `ImplementsKeyword` for now, future revisions may retrieve docs per-field for the implemented methods. */
    if (clause.token !== ts.SyntaxKind.ExtendsKeyword) return;

    clause?.types?.forEach((type) => {
      const mixins = [];
      let node = type.expression;
      let superClass;

      /* gather mixin calls */
      if (ts.isCallExpression(node)) {
        const mixinName = node.expression.getText();
        mixins.push(createClassDeclarationMixin(mixinName, moduleDoc, context))
        while (ts.isCallExpression(node.arguments[0])) {
          node = node.arguments[0];
          const mixinName = node.expression.getText();
          mixins.push(createClassDeclarationMixin(mixinName, moduleDoc, context));
        }
        superClass = node.arguments[0].text;
      } else {
        superClass = node.text;
      }

      if (has(mixins)) {
        classTemplate.mixins = mixins;
      }

      classTemplate.superclass = {
        name: superClass,
        ...resolveModuleOrPackageSpecifier(moduleDoc, context, superClass)
      };

      if(superClass === 'HTMLElement') {
        delete classTemplate.superclass.module;
      }
    });
  });

  return classTemplate;
}

/**
 * Handles fields that have an @attr jsdoc annotation and gets the attribute name (if specified) and the description
 * @example @attr my-attr this is the attr description
 */
export function handleAttrJsDoc(node, doc) {
  node?.jsDoc?.forEach(jsDoc => {
    const docs = parse(jsDoc?.getFullText())?.find(doc => doc?.tags?.some(({tag}) => ["attribute", "attr"].includes(tag)));
    const attrTag = docs?.tags?.find(({tag}) => ["attribute", "attr"].includes(tag));

    if(attrTag?.name) {
      doc.name = attrTag.name;
    }

    if(attrTag?.description) {
      doc.description = normalizeDescription(attrTag.description);
    }
  });

  return doc;
}

export function handleTypeInference(doc, node) {
  const n = node?.initializer || node;
  switch(n?.kind) {
    case ts.SyntaxKind.TrueKeyword:
    case ts.SyntaxKind.FalseKeyword:
      doc.type = { text: "boolean" }
      break;
    case ts.SyntaxKind.StringLiteral:
      doc.type = { text: "string" }
      break;
    case ts.SyntaxKind.PrefixUnaryExpression:
      doc.type = n?.operator === ts.SyntaxKind.ExclamationToken ? { text: "boolean" } : { text: "number" };
      break;
    case ts.SyntaxKind.NumericLiteral:
      doc.type = { text: "number" }
      break;
    case ts.SyntaxKind.NullKeyword:
      doc.type = { text: "null" }
      break;
    case ts.SyntaxKind.ArrayLiteralExpression:
      doc.type = { text: "array" }
      break;
    case ts.SyntaxKind.ObjectLiteralExpression:
      doc.type = { text: "object" }
      break;
  }
  return doc;
}

/**
 * For `as const` and namespace/enum types
 * @example class A { b = 'b' as const }
 * @example class A { b = B.b }
 */
export function handleWellKnownTypes(doc, node) {
  if (!!node.initializer?.expression) {
    const text = node?.initializer?.expression?.getText();
    if (isWellKnownType(node)) {
      doc.type = { text };
    }
  }
  return doc;
}

export function handleDefaultValue(doc, node, expression) {
  /**
   * In case of a class field node?.initializer
   * In case of a property assignment in constructor node?.expression?.right
   */
  const initializer = node?.initializer || expression?.right;

  /** Ignore the following */
  if(initializer?.kind === ts.SyntaxKind.BinaryExpression) return doc;
  if(initializer?.kind === ts.SyntaxKind.ConditionalExpression) return doc;
  if(initializer?.kind === ts.SyntaxKind.PropertyAccessExpression) return doc;
  if(initializer?.kind === ts.SyntaxKind.CallExpression) return doc;
  if(initializer?.kind === ts.SyntaxKind.ArrowFunction) return doc;

  let defaultValue;
  /**
   * Check if value has `as const`
   * @example const foo = 'foo' as const;
   */
  if(initializer?.kind === ts.SyntaxKind.AsExpression) {
    defaultValue = initializer?.expression?.getText()
  } else {
    defaultValue = initializer?.getText()
  }

  if(defaultValue) {
    doc.default = defaultValue.replace(/\s+/g, ' ').trim();
  }
  return doc;
}

/**
 * Add TS type
 * @example class Foo { bar: string = ''; }
 */
export function handleExplicitType(doc, node) {
  if(node.type) {
    doc.type = { text: node.type.getText() }

    if(node?.questionToken) {
      doc.type.text += ' | undefined';
    }
  }

  return doc;
}

/**
 * if is private field
 * @example class Foo { #bar = ''; }
 */
export function handlePrivateMember(doc, node) {
  if (ts.isPrivateIdentifier(node.name)) {
    doc.privacy = 'private';
  }
  return doc;
}
