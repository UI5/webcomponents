import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import ToolbarButton from "../../src/ToolbarButton.js";
import Toolbar from "../../src/Toolbar.js";
import Popover from "../../src/Popover.js";
import Button from "../../src/Button.js";
import Label from "../../src/Label.js";
import List from "../../src/List.js";
import ListItem from "../../src/ListItemStandard.js";
import Input from "../../src/Input.js";

describe("Rendering", () => {
	it("tests arrow positioning", () => {
		cy.mount(
			<>
				<div id="icon1" tabindex="0" style="width: 10px; height: 10px; background:red;"></div>
				<Popover id="popup"
					opener="icon1"
					headerText="Newsletter subscription"
					placement="End"
					verticalAlign="Top">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]")
			.invoke("prop", "open", "true");

		cy.get<Popover>("[ui5-popover]")
			.ui5PopoverOpened();

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("be.visible");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("have.css", "transform", "matrix(1, 0, 0, 1, 0, -42)");
	});

	it("tests rendering of the popover when open attribute is set", () => {
		cy.mount(
			<>
				<Button id="popoverOpen">Open</Button>
				<Popover id="popover" opener="popoverOpen" open={true}>
					<Button>Close</Button>
				</Popover>
			</>
		);

		cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();
	});

	it("test initial focus", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popover" opener="btnOpen" open={true}>
					<Button id="popoverBtn">Button</Button>
				</Popover>
			</>
		);

		cy.get("#popoverBtn").should("be.focused");
	});

	it("test _opened", () => {
		cy.mount(
			<>
				<Button id="popoverOpen">Open</Button>
				<Popover id="popover1" opener="popoverOpen" open={true}>
					<div id="popoverCont1">Content</div>
				</Popover>
			</>
		);

		cy.get("#popover1").should("have.prop", "_opened");

		cy.get("#popoverCont1").should("exist");
	});

	it("Header text attribute is propagated", () => {
		cy.mount(
			<>
				<Popover id="pop" headerText="Initial text">
					<div>Content</div>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-header-text")
			.should("have.text", "Initial text");
	});

	it("Popover arrow", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="pop" opener="btn" headerText="Popover Header" open={true}>
					<div>Content</div>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("be.visible");
	});

	it("Popover arrow toggling", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="pop" opener="btn" headerText="Popover Header" open={true}>
					<div>Content</div>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("be.visible");

		cy.get("[ui5-popover]").then($popover => {
			$popover.get(0).toggleAttribute("hide-arrow");
		});

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("not.be.visible");
	});
});

describe("Accessibility", () => {
	it("Popover accessibleDescriptionRef Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Label id="lblDesc3">ThirdDesc</Label>
				<Popover id="popover" accessibleDescriptionRef="lblDesc1 lblDesc3"></Popover>
			</>
		);

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc ThirdDesc");

		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc ThirdDesc");

		cy.get("[ui5-popover]")
			.invoke("attr", "accessible-description-ref", "lblDesc2");

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "SecondDesc");

		cy.get("[ui5-popover]")
			.invoke("attr", "accessible-description-ref", "lblDesc3");

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "ThirdDesc");

		cy.get("[ui5-popover]")
			.invoke("removeAttr", "accessible-description-ref");

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("Popover accessibleDescription Tests", () => {
		cy.mount(<Popover id="popover" accessibleDescription="Some description added by accessibleDescription" />);

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-describedby", "accessibleDescription");

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		cy.get("[ui5-popover]")
			.invoke("attr", "accessible-description", "Some description added by accessibleDescription");

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		cy.get("[ui5-popover]")
			.invoke("removeAttr", "accessible-description");

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("Popover accessibleDescriptionRef and accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Popover id="popover" accessibleDescriptionRef="lblDesc1" accessibleDescription="Some description added by accessibleDescription" />
			</>
		);

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc");

		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc");

		cy.get("[ui5-popover]")
			.invoke("removeAttr", "accessible-description-ref");

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		cy.get("[ui5-popover]")
			.invoke("removeAttr", "accessible-description");

		cy.get("[ui5-popover]")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("should use aria-labelledby when header slot is present and accessibleName is initially set", () => {
		cy.mount(
			<Popover accessibleName="This popover is important">
				<div slot="header" />
			</Popover>
		);

		cy.get("[ui5-popover]").invoke("removeAttr", "accessible-name");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-labelledby");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-label");
	});

	it("should use aria-label when accessible-name attribute is set dynamically", () => {
		cy.mount(
			<Popover accessibleName="This popover is important">
				<div slot="header" />
			</Popover>
		);

		cy.get("[ui5-popover]").invoke("attr", "accessible-name", "text");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-labelledby");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-label");
	});


	it("tests accessible-name-ref", () => {
		cy.mount(
			<>
				<Label id="lblAccNameRef">Some label</Label>
				<Popover accessibleNameRef="lblAccNameRef">
					<span>Hello world</span>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-label", "Some label");
	});

	it("tests that aria-labelledby is not set when there is no header and no accessible-name-ref", () => {
		cy.mount(
			<>
				<Button id="btnOpenWithAttr">Open with Attribute</Button>
				<Popover id="popoverAttr" opener="btnOpenWithAttr">
					<Button id="btnCloseWithMethod">Close with Method</Button>
					<Button id="btnCloseWithAttr">Close with Attribute</Button>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-labelledby");
	});

	it("F6 navigation", () => {
		cy.mount(
			<>
			<button data-sap-ui-fastnavgroup="true" id="test"> Test button</button>
				<Popover opener="test">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Popover>
				<button data-sap-ui-fastnavgroup="true">Test button 2</button>
			</>
		);

		cy.get("[ui5-popover]")
			.invoke("prop", "open", "true");

		cy.get<Popover>("[ui5-popover]")
			.ui5PopoverOpened();

		cy.get("#first")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#second")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#first")
			.should("be.focused");
	});
});

