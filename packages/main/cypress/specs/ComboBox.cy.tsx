import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";
import ComboBoxItemGroup from "../../src/ComboBoxItemGroup.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import Link from "../../src/Link.js";
import Input from "../../src/Input.js";
import Button from "../../src/Button.js";

describe("Security", () => {
	it("tests setting malicious text to items", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="<script>alert('XSS')</script>"></ComboBoxItem>
				<ComboBoxItem text="<b onmouseover=alert('XSS')></b>"></ComboBoxItem>
				<ComboBoxItem text="Albania<button onClick='alert(1)'>alert</button>"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").as("combobox");
		cy.get("@combobox").find("[ui5-cb-item]").eq(0).shadow().find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");
		cy.get("@combobox").find("[ui5-cb-item]").eq(1).shadow().find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");
		cy.get("@combobox").find("[ui5-cb-item]").eq(2).shadow().find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});

describe("General Interaction", () => {
	it("should open/close popover when clicking on the arrow", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One"></ComboBoxItem>
				<ComboBoxItem text="Two"></ComboBoxItem>
				<ComboBoxItem text="Three"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combobox")
			.shadow()
			.find("[ui5-icon]")
			.as("arrow");

		cy.get("@arrow").realClick();
		cy.get("@combobox").shadow().find("[ui5-responsive-popover]").should("have.attr", "open");

		cy.get("@arrow").realClick();
		cy.get("@combobox").shadow().find("[ui5-responsive-popover]").should("not.have.attr", "open");
	});

	it("tests items filtration", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One"></ComboBoxItem>
				<ComboBoxItem text="Two"></ComboBoxItem>
				<ComboBoxItem text="Three"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combobox")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("[ui5-cb-item]").should("have.length", 3);

		cy.get("@combobox").realPress("O");
		cy.get("[ui5-cb-item]").eq(0).should("have.prop", "_isVisible", true);
		cy.get("[ui5-cb-item]").eq(1).should("not.have.prop", "_isVisible", true);
		cy.get("[ui5-cb-item]").eq(2).should("not.have.prop", "_isVisible", true);
	});

	it("should open the popover when typing a value", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One"></ComboBoxItem>
				<ComboBoxItem text="Two"></ComboBoxItem>
				<ComboBoxItem text="Three"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combobox")
			.realClick();

		cy.get("@combobox").realPress("O");
		cy.get("@combobox").shadow().find("[ui5-responsive-popover]").should("have.prop", "open");

		cy.get("@combobox").should("have.prop", "value", "One");
		cy.get("[ui5-cb-item]").first().should("have.prop", "selected", true);

		cy.window().then(window => {
			return window.getSelection()?.toString();
		}).should("contains", "ne");
	});

	it("check that popover closes when there are no matches", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" id="cbi"></ComboBoxItem>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combobox")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("[ui5-cb-item]").should("have.length", 3);

		cy.get("@combobox").shadow().find("input").realPress("a");
		cy.get("[ui5-cb-item]").eq(0).should("have.prop", "_isVisible", true);
		cy.get("[ui5-cb-item]").eq(1).should("have.prop", "_isVisible", true);
		cy.get("[ui5-cb-item]").eq(2).should("not.have.prop", "_isVisible", true);

		cy.get("@combobox").shadow().find("input").realPress("z");
		cy.get("@combobox").shadow().find("ui5-responsive-popover").should("not.have.attr", "open");
	});

	it("should close popover on item click / change event", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One"></ComboBoxItem>
				<ComboBoxItem text="Two"></ComboBoxItem>
				<ComboBoxItem text="Three"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combobox")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@combobox").shadow().find("input").realPress("t");

		cy.get("@combobox").shadow().find("ui5-responsive-popover").should("have.attr", "open");

		cy.get("@combobox").shadow().find("input").realPress("Enter");
		cy.get("@combobox").shadow().find("ui5-responsive-popover").should("not.have.attr", "open");

		cy.get("@combobox").shadow().find("[ui5-icon]").realClick();
		cy.get("@combobox").shadow().find("ui5-responsive-popover").should("have.attr", "open");

		cy.get("[ui5-cb-item]").first().shadow().find("li").realClick();
		cy.get("@combobox").shadow().find("ui5-responsive-popover").should("not.have.attr", "open");
	});

	it("tests focused property when clicking on the arrow", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").should("have.prop", "focused", false);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").should("have.prop", "focused", true);
	});

	it("tests focused property when clicking on the input", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").should("have.prop", "focused", false);
		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realClick();
		cy.get("[ui5-combobox]").should("have.prop", "focused", true);
	});

	it("tests Combo with two-column layout", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem additionalText="DZ" text="Item 1" />
				<ComboBoxItem additionalText="US" text="Item 2" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();
		cy.get("[ui5-cb-item]").first().shadow()
			.find(".ui5-li-additional-text")
			.should("have.text", "DZ");
	});

	it("should not open value state message when component is in readonly state", () => {
		cy.mount(
			<ComboBox id="readonly-value-state-cb" readonly valueState={ValueState.Negative}>
				<ComboBoxItem text="Item 1" />
				<ComboBoxItem text="Item 2" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").should("not.be.visible");
	});

	it("should check clear icon availability", () => {
		cy.mount(
			<ComboBox value="initial" showClearIcon>
				<ComboBoxItem text="Item 1" />
				<ComboBoxItem text="Item 2" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").should("have.prop", "_effectiveShowClearIcon", true);

		cy.get("[ui5-combobox]").shadow().find(".ui5-input-clear-icon-wrapper").realClick();
		cy.get("[ui5-combobox]").should("have.prop", "_effectiveShowClearIcon", false);

		cy.get("[ui5-combobox]").shadow().find("input").realClick();
		cy.get("[ui5-combobox]").shadow().find("input").realType("c");
		cy.get("[ui5-combobox]").should("have.prop", "_effectiveShowClearIcon", true);
	});

	it("tests Combo with contains filter", () => {
		cy.mount(
			<ComboBox filter="Contains">
				<ComboBoxItem text="Germany"></ComboBoxItem>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").as("combobox");
		cy.get("@combobox").shadow().find(".inputIcon").realClick();
		cy.get("@combobox").find("[ui5-cb-item]").should("have.length", 4);

		cy.get("@combobox").shadow().find("[inner-input]").realType("n");
		cy.get("@combobox")
			.find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 3);

		cy.get("@combobox").shadow().find("[inner-input]").realType("a");
		cy.get("@combobox").find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 2);

		cy.get("@combobox").shadow().find("[inner-input]").realType("d");
		cy.get("@combobox").find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 1);

		cy.get("@combobox").find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.first()
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "Canada");
	});

	it("tests Combo with startswith filter", () => {
		cy.mount(
			<ComboBox filter="StartsWith">
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
				<ComboBoxItem text="Germany"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();
		cy.get("[ui5-cb-item]").should("have.length", 4);

		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realType("a");
		cy.get("[ui5-combobox]")
			.find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 1)
			.first()
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "Argentina");

		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realType("a");
		cy.get("[ui5-combobox]").shadow().find("ui5-responsive-popover").should("not.have.attr", "open");
	});

	it("should add items dynamically to the picker", () => {
		cy.mount(
			<>
				<button id="add-items-btn" onClick={() => {
					setTimeout(() => {
						const combo: any = document.querySelector("[ui5-combobox]");
						const newItem = document.createElement("ui5-cb-item");
						newItem.setAttribute("text", `New item`);
						combo.appendChild(newItem);
					}, 1000);
				}}>
					Add items
				</button>
				<ComboBox>
					<ComboBoxItem text="Initial Item" />
				</ComboBox>
			</>
		);

		cy.get("button").realClick();
		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();

		cy.get("[ui5-combobox]").find("[ui5-cb-item]").its("length").as("initialCount");
		cy.get("@initialCount").then(initialCount => {
			expect(initialCount).to.equal(1, "item count should be updated");
		});

		cy.get("[ui5-combobox]").find("[ui5-cb-item]").should("have.length", 2);
	});

	it("should filter items based on input with filter='None' and lazy loading", () => {
		cy.mount(
			<ComboBox filter="None"></ComboBox>
		);

		cy.get("[ui5-combobox]").then(() => {
			const cb: ComboBox = document.querySelector("[ui5-combobox]")!;
			let currentSearch: {
				cancel: () => void;
				items: Promise<string[] | undefined>;
			} | undefined;
			let debounce: number | undefined;

			function reset() {
				[...cb.children].forEach(c => cb.removeChild(c));
			}

			function fetchSearchResults(text: string) {
				let cancel: () => void;
				return {
					cancel: () => cancel(),
					items: new Promise<string[] | undefined>(resolve => {
						const i = setTimeout(() => {
							const items = [];
							for (let i = 0; i < 5; i++) {
								items.push(`${text} #${i + 1}`);
							}
							resolve(items);
						}, 500);
						cancel = () => {
							clearTimeout(i);
							resolve(undefined);
						};
					})
				};
			}

			const inputHandler = (e: Event) => {
				const debounceTime = 250;
				if (debounce !== undefined) {
					clearTimeout(debounce);
				}
				debounce = setTimeout(async () => {
					debounce = undefined;
					const combobox = e.target as ComboBox;
					const value = combobox.value;

					if (currentSearch !== undefined) {
						currentSearch.cancel();
					}

					if (value) {
						currentSearch = fetchSearchResults(value)!;
						const items = await currentSearch.items;
						if (items) {
							currentSearch = undefined;
							reset();
							items.forEach(text => {
								const item = document.createElement("ui5-cb-item");
								item.setAttribute("text", text);
								cb.appendChild(item);
							});
						}
					} else {
						reset();
					}
				}, debounceTime);
			};

			cy.wrap(cb).invoke('on', 'input', inputHandler);
		});

		cy.get("[ui5-combobox]").shadow().find("input").realClick();
		cy.get("[ui5-combobox]").shadow().find("input").realPress("I");

		cy.get("[ui5-cb-item]").should("have.length", 5);
		cy.get("[ui5-cb-item]").first().shadow()
			.find(".ui5-li-title")
			.should("have.text", "I #1");
	});

	it("should not render ComboBox items list when no items are present", () => {
		cy.mount(
			<ComboBox valueState="Negative" open>
				{/* No ComboBox items */}
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover")
			.should("have.attr", "open");

		cy.get("@popover")
			.find(".ui5-responsive-popover-header.ui5-valuestatemessage-root")
			.should("exist");

		cy.get("@popover")
			.find("ui5-list")
			.should("not.exist");
	});
});

