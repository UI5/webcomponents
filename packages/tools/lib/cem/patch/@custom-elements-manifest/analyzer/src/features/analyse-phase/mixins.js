import { extractMixinNodes, isMixin } from '../../utils/mixins.js';
import { createMixin } from './creators/createMixin.js';

/**
 * mixinPlugin
 * 
 * handles mixins
 */
export function mixinPlugin() {
  return {
    name: 'CORE - MIXINS',
    analyzePhase({ts, node, moduleDoc, context}){
      switch(node.kind) {
        case ts.SyntaxKind.VariableStatement:
        case ts.SyntaxKind.FunctionDeclaration:
          /**
           * Try to extract mixin nodes, if its a mixin
           */
          if(isMixin(node)) {
            const { mixinFunction, mixinClass } = extractMixinNodes(node);
            let mixin = createMixin(mixinFunction, mixinClass, moduleDoc, context);
            moduleDoc.declarations.push(mixin);
          }
          break;
      }
    }
  }
}

