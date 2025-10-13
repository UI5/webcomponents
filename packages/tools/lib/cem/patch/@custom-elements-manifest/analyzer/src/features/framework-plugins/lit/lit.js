import { customElementDecoratorPlugin } from '../decorators/custom-element-decorator.js';
import { methodDenyListPlugin } from './method-denylist.js';
import { memberDenyListPlugin } from './member-denylist.js';
import { propertyDecoratorPlugin } from './property-decorator.js';
import { staticPropertiesPlugin } from './static-properties.js';

export const litPlugin = () => [
  customElementDecoratorPlugin(),
  methodDenyListPlugin(),
  memberDenyListPlugin(),
  propertyDecoratorPlugin(),
  staticPropertiesPlugin()
]
