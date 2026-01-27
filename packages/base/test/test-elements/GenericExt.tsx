import customElement from "../../src/decorators/customElement.js";
import property from "../../src/decorators/property.js";
import slot from "../../src/decorators/slot-strict.js";
import { Slot } from "../../src/UI5Element.js";
import Generic from "./Generic.js";

@customElement("ui5-test-generic-ext")
class GenericExt extends Generic {
	@property()
	extProp?: string;

	@property()
	strProp = "Ext";

	@slot()
	extSlot!: Slot<Array<HTMLElement>>;
}

GenericExt.define();

export default GenericExt;