describe("Popover opener", () => {
	it("tests 'opener' set as string of abstract element's ID ", () => {
		cy.mount(
			<>
				<Toolbar id="tb">
					<ToolbarButton text="Add"></ToolbarButton>
					<ToolbarButton text="Delete" id="clearCounter"></ToolbarButton>
					<ToolbarButton id="btnOpenMenu" text="Open Menu" preventOverflowClosing={true}></ToolbarButton>
				</Toolbar>
				<Popover id="popup" opener="btnOpenMenu">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", "true");

		cy.get("[ui5-button]").then($btnClosePopover => {
			$btnClosePopover.get(0).addEventListener("click", () => {
				cy.get("[ui5-popover]").invoke("prop", "open", false);
			});
		});
		cy.get("[ui5-button]").realClick();
	});

	it("tests 'opener' set as DOM ref of abstract element's DOM reference", () => {
		cy.mount(
			<>
				<Toolbar id="tb">
					<ToolbarButton text="Add"></ToolbarButton>
					<ToolbarButton text="Delete"></ToolbarButton>
					<ToolbarButton id="btnOpenPopover" text="Open Menu" preventOverflowClosing={true}></ToolbarButton>
				</Toolbar>
				<Popover id="popup">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		cy.get("#btnOpenPopover").then($toolbarBtn => {
			cy.wrap($toolbarBtn.get(0)).as("toolbarBtn");
		});

		cy.get("@toolbarBtn").then($toolbarBtn => {
			cy.get("[ui5-popover]").invoke("prop", "opener", $toolbarBtn.get(0));
		});
		cy.get("[ui5-popover]").invoke("prop", "open", true);

		cy.get("[ui5-button]").then($btnClosePopover => {
			$btnClosePopover.get(0).addEventListener("click", () => {
				cy.get("[ui5-popover]").invoke("prop", "open", false);
			});
		});
	});

	it("tests calling _showOutsideViewport method", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popover" opener="btnOpen">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]").then(el => {
			cy.spy<Popover>((el.get(0) as Popover), "_showOutsideViewport").as("showOutsideViewport");
		});

		cy.get("[ui5-popover]").invoke("prop", "open", "true");

		cy.get("@showOutsideViewport")
			.should("have.been.calledOnce");
	});

	it("tests calling _showOutsideViewport method, when popover is created dynamically", () => {
		cy.mount(
			<>
				<div id="container"></div>
				<Button id="btnOpen">Open</Button>
			</>
		);

		cy.get("#container").then(container => {
			const popover = document.createElement("ui5-popover");

			cy.spy<Popover>((popover as Popover), "_showOutsideViewport").as("showOutsideViewport");

			popover.id = "popover";
			popover.headerText = "Popover Header";
			popover.opener = "btnOpen";
			popover.open = true;

			const content = document.createElement("div");
			content.innerHTML = "<button id='popoverBtn'>button</button>";
			popover.appendChild(content);

			container.get(0).appendChild(popover);
		});

		cy.get<Popover>("[ui5-popover]")
			.ui5PopoverOpened();

		cy.get("@showOutsideViewport")
			.should("have.been.calledOnce");
	});

	it("tests popover toggling", () => {
		cy.mount(
			<>
				<Button id="btn" />
				<Popover opener="btn" />
			</>);

		cy.get("[ui5-popover]").invoke("prop", "open", "true");

		cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

		cy.get("[ui5-popover]").invoke("prop", "open", false);

		cy.get("[ui5-popover]").should("not.be.visible");
	});

	it("tests popover is closed after click outside of it after multiple 'open = true'", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="pop" opener="btn" open={true}>
					<div>Content</div>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", true);
		cy.get("[ui5-popover]").invoke("prop", "open", true);
		cy.get("[ui5-popover]").invoke("prop", "open", true);
		cy.get("[ui5-popover]").invoke("prop", "open", true);

		cy.get("body").realClick();

		cy.get("[ui5-popover]").should("not.be.visible");
	});

	it("tests popover does not close with opener", () => {
		cy.mount(
			<>
				<Button id="btnQuickViewCardOpener">Open</Button>
				<Button id="btnMoveFocus">Move Focus</Button>
				<Popover id="quickViewCard" opener="btnQuickViewCardOpener" open={true}>
					<div>Content</div>
				</Popover>
			</>
		);

		cy.get("#btnQuickViewCardOpener").should("be.visible");

		cy.get("#btnQuickViewCardOpener").realClick();
		cy.get("#btnQuickViewCardOpener").invoke("hide");

		cy.get("[ui5-popover]").should("have.attr", "open");
		cy.get("[ui5-popover]").should("be.visible");
		cy.get("#btnQuickViewCardOpener").should("not.be.visible");

		cy.get("#btnMoveFocus").realClick();
	});

	it("tests clicking inside the popover does not close it", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="pop" opener="btn" open={true}>
					<Button id="popbtn">Inside Popover</Button>
				</Popover>
			</>
		);

		cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

		cy.get("[ui5-popover]").realClick();

		cy.get<Popover>("#pop").ui5PopoverOpened();
	});

	it("tests if overflown content can be reached by scrolling (with header and arrow) 2", () => {
		cy.mount(
			<>
				<Button id="big-popover-button">Open</Button>
				<Popover id="big-popover" headerText="Big Popover" opener="big-popover-button" open={true}>
					<ul style={{ height: "100px", overflowY: "auto" }}>
						{Array.from({ length: 50 }, (_, index) => (
							<li key={index} id={`item-${index}`} style={{ padding: "5px" }}>
								Item {index + 1}
							</li>
						))}
					</ul>
				</Popover>
			</>
		);

		cy.get("#big-popover ul").scrollTo("bottom");

		cy.get("#item-48").should("be.visible");
	});

	it("tests modal popover", () => {
		cy.mount(
			<>
				<Button id="btnPopModal">Open Modal Popover</Button>
				<Popover id="modalPopover" opener="btnPopModal" modal open={false}>
					<Button id="modalPopoverClose">Close</Button>
				</Popover>
				<Button id="btn">Another Button</Button>
			</>
		);

		cy.get("#btnPopModal").realClick();
		cy.get("[ui5-popover]").invoke("prop", "open", true);

		cy.get("[ui5-popover]").should("have.attr", "open", "open");

		cy.get("[ui5-popover]").invoke("prop", "open", false);

		cy.get("[ui5-popover]").should("not.be.visible");
	});

	it("tests modal popover with no block layer", () => {
		cy.mount(
			<>
				<Button id="btnPopModalNoLayer">Open Modal Popover</Button>
				<Popover id="modalPopoverNoLayer" opener="btnPopModalNoLayer" modal={false} open={false}>
					<Button id="modalPopoverClose">Close</Button>
				</Popover>
			</>
		);

		cy.get("#btnPopModalNoLayer").realClick();
		cy.get("[ui5-popover]").invoke("prop", "open", true);

		cy.get("[ui5-popover]").should("have.attr", "open", "open");

		cy.get("body").should($body => {
			const blockLayer = $body[0].querySelector("ui5-popup-block-layer");
			expect(blockLayer).to.not.exist;
		});

		cy.realPress("Escape");

		cy.get("[ui5-popover]").should("not.be.visible");
	});

	it("tests initial focus", () => {
		cy.mount(
			<>
				<Button id="btnPopFocus">Open</Button>
				<Popover id="popoverFocus" opener="btnPopFocus" open={true}>
					<Button id="focusMe">Focus Me</Button>
				</Popover>
			</>
		);

		cy.get("#focusMe").should("be.focused");

		cy.get("body").realPress("Escape");

		cy.get("[ui5-popover]").should("not.be.visible");
	});

	it("tests focus trapping using TAB", () => {
		cy.mount(
		 <>
		  <Button id="btn">Open</Button>
		  <Popover id="popoverId" opener="btn" open={true}>
		   <div slot="header">
			<Button id="first-focusable"> Button</Button>
		   </div>
		   <List>
			<ListItem id="li1">First</ListItem>
		   </List>
		  </Popover>
		 </>
		);

		cy.get("#first-focusable").should("be.focused");

		cy.realPress("Tab");
		cy.wait(500);
		cy.get("#li1").should("be.focused");
		cy.get("#first-focusable").should("not.be.focused");

		cy.realPress("Tab");

		cy.get("#first-focusable").should("be.focused");

		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.get("#first-focusable").should("be.focused");

		cy.realPress("Escape");

		cy.get("[ui5-popover]").should("not.be.visible");
	   });

	it("tests focus trapping using SHIFT TAB", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="popoverId" opener="btn" open={true}>
					<div slot="header">
						<Button id="first-focusable">Header Button</Button>
					</div>
					<List>
						<ListItem>First</ListItem>
						<ListItem>Second</ListItem>
						<ListItem>Third</ListItem>
					</List>
					<Button id="footer-button">Footer Button</Button>
				</Popover>
			</>
		);

		cy.get("#first-focusable").should("be.focused");

		cy.realPress(["Shift", "Tab"]);
		cy.realPress(["Shift", "Tab"]);
		cy.realPress(["Shift", "Tab"]);

		cy.get("#first-focusable").should("be.focused");

		cy.realPress("Escape");

		cy.get("[ui5-popover]").should("not.be.visible");
	});

	it("tests focus when there is no focusable content", () => {
		cy.mount(
			<>
				<Button id="firstBtn">Open</Button>
				<Popover id="popNoFocusableContent" opener="firstBtn" open={true}>
					<div>Non-focusable content</div>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]").should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-popover]").should("be.focused");

		cy.realPress("Escape");

		cy.get("[ui5-popover]").should("not.be.visible");
	});

	it("tests focus when content, which can't be focused is clicked", () => {
		cy.mount(
			<>
				<Button id="btnOpenPopoverWithDiv">Open</Button>
				<Popover id="popWithDiv" opener="btnOpenPopoverWithDiv" open={true}>
					<div id="divContent">Non-focusable content</div>
				</Popover>
			</>
		);

		cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

		cy.wait(100);

		cy.get("#divContent").realClick();

		cy.get("[ui5-popover]").should("be.focused");

		cy.realPress("Escape");

		cy.get("[ui5-popover]").should("not.be.visible");
	});

	it("tests that dynamically created popover is opened", () => {
		cy.mount(
			<>
				<Button id="btnOpenDynamic">Open Dynamic Popover</Button>
				<div id="container"></div>
			</>
		);

		cy.get("#container").then(container => {
			const popover = document.createElement("ui5-popover");
			popover.id = "dynamic-popover";
			popover.headerText = "Dynamic Popover";
			popover.opener = "btnOpenDynamic";
			popover.open = false;

			const content = document.createElement("div");
			content.innerHTML = "<button id='popoverBtn'>button</button>";
			popover.appendChild(content);

			container.get(0).appendChild(popover);
		});

		cy.get("#btnOpenDynamic").realClick();
		cy.get("#dynamic-popover").invoke("prop", "open", true);

		cy.get("#dynamic-popover").should("be.visible");

		cy.get("body").realPress("Escape");

		cy.get("#dynamic-popover").should("not.be.visible");
	});

	it("tests that dynamically created popover opened by dynamically created opener is opened", () => {
		cy.get("[data-cy-root]").then(body => {
			let container = document.createElement("div");
			container.id = "container";
			body.get(0).appendChild(container);

			const button = document.createElement("button");
			button.id = "btnDynamicOpenerAndPopover";
			button.textContent = "Open Dynamic Popover";
			container.appendChild(button);
		});

		cy.get("#container").then(container => {
			const popover = document.createElement("ui5-popover");
			popover.id = "dynamic-popover-dynamic-opener0";
			popover.headerText = "Dynamic Popover";
			popover.open = false;
			popover.opener = "btnDynamicOpenerAndPopover";

			const content = document.createElement("div");
			content.innerHTML = "<button id='popoverBtn'>button</button>";
			popover.appendChild(content);

			container.get(0).appendChild(popover);
		});

		cy.get("#btnDynamicOpenerAndPopover").realClick();
		cy.get("#dynamic-popover-dynamic-opener0").invoke("prop", "open", true);

		cy.get("#dynamic-popover-dynamic-opener0").should("be.visible");

		cy.realPress("Escape");

		cy.get("#dynamic-popover-dynamic-opener0").should("not.be.visible");

		cy.get("#container").then(container => {
			container.remove();
		});
	});

	it("tests that ENTER on list item that opens another popover doesn't trigger click event inside the focused element of that popover", () => {
		cy.mount(
			<>
				<Button id="openChainedPopover1">Open chained popover 1</Button>
				<Popover id="chainedPopover1" opener="openChainedPopover1">
					Chained Popover 1
					<List id="openChainedPopover2List">
						<ListItem id="openChainedPopover2Item">Open chained popover 2</ListItem>
					</List>
				</Popover>
				<Popover id="chainedPopover2" style={{ display: "none" }}>
					Chained Popover 2
				</Popover>
			</>
		);

		cy.get("#openChainedPopover1").then(($btn) => {
			const btn = $btn[0];
			const popover1 = document.getElementById("chainedPopover1") as Popover;
			const popover2 = document.getElementById("chainedPopover2") as Popover;
			const listItem = document.getElementById("openChainedPopover2Item") as HTMLElement;

			btn.addEventListener("click", () => {
				popover1.style.display = "block";
			});

			listItem.addEventListener("keydown", (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					popover1.style.display = "none";
					popover2.style.display = "block";
					popover2.focus();
				}
			});
		});

		cy.get("#openChainedPopover1").realClick();

		cy.get("#openChainedPopover2Item").realClick();

		cy.get("#openChainedPopover2Item").realPress("Enter");

		cy.get("#chainedPopover2").should("be.visible");
		cy.get("#chainedPopover1").should("not.be.visible");
	});

	it("tests clicking on an iframe closes the popover", () => {
		cy.mount(
			<>
				<iframe id="clickThisIframe" />
				<Button id="btn">Click me !</Button>
				<Popover id="pop" placement="Top" accessibleName="This popover is important" opener="btn">
					<div slot="header">
						<Button id="first-focusable">I am in the header</Button>
					</div>
				</Popover>
			</>
		);
		cy.get("[ui5-popover]").invoke("attr", 'open', 'true');
		cy.get("[ui5-popover]").should("be.visible");

		cy.get("#clickThisIframe").realClick();

		cy.get("[ui5-popover").should("not.have.attr", "open");
	});


	it("tests clicking on an iframe inside a shadow root closes the popover", () => {
		cy.mount(
			<>
				<div id="host">
					{/* We will attach shadow root with iframe programmatically */}
				</div>
				<Button id="btn">Click me !</Button>
				<Popover id="pop" placement="Top" opener="btn">
					<div slot="header">
						<Button />
					</div>
				</Popover>
			</>
		);

		cy.get("#host").then(($host) => {
			const host = $host[0];
			const shadowRoot = host.attachShadow({ mode: "open" });
			const iframe = document.createElement("iframe");
			iframe.id = "clickThisIframeInsideShadowRoot";
			iframe.src = "./Test.html";
			shadowRoot.appendChild(iframe);
		});

		cy.get("[ui5-popover]").invoke("attr", 'open', 'true');
		cy.get("[ui5-popover]").should("be.visible");

		cy.get("#host").realClick();
		cy.get("[ui5-popover]").should("not.be.visible");
	});


	it("Test initial focus when content is provided after the header and footer", () => {
		cy.mount(
			<>
				<Button id="popoverFocusButton">Dialog Focus</Button>
				<Popover id="popoverFocus" placement="Bottom" headerText="Header text" opener="popoverFocusButton">
					<div slot="footer" className="dialog-footer" style={{ display: "flex" }}>
						<div style={{ flex: 1 }}></div>
						<Button id="closeButton" design="Emphasized">Close</Button>
					</div>
					<span>Some message</span>
					<Button id="fistButtonInPopover">Confirm</Button>
				</Popover>
			</>
		);

		cy.get("#popoverFocusButton").then(($btn) => {
			const button = $btn[0];
			const popover = document.getElementById("popoverFocus") as Popover;

			button.addEventListener("click", () => {
				popover.open = true;
			});
		});

		cy.get("#popoverFocusButton").realClick();

		cy.get("#fistButtonInPopover").should("be.focused");
	});


	it("tests initial focus when the popover is removed from the DOM in the meantime", () => {
		cy.mount(
			<>
				<Button id="createAndRemove">Create a popover and then remove it</Button>
				<span id="createAndRemoveResult" style={{ display: "none" }}></span>
			</>
		);

		cy.get("#createAndRemove").then(($btn) => {
			const button = $btn[0] as HTMLButtonElement;
			const resultSpan = document.getElementById("createAndRemoveResult")!;

			button.addEventListener("click", function () {
				const pop = document.createElement("ui5-popover") as Popover;

				pop.addEventListener("ui5-before-open", async () => {
					const applyFocusResult = pop.applyFocus();
					pop.remove();

					try {
						await applyFocusResult;
						resultSpan.innerText = "No uncaught errors";
					} catch (e) {
						resultSpan.innerText = e.toString();
					}

					resultSpan.style.display = "";
				});

				const inp = document.createElement("ui5-input");
				inp.setAttribute("slot", "header");
				pop.appendChild(inp);

				document.body.appendChild(pop);

				pop.setAttribute("opener", "createAndRemove");
				pop.setAttribute("open", "true");
			});
		});

		cy.get("#createAndRemove").realClick();

		cy.get("#createAndRemoveResult")
			.should("be.visible")
			.and("have.text", "No uncaught errors");
	});


	it("tests if the popover is a part of the tab chain", () => {
		cy.mount(
			<div>
				<Input id="input1" placeholder="First input" />
				<Popover id="pop" open={true} headerText="Tab Test Popover" opener="input1" />
				<Input id="input2" placeholder="Second input inside popover" />
			</div>
		);

		cy.get("#input1").realClick();
		cy.get("#input1").should("have.focus");

		cy.realPress("Tab");

		cy.get("#input2").should("have.focus");
	});

	it("tests opener set as ID in the same shadow root without affecting other tests", () => {
		cy.get("[data-cy-root]").then(root => {
			const container = document.createElement("div");
			container.id = "container";
			root[0].appendChild(container);

			const shadowRoot = container.attachShadow({ mode: "open" });

			const opener = document.createElement("ui5-button");
			opener.setAttribute("id", "lnk");
			opener.textContent = "Open Popover";
			shadowRoot.appendChild(opener);

			const popover = document.createElement("ui5-popover");
			popover.setAttribute("id", "pop");
			popover.setAttribute("header-text", "Popover in Shadow Root");
			popover.setAttribute("opener", "lnk");

			const content = document.createElement("div");
			content.textContent = "Popover content";
			popover.appendChild(content);

			shadowRoot.appendChild(popover);
		});

		cy.get("#container")
			.shadow()
			.find("#lnk")
			.realClick();

		cy.get("#container")
			.shadow()
			.find("#pop")
			.should("exist");

		cy.get("#container").then(container => {
			container.remove();
		});
	});

	it("tests opener set as ID in window.document, while popover is in a shadow root", () => {
		cy.mount(
			<>
				<Button id="btnOpenDynamic">Open Dynamic Popover</Button>
				<div id="container"></div>
			</>
		);

		cy.get("#container").then(container => {
			const nativeContainer = container[0];

			const shadowRoot = nativeContainer.attachShadow({ mode: "open" });

			const popover = document.createElement("ui5-popover");
			popover.setAttribute("id", "dynamic-popover");
			popover.setAttribute("header-text", "Dynamic Popover");
			popover.setAttribute("opener", "btnOpenDynamic");
			popover.setAttribute("open", "");

			const content = document.createElement("div");
			content.innerHTML = "<button id='popoverBtn'>button</button>";
			popover.appendChild(content);

			shadowRoot.appendChild(popover);
		});

		cy.get("#container")
			.shadow()
			.find("#dynamic-popover")
			.should("exist");
	});
});

