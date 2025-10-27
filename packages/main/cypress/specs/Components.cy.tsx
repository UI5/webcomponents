import BusyIndicator from "../../src/BusyIndicator.js";
import Button from "../../src/Button.js";
import Card from "../../src/Card.js";
import CardHeader from "../../src/CardHeader.js";
import CheckBox from "../../src/CheckBox.js";
import DatePicker from "../../src/DatePicker.js";
import Dialog from "../../src/Dialog.js";
import Icon from "../../src/Icon.js";
import Input from "../../src/Input.js";
import Label from "../../src/Label.js";
import Link from "../../src/Link.js";
import List from "../../src/List.js";
import ListItemCustom from "../../src/ListItemCustom.js";
import ListItemGroup from "../../src/ListItemGroup.js";
import ListItemStandard from "../../src/ListItemStandard.js";
import MessageStrip from "../../src/MessageStrip.js";
import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import Option from "../../src/Option.js";
import Panel from "../../src/Panel.js";
import RadioButton from "../../src/RadioButton.js";
import Select from "../../src/Select.js";
import Switch from "../../src/Switch.js";
import Tab from "../../src/Tab.js";
import TabContainer from "../../src/TabContainer.js";
import Tag from "../../src/Tag.js";
import TextArea from "../../src/TextArea.js";
import Title from "../../src/Title.js";
import ToggleButton from "../../src/ToggleButton.js";

import addEquipmentIcon from "@ui5/webcomponents-icons/dist/add-equipment.js";

const assertBooleanProperty = (el: string, prop: string) => {
	cy.get(el)
		.should($el => {
			const element = $el[0];
			expect(element).to.have.property(prop);
			expect(element[prop]).to.be.false;
		})
}

const assertHidden = (el: string) => {
	cy.get(el)
		.should("not.be.visible");
}

describe("General assertions", () => {
	it("tests boolean props default", () => {
		cy.mount(<>
			<BusyIndicator />
			<Button>Primary button</Button>
			<ToggleButton>Toggle button</ToggleButton>
			<Input />
			<DatePicker />
			<RadioButton />
			<CheckBox />
			<Switch />
			<Link>Press me</Link>
			<Label>Hello world</Label>
			<Dialog />
			<Title>Hello world</Title>
			<Panel />
		</>);

		assertBooleanProperty("[ui5-button]", "submits");

		// CheckBox
		assertBooleanProperty("[ui5-checkbox]", "readonly");
		assertBooleanProperty("[ui5-checkbox]", "checked");
		assertBooleanProperty("[ui5-checkbox]", "disabled");

		// DatePicker
		assertBooleanProperty("[ui5-date-picker]", "readonly");
		assertBooleanProperty("[ui5-date-picker]", "disabled");

		// Dialog
		assertBooleanProperty("[ui5-dialog]", "stretch");

		// Label
		assertBooleanProperty("[ui5-label]", "required");

		// Link
		assertBooleanProperty("[ui5-link]", "disabled");

		// Input
		assertBooleanProperty("[ui5-input]", "readonly");
		assertBooleanProperty("[ui5-input]", "showSuggestions");
		assertBooleanProperty("[ui5-input]", "disabled");

		// Panel
		assertBooleanProperty("[ui5-panel]", "collapsed");
		assertBooleanProperty("[ui5-panel]", "fixed");

		// RadioButton
		assertBooleanProperty("[ui5-radio-button]", "readonly");
		assertBooleanProperty("[ui5-radio-button]", "checked");
		assertBooleanProperty("[ui5-radio-button]", "disabled");

		// Switch
		assertBooleanProperty("[ui5-switch]", "checked");
		assertBooleanProperty("[ui5-switch]", "disabled");

		// ToggleButton
		assertBooleanProperty("[ui5-toggle-button]", "pressed");
	});


	it("tests components with 'hidden' property are not visible", () => {
		cy.mount(<>
			<BusyIndicator id="busyIndicator2" hidden />
			<Tag id="tag2" hidden>Required</Tag>
			<Button id="btn2" hidden>Primary button</Button>
			<Card id="card2" hidden>
				<CardHeader slot="header" titleText="Primary card" />
			</Card>
			<CheckBox id="cb2" text="I agree" hidden />
			<DatePicker id="dp2" hidden />
			<Icon id="icon2" name={addEquipmentIcon} hidden />
			<Input id="inp2" hidden />
			<Label id="lbl2" hidden>Hello world</Label>
			<Link id="ln2" hidden>Press me</Link>

			<List id="list2" headerText="API: ListItemGroupHeader" hidden>
				<ListItemGroup headerText="New Items">
					<ListItemStandard>Laptop HP</ListItemStandard>
					<ListItemCustom>Discounted Items</ListItemCustom>
				</ListItemGroup>
			</List>

			<MessageStrip id="ms2" hidden>Hello world</MessageStrip>

			<MultiComboBox id="mcbx2" hidden>
				<MultiComboBoxItem text="Compact" />
			</MultiComboBox>

			<Panel id="p2" hidden headerText="Both expandable and expanded">
				<h1 class="content-color">I am a native heading!</h1>
			</Panel>

			<RadioButton id="radioBtn2" text="Option A" hidden />

			<Select id="select2" hidden>
				<Option selected>UI5</Option>
			</Select>

			<Switch id="sw2" hidden />

			<TextArea id="txtarea2" hidden />

			<Title id="title2" hidden>Hello world</Title>
			<ToggleButton id="toggleBtn2" hidden>Toggle button</ToggleButton>

			<TabContainer id="tc2" hidden>
				<Tab text="Tab 1">
					<Label>Quibusdam, veniam! Architecto debitis iusto ad et, asperiores quisquam perferendis reprehenderit ipsa voluptate minus minima, perspiciatis cum. Totam harum necessitatibus numquam voluptatum.</Label>
				</Tab>
				<Tab text="Tab 2" selected>
					<Label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga magni facere error dicta beatae optio repudiandae vero, quidem voluptatibus perferendis eum maiores rem tempore voluptates aperiam eos enim delectus unde.</Label>
				</Tab>
			</TabContainer>
		</>);

		[
			"#tag2",
			"#busyIndicator2",
			"#btn2",
			"#card2",
			"#cb2",
			"#dp2",
			"#icon2",
			"#inp2",
			"#ln2",
			"#lbl2",
			"#list2",
			"#ms2",
			"#mcbx2",
			"#p2",
			"#radioBtn2",
			"#select2",
			"#sw2",
			"#txtarea2",
			"#toggleBtn2",
			"#title2",
			"#tc2"
		].forEach(assertHidden);
	});
});