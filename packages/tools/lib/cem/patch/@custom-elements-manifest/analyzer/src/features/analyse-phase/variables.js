import { createVariable } from './creators/createVariable.js';
import { isMixin } from '../../utils/mixins.js';

/**
 * variablePlugin
 * 
 * handles variables
 */
export function variablePlugin() {
  return {
    name: 'CORE - VARIABLES',
    analyzePhase({ts, node, moduleDoc}){
      switch(node.kind) {
        case ts.SyntaxKind.VariableStatement:
          if(!isMixin(node)) {
            node?.declarationList?.declarations?.forEach(declaration => {
              /**
               * It can be the case that a variable is already present in the declarations,
               * for example if the variable is also an arrow function. So we need to make sure
               * the declaration doesnt already exist before adding it to a modules declarations
               */
              const alreadyExists = moduleDoc?.declarations?.some(_declaration => _declaration.name === declaration?.name?.getText());

              if(!alreadyExists) {
                const variable = createVariable(node, declaration);
                moduleDoc.declarations.push(variable);
              }
            });
          }
          break;
      }
    }
  }
}