describe("Popover interaction", () => {
	describe("Automatic Closing", () => {
		it("tests clicking outside the popover", () => {
			cy.mount(
				<>
					<button id="opener">Open</button>
					<Popover id="pop" open={true} opener="opener">
						<Button id="btnClosePopover">Close</Button>
					</Popover>
				</>
			);

			cy.get<Popover>("#pop").ui5PopoverOpened();

			cy.get("body").realClick();

			cy.get("[ui5-popover]").should("not.be.visible");
		});

		it("tests clicking on the opener", () => {
			cy.mount(
				<>
					<button id="opener">Open</button>
					<Popover id="pop" open={true} opener="opener">
						<Button id="btnClosePopover">Close</Button>
					</Popover>
				</>
			);

			cy.get<Popover>("#pop").ui5PopoverOpened();

			cy.get("#opener").realClick();

			cy.get<Popover>("#pop").ui5PopoverOpened();
		});

		it("tests clicking on the opener if both the popover and the opener are located in a shadow root", () => {
			class OpenerShadowRootTest extends HTMLElement {
				_shadow: ShadowRoot | null = null;

				constructor() {
					super();
				}

				connectedCallback() {
					if (this._shadow) {
						return;
					}

					this._shadow = this.attachShadow({ mode: "open" });

					const btn = document.createElement("button");
					btn.textContent = "Opener in Shadow Root";
					btn.setAttribute("id", "opener");

					const pop = document.createElement("ui5-popover") as Popover;
					pop.opener = "opener";
					pop.open = true;

					this._shadow.appendChild(btn);
					this._shadow.appendChild(pop);
				}
			}

			cy.window().then(win => {
				win.customElements.define("opener-shadow-root-test", OpenerShadowRootTest);
			});

			cy.mount(
				<>
					{/* @ts-expect-error */}
					<opener-shadow-root-test id="openerShadowRooTest"></opener-shadow-root-test>
				</>
			);

			cy.get("#openerShadowRooTest").shadow().find("[ui5-popover]").ui5PopoverOpened();

			cy.get("#openerShadowRooTest").shadow().find("button").realClick();

			cy.get("#openerShadowRooTest").shadow().find("[ui5-popover]").ui5PopoverOpened();
		});

		it("tests clicking outside the popover when 'mousedown' event propagation is stopped", () => {
			cy.mount(
				<>
					<button id="opener">Open</button>
					<Popover id="pop" open={true} opener="opener" placement="Bottom">
						<span>popover content</span>
					</Popover>
					<button id="btn">Stops mousedown propagation</button>
				</>
			);

			cy.get<Popover>("#pop").ui5PopoverOpened();
			cy.get("#btn").then(btn => {
				btn.get(0).addEventListener("mousedown", event => {
					event.stopPropagation();
				});
			});

			cy.get("#btn").realMouseDown();

			cy.get("[ui5-popover]").should("not.be.visible");
		});

		it("click on opener, which is iframe inside a custom element", () => {
			cy.mount(
				<>
					<div id="myDiv" style="width: 200px;" tabindex="0">
						<div id="helloId">Hello</div>
						<div id="customElId" style="height: 200px;">
						</div>
					</div>
					<Popover id="popoverId"
						opener="myDiv"
						headerText="Newsletter subscription"
						preventInitialFocus>
						<div>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get("[ui5-popover]")
				.invoke("prop", "open", "true");

			cy.get("[ui5-popover]")
				.should("be.visible");

			cy.get("#customElId").then($customEl => {
				$customEl.get(0).attachShadow({ mode: 'open' }).innerHTML =
					`<iframe
						sandbox
						width="200"
						height="200"
						srcdoc="<div tabindex='0' id='contentId'>IFrame content</div>"
					></iframe>`;
			});

			cy.get("#myDiv")
				.realClick({ x: 100, y: 50 });

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			cy.get("[ui5-popover]")
				.should("be.visible");
		});
	});
});

describe("Focusing", () => {
	it("tests no focusable elements, but content is scrolling", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popoverId"
					style="width: 10rem; height: 10rem;"
					opener="btnOpen">
					<div>
						Note: The content of the prop will be rendered into a by assigning the
						respective slot attribute (slot="footer"). Since you can't change the
						DOM order of slots when declaring them within a prop, it might prove
						beneficial to manually mount them as part of the component's children,
						especially when facing problems with the reading order of screen
						readers. Note: When passing a custom React component to this prop, you
						have to make sure your component reads the slot prop and appends it to
						the most outer element of your component. Learn more about it here.
					</div>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", "true");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-content")
			.should("be.focused");
	});

	it("tests first element is keyboard focusable scroll container", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popoverId"
					opener="btnOpen">
					<div id="innerContent" style="width: 10rem; height: 10rem; overflow-y: auto;">
						Note: The content of the prop will be rendered into a by assigning the
						respective slot attribute (slot="footer"). Since you can't change the
						DOM order of slots when declaring them within a prop, it might prove
						beneficial to manually mount them as part of the component's children,
						especially when facing problems with the reading order of screen
						readers. Note: When passing a custom React component to this prop, you
						have to make sure your component reads the slot prop and appends it to
						the most outer element of your component. Learn more about it here.
					</div>
					<Button>Button</Button>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", "true");

		cy.get("#innerContent")
			.should("be.focused");
	});
});

