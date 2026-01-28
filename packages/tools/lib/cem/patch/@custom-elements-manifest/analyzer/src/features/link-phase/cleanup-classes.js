import { has } from "../../utils/index.js"

/**
 * CLEANUP-CLASSES
 *
 * Removes empty arrays from classes; e.g. if a class doesn't have any `members`,
 * then we remove it from the class doc
 */
export function cleanupClassesPlugin() {
  return {
    name: 'CORE - CLEANUP-CLASSES',
    moduleLinkPhase({moduleDoc}){
      const classes = moduleDoc?.declarations?.filter(declaration => declaration.kind === 'class' || declaration.kind === 'mixin');

      classes?.forEach(klass => {
        ['cssProperties', 'cssParts', 'slots', 'members', 'attributes', 'events', 'cssStates'].forEach(field => {
          if(!has(klass[field])) {
            delete klass[field];
          }
        });
      });
    },
  }
}

