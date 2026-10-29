import SideNavigation from "../../src/SideNavigation.js";
import SideNavigationItem from "../../src/SideNavigationItem.js";
import SideNavigationSubItem from "../../src/SideNavigationSubItem.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";

describe("SideNavigationItem - indication tag positioning", () => {
	it("renders the tag inline right after the text, not right-aligned", () => {
		cy.mount(
			<SideNavigation style={{ width: "320px" }}>
				<SideNavigationItem id="item" text="Nav Item">
					<Tag slot="tag" design="Set2" hideStateIcon>Beta</Tag>
					<SideNavigationSubItem text="Child" />
				</SideNavigationItem>
			</SideNavigation>
		);

		// text and tag share the text-tag container
		cy.get("#item")
			.shadow()
			.find(".ui5-sn-item-text-tag-container")
			.as("container");

		cy.get("@container").find(".ui5-sn-item-text").should("exist");
		cy.get("@container").find(".ui5-sn-item-tag-slot").should("exist");

		// the tag sits next to the text, not pushed to the item's trailing edge
		cy.get("#item").shadow().find(".ui5-sn-item-text").then($text => {
			const textRight = $text[0].getBoundingClientRect().right;

			cy.get("#item").shadow().find(".ui5-sn-item-tag-slot").then($tag => {
				const tagLeft = $tag[0].getBoundingClientRect().left;
				const itemWidth = $text[0].closest(".ui5-sn-item")!.getBoundingClientRect().width;

				// tag starts close to where the text ends (within ~1rem gap)
				expect(tagLeft - textRight).to.be.lessThan(16);
				// and well before the item's trailing edge (not right-aligned)
				expect(tagLeft).to.be.lessThan(itemWidth / 2);
			});
		});
	});

	it("wraps the tag to a second line when text and tag do not fit inline", () => {
		cy.mount(
			<SideNavigation style={{ width: "220px" }}>
				<SideNavigationItem id="item" text="Customer Relationship Management System" icon="home">
					<Tag slot="tag" design="Set2" hideStateIcon>Beta Version</Tag>
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#item").shadow().find(".ui5-sn-item-text").then($text => {
			const textRect = $text[0].getBoundingClientRect();

			cy.get("#item").shadow().find(".ui5-sn-item-tag-slot").then($tag => {
				const tagRect = $tag[0].getBoundingClientRect();

				// tag dropped to a second line (below the text)
				expect(tagRect.top).to.be.greaterThan(textRect.top);
				// vertical gap between text and tag is ~0.5rem (8px)
				expect(tagRect.top - textRect.bottom).to.be.closeTo(8, 2);
			});
		});
	});

	it("describes the item via an invisible 'Tag {text}' string, not the visible tag", () => {
		cy.mount(
			<SideNavigation style={{ width: "320px" }}>
				<SideNavigationItem id="item" text="Leads">
					<Tag slot="tag" design="Set2" hideStateIcon>Beta</Tag>
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#item").shadow().find(".ui5-sn-item")
			.invoke("attr", "aria-describedby")
			.then(describedBy => {
				const tagId = describedBy!.split(" ").find(id => id.endsWith("-tag"))!;
				cy.get("#item").shadow().find(`#${CSS.escape(tagId)}`)
					.should("have.class", "ui5-hidden-text")
					.and("have.text", "Tag Beta");
			});

		cy.get("#item").shadow().find(".ui5-sn-item-tag-slot")
			.should("have.attr", "aria-hidden", "true");
	});

	it("describes a sub-item via the invisible 'Tag {text}' string", () => {
		cy.mount(
			<SideNavigation style={{ width: "320px" }}>
				<SideNavigationItem text="Leads" expanded>
					<SideNavigationSubItem id="sub" text="Lead Sources">
						<Tag slot="tag" design="Set2" hideStateIcon>Beta</Tag>
					</SideNavigationSubItem>
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#sub").shadow().find(".ui5-sn-item")
			.invoke("attr", "aria-describedby")
			.then(describedBy => {
				const tagId = describedBy!.split(" ").find(id => id.endsWith("-tag"))!;
				cy.get("#sub").shadow().find(`#${CSS.escape(tagId)}`)
					.should("have.class", "ui5-hidden-text")
					.and("have.text", "Tag Beta");
			});

		cy.get("#sub").shadow().find(".ui5-sn-item-tag-slot")
			.should("have.attr", "aria-hidden", "true");
	});
});
