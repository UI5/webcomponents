import accept from "@ui5/webcomponents-icons/dist/accept.js";
import {
	TAG_ROLE_DESCRIPTION,
	TAG_SUCCESS,
	TAG_DESCRIPTION_TAG,
} from "../../src/generated/i18n/i18n-defaults.js";
import Tag from "../../src/Tag.js";
import Icon from "../../src/Icon.js";

describe("Tag", () => {
	describe("Tag rendering", () => {
		it("initial rendering", () => {
			cy.mount(
				<>
					<Tag
						id="tagWithTextAndIcon"
						style={{ width: "300px" }}
						colorScheme="1"
						design="Set1"
					>
						<Icon name={accept} slot="icon"></Icon>bigger width
					</Tag>

					<Tag design="Positive" id="interactiveTag" interactive={true}>
						Interactive
					</Tag>

					<Tag design="Positive" id="noninteractiveTag">
						Noninteractive
					</Tag>
				</>
			);

			cy.get("#tagWithTextAndIcon").shadow().find(".ui5-tag-root").should("have.prop", "tagName", "DIV");
			cy.get("#interactiveTag").shadow().find(".ui5-tag-root").should("have.prop", "tagName", "BUTTON");
			cy.get("#interactiveTag").shadow().find(".ui5-tag-root").should("have.attr", "aria-roledescription", `${TAG_ROLE_DESCRIPTION.defaultText}`);
			cy.get("#interactiveTag").shadow().find(".ui5-tag-root").should("have.attr", "aria-description", `${TAG_SUCCESS.defaultText}`);
			cy.get("#noninteractiveTag").shadow().find(".ui5-hidden-text").should("have.text", `${TAG_DESCRIPTION_TAG.defaultText} ${TAG_SUCCESS.defaultText}`);
		});

		it("tests that label is rendered if there is text content", () => {
			cy.mount(
				<Tag
					id="tagWithTextAndIcon"
					style={{ width: "300px" }}
					colorScheme="1"
					design="Set1"
				>
					<Icon name={accept} slot="icon"></Icon>bigger width
				</Tag>
			);

			cy.get("[ui5-tag]").shadow().find(".ui5-tag-text").should("exist");
		});

		it("tests that label is NOT rendered if there is only icon", () => {
			cy.mount(
				<Tag style={{ width: "300px" }}>
					<Icon name={accept} slot="icon"></Icon>
				</Tag>
			);

			cy.get("[ui5-tag]").shadow().find(".ui5-tag-text").should("not.exist");
		});
	});

	describe("Wrapping", () => {
		it("tests if tag text wraps - default wrappingType", () => {
			cy.mount(
				<Tag id="tagWithWrappingDefault" style={{ width: "300px" }}>
					<Icon name={accept} slot="icon"></Icon>Some long text with more lines text wrapping-type="Normal"
				</Tag>
			);

			cy.get("#tagWithWrappingDefault").shadow().find(".ui5-tag-root").should("have.css", "white-space", "normal");
		});

		it("tests if tag text wraps - wrappingType Normal", () => {
			cy.mount(
				<Tag id="tagWithWrappingNormal" style={{ width: "300px" }} wrappingType="Normal">
					<Icon name="accept" slot="icon"></Icon>Some long text with more lines text wrapping-type="Normal"
				</Tag>
			);

			cy.get("#tagWithWrappingNormal").shadow().find(".ui5-tag-root").should("have.css", "white-space", "normal");
		});

		it("tests if tag text wraps - wrappingType None", () => {
			cy.mount(
				<Tag id="tagWithWrappingNone" style={{ width: "300px" }} wrappingType="None">
					<Icon name="accept" slot="icon"></Icon>Some long text with more lines text wrapping-type="None"
				</Tag>
			);

			cy.get("#tagWithWrappingNone").shadow().find(".ui5-tag-root").should("have.css", "white-space", "nowrap");
		});
	});

	describe("Events", () => {
		it("tests interactive tag click event", () => {
			cy.mount(
				<Tag interactive>Tag</Tag>
			);

			cy.get("[ui5-tag]")
				.as("tag");

			cy.get("@tag")
				.then(tag => {
					tag.get(0).addEventListener("click", cy.stub().as("clicked"));
				});

			cy.get("@tag")
				.realClick();

			cy.get("@clicked")
				.should("have.been.calledOnce");
		});
	});
});
