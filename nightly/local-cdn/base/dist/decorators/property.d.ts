import type { Property } from "../UI5ElementMetadata.js";
/**
 * Returns a property decorator.
 *
 * @param { Property } propData
 * @returns { PropertyDecorator }
 */
declare const property: (propData?: Property) => PropertyDecorator;
export default property;
