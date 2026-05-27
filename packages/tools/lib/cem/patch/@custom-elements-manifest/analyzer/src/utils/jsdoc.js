/**
 * UTILITIES RELATED TO JSDOC
 */

export function handleJsDocType(type) {
  return type?.replace(/(import\(.+?\).)/g, '') || '';
}

export function normalizeDescription(desc) {
  if (Array.isArray(desc)) {
    desc = desc.reduce((prev, curr) => prev += curr.getText(), '');
  }

  if (typeof desc === 'string' && desc?.startsWith('- ')) {
    desc = desc.slice(2);
  }

  return desc;
}
