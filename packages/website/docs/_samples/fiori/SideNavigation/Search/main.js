import "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSearchField.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Tag.js";

import "@ui5/webcomponents-icons/dist/menu.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/unfavorite.js";
import "@ui5/webcomponents-icons/dist/account.js";
import "@ui5/webcomponents-icons/dist/learning-assistant.js";
import "@ui5/webcomponents-icons/dist/crm-sales.js";
import "@ui5/webcomponents-icons/dist/customer-view.js";
import "@ui5/webcomponents-icons/dist/money-bills.js";
import "@ui5/webcomponents-icons/dist/manager-insight.js";
import "@ui5/webcomponents-icons/dist/bar-chart.js";
import "@ui5/webcomponents-icons/dist/discussion-2.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/customer-and-supplier.js";
import "@ui5/webcomponents-icons/dist/message-information.js";
import "@ui5/webcomponents-icons/dist/course-book.js";
import "@ui5/webcomponents-icons/dist/connected.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";

const nl1 = document.getElementById("nl1");
const searchField = document.getElementById("searchField");
const sideNav = document.getElementById("sn1");

document.getElementById("startButton").addEventListener("click", function () {
	if (nl1.isSideCollapsed()) {
		nl1.mode = "Expanded";
	} else {
		searchField.value = "";
		executeSearch();
		nl1.mode = "Collapsed";
	}
});