describe("Keyboard navigation", () => {
	it("should focus the first item on arrow down and then the input on arrow up", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Item 1.1" />
					<ComboBoxItem text="Item 1.2" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@combo")
			.find("[ui5-cb-item-group]")
			.first()
			.should("have.prop", "focused", true);

		cy.get("@combo").shadow().find("input").realPress("ArrowUp");
		cy.get("@combo").should("have.prop", "focused", true);

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");
		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@combo")
			.find("[ui5-cb-item]")
			.first()
			.should("have.prop", "focused", true);

		cy.get("@combo").shadow().find("input").realPress("ArrowUp");

		cy.get("@combo")
			.find("[ui5-cb-item-group]")
			.first()
			.should("have.prop", "focused", true);
	});

	it("should select the corresponding item on home/pgup/pgdown/end", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria"></ComboBoxItem>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Australia"></ComboBoxItem>
				<ComboBoxItem text="Austria"></ComboBoxItem>
				<ComboBoxItem text="Bahrain"></ComboBoxItem>
				<ComboBoxItem text="Belgium"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
				<ComboBoxItem text="Chile"></ComboBoxItem>
				<ComboBoxItem text="China"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("comboBox")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@comboBox").shadow().find("[ui5-icon]").as("pickerIcon");

		cy.get("@pickerIcon").realClick();
		cy.get("@input").realPress("ArrowDown");
		cy.get("@input").realPress("ArrowDown");

		cy.get("@input").realPress("Home");
		cy.get("@comboBox")
			.find("[ui5-cb-item]")
			.first()
			.should("have.prop", "focused", true);
		cy.get("@comboBox").should("not.have.prop", "focused", true);

		cy.get("@input").realPress("End");
		cy.get("@comboBox")
			.find("[ui5-cb-item]")
			.eq(10)
			.should("have.prop", "focused", true);

		cy.get("@input").realPress("PageUp");
		cy.get("@comboBox")
			.find("[ui5-cb-item]")
			.first()
			.should("have.prop", "focused", true);

		cy.get("@input").realPress("PageDown");
		cy.get("@comboBox")
			.find("[ui5-cb-item]")
			.eq(10)
			.should("have.prop", "focused", true);

		cy.get("@pickerIcon").realClick();

		cy.get("@comboBox").invoke("attr", "value", "");

		cy.get("@input").realPress("Home");
		cy.get("@input").should("have.value", "Algeria");

		cy.get("@comboBox").invoke("attr", "value", "");

		cy.get("@input").realPress("End");
		cy.get("@input").should("have.value", "China");

		cy.get("@input").realPress("PageUp");
		cy.get("@input").should("have.value", "Algeria");

		cy.get("@input").realPress("PageDown");
		cy.get("@input").should("have.value", "China");
	});

	it("should select the matching item when input has matching value and F4 is pressed", () => {
		cy.mount(
			<ComboBox value="Bulgaria">
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
				<ComboBoxItem text="Australia" />
				<ComboBoxItem text="Austria" />
				<ComboBoxItem text="Bahrain" />
				<ComboBoxItem text="Belgium" />
				<ComboBoxItem text="Brazil" />
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Canada" />
				<ComboBoxItem text="Chile" />
				<ComboBoxItem text="China" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("comboBox")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input").realClick();
		cy.get("@comboBox").realPress("F4");

		cy.get("[ui5-combobox]")
			.find("[ui5-cb-item]")
			.eq(7)
			.as("selectedListItem");

		cy.get("@selectedListItem").shadow().find(".ui5-li-title").invoke("text").then(text => {
			cy.get("@input").should("have.value", text);
		});
	});

	it("tests disabled autocomplete(type-ahead)", () => {
		cy.mount(
			<ComboBox noTypeahead>
				<ComboBoxItem text="Bahrain" />
				<ComboBoxItem text="Belgium" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("comboBox")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input").realClick();
		cy.get("@input").realPress("b");

		cy.get("@comboBox")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input").should("have.value", "b");
	});
});

describe("Grouping", () => {
	it("tests input value while group item is focused", () => {
		cy.mount(
			<ComboBox id="combo-grouping">
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Item 1.1" />
					<ComboBoxItem text="Item 1.2" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group 2">
					<ComboBoxItem text="Item 2.1" />
					<ComboBoxItem text="Item 2.2" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("#combo-grouping").shadow().find("input").realClick();
		cy.get("#combo-grouping").shadow().find("input").realType("i");

		cy.get("#combo-grouping").shadow().find("input").realPress("ArrowDown");
		cy.get("#combo-grouping").shadow().find("input").realPress("ArrowDown");

		cy.get("#combo-grouping")
			.find("[ui5-cb-item-group]")
			.eq(1)
			.should("have.prop", "focused", true);
		cy.get("#combo-grouping").should("have.prop", "filterValue", "i");
		cy.get("#combo-grouping").should("have.prop", "value", "");
	});

	it("grouped items should be filtered and with the correct role attributes", () => {
		cy.mount(
			<ComboBox id="combo-grouping">
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Item 1.1" />
					<ComboBoxItem text="Item 1.2" />
					<ComboBoxItem text="Item 1.3" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group 2">
					<ComboBoxItem text="Item 2.1" />
					<ComboBoxItem text="Item 2.2" />
					<ComboBoxItem text="Item 2.3" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("#combo-grouping").shadow().find("input").realClick();
		cy.get("#combo-grouping").shadow().find("input").realType("Item 2");

		cy.get("#combo-grouping")
			.shadow()
			.find("ui5-responsive-popover")
			.find("ui5-list")
			.should("have.attr", "accessible-role", "ListBox");

		cy.get("#combo-grouping")
			.find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.first()
			.shadow()
			.find("li")
			.should("have.attr", "role", "option");

		cy.get("#combo-grouping")
			.find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 3);
	});

	it("tests group filtering", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Group A">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Argentina" />
					<ComboBoxItem text="Australia" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group B">
					<ComboBoxItem text="Belgium" />
					<ComboBoxItem text="Brazil" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group C">
					<ComboBoxItem text="Canada" />
					<ComboBoxItem text="Chile" />
					<ComboBoxItem text="China" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group D">
					<ComboBoxItem text="Denmark" />
					<ComboBoxItem text="Donut" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@combo")
			.find("[ui5-cb-item-group]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 4);

		cy.get("@combo")
			.find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 10);

		cy.get("@combo").shadow().find("input").realPress("c");

		cy.get("@combo")
			.find("[ui5-cb-item-group]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 1);

		cy.get("@combo")
			.find("[ui5-cb-item]")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 3);
	});

	it("tests group item focusability", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Item 1.1" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@combo")
			.find("[ui5-cb-item-group]")
			.first()
			.should("have.prop", "focused", true);
	});

	it("pressing enter on a group item should not close the picker", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Item 1.1" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");
		cy.get("@combo").shadow().find("input").realPress("Enter");

		cy.get("@combo")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);
	});
});

