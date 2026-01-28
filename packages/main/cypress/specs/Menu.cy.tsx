import Button from "../../src/Button.js";
import Menu from "../../src/Menu.js";
import MenuItem from "../../src/MenuItem.js";
import MenuItemGroup from "../../src/MenuItemGroup.js";

import openFolder from "@ui5/webcomponents-icons/dist/open-folder.js";
import addFolder from "@ui5/webcomponents-icons/dist/add-folder.js";
import locked from "@ui5/webcomponents-icons/dist/locked.js";
import favorite from "@ui5/webcomponents-icons/dist/favorite.js";
import UI5Element from "@ui5/webcomponents-base";

describe("Menu interaction", () => {
	it("Menu opens after button click", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="New File"></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen({ opener: "btnOpen" });
	});

	it("Menu opens after button click", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu>
					<MenuItem text="New File"></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen({ opener: "btnOpen" });
	});

	it("Menu icons appearance", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="Item 1.0" icon={openFolder}>
						<MenuItem text="1.1"></MenuItem>
					</MenuItem>
					<MenuItem text="Item 2.0"></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.as("items");

		cy.get("@items")
			.should("have.length", 2);

		cy.get("@items")
			.eq(0)
			.shadow()
			.find("[ui5-icon].ui5-menu-item-icon-end")
			.should("exist");

		cy.get("@items")
			.eq(1)
			.shadow()
			.find(".ui5-menu-item-dummy-icon")
			.should("exist");
	});

	it("Restore focus to previous element after close", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="Item 1.0" icon={openFolder}>
						<MenuItem text="1.1"></MenuItem>
					</MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu-item][text='Item 1.0']")
			.as("item")
			.ui5MenuItemClick();

		cy.get("@item")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("Enable navigaion over disabled items", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="Item 1"></MenuItem>
					<MenuItem text="Item 2" disabled></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.as("items");

		cy.get("@items")
			.last()
			.should("be.visible")
			.ui5MenuItemClick();

		cy.get("@items")
			.last()
			.should("be.focused")
			.and("have.attr", "disabled");
	});

	it("Add endContent to a menu item", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="Item 1">
						<Button slot="endContent">endContent</Button>
					</MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu]")
			.as("menu")
			.ui5MenuOpened();

		cy.get("@menu")
			.find("[ui5-button]")
			.then($button => {
				$button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("@menu")
			.find("[ui5-button]")
			.realClick();

		cy.get("@menu")
			.ui5MenuOpened();

		cy.get("@clicked")
			.should("have.been.calledOnce");
	});

	it("Menu and Menu items busy indication - with items", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="Item 1" loadingDelay={500} loading={true}>
						<MenuItem text="Item 1.1"></MenuItem>
					</MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.shadow()
			.find("[ui5-list]")
			.should("have.attr", "loading-delay", "500")
			.and("have.attr", "loading");
	});

	it("Menu and Menu items busy indication - without items", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="Item 1" loadingDelay={500} loading={true}></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu] > [ui5-menu-item]")
			.shadow()
			.find("[ui5-busy-indicator]")
			.should("have.attr", "delay", "500")
			.and("have.attr", "active");
	});

	it("Restore focus on close", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu">
					<MenuItem text="Item 1"></MenuItem>
				</Menu>
			</>
		);

		cy.get("#btnOpen")
			.as("button")
			.realClick();

		cy.get("@button")
			.should("be.focused");

		cy.get("[ui5-menu]")
			.as("menu")
			.ui5MenuOpen({
				opener: "btnOpen",
			});

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu-item]")
			.ui5MenuItemPress("Space");

		cy.get("@button")
			.should("be.focused");
	});

	it("Set focus on first item", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" loadingDelay={100} loading={true}></Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.as("menu").then($menu => {
				const menu = $menu.get(0) as Menu;

				menu.addEventListener("ui5-open", () => {
					setTimeout(() => {
						menu.loading = false;

						const oneNode = document.createElement("ui5-menu-item") as MenuItem;
						oneNode.text = "Open from Amazon Cloud";

						const twoNode = document.createElement("ui5-menu-item") as MenuItem;
						twoNode.text = "Open from Google Cloud";

						menu.append(oneNode, twoNode);
						menu.focus();
					}, 1000);
				});
			});

		cy.get("@menu").ui5MenuOpen({
			opener: "btnOpen",
		});

		cy.get("[ui5-menu]")
			.ui5MenuOpened();

		cy.get("[ui5-menu-item][text='Open from Amazon Cloud']").as("item");

		cy.get("@item")
			.should("be.focused");
	});

	it("should not close menu when selecting 'single' checkable menu item with 'Shift'", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItemGroup checkMode="Single">
						<MenuItem text="Single"></MenuItem>
					</MenuItemGroup>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuItemCheckShiftClickAndPress("[text='Single']", "have.attr");
	});

	it("should not close menu when selecting 'multi' checkable menu item with 'Shift'", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItemGroup checkMode="Multiple">
						<MenuItem text="Multiple"></MenuItem>
					</MenuItemGroup>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuItemCheckShiftClickAndPress("[text='Multiple']", "have.attr");
	});

	it("should close menu when selecting non checkable menu item with 'Shift'", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItemGroup checkMode="None">
						<MenuItem text="None"></MenuItem>
					</MenuItemGroup>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuItemCheckShiftClickAndPress("[text='None']", "not.have.attr");
	});

	it("should close menu when selecting menu item, not in a group, with 'Shift'", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItem text="Outside"></MenuItem>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuItemCheckShiftClickAndPress("[text='Outside']", "not.have.attr");
	});

	describe("Event firing", () => {
		it("Event firing - 'ui5-item-click' after 'click' on menu item", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0"></MenuItem>
					</Menu>
				</>
			);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.then($item => {
					$item.get(0).addEventListener("ui5-item-click", cy.stub().as("clicked"));
				});

			cy.get("[ui5-menu]")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]")
				.ui5MenuItemClick();

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});

		it("Event firing - 'ui5-item-click' after 'Space' on menu item", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0"></MenuItem>
					</Menu>
				</>
			);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.then($menu => {
					$menu.get(0).addEventListener("ui5-item-click", cy.stub().as("clicked"));
				});

			cy.get("[ui5-menu]")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]")
				.ui5MenuItemPress("Space");

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});

		it("Event firing - 'ui5-item-click' after 'Enter' on menu item", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0"></MenuItem>
					</Menu>
				</>
			);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.then($item => {
					$item.get(0).addEventListener("ui5-item-click", cy.stub().as("clicked"));
				});

			cy.get("[ui5-menu]")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]")
				.ui5MenuItemPress("Enter");

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});

		it("Event firing - 'ui5-check' after 'click' on menu item", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItemGroup checkMode="Single">
							<MenuItem text="Item 1"></MenuItem>
						</MenuItemGroup>
					</Menu>
				</>
			);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.then($item => {
					$item.get(0).addEventListener("ui5-check", cy.stub().as("checked"));
				});

			cy.get("[ui5-menu]")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]")
				.ui5MenuItemClick();

			cy.get("@checked")
				.should("have.been.calledOnce");
		});

		it("Prevent menu closing on item press", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen" onui5-item-click={(e: CustomEvent) => e.preventDefault()}>
						<MenuItem text="Item 1.0"></MenuItem>
					</Menu>
				</>
			);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.as("menu")
				.then($item => {
					$item.get(0).addEventListener("ui5-item-click", cy.stub().as("clicked"));
				});

			cy.get("@menu")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]:focus")
				.as("item");

			cy.get("@item")
				.ui5MenuItemClick();

			cy.get("@clicked")
				.should("have.been.calledOnce");

			cy.get("@menu")
				.ui5MenuOpened();
		});

		it("Events firing on open/close of the menu", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu id="menu" opener="btnOpen">
						<MenuItem text="New File"></MenuItem>
					</Menu>
				</>
			);

			// Possible solution is to wait until the opener is visible
			cy.get("[ui5-button]")
				.should("be.visible");

			cy.get("[ui5-menu]")
				.then($item => {
					$item.get(0).addEventListener("ui5-before-open", cy.stub().as("beforeOpen"));
					$item.get(0).addEventListener("ui5-open", cy.stub().as("open"));
					$item.get(0).addEventListener("ui5-before-close", cy.stub().as("beforeClose"));
					$item.get(0).addEventListener("ui5-close", cy.stub().as("close"));
				});

			cy.get("[ui5-menu]")
				.as("menu")
				.ui5MenuOpen();

			cy.get("@beforeOpen")
				.should("have.been.calledOnce");

			cy.get("@open")
				.should("have.been.calledOnce");

			cy.get("@beforeClose")
				.should("have.not.been.calledOnce");

			cy.get("@close")
				.should("have.not.been.calledOnce");

			cy.get("@menu")
				.ui5MenuOpened();

			cy.get("[ui5-menu-item]:focus")
				.ui5MenuItemClick();

			cy.get("@beforeOpen")
				.should("have.been.calledOnce");

			cy.get("@open")
				.should("have.been.calledOnce");

			cy.get("@beforeClose")
				.should("have.been.calledOnce");

			cy.get("@close")
				.should("have.been.calledOnce");

			cy.get("@menu")
				.should("not.have.attr", "open");
		});
	});

	describe("Check mark is rendered for selectable and selected items", () => {
		it("Selected items have check mark rendered when it is necessary", () => {
			cy.mount(<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu open opener="btnOpen">
					<MenuItem text="Item 1" checked></MenuItem>
					<MenuItemGroup checkMode="Single" id="groupSingle">
						<MenuItem text="Item 2" checked></MenuItem>
						<MenuItem text="Item 3" checked></MenuItem>
					</MenuItemGroup>
					<MenuItemGroup id="groupMulti" checkMode="Multiple">
						<MenuItem text="Item 4" checked></MenuItem>
						<MenuItem text="Item 5" checked></MenuItem>
						<MenuItem text="Item 6" checked>
							<MenuItem text="Item 6.1"></MenuItem>
						</MenuItem>
					</MenuItemGroup>
					<MenuItemGroup id="groupNone" checkMode="None">
						<MenuItem text="Item 7" checked></MenuItem>
						<MenuItem text="Item 8" checked></MenuItem>
					</MenuItemGroup>
				</Menu>
			</>);

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@menu")
				.find("[text='Item 1']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");

			cy.get("@menu")
				.find("[id='groupSingle']")
				.as("groupSingle");

			cy.get("@groupSingle")
				.find("[text='Item 2']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");

			cy.get("@groupSingle")
				.find("[text='Item 3']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("exist");

			cy.get("@menu")
				.find("[id='groupMulti']")
				.as("groupMulti");

			cy.get("@groupMulti")
				.find("[text='Item 4']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("exist");

			cy.get("@groupMulti")
				.find("[text='Item 5']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("exist");

			cy.get("@groupMulti")
				.find("[text='Item 6']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");

			cy.get("@menu")
				.find("[id='groupNone']")
				.as("groupNone");

			cy.get("@groupNone")
				.find("[text='Item 7']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");

			cy.get("@groupNone")
				.find("[text='Item 8']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");
		});

		it("Select item (outside of any group)", () => {
			cy.mount(<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu open opener="btnOpen">
					<MenuItem text="Item 1"></MenuItem>
				</Menu>
			</>);

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@menu")
				.find("[text='Item 1']")
				.as("item")
				.ui5MenuItemClick();

			cy.get("@menu")
				.find("[text='Item 1']")
				.shadow()
				.find(".ui5-menu-item-checked")
				.should("not.exist");
		});

		it("Select/deselect items (checkMode=Single)", () => {
			cy.mount(<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItemGroup checkMode="Single" id="groupSingle">
						<MenuItem text="Item 2" checked></MenuItem>
						<MenuItem text="Item 3"></MenuItem>
					</MenuItemGroup>
				</Menu>
			</>);

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@menu")
				.ui5MenuOpen({ opener: "btnOpen" });

			cy.get("@menu")
				.find("[id='groupSingle']")
				.as("groupSingle");

			cy.get("@groupSingle")
				.find("[text='Item 2']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("exist");

			cy.get("@groupSingle")
				.find("[text='Item 2']")
				.ui5MenuItemClick();

			cy.get("@menu")
				.ui5MenuOpen({ opener: "btnOpen" });

			cy.get("@groupSingle")
				.find("[text='Item 2']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");

			cy.get("@groupSingle")
				.find("[text='Item 3']")
				.ui5MenuItemClick();

			cy.get("@menu")
				.ui5MenuOpen({ opener: "btnOpen" });

			cy.get("@groupSingle")
				.find("[text='Item 2']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");

			cy.get("@groupSingle")
				.find("[text='Item 3']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("exist");

			cy.get("@groupSingle")
				.find("[text='Item 3']")
				.ui5MenuItemClick();

			cy.get("@menu")
				.ui5MenuOpen({ opener: "btnOpen" });

			cy.get("@groupSingle")
				.find("[text='Item 3']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");
		});

		it("Select/deselect items (checkMode=Multiple) ", () => {
			cy.mount(<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu opener="btnOpen">
					<MenuItemGroup id="groupMulti" checkMode="Multiple">
						<MenuItem text="Item 4" checked></MenuItem>
						<MenuItem text="Item 5" checked></MenuItem>
					</MenuItemGroup>
				</Menu>
			</>);

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@menu")
				.ui5MenuOpen({ opener: "btnOpen" });

			cy.get("@menu")
				.find("[id='groupMulti']")
				.as("groupMulti");

			cy.get("@groupMulti")
				.find("[text='Item 4']")
				.ui5MenuItemClick();

			cy.get("@menu")
				.ui5MenuOpen({ opener: "btnOpen" });

			cy.get("@groupMulti")
				.find("[text='Item 4']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");

			cy.get("@groupMulti")
				.find("[text='Item 5']")
				.ui5MenuItemClick();

			cy.get("@menu")
				.ui5MenuOpen({ opener: "btnOpen" });

			cy.get("@groupMulti")
				.find("[text='Item 4']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");

			cy.get("@groupMulti")
				.find("[text='Item 5']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("not.exist");

			cy.get("@menu")
				.ui5MenuOpen({ opener: "btnOpen" });

			cy.get("@groupMulti")
				.find("[text='Item 4']")
				.ui5MenuItemClick();

			cy.get("@groupMulti")
				.find("[text='Item 4']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("exist");

			cy.get("@menu")
				.ui5MenuOpen({ opener: "btnOpen" });

			cy.get("@groupMulti")
				.find("[text='Item 5']")
				.ui5MenuItemClick();

			cy.get("@groupMulti")
				.find("[text='Item 5']")
				.shadow()
				.find("[part='content']")
				.find(".ui5-menu-item-checked")
				.should("exist");
		});

		it("Select item (checkMode=None) ", () => {
			cy.mount(<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu open opener="btnOpen">
					<MenuItemGroup id="groupNone" checkMode="None">
						<MenuItem text="Item 6"></MenuItem>
					</MenuItemGroup>
				</Menu>
			</>);

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@menu")
				.find("[text='Item 6']")
				.ui5MenuItemClick();

			cy.get("@menu")
				.find("[text='Item 6']")
				.shadow()
				.find(".ui5-menu-item-checked")
				.should("not.exist");
		});

		it("Accessibility attributes", () => {
			it("Selected items have check mark rendered when it is necessary", () => {
				cy.mount(<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu open opener="btnOpen">
						<MenuItem text="Item 1" checked></MenuItem>
						<MenuItemGroup checkMode="Single" id="groupSingle">
							<MenuItem text="Item 2" checked></MenuItem>
							<MenuItem text="Item 3"></MenuItem>
						</MenuItemGroup>
						<MenuItemGroup id="groupMulti" checkMode="Multiple">
							<MenuItem text="Item 4" checked></MenuItem>
							<MenuItem text="Item 5"></MenuItem>
						</MenuItemGroup>
						<MenuItemGroup id="groupNone" checkMode="None">
							<MenuItem text="Item 6" checked></MenuItem>
							<MenuItem text="Item 7"></MenuItem>
						</MenuItemGroup>
					</Menu>
				</>);

				cy.get("[ui5-menu]")
					.as("menu");

				cy.get("@menu")
					.find("[text='Item 1']")
					.shadow()
					.find("li")
					.should("have.attr", "role", "menuitem");

				cy.get("@menu")
					.find("[id='groupSingle']")
					.as("groupSingle");

				cy.get("@groupSingle")
					.shadow()
					.find("div")
					.should("have.attr", "role", "group");

				cy.get("@groupSingle")
					.find("[text='Item 2']")
					.shadow()
					.find("li")
					.should("have.attr", "role", "menuitemradio");

				cy.get("@menu")
					.find("[id='groupMulti']")
					.as("groupMulti");

				cy.get("@groupMulti")
					.shadow()
					.find("div")
					.should("have.attr", "role", "group");

				cy.get("@groupMulti")
					.find("[text='Item 4']")
					.shadow()
					.find("[part='selected']")
					.should("have.attr", "role", "menuitemcheckbox");

				cy.get("@menu")
					.find("[id='groupNone']")
					.as("groupNone");

				cy.get("@groupNone")
					.shadow()
					.find("div")
					.should("have.attr", "role", "group");

				cy.get("@groupNone")
					.find("[text='Item 6']")
					.shadow()
					.find("[part='selected']")
					.should("have.attr", "role", "menuitem");
			});
		});
	});

	describe("Accessibility", () => {
		it("Menu and Menu items accessibility attributes", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0" accessibleName="test accessible name">
							<MenuItem text="Item 1.1"></MenuItem>
						</MenuItem>
						<MenuItem text="Item 2.0" accessibleName="test accessible name"></MenuItem>
						<MenuItem text="Item 3.0" additionalText="Ctrl+A"></MenuItem>
					</Menu>
				</>
			);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.as("menu");

			cy.get("@menu")
				.shadow()
				.find("[ui5-list]")
				.should("have.attr", "accessible-role", "Menu");

			cy.get("@menu")
				.find("> [ui5-menu-item]")
				.as("items");

			cy.get("@items")
				.eq(0)
				.should("have.attr", "accessible-name", "test accessible name")
				.shadow()
				.find("li")
				.should("have.attr", "role", "menuitem")
				.and("have.attr", "aria-haspopup", "menu")
				.and("have.attr", "aria-expanded", "false");

			cy.get("@items")
				.eq(0)
				.ui5MenuItemClick()
				.shadow()
				.find("li")
				.should("have.attr", "aria-expanded", "true");

			cy.get("@items")
				.eq(1)
				.should("have.attr", "accessible-name", "test accessible name");

			cy.get<MenuItem[]>("@items")
				.eq<MenuItem>(2)
				.then($el => {
					$el.get(0).accessibilityAttributes = {
						ariaKeyShortcuts: "Ctrl+A",
						role: "alertdialog",
					};
				});

			cy.get("@items")
				.eq(2)
				.shadow()
				.find("li")
				.should("have.attr", "aria-keyshortcuts", "Ctrl+A");

			cy.get("@items")
				.eq(2)
				.shadow()
				.find("li")
				.should("have.attr", "role", "alertdialog");

			cy.get("@items")
				.eq(2)
				.shadow()
				.find("li .ui5-li-additional-text")
				.should("have.attr", "aria-hidden", "true");
		});

		it("Menu popover has an accessible name", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu opener="btnOpen">
						<MenuItem text="Item 1.0" icon={openFolder}>
							<MenuItem text="1.1"></MenuItem>
						</MenuItem>
					</Menu>
				</>
			);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu]")
				.ui5MenuOpened();

			cy.get("[ui5-menu]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.attr", "accessible-name", "Select an option from the menu");

			cy.get("[ui5-menu-item][text='Item 1.0']")
				.as("item")
				.ui5MenuItemClick();

			cy.get("@item")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.attr", "accessible-name", "Select an option from the menu");
		});

		/* The test is valid, but currently it is not stable. It will be reviewed further and stabilized afterwards. */

		it("Menu items - navigation in endContent", () => {
			cy.mount(
				<>
					<Button id="btnOpen">Open Menu</Button>
					<Menu id="menu" opener="btnOpen">
						<MenuItem id="item2" text="Item 2">
							<Button id="newLock" slot="endContent" icon={locked} design="Transparent" />
							<Button id="newFavorite" slot="endContent" icon={favorite} design="Transparent" />
						</MenuItem>
						<MenuItem text="Item3" additionalText="Ctrl+F" icon={addFolder} />
					</Menu>
				</>
			);

			cy.get("[ui5-menu]")
				.ui5MenuOpen();

			cy.get("[ui5-menu] > [ui5-menu-item]").as("items");
			cy.get("[ui5-menu-item] > [ui5-button]").as("buttons");

			cy.get("@items")
				.first()
				.should("be.focused");

			cy.realPress("ArrowRight");
			cy.get("@buttons").first().should("be.focused");

			cy.realPress("ArrowRight");
			cy.get("@buttons").last().should("be.focused");

			cy.realPress("ArrowRight");
			cy.get("@buttons").last().should("be.focused");

			cy.realPress("ArrowLeft");
			cy.get("@buttons").first().should("be.focused");

			cy.realPress("ArrowLeft");
			cy.get("@buttons").first().should("be.focused");

			cy.realPress("ArrowDown");
			cy.get("@items").last().should("be.focused");
		});
	});
});

