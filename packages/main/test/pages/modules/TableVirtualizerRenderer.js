export function getPositionalRange(table, virtualizer, first, last, previousCount, reserveRowHeight = 32) {
	// Keep the high-water mark connected; the requested range always takes precedence over the reserve.
	const capacity = Math.ceil((table._tableElement.clientHeight + 4 * Math.max(0, virtualizer.overscan)) / reserveRowHeight) + 2;
	const count = Math.min(virtualizer.rowCount, Math.max(last - first, previousCount, capacity));
	first = Math.min(first, Math.max(0, virtualizer.rowCount - count));
	return { first, last: first + count };
}

export function setText(element, text) {
	if (!element.firstChild) {
		element.appendChild(document.createTextNode(text));
	} else if (element.firstChild.data !== text) {
		element.firstChild.data = text;
	}
}

// Patch the demo's generated rich markup by position, keeping matching nodes connected.
function patchChildren(target, source) {
	const current = Array.from(target.childNodes);
	const children = Array.from(source.childNodes);
	children.forEach((next, index) => {
		const node = current[index];
		if (!node) {
			target.appendChild(next);
		} else if (node.nodeType !== next.nodeType || node.nodeName !== next.nodeName) {
			target.replaceChild(next, node);
		} else if (node.nodeType === Node.TEXT_NODE) {
			if (node.data !== next.data) {
				node.data = next.data;
			}
		} else {
			Array.from(node.attributes).forEach(attribute => {
				if (!next.hasAttribute(attribute.name)) {
					node.removeAttribute(attribute.name);
				}
			});
			Array.from(next.attributes).forEach(attribute => {
				if (node.getAttribute(attribute.name) !== attribute.value) {
					node.setAttribute(attribute.name, attribute.value);
				}
			});
			patchChildren(node, next);
		}
	});
	current.slice(children.length).forEach(node => node.remove());
}

export function setMarkup(element, markup) {
	if (element._markup === markup) {
		return;
	}
	const template = document.createElement("template");
	template.innerHTML = markup;
	patchChildren(element, template.content);
	element._markup = markup;
}
