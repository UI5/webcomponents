function createChecker<T, P extends keyof T = keyof T>(prop: P) {
	return (object: any): object is T => {
		return object !== undefined && prop in object && object[prop] === true;
	};
}

export default createChecker;
