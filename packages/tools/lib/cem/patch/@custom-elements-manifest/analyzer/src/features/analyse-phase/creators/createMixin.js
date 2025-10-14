import { createClass } from './createClass.js';
import { handleParametersAndReturnType } from './createFunctionLike.js';
import { handleJsDoc } from './handlers.js';

/**
 * Takes a mixinFunctionNode, which is the function/arrow function containing the mixin class
 * and the actual class node returned by the mixin declaration
 */
export function createMixin(mixinFunctionNode, mixinClassNode, moduleDoc, context) {
  let mixinTemplate = createClass(mixinClassNode, moduleDoc, context);

  mixinTemplate = handleParametersAndReturnType(mixinTemplate, mixinFunctionNode?.declarationList?.declarations?.[0]?.initializer || mixinFunctionNode);
  mixinTemplate = handleJsDoc(mixinTemplate, mixinFunctionNode);
  mixinTemplate = handleName(mixinTemplate, mixinFunctionNode);
  mixinTemplate = turnClassDocIntoMixin(mixinTemplate);

  return mixinTemplate;
}

export function handleName(mixin, node) {
  mixin.name = node?.name?.getText()  || node?.parent?.name?.getText() || node?.declarationList?.declarations?.[0]?.name?.getText() || '';
  return mixin;
}

/**
 * Turns a classDoc into a mixin
 */
function turnClassDocIntoMixin(mixin) {
  mixin.kind = 'mixin';
  delete mixin.superclass;
  delete mixin.return;
  return mixin;
}
