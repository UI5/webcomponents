import {
  handleDefaultValue,
  handleExplicitType,
  handleJsDoc,
  handleModifiers,
  handlePrivateMember,
  handleTypeInference,
  handleWellKnownTypes
} from './handlers.js';

export function createField(node) {
  let fieldTemplate = {
    kind: 'field',
    name: node?.name?.getText() || '',
  }

  fieldTemplate = handlePrivateMember(fieldTemplate, node);
  fieldTemplate = handleTypeInference(fieldTemplate, node);
  fieldTemplate = handleExplicitType(fieldTemplate, node);
  fieldTemplate = handleModifiers(fieldTemplate, node);
  fieldTemplate = handleDefaultValue(fieldTemplate, node);
  fieldTemplate = handleWellKnownTypes(fieldTemplate, node);
  fieldTemplate = handleJsDoc(fieldTemplate, node);

  return fieldTemplate;
}
