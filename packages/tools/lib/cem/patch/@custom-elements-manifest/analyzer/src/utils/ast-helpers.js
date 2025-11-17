import ts from 'typescript';
import { safe } from './index.js';

/**
 * AST HELPERS
 */

export const isProperty = node => ts.isPropertyDeclaration(node) || ts.isGetAccessor(node) || ts.isSetAccessor(node);

/**
 * @example this.dispatchEvent(new Event('foo'));
 */
export const isDispatchEvent = node => node.expression?.name?.getText() === 'dispatchEvent' && node?.expression?.expression?.kind === ts.SyntaxKind.ThisKeyword

export const isReturnStatement = statement => statement?.kind === ts.SyntaxKind.ReturnStatement;

/**
 * @example customElements.define('my-el', MyEl);
 * @example window.customElements.define('my-el', MyEl);
 */
export const isCustomElementsDefineCall = node => (node?.expression?.getText() === 'customElements' || node?.expression?.getText() === 'window.customElements' || node?.expression?.getText() === 'globalThis.customElements') && node?.name?.getText() === 'define' && node?.parent?.kind === ts.SyntaxKind.CallExpression;

/**
 * @example @attr
 * @example @attribute
 */
export function hasAttrAnnotation(member) {
  return member?.jsDoc?.some(jsDoc => jsDoc?.tags?.some(tag => safe(() => ["attribute", "attr"].includes(tag?.tagName?.getText()))));
}


/**
 * Whether or not node is:
 * - Number
 * - String
 * - Boolean
 * - Null
 */
export function isPrimitive(node) {
  return node && (ts.isNumericLiteral(node) ||
  ts.isStringLiteral(node) ||
  node?.kind === ts.SyntaxKind.NullKeyword ||
  node?.kind === ts.SyntaxKind.TrueKeyword ||
  node?.kind === ts.SyntaxKind.FalseKeyword) ||
  // Handle only empty arrays for now
  (node?.kind === ts.SyntaxKind.ArrayLiteralExpression && node?.elements?.length === 0)
}

/**
 * Checks if a VariableStatement has an initializer
 * @example `let foo;` will return false
 * @example `let foo = '';` will return true
 */
export function hasInitializer(node) {
  return node?.declarationList?.declarations?.some(declaration => declaration?.initializer);
}

export function getElementNameFromDecorator(decorator) {
  const argument = decorator.expression.arguments[0];

  /**
   * @example @customElement('my-el')
   */
  if(argument.kind === ts.SyntaxKind.StringLiteral) {
    return argument.text;
  }

  /**
   * @example @customElement({
   *   name: 'my-el',
   *   template
   * })
   */
  if(argument.kind === ts.SyntaxKind.ObjectLiteralExpression) {
    let result;
    argument?.properties?.forEach(property => {
      if(property?.name?.getText() === 'name') {
        result = property?.initializer?.text;
      }
    });
    return result;
  }
}


/**
 * Gets the name of an attr from a decorators callExpression
 * @example @attr({attribute: 'my-el'})
 */
export const getOptionsObject = decorator => decorator?.expression?.arguments?.find(arg => arg.kind === ts.SyntaxKind.ObjectLiteralExpression);

/**
 * Get the return value expression of a return statement, omitting the type assertion
 */
export const getReturnValue = returnStatement => {
  let value = returnStatement.expression?.kind === ts.SyntaxKind.AsExpression
    ? returnStatement.expression.expression.getText()
    : returnStatement.expression?.getText()

  return value?.split?.(' ')?.[0];
}

/**
 * Is this class member a static member?
 */
export const isStaticMember = member =>
  member?.modifiers?.some?.(x => x.kind === ts.SyntaxKind.StaticKeyword);

/**
 * @param  {import('typescript').Expression}  initializer
 * @return {initializer is import('typescript').AsExpression & { type: import("typescript").TypeReference }}
 */
function isAsConst(initializer) {
  return (
    initializer &&
    initializer.kind &&
    ts.isAsExpression(initializer) &&
    ts.isTypeReferenceNode(initializer.type) &&
    initializer.type.typeName.getText() === 'const'
  );
}


/**
 * Does the name have an initializer with `as const`?
 * @param  {import('typescript').Node}  node
 * @return {Boolean}
 */
export function isWellKnownType(node) {
  return (
    node?.initializer && (
      isAsConst(node?.initializer)
    )
  );
}

/**
 * Whether or not a node has an `@ignore` jsdoc annotation
 */
export const hasIgnoreJSDoc = node => node?.jsDoc?.some(doc => doc?.tags?.some(tag => safe(() => tag?.tagName?.getText()) === 'ignore' || safe(() => tag?.tagName?.getText()) === 'internal'));


/**
 * @example this.__onClick = this.__onClick.bind(this);
 */
export function isBindCall(statement) {
  const { expression } = statement;
  if(expression) {
    const leftName = expression?.left?.name?.getText();
    const rightName = expression?.right?.expression?.expression?.name?.getText();
    const isBind = expression?.right?.expression?.name?.getText() === 'bind';

    if(leftName === undefined || rightName === undefined) return false;

    if(leftName === rightName && isBind) {
      return true;
    }
  }
  return false;
}

/**
 * Does the variable have an `@ignore` or `@internal` JSDoc tag?
 * @param  {import('typescript').Node|string} nodeOrName
 * @param  {import('typescript').SourceFile}  sourceFile
 * @return {import('typescript').Node}
 */
export function getDeclarationInFile(nodeOrName, sourceFile) {
  let name = nodeOrName;
  if (typeof nodeOrName === 'string') {
    if (!sourceFile)
      throw new Error('must provide sourceFile when first argument is a string');
  } else {
    sourceFile = nodeOrName?.getSourceFile();
    name = nodeOrName?.name?.getText();
  }
  if (!name)
    return undefined;
  const sourceFileStatements = sourceFile.statements ?? [];
  return sourceFileStatements.find(statement => {
    if (ts.isVariableStatement(statement))
      return statement.declarationList.declarations.find(declaration => declaration.name.getText() === name)
    else if (statement.name?.getText)
      return statement.name.getText() === name;
  });
}
