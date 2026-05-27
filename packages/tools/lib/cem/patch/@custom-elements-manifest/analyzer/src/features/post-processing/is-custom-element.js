const BASECLASSES = [
  'htmlelement', 
  'litelement', 
  'fastelement'
];

/**
 * ISCUSTOMELEMENT
 * 
 * Heuristic to see whether or not a class is a custom element
 */
export function isCustomElementPlugin() {
  return {
    name: 'CORE - IS-CUSTOM-ELEMENT',
    packageLinkPhase({customElementsManifest, context}) {
      customElementsManifest?.modules?.forEach(_module => {
        _module?.declarations?.forEach(declaration => {
          if(declaration?.kind === 'class') {
            /** If a class has a tagName, that means its been defined, and is a custom element */
            if(declaration?.tagName) {
              declaration.customElement = true;
            }
            
            /** If a class extends from any of these, its a custom element */
            if(BASECLASSES.includes(declaration?.superclass?.name?.toLowerCase())) {
              declaration.customElement = true;
            }
          }
        });
      });
    }
  }
}

