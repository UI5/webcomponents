import { url } from "../../utils/index.js";

export function resolveInitializersPlugin() {
  return {
    name: 'CORE - RESOLVE-INITIALIZERS',
    /** 
     * If a class field has a `resolveInitializer` property on it, it means its being assigned a variable. We need to resolve that variable, and get its type and default value 
     */
    packageLinkPhase({customElementsManifest}) {
      customElementsManifest?.modules?.forEach(mod => {
        mod?.declarations?.forEach(declaration => {
          declaration?.members
            ?.filter(({resolveInitializer}) => resolveInitializer)
            ?.forEach(member => {
              /** We ignore variables imported from a third party package */
              if('package' in member.resolveInitializer) {
                delete member.resolveInitializer;
                return;
              };

              /** Find the module */
              const foundModule = customElementsManifest?.modules?.find(({path}) => {
                let toResolve = url(member?.resolveInitializer?.module);
                const modulePath = url(path);

                if(!toResolve.endsWith('.js') && !toResolve.endsWith('.ts')) {
                  toResolve += '.ts';
                }

                return toResolve === modulePath;
              });

              if(foundModule) {
                /** Find the declaration */
                const foundReference = foundModule?.declarations?.find(declaration => declaration?.name === member?.default);
                /** Overwrite the type with the type of the reference we found */
                if(foundReference?.type && !member?.type) {
                  member.type = foundReference.type;
                }
                
                if(foundReference?.default) {
                  member.default = foundReference?.default;
                }
              }

              delete member.resolveInitializer;
            });
        });
      });
    }
  }
}
