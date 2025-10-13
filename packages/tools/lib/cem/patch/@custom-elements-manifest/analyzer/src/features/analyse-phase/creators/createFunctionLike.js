import ts from 'typescript';
import { has } from '../../../utils/index.js';
import { handleModifiers, handleJsDoc } from './handlers.js';

/**
 * Creates a functionLike, does _not_ handle arrow functions
 */
export function createFunctionLike(node) {
  let functionLikeTemplate = {
    kind: '',
    name: node?.name?.getText() || ''
  };
  
  functionLikeTemplate = handleKind(functionLikeTemplate, node);
  functionLikeTemplate = handleModifiers(functionLikeTemplate, node);
  functionLikeTemplate = handleParametersAndReturnType(functionLikeTemplate, node);
  functionLikeTemplate = handleJsDoc(functionLikeTemplate, node);
  
  return functionLikeTemplate;
}

/**
 * Determine the kind of the functionLike, either `'function'` or `'method'` 
 */
export function handleKind(functionLike, node) {
  switch(node.kind) {
    case ts.SyntaxKind.FunctionDeclaration:
      functionLike.kind = 'function';
      break;
    case ts.SyntaxKind.MethodDeclaration:
      functionLike.kind = 'method';
      break;
  }
  return functionLike;
}

/**
 * Handle a functionLikes return type and parameters/parameter types
 */
export function handleParametersAndReturnType(functionLike, node) {
  if(node?.type) {
    functionLike.return = {
      type: { text: node.type.getText() }
    }
  }

  const parameters = [];
  node?.parameters?.forEach((param) => {  
    const parameter = {
      name: param.name.getText(),
    }

    if(param?.initializer) {
      parameter.default = param.initializer.getText();
    }

    if(param?.questionToken) {
      parameter.optional = true;
    }

    if(param?.type) {
      parameter.type = {text: param.type.getText() }
    }

    parameters.push(parameter);
  });

  if(has(parameters)) {
    functionLike.parameters = parameters;
  }

  return functionLike;
}