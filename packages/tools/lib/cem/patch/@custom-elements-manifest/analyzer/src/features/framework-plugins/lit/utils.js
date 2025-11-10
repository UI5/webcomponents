import ts from 'typescript';

export function isAlsoAttribute(node) {
  let result = true;
  (node?.initializer || node)?.properties?.forEach((property) => {
    if (
      property.name.text === 'attribute' &&
      property.initializer.kind === ts.SyntaxKind.FalseKeyword
    ) {
      result = false;
    }
  });
  return result;
}

export function reflects(node) {
  let result = false;
  (node?.initializer || node)?.properties?.forEach((property) => {
    if (
      property.name.text === 'reflect' &&
      property.initializer.kind === ts.SyntaxKind.TrueKeyword
    ) {
      result = true;
    }
  });
  return result;
}

export function getType(node) {
  let result = false;
  (node?.initializer || node)?.properties?.forEach((property) => {
    if (property.name.text === 'type') {
      result = property.initializer.text.toLowerCase();
    }
  });
  return result;
}

export function getAttributeName(node) {
  let result = false;
  (node?.initializer || node)?.properties?.forEach((property) => {
    if (
      property.name.text === 'attribute' &&
      property.initializer.kind === ts.SyntaxKind.StringLiteral
    ) {
      result = property.initializer.text;
    }
  });
  return result;
}

export function hasPropertyDecorator(node) {
  return node?.modifiers?.some((decorator) => { 
    return ts.isDecorator(decorator) && decorator?.expression?.expression?.getText() === 'property'
  });
}

export const hasStaticKeyword = node => node?.modifiers?.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword);

export function getPropertiesObject(node) {
  if (ts.isGetAccessor(node)) {
    return node.body?.statements?.find(ts.isReturnStatement)?.expression;
  } else {
    return node.initializer;
  }
}