describe("Accessibility", () => {
	it("announce item on selection", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Item 1" />
				<ComboBoxItem text="Item 2" />
				<ComboBoxItem text="Item 3" />
				<ComboBoxItem text="Item 4" />
				<ComboBoxItem text="Item 5" />
				<ComboBoxItem text="Item 6" />
				<ComboBoxItem text="Item 7" />
				<ComboBoxItem text="Item 8" />
				<ComboBoxItem text="Item 9" />
				<ComboBoxItem text="Item 10" />
				<ComboBoxItem text="Item 11" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get(".ui5-invisiblemessage-polite")
			.as("invisibleMessageSpan")
			.should("have.text", "");

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@invisibleMessageSpan").should("contain.text", "List item 1 of 11");

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@invisibleMessageSpan").should("contain.text", "List item 2 of 11");
	});

	it("should render aria-haspopup attribute with value 'dialog'", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Item 1" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("announce item with additional text on selection", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Item 1" additionalText="A1" />
				<ComboBoxItem text="Item 2" additionalText="A2" />
				<ComboBoxItem text="Item 3" additionalText="A3" />
				<ComboBoxItem text="Item 4" additionalText="A4" />
				<ComboBoxItem text="Item 5" additionalText="A5" />
				<ComboBoxItem text="Item 6" additionalText="A6" />
				<ComboBoxItem text="Item 7" additionalText="A7" />
				<ComboBoxItem text="Item 8" additionalText="A8" />
				<ComboBoxItem text="Item 9" additionalText="CA" />
				<ComboBoxItem text="Item 10" additionalText="CL" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get(".ui5-invisiblemessage-polite")
			.as("invisibleMessageSpan")
			.should("have.text", "");

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@invisibleMessageSpan").should("contain.text", "A1 List item 1 of 10");

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@invisibleMessageSpan").should("contain.text", "A2 List item 2 of 10");
	});

	it("announce group item when accessed via keyboard", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Group Header A">
					<ComboBoxItem text="Item 1" />
					<ComboBoxItem text="Item 2" />
					<ComboBoxItem text="Item 3" />
					<ComboBoxItem text="Item 4" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group Header Donut">
					<ComboBoxItem text="Item 5" />
					<ComboBoxItem text="Item 6" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get(".ui5-invisiblemessage-polite")
			.as("invisibleMessageSpan")
			.should("have.text", "");

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@invisibleMessageSpan").should("contain.text", "Group Header A");

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@invisibleMessageSpan").should("contain.text", "List item 1 of 6");

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");
		cy.get("@combo").shadow().find("input").realPress("ArrowDown");
		cy.get("@combo").shadow().find("input").realPress("ArrowDown");
		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@invisibleMessageSpan").should("contain.text", "Group Header Donut");
	});

	it("should announce only the item text when accessed via keyboard and popover is not opened", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Argentina" />
				<ComboBoxItem text="Australia" />
				<ComboBoxItem text="Belgium" />
				<ComboBoxItem text="Brazil" />
				<ComboBoxItem text="Canada" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.realClick();

		cy.get(".ui5-invisiblemessage-polite")
			.as("invisibleMessageSpan")
			.should("have.text", "");

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@invisibleMessageSpan").should("have.text", "");

		// open the popover
		cy.get("@combo").shadow().find("input").realPress("F4");
		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@invisibleMessageSpan").should("have.text", "List item 2 of 6");
	});

	it("tests setting value programmatically", () => {
		cy.mount(
			<>
				<ComboBox value="Bulgaria">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Bulgaria" />
					<ComboBoxItem text="Canada" />
				</ComboBox>
				<button onClick={() => {
					const combo = document.querySelector("[ui5-combobox]") as ComboBox;
					combo.value = "new value";
				}}>Set Value</button>
			</>
		);

		cy.get("[ui5-combobox]").as("combo");
		cy.get("@combo").should("have.prop", "value", "Bulgaria");

		cy.get("button").realClick();

		cy.get("@combo").should("have.prop", "value", "new value");
		cy.get("@combo").shadow().find("input").should("have.value", "new value");
	});

	it("should focus the ComboBox with the API", () => {
		cy.mount(
			<>
				<ComboBox>
					<ComboBoxItem text="Item 1" />
				</ComboBox>
				<button onClick={() => {
					const combo = document.querySelector("[ui5-combobox]") as ComboBox;
					combo.focus();
				}}>Focus ComboBox</button>
			</>
		);

		cy.get("button").realClick();

		cy.get("[ui5-combobox]").should("have.prop", "focused", true);
	});

	it("value state type should be added to the screen readers default value states announcement", () => {
		cy.mount(
			<>
				<ComboBox valueState="Critical">
					<ComboBoxItem text="Item 1" />
				</ComboBox>
				<ComboBox valueState="Positive">
					<ComboBoxItem text="Item 1" />
				</ComboBox>
				<ComboBox valueState="Information">
					<ComboBoxItem text="Item 1" />
				</ComboBox>
			</>
		);

		cy.get("[ui5-combobox]").eq(0).as("warningCombo").realClick();

		cy.get("@warningCombo")
			.shadow()
			.find("#value-state-description")
			.should("contain.text", "Value State");

		cy.get("@warningCombo")
			.shadow()
			.find("ui5-popover")
			.find("div")
			.should("contain.text", "Warning issued");

		cy.get("@warningCombo").realPress("Escape");
		cy.get("[ui5-combobox]").eq(2).as("infoCombo").realClick();

		cy.get("@infoCombo")
			.shadow()
			.find(".ui5-hidden-text")
			.should("contain.text", "Value State");

		cy.get("@infoCombo")
			.shadow()
			.find("ui5-popover")
			.find("div")
			.should("contain.text", "Informative entry");

		cy.get("@infoCombo").realPress("Escape");
		cy.get("[ui5-combobox]").eq(1).as("successCombo").realClick();

		cy.get("@successCombo")
			.shadow()
			.find(".ui5-hidden-text")
			.should("contain.text", "Value State");
	});

	it("value state type should be added to the screen readers custom value states announcement", () => {
		cy.mount(
			<ComboBox valueState="Negative">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">Link</Link>.
				</div>
				<ComboBoxItem text="Item 1" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").as("combo").realClick();
		cy.get("@combo").realPress("a");

		cy.get("@combo")
			.find("div[slot='valueStateMessage']")
			.should("contain.text", "Custom error");

		cy.get("@combo")
			.shadow()
			.find("#value-state-description")
			.should("contain.text", "Value State");
	});

	it("should apply aria-controls pointing to the responsive popover", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Item 1" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@combo")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@combo").scrollIntoView();

		cy.get("@innerInput").invoke("attr", "aria-controls").then(ariaControls => {
			cy.get("@popover").invoke("attr", "id").should("equal", ariaControls);
		});
	});

	it("should announce the associated label when ComboBox is focused", () => {
		cy.mount(
			<>
				<label for="cb">Should be the aria-label</label>
				<ComboBox id="cb"/>
			</>
		);

		cy.get('label[for="cb"]')
			.invoke('text')
			.then((labelText) => {

				cy.get("[ui5-combobox]")
					.shadow()
					.find("input")
					.as("innerInput");

				cy.get("@innerInput")
					.realClick();

				cy.get("@innerInput")
					.should("have.attr", "aria-label", labelText);
			});
	});
});

