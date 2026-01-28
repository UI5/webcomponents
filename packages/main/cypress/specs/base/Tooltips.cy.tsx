import { setEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/config/Tooltips.js";
import Button from "../../../src/Button.js";
import RatingIndicator from "../../../src/RatingIndicator.js";
import ToggleButton from "../../../src/ToggleButton.js";
import SegmentedButtonItem from "../../../src/SegmentedButtonItem.js";
import SegmentedButton from "../../../src/SegmentedButton.js";
import Icon from "../../../src/Icon.js";

import settings from "@ui5/webcomponents-icons/dist/settings.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import activate from "@ui5/webcomponents-icons/dist/activate.js";

describe("Default Tooltips", () => {
	before(() => {
		cy.wrap({ setEnableDefaultTooltips })
			.invoke("setEnableDefaultTooltips", false);
	})

	it("tests navigation", () => {
		cy.mount(
			<>
				<Icon id="ic" name={settings}></Icon>
				<Button id="btn" icon={settings}></Button>
				<RatingIndicator id="rt"></RatingIndicator>
				<ToggleButton id="togglebtn" icon={settings}></ToggleButton>
				<SegmentedButton id="segBtn">
					<SegmentedButtonItem id="segBtnItem" icon={add}></SegmentedButtonItem>
					<SegmentedButtonItem id="segBtnItem2" icon={settings}></SegmentedButtonItem>
					<SegmentedButtonItem id="segBtnItem3" icon={activate}></SegmentedButtonItem>
				</SegmentedButton>
			</>
		);

		cy.get("#ic")
			.shadow()
			.find("title")
			.should("not.exist");

		cy.get("#btn")
			.shadow()
			.find(".ui5-button-icon")
			.should("not.have.attr", "title");

		cy.get("#togglebtn")
			.shadow()
			.find(".ui5-button-icon")
			.should("not.have.attr", "title");

		cy.get("#rt")
			.shadow()
			.find(".ui5-rating-indicator-root")
			.should("not.have.attr", "title");

		cy.get("#segBtnItem")
			.shadow()
			.find(".ui5-segmented-button-item-root")
			.should("not.have.attr", "title");

		cy.get("#segBtnItem")
			.shadow()
			.find(".ui5-segmented-button-item-icon")
			.should("not.have.attr", "title");
	});
});
