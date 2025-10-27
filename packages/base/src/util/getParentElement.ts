const getParentElement = (element: Element) : Element | null => {
	return element.parentElement ? element.parentElement : (element.parentNode as ShadowRoot).host;
};

export default getParentElement;