const data = {
	navigation: [{
		title: "Home",
		icon: "home",
		key: "home",
		href: "#/home"
	}, {
		type: "group",
		title: "Business Operations",
		expanded: true,
		items: [{
			title: "Favorites",
			icon: "unfavorite",
			expanded: true,
			selectable: false,
			tagText: "3 Items",
			tagState: "Indication17",
			items: [{
				title: "My Accounts",
				key: "myAccounts",
				href: "#/myAccounts"
			}, {
				title: "My Orders",
				key: "myOrders",
				href: "#/myOrders",
				tagText: "5 Pending",
				tagState: "Indication20"
			}]
		}, {
			title: "Customer Management",
			icon: "account",
			expanded: true,
			selectable: false,
			key: "CustomerManagement",
			href: "#CustomerManagement",
			items: [{
				title: "Contacts",
				key: "contacts",
				href: "#/contacts"
			}, {
				title: "Companies",
				key: "companies",
				href: "#/companies"
			}, {
				title: "Partners",
				key: "partners",
				href: "#/partners"
			}]
		}, {
			title: "SAP Best Practices",
			icon: "learning-assistant",
			key: "sapBestPractices",
			href: "https://sap.com",
			target: "_blank",
			selectable: false
		}, {
			title: "Sales",
			icon: "crm-sales",
			expanded: true,
			selectable: false,
			key: "Sales",
			href: "#/Sales",
			items: [{
				title: "Leads",
				key: "leads",
				href: "#/leads"
			}, {
				title: "Opportunities",
				key: "opportunities",
				href: "#/opportunities"
			}, {
				title: "Quotes",
				key: "quotes",
				href: "#/quotes"
			}, {
				title: "Orders",
				key: "orders",
				href: "#/orders"
			}, {
				title: "Invoices",
				key: "invoices",
				href: "#/invoices"
			}]
		}, {
			title: "Products",
			icon: "customer-view",
			expanded: true,
			key: "products",
			href: "#/products",
			tagText: "Low Stock",
			tagState: "Indication18",
			items: [{
				title: "Product Catalog",
				key: "productCatalog",
				href: "#/productCatalog"
			}, {
				title: "Pricing",
				key: "pricing",
				href: "#/pricing"
			}, {
				title: "Inventory Management",
				key: "inventoryManagement",
				href: "#/inventoryManagement"
			}]
		}, {
			title: "Marketing",
			icon: "customer-view",
			expanded: true,
			selectable: false,
			key: "marketing",
			href: "#/marketing",
			items: [{
				title: "Campaigns",
				key: "campaigns",
				href: "#/campaigns"
			}, {
				title: "E-mail Marketing",
				key: "emailMarketing",
				href: "#/emailMarketing"
			}, {
				title: "Marketing Automation",
				key: "marketingAutomation",
				href: "#/marketingAutomation"
			}]
		}, {
			title: "Finance",
			icon: "money-bills",
			expanded: true,
			selectable: false,
			items: [{
				title: "Accounts Receivable",
				key: "accountsReceivable",
				href: "#/accountsReceivable"
			}, {
				title: "Accounts Payable",
				key: "accountsPayable",
				href: "#/accountsPayable"
			}, {
				title: "Budget Planning",
				key: "budgetPlanning",
				href: "#/budgetPlanning"
			}, {
				title: "Tax Management",
				key: "taxManagement",
				href: "#/taxManagement"
			}]
		}, {
			title: "Year-End Financial Reports",
			icon: "manager-insight",
			expanded: true,
			key: "reports",
			href: "#/reports",
			items: [{
				title: "Sales Reports",
				key: "salesReports",
				href: "#/salesReports"
			}, {
				title: "Customer reports",
				key: "customerReports",
				href: "#/customerReports"
			}]
		}]
	}, {
		type: "group",
		title: "System & Administration",
		expanded: true,
		items: [{
			title: "Analytics",
			icon: "bar-chart",
			key: "analytics",
			href: "#/analytics",
			tagText: "Beta",
			tagState: "Indication15"
		}, {
			title: "SAP Community",
			icon: "discussion-2",
			key: "sapCommunity",
			href: "https://sap.com",
			target: "_blank",
			selectable: false
		}, {
			title: "Administration",
			icon: "settings",
			expanded: false,
			selectable: false,
			items: [{
				title: "User Management",
				key: "userManagement",
				href: "#/userManagement"
			}, {
				title: "System Configuration",
				key: "systemConfig",
				href: "#/systemConfig"
			}, {
				title: "Audit Log",
				key: "auditLog",
				href: "#/auditLog"
			}]
		}, {
			title: "Service Management",
			icon: "customer-and-supplier",
			expanded: false,
			selectable: false,
			items: [{
				title: "Service Tickets",
				key: "serviceTickets",
				href: "#/serviceTickets"
			}, {
				title: "Knowledge Base",
				key: "knowledgeBase",
				href: "#/knowledgeBase"
			}, {
				title: "Service Contracts",
				key: "serviceContracts",
				href: "#/serviceContracts"
			}]
		}, {
			title: "Notifications",
			icon: "message-information",
			key: "notifications",
			href: "#/notifications",
			tagText: "8 New",
			tagState: "Indication18"
		}, {
			title: "SAP Training",
			icon: "course-book",
			key: "sapTraining",
			href: "https://sap.com",
			target: "_blank",
			selectable: false
		}, {
			title: "Integration Hub",
			icon: "connected",
			expanded: false,
			key: "integrationHub",
			href: "#/integrationHub",
			items: [{
				title: "API Management",
				key: "apiManagement",
				href: "#/apiManagement"
			}, {
				title: "Data Sync",
				key: "dataSync",
				href: "#/dataSync"
			}]
		}]
	}],
	fixedNavigation: [{
		title: "Product Settings",
		icon: "settings",
		key: "productSettings",
		href: "#/productSettings"
	}, {
		title: "SAP Support Portal",
		icon: "sys-help",
		key: "sapSupport",
		tagText: "24/7",
		tagState: "Indication16",
		href: "https://sap.com",
		target: "_blank",
		selectable: false
	}]
};

// Map the "IndicationNN" tag states to the recommended ui5-tag colorScheme (5-10).
function tagColorScheme(tagState) {
	const map = {
		Indication15: "5",
		Indication16: "6",
		Indication17: "7",
		Indication18: "8",
		Indication19: "9",
		Indication20: "10",
	};
	return map[tagState] || "5";
}

