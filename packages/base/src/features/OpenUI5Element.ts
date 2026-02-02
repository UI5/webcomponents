import UI5Element from "../UI5Element.js";

class OpenUI5Element extends UI5Element {
	isOpenUI5Component?: boolean;
	__suppressFocusIn?: () => void;
	__suppressFocusBack?: (e: KeyboardEvent) => void;
	__redirectFocus?: boolean;
}

export default OpenUI5Element;
