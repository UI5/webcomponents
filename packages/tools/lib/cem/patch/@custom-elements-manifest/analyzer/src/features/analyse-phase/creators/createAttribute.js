export function createAttribute(node) {
  const attributeTemplate = {
    name: node?.text || ''
  }
  return attributeTemplate;
}

export function createAttributeFromField(field) {
  const attribute = {
    ...field,
    fieldName: field.name
  }

  /** 
   * Delete the following properties because they don't exist on a attributeDoc 
   */
  delete attribute.kind;
  delete attribute.static;
  delete attribute.privacy;
  delete attribute.reflects;
  delete attribute.resolveInitializer;

  return attribute;
}