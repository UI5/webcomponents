import SideNavigationSearchField from "../../src/SideNavigationSearchField.js";
import {
	SEARCH_FIELD_SEARCH_ICON,
	SIDE_NAVIGATION_SEARCH_FIELD_LABEL,
	SIDE_NAVIGATION_SEARCH_FIELD_PLACEHOLDER,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("SideNavigationSearchField general interaction", () => {
	describe("Attribute propagation", () => {
		it("propagates the value to the inner input", () => {
			cy.mount(<SideNavigationSearchField value="test" />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.should("have.value", "test");
		});

		it("propagates a custom placeholder to the inner input", () => {
			cy.mount(<SideNavigationSearchField placeholder="Custom" />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.should("have.attr", "placeholder", "Custom");
		});

		it("uses the default placeholder when none is set", () => {
			cy.mount(<SideNavigationSearchField />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.should("have.attr", "placeholder", SIDE_NAVIGATION_SEARCH_FIELD_PLACEHOLDER.defaultText);
		});

		it("propagates accessibleName to the inner input aria-label", () => {
			cy.mount(<SideNavigationSearchField accessibleName="My filter" />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.should("have.attr", "aria-label", "My filter");
		});

		it("uses the default aria-label when accessibleName is not set", () => {
			cy.mount(<SideNavigationSearchField />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.should("have.attr", "aria-label", SIDE_NAVIGATION_SEARCH_FIELD_LABEL.defaultText);
		});

		it("propagates ariaControls to the inner input aria-controls", () => {
			cy.mount(<SideNavigationSearchField ariaControls="some-list" />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.should("have.attr", "aria-controls", "some-list");
		});

		it("exposes the default search icon accessible name", () => {
			cy.mount(<SideNavigationSearchField />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input-icon][name='search']")
				.should("have.attr", "accessible-name", SEARCH_FIELD_SEARCH_ICON.defaultText);
		});
	});

	describe("Clear icon", () => {
		it("shows the clear icon when the value is not empty", () => {
			cy.mount(<SideNavigationSearchField value="test" />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.realClick();

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("[ui5-icon][name='decline']")
				.should("exist");
		});

		it("does not show the clear icon when the value is empty", () => {
			cy.mount(<SideNavigationSearchField />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.realClick();

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("[ui5-icon][name='decline']")
				.should("not.exist");
		});

		it("does not show the clear icon when hideClearIcon is set", () => {
			cy.mount(<SideNavigationSearchField value="test" hideClearIcon={true} />);

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.realClick();

			cy.get("[ui5-side-navigation-search-field]")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("[ui5-icon][name='decline']")
				.should("not.exist");
		});
	});

	describe("Events", () => {
		it("fires input event on typing and updates the value", () => {
			cy.mount(<SideNavigationSearchField />);

			cy.get("[ui5-side-navigation-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-input", cy.stub().as("input"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.realClick();

			cy.realType("abc");

			cy.get("@input")
				.should("have.been.calledThrice");

			cy.get("@searchfield")
				.should("have.prop", "value", "abc");
		});

		it("fires search event on Enter when there is a value", () => {
			cy.mount(<SideNavigationSearchField value="test" />);

			cy.get("[ui5-side-navigation-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.realClick();

			cy.realPress("Enter");

			cy.get("@searched")
				.should("have.been.calledOnce");
		});

		it("does not fire search event on Enter when the value is empty", () => {
			cy.mount(<SideNavigationSearchField />);

			cy.get("[ui5-side-navigation-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.realClick();

			cy.realPress("Enter");

			cy.get("@searched")
				.should("not.be.called");
		});

		it("fires search event on search icon press", () => {
			cy.mount(<SideNavigationSearchField value="test" />);

			cy.get("[ui5-side-navigation-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-input-icon][name='search']")
				.realClick();

			cy.get("@searched")
				.should("have.been.calledOnce");
		});

		it("clears the value and fires input event on Escape", () => {
			cy.mount(<SideNavigationSearchField value="test" />);

			cy.get("[ui5-side-navigation-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-input", cy.stub().as("input"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.realClick();

			cy.realPress("Escape");

			cy.get("@input")
				.should("have.been.called");

			cy.get("@searchfield")
				.should("have.prop", "value", "");
		});

		it("clears the value and fires input event on clear icon press", () => {
			cy.mount(<SideNavigationSearchField value="test" />);

			cy.get("[ui5-side-navigation-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-input", cy.stub().as("input"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("input")
				.realClick();

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-input]")
				.shadow()
				.find("[ui5-icon][name='decline']")
				.realClick();

			cy.get("@input")
				.should("have.been.called");

			cy.get("@searchfield")
				.should("have.prop", "value", "");
		});
	});
});
