import ts from 'typescript';
import { handleParametersAndReturnType } from './createFunctionLike.js';
import { handleJsDoc } from './handlers.js';

export function createArrowFunction(node) {
  const arrowFunction = node?.declarationList?.declarations?.find(declaration => ts.SyntaxKind.ArrowFunction === declaration?.initializer?.kind);

  let functionLikeTemplate = {
    kind: 'function',
    name: arrowFunction?.name?.getText() || '',
  };
  
  functionLikeTemplate = handleParametersAndReturnType(functionLikeTemplate, arrowFunction?.initializer);
  functionLikeTemplate = handleJsDoc(functionLikeTemplate, node);

  return functionLikeTemplate;
}