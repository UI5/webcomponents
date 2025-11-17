import { dasherize } from '@github/catalyst/lib/dasherize.js';
import { attrDecoratorPlugin } from '../decorators/attr.js';
import { controllerPlugin } from './controller.js';

export const catalystPlugin2 = () => [
  attrDecoratorPlugin(attr => {
    attr.name = dasherize(attr.name);
    return attr;
  }),
  controllerPlugin()
]
