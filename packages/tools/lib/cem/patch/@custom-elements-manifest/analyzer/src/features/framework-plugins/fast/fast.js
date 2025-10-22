import { attrDecoratorPlugin } from '../decorators/attr.js';
import { customElementDecoratorPlugin } from '../decorators/custom-element-decorator.js';

export const fastPlugin = () => [
  attrDecoratorPlugin(),
  customElementDecoratorPlugin()
]
