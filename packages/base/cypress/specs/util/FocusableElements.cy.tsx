import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";

import Label from "@ui5/webcomponents/dist/Label.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Form from "@ui5/webcomponents/dist/Form.js";
import FormItem from "@ui5/webcomponents/dist/FormItem.js";
import SideNavigation from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationItem from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItem from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";

describe("FocusableElements", () => {
	it("Tests first focusable element", () => {
		cy.mount(
			<>
				<div id="container">
					<Input tabindex={-1}></Input>
					<br/>
					<SideNavigation>
						<SideNavigationItem
							text="Home"
							icon="home"
							href="#home"
							title="Home tooltip"></SideNavigationItem>
						<SideNavigationItem text="People" href="#people" expanded icon="group">
							<SideNavigationSubItem
								id="subItem1"
								selected
								text="Should be Focused When Open"></SideNavigationSubItem>
							<SideNavigationSubItem text="Sub Item 2"></SideNavigationSubItem>
						</SideNavigationItem>
					</SideNavigation>
					<br/>
					<Button id="buttonId">Close</Button>
				</div>
			</>
		);

		cy.get("#subItem1")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "tabindex", "0");

		cy.get("#container").then( async ($container) => {
		   const firstFocusable = await getFirstFocusableElement($container.get(0)!);
		   await firstFocusable?.focus();
		});

		cy.get("#subItem1")
			.should("have.focus");
	});

	it("Tests first focusable element inside Dialog with focusable content", () => {
		cy.mount(
			<Dialog id="dialog" headerText="Dialog" open={true}>
				<Form headerText="Address">
					<FormItem>
						<Label slot="labelContent">Name:</Label>
						<Input id="nameInp"/>
					</FormItem>
					
					<FormItem>
						<Label slot="labelContent">ZIP Code/City:</Label>
						<Input value="411"/>
					</FormItem>
				</Form>

				<div slot="footer" class="dialogFooter">
					<Button design="Emphasized">Close</Button>
				</div>
			</Dialog>
		);

		cy.get("#dialog").then( async ($container) => {
		   const firstFocusable = await getFirstFocusableElement($container.get(0)!);
		   await firstFocusable?.focus();
		});

		cy.get("#nameInp")
			.should("have.focus");
	});

	it("Tests first focusable element inside Dialog with focusable footer", () => {
		cy.mount(
			<Dialog id="dialog" headerText="Dialog" open={true}>
				<Form headerText="Address">
					<FormItem>
						<Label slot="labelContent">Name:</Label>
						<Text>Richard</Text>
					</FormItem>
					
					<FormItem>
						<Label slot="labelContent">ZIP Code/City:</Label>
						<Text>New York</Text>
					</FormItem>
				</Form>

				<div slot="footer" class="dialogFooter">
					<Button id="btnClose" design="Emphasized">Close</Button>
				</div>
			</Dialog>
		);

		cy.get("#dialog").then( async ($container) => {
		   const firstFocusable = await getFirstFocusableElement($container.get(0)!);
		   await firstFocusable?.focus();
		});

		cy.get("#btnClose")
			.should("have.focus");
	});
});
