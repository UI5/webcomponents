const escapeReg = /[[\]{}()*+?.\\^$|]/g;

const escapeRegExp = (str: string): string => {
	return str.replace(escapeReg, "\\$&");
};

const StartsWithPerTerm = <T>(value: string, items: Array<T>, propName: string) => {
	const reg = new RegExp(`(^|\\s)${escapeRegExp(value.toLowerCase())}.*`, "g");

	return items.filter(item => {
		const text = item[propName as keyof typeof item] as string;

		reg.lastIndex = 0;

		return reg.test((text ?? "").toLowerCase());
	});
};

const StartsWith = <T>(value: string, items: Array<T>, propName: string): Array<T> => items.filter(item => (item[propName as keyof typeof item] as string || "").toLowerCase().startsWith(value.toLowerCase()));
const Contains = <T>(value: string, items: Array<T>, propName: string): Array<T> => items.filter(item => (item[propName as keyof typeof item] as string || "").toLowerCase().includes(value.toLowerCase()));
const None = <T>(_: string, items: Array<T>): Array<T> => items;

export {
	StartsWithPerTerm,
	StartsWith,
	Contains,
	None,
};