describe("Events", () => {
	it("before-open", () => {
		cy.mount(
			<>
				<Button id="btnOpenPopover">Open</Button>
				<Popover id="popoverId" opener="btnOpenPopover">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Popover>
			</>
		);

		cy.get("#popoverId")
			.should("not.be.visible");

		const preventDefault = (e: Event) => {
			e.preventDefault();
		};

		cy.get("#popoverId").then($dialog => {
			$dialog.get(0).addEventListener("before-open", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get("#popoverId")
			.should("not.be.visible");

		cy.get("#popoverId").then($popover => {
			$popover.get(0).removeEventListener("before-open", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get<Popover>("#popoverId")
			.ui5PopoverOpened();
	});

	it("before-close", () => {
		cy.mount(
			<>
				<Button id="btnOpenPopover">Open</Button>
				<Popover id="popoverId" opener="btnOpenPopover">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Popover>
			</>
		);

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get<Popover>("#popoverId")
			.ui5PopoverOpened();

		const preventDefault = (e: Event) => {
			e.preventDefault();
		};

		cy.get("#popoverId").then($popover => {
			$popover.get(0).addEventListener("before-close", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", false);

		cy.get<Popover>("#popoverId")
			.ui5PopoverOpened();

		cy.get("#popoverId").then($popover => {
			$popover.get(0).removeEventListener("before-close", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", false);

		cy.get("#popoverId")
			.should("not.be.visible");
	});
});

describe("Placement", () => {
	it("placement=Bottom, but not enough bottom space", () => {
		cy.viewport(600, 600);
		cy.mount(
			<>
				<Button id="btnOpenPopover"
					style="position: absolute; top: 300px;">Open</Button>
				<Popover id="popoverId"
					headerText="Popover"
					opener="btnOpenPopover"
					placement="Bottom">
					<div style="height: 200px;">
						<button id="first">First group focusable</button>
					</div>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", true);

		cy.get<Popover>("[ui5-popover]").should("be.visible");

		// wait for the popover to be positioned
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("[ui5-popover]")
			.then($el => $el.position().top)
			.then(top => {
				expect(top).to.be.lt(100)
			});
	});

	it("placement=Start in RTL", () => {
		cy.mount(
			<div dir="rtl">
				<Button id="btnStart" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">Open</Button>
				<Popover id="popoverStart"
					headerText="Start Placement"
					opener="btnStart"
					placement="Start">
					<div style="width: 150px; padding: 10px;">
						Popover with Start placement in RTL mode
					</div>
				</Popover>
			</div>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", true);

		cy.get<Popover>("[ui5-popover]").should("be.visible");

		// wait for the popover to be positioned
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		let popover;
		cy.get('[ui5-popover]')
			.then($popover => {
				popover = $popover;
			});

		cy.get('#btnStart').should($opener => {
			const popoverRect = popover[0].getBoundingClientRect();
			const openerRect = $opener[0].getBoundingClientRect();

			// In RTL mode, Start placement should position popover to the right of the opener
			expect(popoverRect.left).to.be.greaterThan(openerRect.right - 5);
		});
	});

	it("placement=End in RTL", () => {
		cy.mount(
			<div dir="rtl">
				<Button id="btnEnd" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">Open</Button>
				<Popover id="popoverEndg"
					headerText="End Placement"
					opener="btnEnd"
					placement="End">
					<div style="width: 150px; padding: 10px;">
						Popover with End placement in RTL mode
					</div>
				</Popover>
			</div>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", true);

		cy.get<Popover>("[ui5-popover]").should("be.visible");

		// wait for the popover to be positioned
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		let popover;
		cy.get('[ui5-popover]')
			.then($popover => {
				popover = $popover;
			});

		cy.get('#btnEnd').should($opener => {
			const popoverRect = popover[0].getBoundingClientRect();
			const openerRect = $opener[0].getBoundingClientRect();

			// In RTL mode, End placement should position popover to the left of the opener
			expect(popoverRect.right).to.be.lessThan(openerRect.left + 5);
		});
	});
});

describe("Alignment", () => {
	describe("Horizontal Alignment", () => {
		it("Center", () => {
			cy.mount(
				<>
					<Button id="horizontalAlignBtn">Open horizontally aligned popover</Button>
					<Popover id="popoverHorizontalAlign" placement="Top" opener="horizontalAlignBtn" horizontalAlign="Center">
						<span></span>
					</Popover>
				</>);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");

			cy.get<Popover>("[ui5-popover]").should("be.visible");

			let popover;
			cy.get('[ui5-popover]')
				.then($popover => {
					popover = $popover;
				});

			cy.get('#horizontalAlignBtn').should($opener => {
				const openerRect = $opener[0].getBoundingClientRect();
				const openerCenter = openerRect.left + openerRect.width / 2;

				const popoverRect = popover[0].getBoundingClientRect();
				const popoverCenter = popoverRect.left + popoverRect.width / 2;

				expect(Math.abs(popoverCenter - openerCenter)).to.be.lessThan(1);
			});
		});

		it("Start", () => {
			cy.mount(
				<>
					<Button id="horizontalAlignBtn">Open horizontally aligned popover</Button>
					<Popover id="popoverHorizontalAlign" placement="Top" opener="horizontalAlignBtn" horizontalAlign="Start">
						<span></span>
					</Popover>
				</>);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");

			cy.get<Popover>("[ui5-popover]").should("be.visible");

			let popover;
			cy.get('[ui5-popover]')
				.then($popover => {
					popover = $popover;
				});

			cy.get('#horizontalAlignBtn').should($opener => {
				const popoverRect = popover[0].getBoundingClientRect();
				const openerRect = $opener[0].getBoundingClientRect();

				const openerRightEdge = openerRect.left;
				const popoverRightEdge = popoverRect.left;

				expect(Math.abs(openerRightEdge - popoverRightEdge)).to.be.lessThan(2.5);
			});
		});

		it("End", () => {
			cy.mount(
				<>
					<Button id="horizontalAlignBtn">Open horizontally aligned popover</Button>
					<Popover id="popoverHorizontalAlign" placement="Top" opener="horizontalAlignBtn" horizontalAlign="End">
						<span></span>
					</Popover>
				</>);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");

			cy.get<Popover>("[ui5-popover]").should("be.visible");

			let popover;
			cy.get('[ui5-popover]')
				.then($popover => {
					popover = $popover;
				});

			cy.get('#horizontalAlignBtn').should($opener => {
				const popoverRect = popover[0].getBoundingClientRect();
				const openerRect = $opener[0].getBoundingClientRect();

				const openerRightEdge = openerRect.right;
				const popoverRightEdge = popoverRect.right;

				expect(Math.abs(openerRightEdge - popoverRightEdge)).to.be.lessThan(1);
			});
		});

		it("Center, in RTL", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="horizontalAlignBtn">Open horizontally aligned popover</Button>
					<Popover id="popoverHorizontalAlign" placement="Top" opener="horizontalAlignBtn" horizontalAlign="Center">
						<span></span>
					</Popover>
				</div>);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");

			cy.get<Popover>("[ui5-popover]").should("be.visible");

			let popover;
			cy.get('[ui5-popover]')
				.then($popover => {
					popover = $popover;
				});

			cy.get('#horizontalAlignBtn').should($opener => {
				const openerRect = $opener[0].getBoundingClientRect();
				const openerCenter = openerRect.left + openerRect.width / 2;

				const popoverRect = popover[0].getBoundingClientRect();
				const popoverCenter = popoverRect.left + popoverRect.width / 2;

				expect(Math.abs(popoverCenter - openerCenter)).to.be.lessThan(1);
			});
		});

		it("Start, in RTL", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="horizontalAlignBtn">Open horizontally aligned popover</Button>
					<Popover id="popoverHorizontalAlign" placement="Top" opener="horizontalAlignBtn" horizontalAlign="Start">
						<span></span>
					</Popover>
				</div>);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");

			cy.get<Popover>("[ui5-popover]").should("be.visible");

			let popover;
			cy.get('[ui5-popover]')
				.then($popover => {
					popover = $popover;
				});

			cy.get('#horizontalAlignBtn').should($opener => {
				const popoverRect = popover[0].getBoundingClientRect();
				const openerRect = $opener[0].getBoundingClientRect();

				const openerRightEdge = openerRect.right;
				const popoverRightEdge = popoverRect.right;

				expect(Math.abs(openerRightEdge - popoverRightEdge)).to.be.lessThan(2.5);
			});
		});

		it("End, in RTL", () => {
			cy.mount(
				<div dir="rtl">
					<Button id="horizontalAlignBtn">Open horizontally aligned popover</Button>
					<Popover id="popoverHorizontalAlign" placement="Top" opener="horizontalAlignBtn" horizontalAlign="End">
						<span></span>
					</Popover>
				</div>);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");

			cy.get<Popover>("[ui5-popover]").should("be.visible");

			let popover;
			cy.get('[ui5-popover]')
				.then($popover => {
					popover = $popover;
				});

			cy.get('#horizontalAlignBtn').should($opener => {
				const popoverRect = popover[0].getBoundingClientRect();
				const openerRect = $opener[0].getBoundingClientRect();

				const openerRightEdge = openerRect.left;
				const popoverRightEdge = popoverRect.left;

				expect(Math.abs(openerRightEdge - popoverRightEdge)).to.be.lessThan(1);
			});
		});
	});

	describe("Arrow Horizontal Alignment", () => {

		it("Arrow centering when opener has big width", () => {
			cy.mount(
				<>
					<Button id="btnFullWidthTop" class="fullWidth">Click me !</Button>
					<Popover placement="Top" opener="btnFullWidthTop">
						<div slot="header">
							<Button id="first-focusable">I am in the header</Button>
						</div>
					</Popover>
				</>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");

			cy.get<Popover>("[ui5-popover]").should("be.visible");

			let arrow;
			cy.get('[ui5-popover]')
				.shadow()
				.find('.ui5-popover-arrow')
				.then($arrow => {
					arrow = $arrow;
				});

			cy.get('#btnFullWidthTop').should($opener => {
				const openerRect = $opener[0].getBoundingClientRect();
				const openerCenter = openerRect.left + openerRect.width / 2;

				const arrowRect = arrow[0].getBoundingClientRect();
				const arrowCenter = arrowRect.left + arrowRect.width / 2;

				expect(Math.abs(arrowCenter - openerCenter)).to.be.lessThan(1.5);
			});
		});

		it("Arrow centering when opener is to the left edge", () => {
			cy.mount(
				<>
					<Button id="btnLeftEdgeTop" />
					<Popover placement="Top" opener="btnLeftEdgeTop">
						<div slot="header">
							<Button id="first-focusable">I am in the header</Button>
						</div>
					</Popover>
				</>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");

			cy.get<Popover>("[ui5-popover]").should("be.visible");

			let arrow;
			cy.get('[ui5-popover]')
				.shadow()
				.find('.ui5-popover-arrow')
				.then($arrow => {
					arrow = $arrow;
				});

			cy.get('#btnLeftEdgeTop').should($opener => {
				const openerRect = $opener[0].getBoundingClientRect();
				const openerCenter = openerRect.left + openerRect.width / 2;

				const arrowRect = arrow[0].getBoundingClientRect();
				const arrowCenter = arrowRect.left + arrowRect.width / 2;

				expect(Math.abs(arrowCenter - openerCenter)).to.be.lessThan(1);
			});
		});

		it("Arrow centering when opener is to the right edge", () => {
			cy.mount(
				<>
					<Button id="btnRightEdgeTop" />
					<Popover placement="Top" opener="btnRightEdgeTop">
						<div slot="header">
							<Button id="first-focusable">I am in the header</Button>
						</div>
					</Popover>
				</>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");

			cy.get<Popover>("[ui5-popover]").should("be.visible");

			let arrow;
			cy.get('[ui5-popover]')
				.shadow()
				.find('.ui5-popover-arrow')
				.then($arrow => {
					arrow = $arrow;
				});

			cy.get('#btnRightEdgeTop').should($opener => {
				const openerRect = $opener[0].getBoundingClientRect();
				const openerCenter = openerRect.left + openerRect.width / 2;

				const arrowRect = arrow[0].getBoundingClientRect();
				const arrowCenter = arrowRect.left + arrowRect.width / 2;

				expect(Math.abs(arrowCenter - openerCenter)).to.be.lessThan(1);
			});
		});
	});
});

describe("Responsive paddings", () => {
	it("tests media-range", () => {
		cy.viewport(1000, 400);

		cy.mount(
			<>
				<Button id="btnOpenXRightWide">Open</Button>
				<Popover id="popXRightWide" placement="Bottom" horizontalAlign="End" opener="btnOpenXRightWide">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni architecto tenetur quia nam reprehenderit quas eveniet possimus similique quisquam culpa distinctio ex doloremque molestiae maxime sed harum, in exercitationem! Incidunt?
				</Popover>
			</>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", "true");

		cy.get<Popover>("[ui5-popover]").should("be.visible");
		cy.get("[ui5-popover]").should("have.attr", "media-range", "M");
	});
});
