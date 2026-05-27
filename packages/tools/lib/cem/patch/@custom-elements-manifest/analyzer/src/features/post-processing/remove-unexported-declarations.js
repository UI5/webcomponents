import { has } from '../../utils/index.js';

/**
 * REMOVE-UNEXPORTED-DECLARATIONS
 * 
 * If a module has declarations that are _not_ exported, that means those declarations are considered 'private' to that module, and they shouldnt be present in the manifest, so we remove them.
 */
export function removeUnexportedDeclarationsPlugin() {
  return {
    name: 'CORE - REMOVE-UNEXPORTED-DECLARATIONS',
    packageLinkPhase({customElementsManifest}){
      customElementsManifest?.modules?.forEach(mod => {
        if(has(mod?.declarations)) {
          mod.declarations = mod?.declarations?.filter(declaration => {
            return mod?.exports?.some(_export => {
              return declaration?.name === _export?.name || declaration?.name === _export?.declaration?.name;
            });
          });
        }
      });
    },
  }
}
