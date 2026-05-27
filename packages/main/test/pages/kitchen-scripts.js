document.addEventListener("DOMContentLoaded", function(event) {
	var menuBtn = document.getElementById("menu-btn");
	var mutated = false;
	var sideNav = document.getElementById("side-nav");
	var mainContent = document.getElementById("main-content");
	var Configuration = window["sap-ui-webcomponents-bundle"].configuration;
	var COMPACT_CLASS = "ui5-content-density-compact";
	var THEME = Configuration.getTheme();
	var HCB = "sap_horizon_hcb";
	var FIORI3 = "sap_fiori_3";
	var FIORI3_DARK = "sap_fiori_3_dark";
	var btnRTL = document.getElementById("btnRTL");
	var btnCompact = document.getElementById("btnCompact");
	var btnTheme = document.getElementById("btnTheme");
	var btnLightDark = document.getElementById("btnLightDark");

	/* SideNav */
	function toggleSideNav(toggle) {
		if (toggle) {
			openNav();
		} else {
			closeNav();
		}
	}
	function openNav() {
		sideNav.style.width = "14rem";
		mainContent.style.marginLeft = "14rem";
	}

	function closeNav() {
		sideNav.style.width = "0";
		mainContent.style.marginLeft= "0";
	}

	function buildURL(compact, rtl, theme) {
		var currentURL = window.location.href;
		var params = ".html?sap-ui-theme=" + theme + "&sap-ui-rtl=" + !!rtl;
		return currentURL.slice(0, currentURL.indexOf(".html")) + params;
	}

	btnTheme.pressed = !!(THEME === HCB);
	btnLightDark.pressed = !!(THEME === FIORI3_DARK);

	btnRTL.addEventListener('click', function(e) {
		if (e.target.pressed) {
			document.body.setAttribute("dir", "rtl");
		} else {
			document.body.removeAttribute("dir");
		}
		window['sap-ui-webcomponents-bundle'].applyDirection();
	}, false);

	btnCompact.addEventListener('click', function(e) {
		if (document.body.classList.contains(COMPACT_CLASS)) {
			return document.body.classList.remove(COMPACT_CLASS);
		}

		document.body.classList.add(COMPACT_CLASS);
	}, false);

	btnTheme.addEventListener('click', function(e) {
		var theme = e.target.pressed ? HCB : FIORI3;
		window.location.href = buildURL(e.target.pressed, btnRTL.pressed, theme);
	}, false);

	btnLightDark.addEventListener('click', function(e) {
		var theme = e.target.pressed ? FIORI3_DARK : FIORI3;
		window.location.href = buildURL(e.target.pressed, btnRTL.pressed, theme);
	}, false);

	menuBtn.addEventListener('click', function(event) {
		toggleSideNav(event.detail.pressed);
	});

	/* Popover */
	var popover = document.getElementById("hello-popover");
	var popoverOpener = document.getElementById("openPopoverButton");
	var popoverCloser = document.getElementById("closePopoverButton");

	popoverOpener.addEventListener("click", function() {
		popover.opener = popoverOpener;
		popover.open = true;
	});
	popoverCloser.addEventListener("click", function() {
		popover.open = false;
	});

	/* Dialog */
	var dialog = document.getElementById("hello-dialog");
	var dialog2 = document.getElementById("hello-dialog2");
	var dialogOpener = document.getElementById("openDialogButton");
	var dialogOpener2 = document.getElementById("openDialogStretched");
	var dialogCloser = document.getElementById("closeDialogButton");
	var dialogCloser2 = document.getElementById("closeDialogStretched");


	dialogOpener.addEventListener("click", function() {
		dialog.open = true;
	});
	dialogOpener2.addEventListener("click", function() {
		dialog2.open = true;
	});
	dialogCloser.addEventListener("click", function() {
		dialog.open = false;
	});
	dialogCloser2.addEventListener("click", function() {
		dialog2.open = false;
	});

	/* List */
	var list = document.getElementById('myList');
	var resetBtn = document.getElementById('button1');
	var items = [{id: "ar", name: "Argentina"}, {id: "bg", name: "Bulgaria"}, {id: "ch", name: "China"}];

	var cleanList = function cleanList() {
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
	};

	var fillList = function fillList(items) {
		var li;
		items.forEach(function(item) {
			li = document.createElement("ui5-li");
			li.id = item.id;
			li.textContent = item.name;
			list.appendChild(li)
		});
	};

	var resetList = function resetList() {
		if (!mutated) {
			return;
		}

		mutated = false;
		cleanList();
		fillList(items);
	};

	list.addEventListener("itemDelete", function (event) {
		var item = event.detail.item;
		list.items.forEach(function(listItem) {
			if (listItem === item) {
				list.removeChild(listItem);
			}
		});

		mutated = true;
	});

	resetBtn.addEventListener("click", resetList);
	/* Suggestions */
	var sap_database_entries = [{ key: "Afg", text: "Anna" }, { key: "Arg", text: "Anelia" }, { key: "Alex", text: "Ally" }, { key: "Arm", text: "Boris" }, { key: "Alg", text: "Borg" }, { key: "And", text: "Cindy" }, { key: "Ang", text: "Sara" }, { key: "Ast", text: "Sally" }, { key: "Aus", text: "Daniel" }, { key: "Aze", text: "Don" }, { key: "Aruba", text: "Ema" }, { key: "Antigua", text: "Fred" }, { key: "Bel", text: "John" }, { key: "Bel", text: "Jonathan" }, { key: "Bg", text: "Zack" }, { key: "Bra", text: "Zara" }, { key: "Bra", text: "Wolly"}, { key: "Bra", text: "Will"}, { key: "Bra", text: "Quentin"}];
	var input = document.getElementById('user');

	input.addEventListener("input", function (event) {
		var value = event.target.value;
		var suggestionItems = [];

		if (value) {
			suggestionItems = sap_database_entries.filter(function (item) {
				return item.text.toUpperCase().indexOf(value.toUpperCase()) === 0;
			});
		}


		[].slice.call(input.children).forEach(function(child) {
			if (child.id !== "user-icon") {
				input.removeChild(child);
			}
		});


		suggestionItems.forEach(function(item) {
			var li = document.createElement("ui5-li");
			li.type = "Active";
			li.id = item.key;
			li.textContent = item.text;
			input.appendChild(li);
		});
	});


	// Tree
	document.getElementById("tree").addEventListener("itemClick", function(event) {
		console.log("Item clicked: ", event.detail.item);
	});

	document.getElementById("tree").addEventListener("itemToggle", function(event) {
		console.log("Item toggled: ", event.detail.item);
	});

	document.getElementById("tree").addEventListener("itemDelete", function(event) {
		console.log("Item delete button pressed: ", event.detail.item);
		var node = event.detail.item;
		node.parentElement.removeChild(node);
	});

	document.getElementById("tree").addEventListener("selectionChange", function(event) {
		console.log("Selection changed from: ", event.detail.previouslySelectedItems, "to: ", event.detail.selectedItems);
	});

	document.getElementById("modeSelect").addEventListener("change", function(event) {
		var newMode = event.detail.selectedOption.textContent;
		var tree = document.getElementById("tree");
		tree.mode = newMode;
	});

	document.getElementById("expandAll").addEventListener("click", function(event) {
		var trees = Array.prototype.slice.call(document.getElementsByTagName("ui5-tree"));
		var tree = document.getElementById("tree");
		tree.walk(function(node) {
			node.expanded = true;
		});
	});

	document.getElementById("collapseAll").addEventListener("click", function(event) {
		var tree = document.getElementById("tree");
		tree.walk(function(node) {
			node.expanded = false;
		});
	});

	document.getElementById("expandLevel1").addEventListener("click", function(event) {
		var tree = document.getElementById("tree");
		tree.walk(function(node, level) {
			node.expanded = (level === 1);
		});
	});

	document.getElementById("expandLevel2").addEventListener("click", function(event) {
		var tree = document.getElementById("tree");
		tree.walk(function(node, level) {
			node.expanded = (level <= 2);
		});
	});
});
