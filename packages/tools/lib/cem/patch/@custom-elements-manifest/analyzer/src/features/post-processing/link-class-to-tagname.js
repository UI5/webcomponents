import { getAllDeclarationsOfKind, getAllExportsOfKind } from '../../utils/manifest-helpers.js';

/**
 * LINK-CLASS-TO-TAGNAME
 * 
 * Links a custom element definition to its corresponding class
 */
export function linkClassToTagnamePlugin() {
  return {
    name: 'CORE - LINK-CLASS-TO-TAGNAME',
    packageLinkPhase({customElementsManifest, context}){
      /* Get all class declarations and custom element definitions in the manifest */
      const classes = getAllDeclarationsOfKind(customElementsManifest, 'class');
      const definitions = getAllExportsOfKind(customElementsManifest, 'custom-element-definition');

      /* Loop through all classes, and try to find their corresponding custom element definition */
      classes?.forEach((klass) => {
        const tagName = definitions?.find(def => def?.declaration?.name === klass?.name)?.name;

        /* If there's a match, we can link the custom element definition to the class */
        if (tagName && !klass.tagName) {
          klass.tagName = tagName;
        }
      });
    }
  }
}
