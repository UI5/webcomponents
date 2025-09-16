import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import Button from "../../src/Button.js";
import Bar from "../../src/Bar.js";

class MySimpleComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		this.shadowRoot.innerHTML = `
			<!-- HTML Comment -->
			<button onclick="alert('Hello!')">Click Me</button>
			<!-- HTML Comment -->
		`;
	}
}

customElements.define("my-simple-component", MySimpleComponent);

// @ts-ignore
const MySimpleComponentRenderer = () => <my-simple-component id="second" data-sap-ui-fastnavgroup="true">Second focusable</my-simple-component>

describe("F6 navigation", () => {
	describe("F6 Forward navigation", () => {
		it("tests navigation", () => {
			cy.mount(
				<div>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="first">First focusable</Button>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section">
						<MySimpleComponentRenderer />
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="third">Third focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</div>
			);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with hidden elements", () => {
			cy.mount(<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="first">First focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button style={{ visibility: "hidden" }}>Hidden</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true" style={{ visibility: "hidden" }}>
					<Button>Hidden</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button style={{ display: "none" }}>Hidden</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true" style={{ display: "none" }}>
					<Button>Hidden</Button>
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="second">Second focusable</Button>
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="third">Third focusable</Button>
				</div>
				<div class="section">
					<Button>After Element</Button>
				</div>
			</div>);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with empty group", () => {
			cy.mount(<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="first">First focusable</Button>
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					Group without focusable element
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="second">Second focusable</Button>
				</div>
				<div class="section">
					<Button>After Element</Button>
				</div>
			</div>);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with nested groups", () => {
			cy.mount(
				<>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="first">First focusable</Button>
						<div class="section" data-sap-ui-fastnavgroup="true">
							<Button id="second">Second focusable</Button>
						</div>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="third">Third focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with nesting inside empty fastnav-group parent", () => {
			cy.mount(
				<>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<div class="section" data-sap-ui-fastnavgroup="true">
							<div class="section" data-sap-ui-fastnavgroup="true">
								<Button id="first">First focusable</Button>
							</div>
						</div>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<div class="section" data-sap-ui-fastnavgroup="true">
							<div class="section" data-sap-ui-fastnavgroup="true">
								<div class="section" data-sap-ui-fastnavgroup="true">
									<div class="section" data-sap-ui-fastnavgroup="true">
										<Button id="second">Second focusable</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="third">Third focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.get("#second").realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with group as a focusable element", () => {
			cy.mount(
				<>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="first">First focusable</Button>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" tabindex={0} id="second" data-sap-ui-fastnavgroup="true">
						Second focusable
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="third">Third focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.get("#first").realPress("F6");

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation without a focusable element", () => {
			cy.mount(
				<>
					<div class="section">
						<Button id="first">Before element</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						Group without focusable element
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						Group without focusable element
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#first")
				.realClick();

			// assert clicked btn is also the focused element
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert same button remains focused as there is no fasnav group with focusable elements
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with a single group", () => {
			cy.mount(
				<>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="first">Before element</Button>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");
		});
	});

	describe("F6 Backward navigation", () => {
		it("tests navigation", () => {
			cy.mount(<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="first">First focusable</Button>
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section">
					<MySimpleComponentRenderer />
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="third">Third focusable</Button>
				</div>
				<div class="section">
					<Button>After Element</Button>
				</div>
			</div>);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation with hidden elements", () => {
			cy.mount(<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="first">First focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button style={{ visibility: "hidden" }}>Hidden</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true" style={{ visibility: "hidden" }}>
					<Button>Hidden</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button style={{ display: "none" }}>Hidden</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true" style={{ display: "none" }}>
					<Button>Hidden</Button>
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="second">Second focusable</Button>
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="third">Third focusable</Button>
				</div>
				<div class="section">
					<Button>After Element</Button>
				</div>
			</div>);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation with empty group", () => {
			cy.mount(<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="first">First focusable</Button>
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					Group without focusable element
				</div>
				<div class="section">
					<Button>Something focusable</Button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<Button id="second">Second focusable</Button>
				</div>
				<div class="section">
					<Button>After Element</Button>
				</div>
			</div>);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused (an empty group is skipped)
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused agian
			cy.get("#second")
				.should("be.focused");
		});

		it("tests navigation with nested groups", () => {
			cy.mount(
				<>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="first">First focusable</Button>
						<div class="section" data-sap-ui-fastnavgroup="true">
							<Button id="second">Second focusable</Button>
						</div>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="third">Third focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation with nesting inside empty fastnav-group parent", () => {
			cy.mount(
				<>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<div class="section" data-sap-ui-fastnavgroup="true">
							<div class="section" data-sap-ui-fastnavgroup="true">
								<Button id="first">First focusable</Button>
							</div>
						</div>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<div class="section" data-sap-ui-fastnavgroup="true">
							<div class="section" data-sap-ui-fastnavgroup="true">
								<div class="section" data-sap-ui-fastnavgroup="true">
									<div class="section" data-sap-ui-fastnavgroup="true">
										<Button id="second">Second focusable</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="third">Third focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation with group as a focusable element", () => {
			cy.mount(
				<>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="first">First focusable</Button>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" tabindex={0} id="second" data-sap-ui-fastnavgroup="true">
						Second focusable
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="third">Third focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation without a focusable element", () => {
			cy.mount(
				<>
					<div class="section">
						<Button id="first">Before element</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						Group without focusable element
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						Group without focusable element
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#first")
				.realClick();

			// assert clicked btn is also the focused element
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert same button remains focused as there is no fasnav group with focusable elements
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with a single group", () => {
			cy.mount(
				<>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="first">Before element</Button>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section">
						<Button>After Element</Button>
					</div>
				</>
			);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");
		});
	});

	describe("Groups in container", () => {
		it("tests forward navigation", () => {
			cy.mount(
				<div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button>Non group focusable</Button>
					</div>
					<div data-sap-ui-fastnavgroup-container="true" data-sap-ui-fastnavgroup="true">
						<div class="section" data-sap-ui-fastnavgroup="true">
							<Button id="first">First group focusable</Button>
						</div>
						<div class="section" data-sap-ui-fastnavgroup="true">
							<Button id="second">Second group focusable</Button>
						</div>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button>Non group focusable</Button>
					</div>
				</div>
			);

			// act
			cy.get("#first")
				.realClick();

			cy.realPress("F6");

			cy.get("#second")
				.should("be.focused");

			cy.realPress("F6");

			cy.get("#first")
				.should("be.focused");
		});

		it("tests backward navigation", () => {
			cy.mount(
				<div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button>Non group focusable</Button>
					</div>
					<div data-sap-ui-fastnavgroup-container="true">
						<div class="section" data-sap-ui-fastnavgroup="true">
							<Button id="first">First group focusable</Button>
						</div>
						<div class="section" data-sap-ui-fastnavgroup="true">
							<Button id="second">Second group focusable</Button>
						</div>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button>Non group focusable</Button>
					</div>
				</div>
			);

			// act
			cy.get("#first")
				.realClick();

			cy.realPress(["Shift", "F6"]);

			cy.get("#second")
				.should("be.focused");

			cy.realPress(["Shift", "F6"]);

			cy.get("#first")
				.should("be.focused");
		});
	});


	describe("Bypass groups", () => {
		it("Custom defined groups", () => {
			cy.mount(
				<div>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="false">
						<Button>Skipped element</Button>
					</div>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="first">First focusable</Button>
					</div>
				</div>
			);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");
		});

		it("Built-in groups", () => {
			cy.mount(
				<div>
					<div class="section">
						<button id="before">Before element</button>
					</div>
					<Bar>
						<Button id="first">First focusable element</Button>
					</Bar>

					<Bar data-sap-ui-fastnavgroup="false" id="skippedBar">
						<Button>Skipped element</Button>
					</Bar>
					<div class="section">
						<Button>Something focusable</Button>
					</div>
					<div class="section" data-sap-ui-fastnavgroup="true">
						<Button id="second">Second focusable</Button>
					</div>
				</div>
			);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			cy.get("#skippedBar")
				.should("have.attr", "data-sap-ui-fastnavgroup", "false");

			cy.realPress("F6");

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");
		});
	});
});