describe("Additional Navigation", () => {
	it("Previous focus should not remain on the item after reopening the picker and choosing another one", () => {
		cy.mount(
			<ComboBox id="value-state-grouping" valueState="Critical">
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Argentina" />
					<ComboBoxItem text="Australia" />
					<ComboBoxItem text="Austria" />
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Bahrain" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("#value-state-grouping")
			.as("combo")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input").realClick();
		cy.get("@input").realType("A");

		cy.get("#value-state-grouping")
			.find("[ui5-cb-item]")
			.eq(1)
			.should("not.have.prop", "focused", true);

		cy.get("@combo").shadow().find("[ui5-icon]").realClick();

		// Navigate to last item and press ENTER
		for (let i = 0; i < 7; i++) {
			cy.get("@input").realPress("ArrowDown");
		}
		cy.get("@input").realPress("Enter");

		cy.get("@combo").shadow().find("[ui5-icon]").realClick();

		cy.get("#value-state-grouping")
			.find("[ui5-cb-item]")
			.eq(3)
			.realClick();

		cy.get("@combo").shadow().find("[ui5-icon]").realClick();

		cy.get("#value-state-grouping")
			.find("[ui5-cb-item]")
			.eq(4)
			.should("not.have.prop", "focused", true);
	});

	it("Navigates back and forward through items in multiple groups", () => {
		cy.mount(
			<ComboBox id="value-state-grouping" valueState="Critical">
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Argentina" />
					<ComboBoxItem text="Australia" />
					<ComboBoxItem text="Austria" />
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Bahrain" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("#value-state-grouping")
			.as("combo")
			.shadow()
			.find("input")
			.realClick();

		// Navigate down 5 times to reach Bahrain
		for (let i = 0; i < 5; i++) {
			cy.get("@combo").shadow().find("input").realPress("ArrowDown");
		}

		cy.get("#value-state-grouping").should("have.prop", "value", "Bahrain");

		// Navigate back up 4 times to reach Argentina
		for (let i = 0; i < 4; i++) {
			cy.get("@combo").shadow().find("input").realPress("ArrowUp");
		}

		cy.get("#value-state-grouping").should("have.prop", "value", "Argentina");
	});

	it("Should select previous item when the last suggestion is selected and the picker is closed", () => {
		cy.mount(
			<ComboBox id="combo-grouping">
				<ComboBoxItemGroup headerText="Group A">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Argentina" />
					<ComboBoxItem text="Australia" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group B">
					<ComboBoxItem text="Belgium" />
					<ComboBoxItem text="Brazil" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group C">
					<ComboBoxItem text="Canada" />
					<ComboBoxItem text="Chile" />
					<ComboBoxItem text="China" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group D">
					<ComboBoxItem text="Denmark" />
					<ComboBoxItem text="Albania" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("#combo-grouping").realClick();
		cy.get("#combo-grouping").realPress("End");
		cy.get("#combo-grouping").realPress("ArrowUp");

		cy.get("#combo-grouping").should("have.prop", "value", "Denmark");
	});

	it("Should scroll to items that are in the scroll area upon navigation", () => {
		cy.mount(
			<ComboBox id="combo-grouping">
				<ComboBoxItemGroup headerText="Group A">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Argentina" />
					<ComboBoxItem text="Australia" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group B">
					<ComboBoxItem text="Belgium" />
					<ComboBoxItem text="Brazil" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group C">
					<ComboBoxItem text="Canada" />
					<ComboBoxItem text="Chile" />
					<ComboBoxItem text="China" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Group D">
					<ComboBoxItem text="Denmark" />
					<ComboBoxItem text="Donut" />
					<ComboBoxItem text="Dubai" />
					<ComboBoxItem text="Dublin" />
					<ComboBoxItem text="Durban" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.viewport(1000, 400);

		cy.get("#combo-grouping")
			.as("combo")
			.scrollIntoView()
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		// Navigate to last item
		for (let i = 0; i < 16; i++) {
			cy.get("@combo").realPress("ArrowDown");
		}

		// Check if last item is now visible
		cy.window().then(win => {
			const combobox = win.document.getElementById("combo-grouping") as any;
			return combobox._getPicker();
		}).then(picker => {
			const scrollableRect = picker[0].shadowRoot.querySelector(".ui5-popup-content").getBoundingClientRect();
			const lastItem = document.querySelector("#combo-grouping ui5-cb-item-group:last-child ui5-cb-item:last-child");
			const elementRect = lastItem!.getBoundingClientRect();

			const isInVisibleArea = !(
				elementRect.bottom < scrollableRect.top ||
				elementRect.top > scrollableRect.bottom ||
				elementRect.right < scrollableRect.left ||
				elementRect.left > scrollableRect.right
			);

			expect(isInVisibleArea).to.be.true;
		});

		// Navigate to first item
		cy.get("@combo").realPress("Home");

		// Check if first item is visible
		cy.window().then(win => {
			const combobox = win.document.getElementById("combo-grouping") as any;
			return combobox._getPicker();
		}).then(picker => {
			const scrollableRect = picker[0].shadowRoot.querySelector(".ui5-popup-content").getBoundingClientRect();
			const firstItem = document.querySelector("#combo-grouping ui5-cb-item-group:first-child ui5-cb-item:first-child");
			const elementRect = firstItem!.getBoundingClientRect();

			const isInVisibleArea = !(
				elementRect.bottom < scrollableRect.top ||
				elementRect.top > scrollableRect.bottom ||
				elementRect.right < scrollableRect.left ||
				elementRect.left > scrollableRect.right
			);

			expect(isInVisibleArea).to.be.true;
		});
	});
});

describe("Keyboard interaction", () => {
	it("should not focus the value state header", () => {
		cy.mount(
			<ComboBox id="value-state-grouping" valueState="Critical">
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Item 1.1" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("#value-state-grouping")
			.as("combo")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("@combo")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@popover")
			.find(".ui5-responsive-popover-header.ui5-valuestatemessage-root")
			.as("valueStateHeader");

		cy.get("#value-state-grouping").should("not.have.attr", "focused");
		cy.get("@valueStateHeader").should("not.have.class", "ui5-responsive-popover-header--focused");

		cy.get("#value-state-grouping")
			.find("[ui5-cb-item-group]")
			.first()
			.should("have.prop", "focused", true);

		cy.get("@combo").shadow().find("input").realPress("ArrowUp");
		cy.get("#value-state-grouping").should("have.prop", "focused", true);
		cy.get("@valueStateHeader").should("not.have.class", "ui5-responsive-popover-header--focused");
	});

	it("navigates back and forward through the items when the suggestions are closed", () => {
		cy.mount(
			<ComboBox id="value-state-grouping" valueState="Critical">
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Argentina" />
					<ComboBoxItem text="Australia" />
					<ComboBoxItem text="Austria" />
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Bahrain" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("#value-state-grouping")
			.as("combo")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("#value-state-grouping").should("have.prop", "value", "Argentina");
		cy.get("#value-state-grouping").should("have.prop", "focused", true);

		cy.get("@combo").shadow().find("input").realPress("ArrowDown");

		cy.get("#value-state-grouping").should("have.prop", "value", "Australia");
		cy.get("#value-state-grouping").should("have.prop", "focused", true);

		cy.get("@combo").shadow().find("input").realPress("ArrowUp");

		cy.get("#value-state-grouping").should("have.prop", "value", "Argentina");
		cy.get("#value-state-grouping").should("have.prop", "focused", true);

		cy.get("@combo").shadow().find("input").realPress("ArrowUp");

		cy.get("#value-state-grouping").should("have.prop", "value", "Argentina");
		cy.get("#value-state-grouping").should("have.prop", "focused", true);

		cy.get("@combo").shadow().find("[ui5-icon]").realClick();

		cy.get("#value-state-grouping")
			.find("[ui5-cb-item]")
			.eq(4)
			.should("have.prop", "focused", false);
	});

	it("should focus the next/previous focusable element on TAB/SHIFT+TAB", () => {
		cy.mount(
			<>
				<ComboBox id="prev-combo">
					<ComboBoxItem text="Item 1" />
				</ComboBox>
				<ComboBox id="combo-grouping">
					<ComboBoxItemGroup headerText="Group 1">
						<ComboBoxItem text="Item 1.1" />
					</ComboBoxItemGroup>
				</ComboBox>
				<ComboBox id="next-combo">
					<ComboBoxItem text="Item 1" />
				</ComboBox>
			</>
		);

		cy.get("#combo-grouping").shadow().find("input").realClick();
		cy.get("#combo-grouping").should("be.focused");

		cy.get("#combo-grouping").shadow().find("input").realClick();
		cy.get("#combo-grouping").should("be.focused");

		cy.get("#combo-grouping").realPress("Tab");
		cy.get("#next-combo").should("be.focused");

		cy.get("#combo-grouping").shadow().find("input").realClick();
		cy.get("#combo-grouping").should("be.focused");

		cy.get("#combo-grouping").realPress(["Shift", "Tab"]);
		cy.get("#prev-combo").should("be.focused");
	});

	it("should not select an item when input value does not match any item and F4 is pressed", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("comboBox")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@comboBox").realType("test");
		cy.get("@comboBox").realPress("F4");

		cy.get("@comboBox")
			.shadow()
			.find("ui5-responsive-popover")
			.find("ui5-list")
			.find("ui5-li[selected]")
			.should("have.length", 0);
	});

	it("should select the first non-group item when input value is empty and F4 is pressed (no grouping)", () => {
		cy.mount(
			<ComboBox id="combo2">
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("#combo2")
			.as("comboBox")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input").should("have.value", "");

		cy.get("@input").realClick();
		cy.get("@comboBox").realPress("F4");

		cy.get("#combo2")
			.find("[ui5-cb-item]")
			.first()
			.shadow()
			.find(".ui5-li-title")
			.invoke("text")
			.then(firstListItemText => {
				cy.get("@input").should("have.value", firstListItemText);
			});
	});

	it("should select the first non-group item when input value is empty and F4 is pressed (with grouping)", () => {
		cy.mount(
			<ComboBox id="combo-grouping">
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Argentina" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("#combo-grouping")
			.as("comboBox")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input").should("have.value", "");

		cy.get("@input").realClick();
		cy.get("@comboBox").realPress("F4");

		cy.get("#combo-grouping")
			.find("[ui5-cb-item]")
			.first()
			.shadow()
			.find(".ui5-li-title")
			.invoke("text")
			.then(firstListItemText => {
				cy.get("@input").should("have.value", firstListItemText);
			});
	});

	it("switching focus between combo-boxes on 'Tab' should close the value state message of the previously focused combo-box", () => {
		cy.mount(
			<>
				<ComboBox id="value-state-error" valueState="Negative">
					<ComboBoxItem text="Item 1" />
				</ComboBox>
				<ComboBox id="vs-warning-default" valueState="Critical">
					<ComboBoxItem text="Item 2" />
				</ComboBox>
			</>
		);

		cy.get("#value-state-error").realClick();

		cy.get("#value-state-error")
			.shadow()
			.find("ui5-popover")
			.as("valueState1")
			.should("have.prop", "open", true);

		cy.get("#vs-warning-default")
			.shadow()
			.find("ui5-popover")
			.should("not.exist");

		cy.get("#value-state-error").realPress("Tab");

		cy.get("#vs-warning-default")
			.shadow()
			.find("ui5-popover")
			.as("valueState2")
			.should("have.prop", "open", true);

		cy.get("@valueState1").should("not.exist");
	});

	it("value state message of type 'Information' is opened on focusing the combo-box", () => {
		cy.mount(
			<ComboBox id="vs-information-default" valueState="Information">
				<ComboBoxItem text="Item 1" />
			</ComboBox>
		);

		cy.get("#vs-information-default").realClick();

		cy.get("#vs-information-default")
			.shadow()
			.find("ui5-popover")
			.as("valueState")
			.should("exist")
			.and("have.prop", "open", true);
	});

	it("pressing a link inside value state message popover and pressing 'Tab' after that closes the popover", () => {
		cy.mount(
			<ComboBox id="value-state-error" valueState="Negative">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">Link</Link>.
				</div>
				<ComboBoxItem text="Item 1" />
			</ComboBox>
		);

		cy.get("#value-state-error").realClick();

		cy.get("#value-state-error")
			.shadow()
			.find("ui5-popover")
			.as("valueState");

		cy.get("#value-state-error").find("div[slot='valueStateMessage'] ui5-link").realClick();
		cy.get("#value-state-error").realPress("Tab");

		cy.get("@valueState").should("not.exist");
	});

	it("should select first matching item", () => {
		cy.mount(
			<ComboBox id="same-name-suggestions-cb">
				<ComboBoxItem text="Argentina" />
				<ComboBoxItem text="Argentina" />
			</ComboBox>
		);

		cy.get("#same-name-suggestions-cb")
			.as("comboBox")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input").realClick();
		cy.get("@input").realPress("A");

		cy.get("@comboBox")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input").should("have.value", "Argentina");

		cy.get("#same-name-suggestions-cb")
			.find("[ui5-cb-item]")
			.first()
			.should("have.prop", "selected", true);

		cy.get("#same-name-suggestions-cb")
			.find("[ui5-cb-item]")
			.eq(1)
			.should("not.have.prop", "selected", true);
	});

	it("should keep the value from the selected items after closing the picker", () => {
		cy.mount(
			<ComboBox id="combo-grouping">
				<ComboBoxItemGroup headerText="Group 1">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Argentina" />
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("#combo-grouping").shadow().find("[ui5-icon]").realClick();
		cy.get("#combo-grouping").realPress("ArrowDown");
		cy.get("#combo-grouping").realPress("ArrowDown");

		cy.get("#combo-grouping").should("have.prop", "value", "Algeria");

		cy.get("#combo-grouping").realPress("F4");

		cy.get("#combo-grouping").should("have.prop", "value", "Algeria");
	});

	it("should get the physical DOM reference for the cb item", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem id="cbi" text="Item 1" />
			</ComboBox>
		);

		cy.window().then(win => {
			const cbItem = win.document.getElementById("cbi") as any;
			const cbItemDomRef = cbItem?.getDomRef?.();
			expect(cbItemDomRef).to.exist;
		});
	});

	it("tests navigating with arrow down when item text is contained in the previous selected item", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Bulgaria 1"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Bul"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").as("combobox");

		cy.get<ComboBox>("@combobox")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").focus();

		cy.get("@inner").realPress("F4");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(0).should("have.prop", "selected", true);

		cy.get("@inner").realPress("ArrowDown");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(1).should("have.prop", "selected", true);

		cy.get("@inner").realPress("ArrowDown");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(2).should("have.prop", "selected", true);
	});

	it("tests navigating with arrow down when item text is contained in the previous selected item (with grouping)", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Bulgaria">
					<ComboBoxItem text="Bulgar"></ComboBoxItem>
					<ComboBoxItem text="Bulg"></ComboBoxItem>
					<ComboBoxItem text="Bul"></ComboBoxItem>
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").as("combobox");

		cy.get<ComboBox>("@combobox")
			.shadow()
			.find("input")
			.as("inner");

		cy.get("@inner").focus();

		cy.get("@inner").realPress("F4");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(0).should("have.prop", "selected", true);

		cy.get("@inner").realPress("ArrowDown");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(1).should("have.prop", "selected", true);

		cy.get("@inner").realPress("ArrowDown");
		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(2).should("have.prop", "selected", true);
	});
});

describe("Keyboard interaction when pressing Ctrl + Alt + F8 for navigation", () => {
	beforeEach(() => {
		cy.mount(<>
			<ComboBox valueState="Negative">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">Link</Link>  <Link href="#">Second Link</Link>.
				</div>
				<ComboBoxItem text="alert('XSS')"></ComboBoxItem>
				<ComboBoxItem text="<b onmouseover=alert('XSS')></b>"></ComboBoxItem>
				<ComboBoxItem text="Albania"></ComboBoxItem>
			</ComboBox>
			<Input id="nextInput" class="input2auto" placeholder="Next input"></Input>
		</>);
	});

	it("Should move the focus from the ComboBox to the first link in the value state message", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@combobox")
			.shadow()
			.find("ui5-popover")
			.as("popover")
			.should("have.class", "ui5-valuestatemessage-popover");

		cy.get("@popover")
			.should("have.attr", "open")

		cy.get("ui5-link")
			.eq(0)
			.should("have.focus");
	});

	it("Pressing [Tab] moves the focus to the next value state message link. Pressing [Tab] again closes the popup and moves the focus to the next input", () => {
		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("ui5-link")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("ui5-link")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress("Tab");


		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.should("have.focus");
	});

	it("Pressing [Shift+Tab] moves the focus from the second value state message link to the first. Pressing it again shifts the focus to the ComboBox", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("ui5-link")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("ui5-link")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@innerInput")
			.should("have.focus");
	});

	it("When pressing [Down Arrow] while focused on the first value state message link and suggestions are open, the focus moves to the next suggestion item", () => {
		cy.get("ui5-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@combobox")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		cy.get("@combobox")
			.realClick()
			.should("be.focused");

		cy.realType("A");

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("ui5-link")
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("ArrowDown");

		cy.get("@combobox")
			.should("have.attr", "value", "Albania");

		cy.get("@combobox")
			.find("[ui5-cb-item]").eq(2).should("have.prop", "focused", true);
	});
});

describe("Event firing", () => {
	it("tests change event", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria"></ComboBoxItem>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("@combo").shadow().find("[inner-input]").realClick();
		cy.get("@combo").shadow().find("[inner-input]").realPress("a");

		// Focus out to trigger change event
		cy.get("body").realClick();

		cy.get("@changeSpy").should('have.been.calledOnce');
		cy.get("@changeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Algeria";
		}));
	});

	it("tests change event on item selection", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria"></ComboBoxItem>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("@combo").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-cb-item]").eq(0).realClick();

		cy.get("@changeSpy").should('have.been.calledOnce');
		cy.get("@changeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Algeria";
		}));

		cy.get("@combo").shadow().find("[ui5-icon]").realClick();

		cy.get("@changeSpy").should('have.been.calledOnce');

		cy.get("[ui5-cb-item]").eq(1).realClick();

		cy.get("@changeSpy").should('have.been.calledTwice');
		cy.get("@changeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Argentina";
		}));
	});

	it("tests change event with value state and links", () => {
		cy.mount(
			<ComboBox id="value-state-error" valueState="Negative">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">Link</Link>.
				</div>
				<ComboBoxItem text="<script>alert('XSS')</script>"></ComboBoxItem>
				<ComboBoxItem text="<b onmouseover=alert('XSS')></b>"></ComboBoxItem>
				<ComboBoxItem text="Bahrain"></ComboBoxItem>
			</ComboBox>
		);

		// Set up event spy using Cypress best practices
		cy.get("#value-state-error")
			.as("combo")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		// Track change events and update DOM elements using Cypress commands
		cy.get("@changeSpy").then((spy) => {
			cy.wrap(spy).should('have.callCount', 0);
		});

		cy.get("@combo").shadow().find("[ui5-icon]").realClick();

		cy.get("@combo").realPress("B");
		cy.get("@combo").realPress("a");

		// Verify no change event fired yet
		cy.get("@changeSpy").should('have.callCount', 0);

		// Click the link in value state message
		cy.get("@combo").find("div[slot='valueStateMessage']").find("ui5-link").first().realClick();

		// Verify change event was fired
		cy.get("@changeSpy").should('have.callCount', 1);

		// Verify the event contains correct data
		cy.get("@changeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Bahrain";
		}));
	});

	it("tests change event after pressing enter key", () => {
		cy.mount(
				<ComboBox>
					<ComboBoxItem text="Algeria"></ComboBoxItem>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
				</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("@combo").shadow().find("[inner-input]").realClick();
		cy.get("@combo").shadow().find("[inner-input]").realPress("Enter");
		cy.get("@combo").shadow().find("[inner-input]").realPress("Enter");

		cy.get("@changeSpy").should('have.callCount', 0);

		// Type 'a' to select Algeria
		cy.get("@combo").shadow().find("[inner-input]").realPress("a");
		cy.get("@combo").shadow().find("[inner-input]").realPress("Enter");

		cy.get("@changeSpy").should('have.been.calledOnce');
		cy.get("@changeSpy").should('have.been.calledWith', Cypress.sinon.match.hasNested('target.value', 'Algeria'));

		// Reset the ComboBox completely and type 'Br' to select Brazil
		cy.get("@combo").invoke('attr', 'value', '');
		cy.get("@combo").shadow().find("[inner-input]").clear();
		cy.get("@combo").shadow().find("[inner-input]").realType("Br");
		cy.get("@combo").shadow().find("[inner-input]").realPress("Enter");

		cy.get("@changeSpy").should('have.been.calledTwice');
		cy.get("@changeSpy").should('have.been.calledWith', Cypress.sinon.match.hasNested('target.value', 'Brazil'));
	});

	it("should fire change event after the user has typed in value, but also selects it from the popover", () => {
		cy.mount(
			<>
				<ComboBox id="change-cb">
					<ComboBoxItem text="Bulgaria"></ComboBoxItem>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
				</ComboBox>
			</>
		);

		cy.get("#change-cb")
			.as("combo")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("@combo").scrollIntoView();
		cy.get("@combo").shadow().find("[inner-input]").realClick();
		cy.get("@combo").shadow().find("[inner-input]").realType("Bulgaria");
		cy.get("@combo").find("[ui5-cb-item]").first().realClick();

		cy.get("@changeSpy").should('have.been.calledOnce');
		cy.get("@changeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Bulgaria";
		}));
	});

	it("value should be reset on ESC key", () => {
		cy.mount(
			<ComboBox id="combo2">
				<ComboBoxItem text="Algeria"></ComboBoxItem>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("#combo2").shadow().find("[inner-input]").realClick();
		cy.get("#combo2").shadow().find("[inner-input]").realType("Al");

		cy.get("#combo2").shadow().find("[inner-input]").realPress("Escape");
		cy.get("#combo2").shadow().find("[inner-input]").realPress("Escape");
		cy.get("#combo2").should("have.prop", "value", "");

		cy.get("#combo2").shadow().find("[inner-input]").realType("Al");
		cy.get("#combo2").shadow().find("[inner-input]").realPress("Enter");

		cy.get("#combo2").shadow().find("[inner-input]").clear();
		cy.get("#combo2").shadow().find("[inner-input]").realType("Al");
		cy.get("#combo2").shadow().find("[inner-input]").realPress("Escape");
		cy.get("#combo2").should("have.prop", "value", "Algeria");
	});

	it("tests change event on open picker and item navigation", () => {
		cy.mount(
				<ComboBox id="change-cb">
					<ComboBoxItem text="Algeria"></ComboBoxItem>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
				</ComboBox>
		);

		cy.get("#change-cb")
			.as("combo")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("@combo").shadow().find("[ui5-icon]").realClick();
		cy.get("@combo").shadow().find("[inner-input]").realPress("ArrowDown");

		cy.get("@changeSpy").should('have.callCount', 0);

		cy.get("@combo").find("[ui5-cb-item]").first().realClick();

		cy.get("@changeSpy").should('have.been.calledOnce');
		cy.get("@changeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Algeria";
		}));
	});

	it("tests change event on closed picker and item navigation", () => {
		cy.mount(
			<ComboBox id="change-cb">
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("#change-cb")
			.as("combo")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("#change-cb").shadow().find("[inner-input]").realClick();
		cy.get("#change-cb").shadow().find("[inner-input]").realPress("ArrowDown");

		cy.get("@changeSpy").should('have.callCount', 0);

		cy.get("#change-cb").shadow().find("[inner-input]").realPress("ArrowDown");
		cy.get("@changeSpy").should('have.callCount', 0);

		cy.get("#change-cb").shadow().find("[inner-input]").realPress("Enter");
		cy.get("@changeSpy").should('have.been.calledOnce');
		cy.get("@changeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Brazil";
		}));
	});

	it("tests change event after type and item select", () => {
		cy.mount(
			<ComboBox id="change-cb">
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("#change-cb")
			.as("combo")
			.invoke('on', 'ui5-change', cy.spy().as('changeSpy'));

		cy.get("#change-cb").scrollIntoView();
		cy.get("#change-cb").shadow().find("[inner-input]").realClick();
		cy.get("#change-cb").shadow().find("[inner-input]").realType("a");
		cy.get("#change-cb").find("[ui5-cb-item]").first().realClick();

		cy.get("@changeSpy").should('have.been.calledOnce');
		cy.get("@changeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Argentina";
		}));
	});

	it("tests input event", () => {
		cy.mount(
			<>
				<ComboBox id="input-cb">
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Germany"></ComboBoxItem>
				</ComboBox>
				<div id="input-count">0</div>
				<div id="input-placeholder"></div>
			</>
		);

		cy.get("#input-cb")
			.as("combo")
			.invoke('on', 'input', cy.spy().as('inputSpy'));

		cy.get("#input-cb").shadow().find("[inner-input]").realClick();
		cy.get("#input-cb").shadow().find("[inner-input]").realPress("ArrowDown");

		cy.get("@inputSpy").should('have.been.calledOnce');
		cy.get("@inputSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Argentina";
		}));

		// Update DOM using Cypress commands
		cy.get("@combo").invoke('prop', 'value').then((value) => {
			cy.get("#input-count").invoke('text', '1');
			cy.get("#input-placeholder").invoke('text', value);
		});

		cy.get("#input-placeholder").should("have.text", "Argentina");
		cy.get("#input-count").should("have.text", "1");

		cy.get("#input-cb").shadow().find("[inner-input]").realPress("ArrowUp");
		cy.get("@inputSpy").should('have.been.calledOnce'); // No additional call
		cy.get("#input-placeholder").should("have.text", "Argentina");
		cy.get("#input-count").should("have.text", "1");

		cy.get("#input-cb").shadow().find("[inner-input]").realPress("ArrowDown");
		cy.get("@inputSpy").should('have.been.calledTwice');
		cy.get("@inputSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.target.value === "Germany";
		}));

		// Update DOM using Cypress commands
		cy.get("@combo").invoke('prop', 'value').then((value) => {
			cy.get("#input-count").invoke('text', '2');
			cy.get("#input-placeholder").invoke('text', value);
		});

		cy.get("#input-placeholder").should("have.text", "Germany");
		cy.get("#input-count").should("have.text", "2");

		cy.get("#input-cb").shadow().find("[inner-input]").realPress("ArrowDown");
		cy.get("@inputSpy").should('have.been.calledTwice'); // No additional call
		cy.get("#input-placeholder").should("have.text", "Germany");
		cy.get("#input-count").should("have.text", "2");
	});

	it("tests selection-change event and its parameters", () => {
		cy.mount(
			<>
				<ComboBox>
					<ComboBoxItem text="Item 0"></ComboBoxItem>
					<ComboBoxItem text="Item 1"></ComboBoxItem>
					<ComboBoxItem text="Item 2"></ComboBoxItem>
					<ComboBoxItem text="Item 3"></ComboBoxItem>
					<ComboBoxItem text="Item 4"></ComboBoxItem>
					<ComboBoxItem text="Item 5"></ComboBoxItem>
					<ComboBoxItem text="Item 6"></ComboBoxItem>
					<ComboBoxItem text="Item 7"></ComboBoxItem>
				</ComboBox>
				<span id="selection-change-event-result"></span>
			</>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();

		cy.get("[ui5-cb-item]").eq(7).as("targetItem");
		cy.get("@targetItem").shadow().find(".ui5-li-title").invoke("text").as("targetText");

		cy.get("@targetItem").realClick();

		cy.get("@selectionChangeSpy").should('have.been.calledOnce');
		cy.get("@selectionChangeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.detail.item.text === "Item 7";
		}));

		// Update DOM using Cypress commands
		cy.get("@targetText").then(txt => {
			cy.get("#selection-change-event-result").invoke('text', txt);
		});

		cy.get("@targetText").then(txt => {
			cy.get("#selection-change-event-result").should("have.text", txt);
		});
	});

	it("tests selection-change event when type text after selection", () => {
		cy.mount(
			<>
				<ComboBox>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
					<ComboBoxItem text="Chile"></ComboBoxItem>
				</ComboBox>
				<span id="selection-change-event-result"></span>
			</>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();
		cy.get("[ui5-combobox]").realPress("Backspace");
		cy.get("[ui5-combobox]").realPress("A");

		cy.get("@selectionChangeSpy").should('have.been.called');
		cy.get("@selectionChangeSpy").should('have.been.calledWithMatch', Cypress.sinon.match(event => {
			return event.detail.item.text === "Argentina";
		}));

		cy.get("[ui5-cb-item]").first().as("firstItem");
		cy.get("@firstItem").shadow().find(".ui5-li-title").invoke("text").as("expectedText");

		// Update DOM using Cypress commands
		cy.get("@expectedText").then(text => {
			cy.get("#selection-change-event-result").invoke('text', text);
		});

		cy.get("@expectedText").then(text => {
			cy.get("#selection-change-event-result").should("have.text", text);
		});
	});

	it("should fire selection-change event when item is selected", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Type to select an item
		cy.get("@input")
			.focus()
			.realType("Bulgaria");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when item is selected after backspace", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Type partial text, then backspace, then complete selection
		cy.get("@input")
			.focus()
			.realType("Bulg")
			.realPress("Backspace")

		cy.get("@selectionChangeSpy")
			.should("have.been.called");

		cy.get("@selectionChangeSpy").should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item === null;
		}));
	});

	it("should fire selection-change event when item is selected after delete key", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Type text, position cursor, use delete key, then complete selection
		cy.get("@input")
			.focus()
			.realType("Bulgxaria")
			.realPress(["Home"])
			.realPress(["ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight"])
			.realPress("Delete")
			.realPress("End");

		cy.get("@selectionChangeSpy")
			.should("have.been.called");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when selection is cleared by typing non-matching text", () => {
		cy.mount(
			<ComboBox value="Bulgaria">
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria" selected></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Clear existing value and type non-matching text
		cy.get("@input")
			.focus()
			.clear()
			.realType("NonExistentCountry");

		cy.get("@selectionChangeSpy")
			.should("have.been.called");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when clear icon is clicked", () => {
		cy.mount(
			<ComboBox value="Bulgaria" showClearIcon>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria" selected></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		// Click the clear icon
		cy.get("@combo")
			.shadow()
			.find(".ui5-input-clear-icon-wrapper")
			.realClick();

		cy.get("@selectionChangeSpy")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when item is clicked from dropdown", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		// Open dropdown and click an item
		cy.get("@combo")
			.shadow()
			.find("ui5-icon")
			.realClick();

		cy.get("@combo")
			.find("ui5-cb-item")
			.eq(1)
			.realClick();

		cy.get("@selectionChangeSpy")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event when navigating with arrow keys and pressing Enter", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.as("input");

		// Open dropdown with F4, navigate with arrow keys, and select with Enter
		cy.get("@input")
			.focus()
			.realPress("F4")
			.realPress("ArrowDown")
			.realPress("Enter");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("should fire selection-change event with correct item data", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Canada"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.focus()
			.realType("Bulgaria");

		cy.get("@selectionChangeSpy").should("have.been.calledWithMatch", Cypress.sinon.match(event => {
				return event.detail.item.text === "Bulgaria";
		}));
	});

	it("should NOT fire selection-change event when ComboBox items are set asynchronously after initial render", () => {
		cy.mount(
			<ComboBox id="async-combo" value="Bulgaria" loading>
				{/* Items will be added asynchronously */}
			</ComboBox>
		);

		cy.get("#async-combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.window().then(win => {
			const combo = win.document.getElementById("async-combo");
			const item1 = win.document.createElement("ui5-cb-item");
			item1.setAttribute("text", "Argentina");
			const item2 = win.document.createElement("ui5-cb-item");
			item2.setAttribute("text", "Bulgaria");
			combo?.appendChild(item1);
			combo?.appendChild(item2);
			(combo as any).loading = false;
		});

		cy.get("#async-combo").should("not.have.prop", "loading", true);

		cy.get("@selectionChangeSpy").should("not.have.been.called");

		cy.get("#async-combo").shadow().find("input").realClick();
		cy.get("#async-combo").shadow().find("input").clear().realType("Argentina");

		cy.get("@selectionChangeSpy").should("have.been.calledOnce");
		cy.get("@selectionChangeSpy").should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item.text === "Argentina";
		}));
	});

	it("should check clear icon events", () => {
		cy.mount(
			<>
				<ComboBox showClearIcon>
					<ComboBoxItem text="Item 1" />
					<ComboBoxItem text="Item 2" />
				</ComboBox>
				<button>Dummy button</button>
			</>
		);

		cy.get("[ui5-combobox]")
			.as("combo")
			.invoke('on', 'input', cy.spy().as('inputSpy'))

		cy.get("@combo").shadow().find("input").type("a");

		cy.get("@combo").should("have.prop", "_effectiveShowClearIcon", true);
		cy.get("@combo").shadow().find(".ui5-input-clear-icon-wrapper").realClick();
		cy.get("@inputSpy").should('have.been.calledTwice');
	});

	it("should show all items if value does not match any item and arrow is pressed", () => {
		cy.mount(
			<ComboBox id="combo" value="">
				{Array.from({ length: 11 }, (_, i) => (
					<ComboBoxItem key={i} text={`Item ${i + 1}`} />
				))}
			</ComboBox>
		);

		cy.get("[ui5-combobox]").shadow().find("input").realClick();
		cy.get("[ui5-combobox]").shadow().find("input").realType("z");
		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();

		cy.get("[ui5-combobox]").find("[ui5-cb-item]").should("have.length", 11);
	});

	it("tests if open and close events are fired correctly", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="England"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-combobox")
			.as("combo");

		cy.get("@combo")
			.invoke('on', 'focusin', cy.spy().as('focusinSpy'));

		cy.get("@combo")
			.invoke('on', 'ui5-open', cy.spy().as('comboOpened'));

		cy.get("@combo")
			.invoke('on', 'ui5-close', cy.spy().as('comboClosed'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.focus();

		cy.get("@combo")
			.shadow()
			.find("ui5-icon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@combo")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.attr", "open");

		cy.get("@icon")
			.realClick();

		cy.get("@combo")
			.shadow()
			.find("ui5-responsive-popover")
			.should("not.have.attr", "open");

		cy.get("@icon")
			.realClick();

		cy.get("@combo")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.attr", "open");

		cy.get("@comboClosed")
			.should("have.been.calledOnce");

		cy.get("@comboOpened")
			.should("have.been.calledTwice");
	});

	it("should not fire 'change' event on focusout if value is not changed by user interaction", () => {
		cy.mount(
			<>
				<ComboBox id="cb" value="ComboBox item text"></ComboBox>
				<ComboBox id="another-cb"></ComboBox>
			</>
		);

		cy.get("#cb")
			.invoke('on', 'ui5-change', cy.spy().as('changeStub'));

		cy.get("#cb").shadow().find("input").realClick();
		cy.get("#another-cb").shadow().find("input").realClick();
		cy.get("@changeStub").should("not.have.been.called");

		cy.get("#cb").then(($cb) => {
			const comboBox = $cb[0] as ComboBox;
			comboBox.value = "Another ComboBox item text";
		});

		cy.get("#cb").shadow().find("input").realClick();
		cy.get("#another-cb").shadow().find("input").realClick();
		cy.get("@changeStub").should("not.have.been.called");
	});

	it("should work correctly with grouped items", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Europe">
					<ComboBoxItem text="Bulgaria"></ComboBoxItem>
					<ComboBoxItem text="Germany"></ComboBoxItem>
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Americas">
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Canada"></ComboBoxItem>
				</ComboBoxItemGroup>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo");

		cy.get("ui5-combobox")
			.as("combo")
			.invoke('on', 'ui5-selection-change', cy.spy().as('selectionChangeSpy'));

		cy.get("@combo")
			.shadow()
			.find("input")
			.focus()
			.realType("Bulgaria");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeSpy")
			.should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});
});

