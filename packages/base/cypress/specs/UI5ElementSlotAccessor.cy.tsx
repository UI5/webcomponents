import SlotAccessor from "../../test/test-elements/SlotAccessor.js";
import SlotForwarder from "../../test/test-elements/SlotForwarder.js";

describe("Component defined slot accessors", () => {
	it("keeps the accessor defined by the component instead of generating one", () => {
		cy.mount(
			<SlotAccessor>
				<span slot="header" id="h1">Header</span>
				<span id="c1">Content 1</span>
				<span id="c2">Content 2</span>
			</SlotAccessor>
		);

		cy.get<SlotAccessor>("[ui5-test-slot-accessor]").should($el => {
			const descriptor = Object.getOwnPropertyDescriptor(SlotAccessor.prototype, "content");
			expect(descriptor?.get, "the generated accessor did not overwrite the component's getter").to.exist;
			expect(descriptor?.set, "the component's getter has no setter").to.not.exist;

			expect($el[0].content.map(node => node.id)).to.deep.equal(["c1", "c2"]);
			expect($el[0].header.map(node => node.id)).to.deep.equal(["h1"]);
		});
	});

	it("reflects added and removed children", () => {
		cy.mount(
			<SlotAccessor>
				<span id="c1">Content 1</span>
			</SlotAccessor>
		);

		cy.get<SlotAccessor>("[ui5-test-slot-accessor]").then($el => {
			const added = document.createElement("span");
			added.id = "c2";
			$el[0].appendChild(added);
		});

		cy.get<SlotAccessor>("[ui5-test-slot-accessor]").should($el => {
			expect($el[0].content.map(node => node.id)).to.deep.equal(["c1", "c2"]);
		});

		cy.get("#c1").then($el => $el[0].remove());

		cy.get<SlotAccessor>("[ui5-test-slot-accessor]").should($el => {
			expect($el[0].content.map(node => node.id)).to.deep.equal(["c2"]);
		});
	});

	it("returns an empty array for an unknown slot name", () => {
		cy.mount(<SlotAccessor />);

		cy.get<SlotAccessor>("[ui5-test-slot-accessor]").should($el => {
			expect($el[0].getSlottedNodes("doesNotExist")).to.deep.equal([]);
		});
	});
});

describe("Slots forwarded through chained slot elements", () => {
	it("resolves the transitively slotted children to the real elements", () => {
		cy.mount(
			<SlotForwarder>
				<span slot="header" id="h1">Header</span>
				<span id="c1">Content 1</span>
				<span id="c2">Content 2</span>
			</SlotForwarder>
		);

		cy.get<SlotForwarder>("[ui5-test-slot-forwarder]").should($el => {
			const inner = $el[0].shadowRoot!.querySelector("#inner") as SlotAccessor;

			expect(inner.content.map(node => node.localName)).to.deep.equal(["span", "span"]);
			expect(inner.content.map(node => node.id)).to.deep.equal(["c1", "c2"]);
			expect(inner.header.map(node => node.id)).to.deep.equal(["h1"]);
		});
	});

	it("keeps the forwarded children in the light DOM of the outer component", () => {
		cy.mount(
			<SlotForwarder>
				<span id="c1">Content 1</span>
			</SlotForwarder>
		);

		cy.get<SlotForwarder>("[ui5-test-slot-forwarder]").should($el => {
			const child = $el[0].querySelector("#c1")!;
			const inner = $el[0].shadowRoot!.querySelector("#inner") as SlotAccessor;

			expect(inner.content[0], "the very same node is resolved, not a copy").to.equal(child);
			expect(child.parentElement, "the child is not moved into the shadow root").to.equal($el[0]);
		});
	});

	it("reflects children added to the outer component", () => {
		cy.mount(
			<SlotForwarder>
				<span id="c1">Content 1</span>
			</SlotForwarder>
		);

		cy.get<SlotForwarder>("[ui5-test-slot-forwarder]").then($el => {
			const added = document.createElement("span");
			added.id = "c2";
			$el[0].appendChild(added);
		});

		cy.get<SlotForwarder>("[ui5-test-slot-forwarder]").should($el => {
			const inner = $el[0].shadowRoot!.querySelector("#inner") as SlotAccessor;
			expect(inner.content.map(node => node.id)).to.deep.equal(["c1", "c2"]);
		});
	});
});
