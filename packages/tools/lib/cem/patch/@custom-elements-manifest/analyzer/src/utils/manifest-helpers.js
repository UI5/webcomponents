/**
 * UTILITIES RELATED TO GETTING INFORMATION OUT OF A MANIFEST OR DOC
 */

import { has } from "./index.js";

/**
 * @typedef {import('custom-elements-manifest/schema').Package} Package
 */

function loopThroughDeclarations(manifest, predicate) {
  manifest?.modules?.forEach(_module => {
    _module?.declarations?.forEach(predicate);
  });
}

function loopThroughExports(manifest, predicate) {
  manifest?.modules?.forEach(_module => {
    _module?.exports?.forEach(predicate);
  });
}

/**
 * Loops through all modules' exports, and returns the kind provided by the users
 *
 * @example getKind('class');
 * @example getKind('custom-element-definition');
 */
export function getAllExportsOfKind(manifest, kind) {
  const result = [];
  loopThroughExports(manifest, (_export) => {
    if(_export.kind === kind) {
      result.push(_export);
    }
  });
  return result;
}


/**
 * Loops through all modules' declarations, and returns the kind provided by the users
 *
 * @example getKind('class');
 * @example getKind('custom-element-definition');
 */
export function getAllDeclarationsOfKind(manifest, kind) {
  const result = [];
  loopThroughDeclarations(manifest, (declaration) => {
    if(declaration.kind === kind) {
      result.push(declaration);
    }
  });
  return result;
}

/**
 * Gets the inheritance tree from a manifest given a className
 * Returns an array of a classes mixins/superclasses all the way up the chain
 *
 * @param {Package[]} manifests
 * @param {string} className
 */
export function getInheritanceTree(manifests, className) {
  const tree = [];
  const allClassLikes = new Map();
  const _classes = [];
  const _mixins = [];

  manifests.forEach((cem) => {
    _classes.push(...getAllDeclarationsOfKind(cem, 'class'));
    _mixins.push(...getAllDeclarationsOfKind(cem, 'mixin'));
  });

  [..._mixins, ..._classes].forEach((klass) => {
    allClassLikes.set(klass.name, klass);
  });

  let klass = allClassLikes.get(className)

  if(klass) {
    tree.push(klass)

    klass?.mixins?.forEach(mixin => {
      let foundMixin = _mixins.find(m => m.name === mixin.name);
      if(foundMixin) {
        tree.push(foundMixin);

        while(has(foundMixin?.mixins)) {
          foundMixin?.mixins?.forEach(mixin => {
            foundMixin =  _mixins.find(m => m.name === mixin.name);
            if(foundMixin) {
              tree.push(foundMixin);
            }
          });
        }
      }
    });

    while(allClassLikes.has(klass.superclass?.name)) {
      const newKlass = allClassLikes.get(klass.superclass.name);
      let allMixins = [];
      if (klass?.mixins) {
        allMixins = [...klass.mixins];
      }
      if (newKlass?.mixins) {
        allMixins = [...allMixins, ...newKlass.mixins];
      }

      allMixins.forEach(mixin => {
        let foundMixin = _mixins.find(m => m.name === mixin.name);
        if(foundMixin) {
          tree.push(foundMixin);

          while(has(foundMixin?.mixins)) {
            foundMixin?.mixins?.forEach(mixin => {
              foundMixin =  _mixins.find(m => m.name === mixin.name);
              if(foundMixin) {
                tree.push(foundMixin);
              }
            });
          }
        }
      });

      tree.push(newKlass);
      klass = newKlass;
    }
    return tree;
  }
  return [];
}

/**
 * @param {Package[]} manifests
 * @param {string} modulePath
 */
 export function getModuleFromManifests(manifests, modulePath) {
   let result = undefined;

   manifests.forEach((cem) => {
    cem?.modules?.forEach((_module) => {
      if (_module.path === modulePath) {
        result = _module;
      }
    });
  });

  return result;
}

/**
 * @param {Package[]} manifests
 * @param {string} className
 */
 export function getModuleForClassLike(manifests, className) {
  let result = undefined;

  manifests.forEach((cem) => {
    cem?.modules?.forEach(_module => {
      _module?.declarations?.forEach(declaration => {
        if((declaration.kind === 'class' || declaration.kind === 'mixin') && declaration.name === className) {
          result = _module.path;
        }
      });
    });
  });

  return result;
}

/**
 * Given a manifest module, a class name, and a class member name, gets the
 * manifest doc for the module's class' member.
 *
 * @param  {Partial<import('custom-elements-manifest/schema').Module>} moduleDoc Manifest module
 * @param  {string} className Class to get member of
 * @param  {string} memberName Class member to get
 * @param  {boolean} isStatic Is it a static member?
 * @return {import('custom-elements-manifest/schema').ClassMember|void} the requested class member
 */
export function getClassMemberDoc(moduleDoc, className, memberName, isStatic = false) {
  /** @type {import('custom-elements-manifest/schema').ClassDeclaration} */
  const classDoc = (moduleDoc.declarations.find(x => x.name === className));

  if (!classDoc || !has(classDoc.members))
    return;

  const memberDoc = classDoc.members.find(x =>
    x.name === memberName &&
    (x.static ?? false) === isStatic
  );

  return memberDoc;
}
