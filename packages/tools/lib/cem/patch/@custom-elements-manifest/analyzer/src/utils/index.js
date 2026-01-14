import ts from 'typescript';

/**
 * GENERAL UTILITIES
 */

export const has = arr => Array.isArray(arr) && arr.length > 0;

/**
 * @example node?.modifiers?.find(decorator('Component'))
 */
export const decorator = type => decorator => ts.isDecorator(decorator) && decorator?.expression?.expression?.getText() === type || decorator?.expression?.getText() === type;

export function isBareModuleSpecifier(specifier) {
  return !!specifier?.replace(/'/g, '')[0].match(/[@a-zA-Z]/g);
}

export const url = path => new URL('', `file:///${path}`)?.pathname;

export function resolveModuleOrPackageSpecifier(moduleDoc, context, name) {
  const foundImport = context?.imports?.find(_import => _import.name === name);

  /* item is imported from another file */
  if(foundImport) {
    if(foundImport.isBareModuleSpecifier) {
      /* import is from 3rd party package */
      return { package: foundImport.importPath }
    } else {
      /* import is imported from a local module */
      return { module: new URL(foundImport.importPath, `file:///${moduleDoc.path}`).pathname }
    }
  } else {
    /* item is in current module */
    return { module: moduleDoc.path }
  }
}

export const toKebabCase = str => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
     ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
     : letter;
  }).join('');
}

/**
 * TS seems to struggle sometimes with the `.getText()` method on JSDoc annotations, like `@deprecated` in ts v4.0.0 and `@override` in ts v4.3.2
 * This is a bug in TS, but still annoying, so we add some safety rails here
 */
export const safe = (cb, returnType = '') => {
  try {
    return cb();
  } catch {
    return returnType;
  }
}

export function withErrorHandling(name, cb) {
  try {
    cb()
  } catch(e) {
    let errorMessage = '';
    const externalError = `Looks like you've hit an error in third party plugin: ${name}. Please try to create a minimal reproduction and inform the author of the ${name} plugin.`;
    const coreError = `Looks like you've hit an error in the core library. Please try to create a minimal reproduction at https://custom-elements-manifest.netlify.com and create an issue at: https://github.com/open-wc/custom-elements-manifest/issues`;
    if(name) {
      errorMessage = name.startsWith('CORE') ? coreError : externalError;
    }

    throw new Error(`\n\n[${name ?? 'unnamed-plugin'}]: ${errorMessage}\n\n ${e.stack}\n`);
  }
}
