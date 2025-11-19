import { isMixin } from '../../utils/mixins.js';
import { has } from '../../utils/index.js';
import { createClassDeclarationMixin } from './creators/handlers.js';

/**
 * REEXPORTED WRAPPED MIXIN EXPORTS
 * 
 * Handle exported mixins
 * @example ```
 * 
 * function FooMixinImpl(klass) {
 *   class FooMixin extends klass {}
 *   return FooMixin;
 * }
 * 
 * export const FooMixin = dedupeMixin(FooMixinImpl);
 * 
 * ```
 */
export function reexportedWrappedMixinExportsPlugin() {
  return {
    name: 'CORE - REEXPORTED-WRAPPED-MIXINS',
    analyzePhase({ts, node, moduleDoc, context}){
      switch(node.kind) {
        case ts.SyntaxKind.VariableStatement:
          if(!isMixin(node)) {
            node?.declarationList?.declarations?.forEach(declaration => {

              const mixins = [];
              if(ts.SyntaxKind.CallExpression === declaration?.initializer?.kind) {
                /**
                 * If an exported variable has a callExpression, it might try to export a mixin
                 * We need to check if the current module contains any mixins
                 */
                const moduleMixinDeclarations = moduleDoc?.declarations?.filter(declaration => declaration.kind === 'mixin');

                if(has(moduleMixinDeclarations)){
                  const mixinName = declaration?.initializer?.expression?.getText();
                  mixins.push(mixinName);

                  let node = declaration?.initializer?.arguments[0];
                  
                  /** 
                   * Handle nested Mixin calls 
                   */
                  while(node && ts.isCallExpression(node)) {
                    const mixinName = node.expression.getText();
                    mixins.push(mixinName);
  
                    node = node?.arguments[0]
                  }

                  /**
                   * See if we can find the supposed Mixin in the modules declaration
                   * If we do, change the name of MixinImpl to the variableDeclaration thats actually being exported
                   */
                  const foundMixin = moduleMixinDeclarations?.find(mixin => mixin.name === node?.getText());
                  if(foundMixin) {
                    foundMixin.name = declaration?.name?.getText()
      
                    /**
                     * Next, we need to add any other mixins found along the way to the exported mixin's `mixins` array
                     */
                    mixins?.forEach(mixin => {
                      const newMixin = createClassDeclarationMixin(mixin, moduleDoc, context);
                      foundMixin.mixins = [...(foundMixin?.mixins || []), newMixin];
                    });

                    /**
                     * At this point, there's now a variable declaration and a mixin declaration with the same name.
                     * We're only interested in the mixin, so we filter out the variable declaration
                     */
                    moduleDoc.declarations = moduleDoc?.declarations?.filter(declaration => !(declaration.kind === 'variable' && declaration.name === foundMixin.name));
                  }

                }
              }
            });
          }
          break;
      }
    }
  }
}