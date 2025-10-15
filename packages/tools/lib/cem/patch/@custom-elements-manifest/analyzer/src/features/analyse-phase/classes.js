import { createClass } from './creators/createClass.js';

/**
 * classPlugin
 * 
 * handles classes
 */
export function classPlugin() {
  return {
    name: 'CORE - CLASSES',
    analyzePhase({ts, node, moduleDoc, context}){
      switch(node.kind) {
        case ts.SyntaxKind.ClassDeclaration:
          const klass = createClass(node, moduleDoc, context);
          moduleDoc.declarations.push(klass);
          break;
      }
    }
  }
}