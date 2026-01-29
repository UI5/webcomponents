// createInstanceChecker<A>("isAItem")
function createChecker<T, P extends keyof T = keyof T>(prop: P) {
	return (object: any): object is T => {
		return object !== undefined && prop in object && object[prop] === true;
	};
}

// TBD: Discuss if required
//
// (1) Filter multiple types at once
// const isInstanceOfAOrB = createMultiInstanceChecker<A | B>(["isAItem", "isBItem"])
// const filteredItems = items.filter(isInstanceOfAOrB)
//
// (2) Or, filter separately:
// const isInstanceOfA = createInstanceChecker<A>("isAItem");
// const isInstanceOfB = createInstanceChecker<A>("isBItem")
// const filteredItems = [...items.filter(isInstanceOfA), ...items.filter(isInstanceOfB)];
export const createMultiInstanceChecker = <T>(props: string[] | string) => {
	return (object: any): object is T => {
		if (!object) {
			return false;
		}

		const propsArray = Array.isArray(props) ? props : [props];
		return propsArray.some(prop => prop in object && object[prop] === true);
	};
};

export default createChecker;
