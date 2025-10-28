import { getAllDeclarationsOfKind, getModuleForClassLike, getModuleFromManifests, getInheritanceTree } from '../../utils/manifest-helpers.js';
import { resolveModuleOrPackageSpecifier } from '../../utils/index.js';

/**
 * APPLY-INHERITANCE-PLUGIN
 *
 * Applies inheritance for all classes in the manifest
 */
export function applyInheritancePlugin() {
  return {
    name: 'CORE - APPLY-INHERITANCE',
    packageLinkPhase({customElementsManifest, context}){
      const allManifests = [customElementsManifest, ...(context.thirdPartyCEMs || [])];
      const classLikes = [];

      allManifests.forEach((manifest) => {
        const classes =  getAllDeclarationsOfKind(manifest, 'class');
        const mixins =  getAllDeclarationsOfKind(manifest, 'mixin');
        classLikes.push(...[...classes, ...mixins]);
      });

      classLikes.forEach((customElement) => {
        const inheritanceChain = getInheritanceTree(allManifests, customElement.name);

        inheritanceChain?.forEach(klass => {
          // ignore the current class itself
          if (klass?.name === customElement.name) {
            return;
          }

          ['slots', 'cssParts', 'cssProperties', 'attributes', 'members', 'events', 'cssStates'].forEach(type => {
            klass?.[type]?.forEach(currItem => {
              const containingModulePath = getModuleForClassLike(allManifests, klass.name);
              const containingModule = getModuleFromManifests(allManifests, containingModulePath);

              const newItem = { ...currItem };

              /**
                * If an attr or member is already present in the base class, but we encounter it here,
                * it means that the base has overridden that method from the super class
                * So we either add the data to the overridden method, or we add it to the array as a new item
                */
              const existing = customElement?.[type]?.find(item => newItem.name === item.name);

              if (existing) {

                existing.inheritedFrom = {
                  name: klass.name,
                  ...resolveModuleOrPackageSpecifier(containingModule, context, klass.name)
                }

                customElement[type] = customElement?.[type]?.map(item => item.name === existing.name
                  ? {
                      ...newItem,
                      ...existing,
                    // Patch: Custom patch to not merge child parent privacy/type
                    // https://github.com/open-wc/custom-elements-manifest/pull/300
                    //   ...{
                    //     ...(newItem.type ? { type: newItem.type } : {}),
                    //     ...(newItem.privacy ? { privacy: newItem.privacy } : {})
                    //   }
                    }
                  : item);
              } else {
                newItem.inheritedFrom = {
                  name: klass.name,
                  ...resolveModuleOrPackageSpecifier(containingModule, context, klass.name)
                }

                customElement[type] = [...(customElement[type] || []), newItem];
              };
            });
          });
        });
      });
    }
  }
}