describe("Menu - getFocusDomRef", () => {
	it("should return undefined when the Menu is empty", () => {
		cy.mount(<Menu></Menu>);

		cy.get<Menu>("[ui5-menu]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem id="item1" text="Item 1"/>
					<MenuItem text="Item2"/>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
				.ui5MenuOpen();

		cy.get<UI5Element>("[ui5-menu], #item1")
			.then(($el) => {
				const menu = $el[0],
					firstItem = $el[1];
				expect(menu.getFocusDomRef()).equal(firstItem.getFocusDomRef());
			});
	});

	it("should return last focused item in the Menu", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open Menu</Button>
				<Menu id="menu" opener="btnOpen">
					<MenuItem text="Item 1"/>
					<MenuItem text="Item 2" id="item2"/>
				</Menu>
			</>
		);

		cy.get("[ui5-menu]")
			.ui5MenuOpen();

		cy.get("[ui5-menu-item][text='Item 2']")
			.as("item")
			.ui5MenuItemClick();

		cy.get("[ui5-menu-item][text='Item 2']")
			.should("be.focused");

		cy.get<UI5Element>("[ui5-menu], #item2")
			.then(($el) => {
				const menu = $el[0],
					clickedItem = $el[1];
				expect(menu.getFocusDomRef()).equal(clickedItem.getFocusDomRef());
			});
	});
});