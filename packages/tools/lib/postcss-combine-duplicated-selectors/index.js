/*
 The MIT License (MIT)

Copyright (c) 2016 Christian Murphy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import parser from "postcss-selector-parser";
const name = "postcss-combine-duplicated-selectors";

function normalizeAttributes(selector) {
	selector.walkAttributes((node) => {
		if (node.value) {
			node.value = node.value.replace(/'|\\'|"|\\"/g, '');
		}
	});
}

function sortGroups(selector) {
	selector.each((subSelector) => {
		subSelector.nodes.sort((a, b) => {
			if (a.type !== b.type) {
				return 0;
			}

			return a.value < b.value ? -1 : 1;
		});
	});

	selector.sort((a, b) => (a.nodes.join('') < b.nodes.join('') ? -1 : 1));
}

function removeDupProperties(selector, exact) {
	if (!exact) {
		const retainedProps = new Set();

		for (let actIndex = selector.nodes.length - 1; actIndex >= 1; actIndex--) {
			const prop = selector.nodes[actIndex].prop;
			if (prop !== undefined) {
				if (!retainedProps.has(prop)) {
					retainedProps.add(prop);
				} else {
					selector.nodes[actIndex].remove();
				}
			}
		}
	} else {
		for (let actIndex = selector.nodes.length - 1; actIndex >= 1; actIndex--) {
			for (let befIndex = actIndex - 1; befIndex >= 0; befIndex--) {
				if (
					selector.nodes[actIndex].prop === selector.nodes[befIndex].prop &&
					selector.nodes[actIndex].value === selector.nodes[befIndex].value
				) {
					selector.nodes[befIndex].remove();
					actIndex--;
				}
			}
		}
	}
}

const uniformStyle = parser((selector) => {
	normalizeAttributes(selector);
	sortGroups(selector);
});

const defaultOptions = {
	removeDuplicatedProperties: false,
};

const combineDuplicatedSelectors = (options) => {
	options = Object.assign({}, defaultOptions, options);
	return {
		postcssPlugin: name,
		prepare() {
			const mapTable = new Map();
			mapTable.set('root', new Map());

			return {
				Rule: (rule) => {
					let map;
					if (rule.parent.type === 'atrule') {
						const query =
							rule.parent.name.toLowerCase() +
							rule.parent.params.replace(/\s+/g, '');

						map = mapTable.has(query) ?
							mapTable.get(query) :
							mapTable.set(query, new Map()).get(query);
					} else {
						map = mapTable.get('root');
					}

					const selector = uniformStyle.processSync(rule.selector, {
						lossless: false,
					});

					if (map.has(selector)) {
						const destination = map.get(selector);

						if (destination === rule) return;

						while (rule.nodes.length > 0) {
							destination.append(rule.nodes[0]);
						}
						rule.remove();
					} else {
						if (
							options.removeDuplicatedProperties ||
							options.removeDuplicatedValues
						) {
							// removeDupProperties(rule, options.removeDuplicatedValues);
						}
						map.set(selector, rule);
					}
				},
				OnceExit(root) {
					root.nodes.forEach(node => {
						if (node.type === "rule") {
							removeDupProperties(node, options.removeDuplicatedValues);
						}
					})
				}
			};
		},
	};
};

combineDuplicatedSelectors.postcss = true;

export default combineDuplicatedSelectors;
