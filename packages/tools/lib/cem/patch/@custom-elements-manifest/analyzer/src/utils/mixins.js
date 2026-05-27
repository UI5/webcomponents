import ts from 'typescript';

import { getReturnValue } from '../utils/ast-helpers.js';

export const isMixin = node => !!extractMixinNodes(node);

export function extractMixinNodes(node) {
  if (ts.isVariableStatement(node) || ts.isFunctionDeclaration(node)) {
    if (ts.isVariableStatement(node)) {
      /**
       * @example const MyMixin = klass => class MyMixin extends klass {}
       * @example export const MyMixin = klass => class MyMixin extends klass {}
       */
      const variableDeclaration = node.declarationList.declarations.find(declaration =>
        ts.isVariableDeclaration(declaration),
      );
      if (variableDeclaration) {
        const body = variableDeclaration?.initializer?.body;
        if (body && ts.isClassExpression(body)) {
          return { 
            mixinFunction: node,
            mixinClass: body,
          };
        }

        /**
         * @example const MyMixin = klass => { return class MyMixin extends Klass{} }
         */
        if (body && ts.isBlock(body)) {
          const returnStatement = body.statements.find(statement => ts.isReturnStatement(statement));

          if (returnStatement && returnStatement?.expression?.kind && ts.isClassExpression(returnStatement.expression)) {
            return { 
              mixinFunction: variableDeclaration.initializer,
              mixinClass: returnStatement.expression
            };
          }
        }

        /**
         * @example const MyMixin = klass => { class MyMixin extends klass {} return MyMixin;}
         */
        if (body && ts.isBlock(body)) {
          const classDeclaration = body.statements.find(statement => ts.isClassDeclaration(statement));
          const returnStatement = body.statements.find(statement => ts.isReturnStatement(statement));
          /** Avoid undefined === undefined */
          if(!(classDeclaration && returnStatement))
            return;
          const classDeclarationName = classDeclaration.name?.getText?.();
          const returnValue = getReturnValue(returnStatement)
          /**
           * If the classDeclaration inside the function body has the same name as whats being
           * returned from the function, consider it a mixin
           */
          if (classDeclarationName === returnValue) {
            return {
              mixinFunction: node,
              mixinClass: classDeclaration
            }
          }
        }
      }
    }

    /**
     *  @example function MyMixin(klass) { return class MyMixin extends Klass{} }
     */
    if (ts.isFunctionDeclaration(node)) {
      if (node.body && ts.isBlock(node.body)) {

        const returnStatement = node.body.statements.find(statement => ts.isReturnStatement(statement));

        if (returnStatement?.expression && ts.isClassExpression(returnStatement.expression)) {
          return { 
            mixinFunction: node, 
            mixinClass: returnStatement.expression
          };
        }
      }
    }

    /**
     * @example function MyMixin(klass) {class A extends klass {} return A;}
     */
    if (ts.isFunctionDeclaration(node)) {
      if (node.body && ts.isBlock(node.body)) {
        const classDeclaration = node.body.statements.find(statement => ts.isClassDeclaration(statement));
        const returnStatement = node.body.statements.find(statement => ts.isReturnStatement(statement));

        /** Avoid undefined === undefined */
        if(!(classDeclaration && returnStatement))
          return;

        const classDeclarationName = classDeclaration.name?.getText?.();

        const returnValue = getReturnValue(returnStatement)

        /**
         * If the classDeclaration inside the function body has the same name as whats being
         * returned from the function, consider it a mixin
         */
        if (classDeclarationName === returnValue) {
          return {
            mixinFunction: node,
            mixinClass: classDeclaration
          }
        }
      }
    }
  }
  return false;
}