// Escapes a value so it is safe to inject as HTML text / attribute content.
function escapeHtml(value) {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function tagMarkup(node) {
	if (!node.tagText) {
		return "";
	}
	return `<ui5-tag slot="tag" design="Set2" color-scheme="${tagColorScheme(node.tagState)}" hide-state-icon>${escapeHtml(node.tagText)}</ui5-tag>`;
}

// Second-level (child) navigation entry.
function subItemMarkup(node) {
	const attrs = [`text="${escapeHtml(node.title)}"`];
	if (node.href) {
		attrs.push(`href="${escapeHtml(node.href)}"`);
	}
	if (node.target) {
		attrs.push(`target="${escapeHtml(node.target)}"`);
	}
	if (node.selectable === false) {
		attrs.push("unselectable");
	}
	return `<ui5-side-navigation-sub-item ${attrs.join(" ")}>${tagMarkup(node)}</ui5-side-navigation-sub-item>`;
}

// Top-level navigation entry (optionally with sub-items). `slot` places it in a
// named slot (e.g. "fixedItems") when provided.
function itemMarkup(node, slot) {
	const attrs = [`text="${escapeHtml(node.title)}"`];
	if (slot) {
		attrs.push(`slot="${escapeHtml(slot)}"`);
	}
	if (node.icon) {
		attrs.push(`icon="${escapeHtml(node.icon)}"`);
	}
	if (node.href) {
		attrs.push(`href="${escapeHtml(node.href)}"`);
	}
	if (node.target) {
		attrs.push(`target="${escapeHtml(node.target)}"`);
	}
	if (node.expanded) {
		attrs.push("expanded");
	}
	// Unselectable when explicitly marked or external (_blank).
	if (node.selectable === false || node.target === "_blank") {
		attrs.push("unselectable");
	}
	const children = tagMarkup(node) + (node.items || []).map(subItemMarkup).join("");
	return `<ui5-side-navigation-item ${attrs.join(" ")}>${children}</ui5-side-navigation-item>`;
}

// A "group" node maps to ui5-side-navigation-group; anything else is a plain item.
function nodeMarkup(node) {
	if (node.type === "group") {
		const attrs = [`text="${escapeHtml(node.title)}"`];
		if (node.expanded) {
			attrs.push("expanded");
		}
		const children = (node.items || []).map(child => itemMarkup(child)).join("");
		return `<ui5-side-navigation-group ${attrs.join(" ")}>${children}</ui5-side-navigation-group>`;
	}
	return itemMarkup(node);
}

// Renders the given data into the side navigation. Keep this pure so a filtered
// copy of `data` can be passed in later to re-render the matching items only.
function renderNavigation(navData) {
	// Remove only previously-rendered navigation items/groups, keeping any
	// default slotted content (e.g. the search field in the "filterSection" slot).
	sideNav.querySelectorAll("ui5-side-navigation-item, ui5-side-navigation-group").forEach(el => el.remove());

	const markup = (navData.navigation || []).map(nodeMarkup).join("")
		+ (navData.fixedNavigation || []).map(node => itemMarkup(node, "fixedItems")).join("");

	sideNav.insertAdjacentHTML("beforeend", markup);

	// Select the first selectable top-level item by default.
	const firstSelectable = sideNav.querySelector("ui5-side-navigation-item:not([unselectable])");
	if (firstSelectable) {
		firstSelectable.selected = true;
	}
}

renderNavigation(data);

function filterItems(items, value) {
	if (!items) {
		return [];
	}

	const lowerCaseValue = value.toLowerCase();

	return items.reduce(function (result, item) {
		const titleMatches = item.title && item.title.toLowerCase().indexOf(lowerCaseValue) > -1;
		const tagTextMatches = item.tagText && item.tagText.toLowerCase().indexOf(lowerCaseValue) > -1;

		if (titleMatches || tagTextMatches) {
			result.push(item);
		} else if (item.items) {
			const filteredChildren = filterItems(item.items, value);
			if (filteredChildren.length > 0) {
				result.push(Object.assign({}, item, { items: filteredChildren }));
			}
		}

		return result;
	}, []);
}

function countItems(items, value) {
	if (!items) {
		return 0;
	}

	const lowerCaseValue = value.toLowerCase();

	return items.reduce((count, item) => {
		const titleMatches = item.title?.toLowerCase().includes(lowerCaseValue);
		const tagTextMatches = item.tagText?.toLowerCase().includes(lowerCaseValue);
		return count + (titleMatches || tagTextMatches ? 1 : 0) + countItems(item.items, value);
	}, 0);
}

function executeSearch(value) {
	// Highlight the matching portions of the rendered item texts.
	sideNav.highlightedText = value || "";

	if (!value) {
		renderNavigation(data);
		return 0;
	}

	const combinedItems = data.navigation.concat(data.fixedNavigation);

	const filteredData = {
		navigation: filterItems(combinedItems, value),
		fixedNavigation: []
	};

	renderNavigation(filteredData);

	return countItems(combinedItems, value);
}

searchField.addEventListener("input", function () {
	executeSearch(searchField.value);
});

searchField.addEventListener("search", function () {
	const value = searchField.value;
	if (!value) {
		return;
	}

	const matchCount = executeSearch(value);
	sideNav.announceSearchMatchCount(matchCount);
});
