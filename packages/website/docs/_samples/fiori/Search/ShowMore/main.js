import "@ui5/webcomponents-fiori/dist/Search.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-fiori/dist/SearchItem.js";
import "@ui5/webcomponents-fiori/dist/SearchItemShowMore.js";
import "@ui5/webcomponents-fiori/dist/SearchItemGroup.js";

		const allItems = [
			{ text: "List Item 1", icon: "history" },
			{ text: "List Item 2", icon: "search" },
			{ text: "List Item 3", icon: "history" },
			{ text: "List Item 4", icon: "history" },
			{ text: "List Item 5", icon: "search" },
			{ text: "List Item 6", icon: "globe" }
		];
		const searchShow = document.getElementById("searchShowMore");
		const group1 = document.getElementById("group1");
		const visibleCount = 3;

		function createSearchItem({ text, icon }) {
			const el = document.createElement("ui5-search-item");
			el.setAttribute("text", text);
			el.setAttribute("icon", icon);
			el.setAttribute("deletable", true);
			el.addEventListener("ui5-delete", () => el.remove());
			return el;
		}

		function renderItemSlice(items, container, insertBefore = null) {
			return items.map(item => {
				const el = createSearchItem(item);
				if (insertBefore) {
					container.insertBefore(el, insertBefore);
				} else {
					container.appendChild(el);
				}
				return el;
			});
		}

		function renderItems(items) {
			const visibleItems = items.slice(0, visibleCount);
			const hiddenItems = items.slice(visibleCount);

			renderItemSlice(visibleItems, group1);

			if (hiddenItems.length) {
				const showMoreEl = document.createElement("ui5-search-item-show-more");
				showMoreEl.setAttribute("items-to-show-count", hiddenItems.length);
				group1.appendChild(showMoreEl);

				function expandHiddenItems({ focusFirst = false } = {}) {
					const newEls = renderItemSlice(hiddenItems, group1, showMoreEl);
					showMoreEl.remove();
					if (focusFirst && newEls.length > 0) {
						//wait the new items to show
						setTimeout(() => {
							newEls[0].focus()
						}, 0);
					}
				}
				showMoreEl.addEventListener("ui5-click", (e) => {
					expandHiddenItems({ focusFirst: e.detail.fromKeyboard });
				});
			}
		}
		renderItems(allItems);