describe("Scrolling", () => {
	it("Scrolls the selected item into view after opening the popover", () => {
		cy.mount(
			<>
			<ComboBox>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="Germany"></ComboBoxItem>
				<ComboBoxItem text="Austria"></ComboBoxItem>
				<ComboBoxItem text="Australia"></ComboBoxItem>
				<ComboBoxItem text="Mexico"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
			<Button>Dummy Button</Button>
			</>
		);
		cy.viewport(500,200);

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-icon]")
			.as("dropdownIcon");

		cy.get("@dropdownIcon")
			.realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.should("exist")

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-combobox]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.shadow()
			.find(".ui5-popup-content")
			.as("scrollContainer");

		cy.get("@scrollContainer")
			.scrollTo("bottom");

		cy.get("[ui5-cb-item]")
			.eq(4)
			.realClick();

		cy.get("@dropdownIcon")
			.realClick();

		cy.get("@scrollContainer")
			.scrollTo("top");

		cy.get("[ui5-button]")
			.realClick();

		cy.get("@dropdownIcon")
			.realClick();

		cy.get("[ui5-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-cb-item]")
			.eq(4)
			.should("be.visible");
	});
});

describe("ComboBox Composition", () => {
	it("should handle Korean composition correctly", () => {
		cy.mount(
			<ComboBox
				id="combobox-composition-korean"
				placeholder="Type in Korean ..."
			>
				<ComboBoxItem text="안녕하세요" />
				<ComboBoxItem text="고맙습니다" />
				<ComboBoxItem text="사랑" />
				<ComboBoxItem text="한국" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combobox")
			.realClick();

		cy.get("@combobox")
			.shadow()
			.find("input")
			.as("nativeInput")
			.focus();

		cy.get("@nativeInput").trigger("compositionstart", { data: "" });

		cy.get("@combobox").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionupdate", { data: "사랑" });

		cy.get("@combobox").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionend", { data: "사랑" });

		cy.get("@nativeInput")
			.invoke("val", "사랑")
			.trigger("input", { inputType: "insertCompositionText" });

		cy.get("@combobox").should("have.prop", "_isComposing", false);

		cy.get("@combobox").should("have.attr", "value", "사랑");

		cy.get("@combobox")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@combobox")
			.realPress("Enter");

		cy.get("@combobox")
			.should("have.attr", "value", "사랑");
	});

	it("should handle Japanese composition correctly", () => {
		cy.mount(
			<ComboBox
				id="combobox-composition-japanese"
				placeholder="Type in Japanese ..."
			>
				<ComboBoxItem text="こんにちは" />
				<ComboBoxItem text="ありがとう" />
				<ComboBoxItem text="東京" />
				<ComboBoxItem text="日本" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combobox")
			.realClick();

		cy.get("@combobox")
			.shadow()
			.find("input")
			.as("nativeInput")
			.focus();

		cy.get("@nativeInput").trigger("compositionstart", { data: "" });

		cy.get("@combobox").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionupdate", { data: "ありがとう" });

		cy.get("@combobox").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionend", { data: "ありがとう" });

		cy.get("@nativeInput")
			.invoke("val", "ありがとう")
			.trigger("input", { inputType: "insertCompositionText" });

		cy.get("@combobox").should("have.prop", "_isComposing", false);

		cy.get("@combobox").should("have.attr", "value", "ありがとう");

		cy.get("@combobox")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@combobox")
			.realPress("Enter");

		cy.get("@combobox")
			.should("have.attr", "value", "ありがとう");
	});

	it("should handle Chinese composition correctly", () => {
		cy.mount(
			<ComboBox
				id="combobox-composition-chinese"
				placeholder="Type in Chinese ..."
			>
				<ComboBoxItem text="你好" />
				<ComboBoxItem text="谢谢" />
				<ComboBoxItem text="北京" />
				<ComboBoxItem text="中国" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combobox")
			.realClick();

		cy.get("@combobox")
			.shadow()
			.find("input")
			.as("nativeInput")
			.focus();

		cy.get("@nativeInput").trigger("compositionstart", { data: "" });

		cy.get("@combobox").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionupdate", { data: "谢谢" });

		cy.get("@combobox").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionend", { data: "谢谢" });

		cy.get("@nativeInput")
			.invoke("val", "谢谢")
			.trigger("input", { inputType: "insertCompositionText" });

		cy.get("@combobox").should("have.prop", "_isComposing", false);

		cy.get("@combobox").should("have.attr", "value", "谢谢");

		cy.get("@combobox")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@combobox")
			.realPress("Enter");

		cy.get("@combobox")
			.should("have.attr", "value", "谢谢");
	});
});

describe("Validation inside a form", () => {
	it("has correct validity for valueMissing", () => {
		cy.mount(
			<form>
				<ComboBox id="cmbForm" required></ComboBox>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form").then($form => {
			$form.get(0).addEventListener("submit", (e) => e.preventDefault());
			$form.get(0).addEventListener("submit", cy.stub().as("submit"));
		});

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("[ui5-combobox]")
			.as("combo")
			.ui5AssertValidityState({
				formValidity: { valueMissing: true },
				validity: { valueMissing: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#cmbForm:invalid")
			.should("exist");

		cy.get("@combo")
			.realType("Albania");

		cy.get("@combo")
			.ui5AssertValidityState({
				formValidity: { valueMissing: false },
				validity: { valueMissing: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#cmbForm:invalid")
			.should("not.exist");

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.been.calledOnce");
	});
});
