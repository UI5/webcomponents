import { createReactComponent } from "@ui5/webcomponents-base";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";

const CheckBox = createReactComponent(CheckBoxClass);
const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);
const DatePicker = createReactComponent(DatePickerClass);
const Input = createReactComponent(InputClass);
const MultiComboBox = createReactComponent(MultiComboBoxClass);
const RadioButton = createReactComponent(RadioButtonClass);
const Switch = createReactComponent(SwitchClass);
const Toolbar = createReactComponent(ToolbarClass);

function App() {

  return (
    <>
      <Toolbar>
        <!-- ToolbarItem wrapping Radio Buttons -->
        <ui5-toolbar-item>
            <div>
                <RadioButton name="group1" text="Option 1" checked={true} />
                <RadioButton name="group1" text="Option 2" />
                <RadioButton name="group1" text="Option 3" />
            </div>
        </ui5-toolbar-item>

        <!-- ToolbarItem wrapping Checkboxes -->
        <ui5-toolbar-item>
            <div>
                <CheckBox text="Checkbox 1" />
                <CheckBox text="Checkbox 2" checked={true} />
                <CheckBox text="Checkbox 3" />
            </div>
        </ui5-toolbar-item>

        <!-- ToolbarItem wrapping an Input Field -->
        <ui5-toolbar-item>
            <Input placeholder="Enter text" />
        </ui5-toolbar-item>

        <!-- ToolbarItem wrapping a ComboBox -->
        <ui5-toolbar-item>
            <ComboBox placeholder="Select an option">
                <ComboBoxItem text="Option 1" />
                <ComboBoxItem text="Option 2" />
                <ComboBoxItem text="Option 3" />
            </ComboBox>
        </ui5-toolbar-item>

        <!-- ToolbarItem wrapping a MultiComboBox -->
        <ui5-toolbar-item>
            <MultiComboBox placeholder="Select options">
                <ui5-mcb-item text="Item 1"></ui5-mcb-item>
                <ui5-mcb-item text="Item 2"></ui5-mcb-item>
                <ui5-mcb-item text="Item 3"></ui5-mcb-item>
            </MultiComboBox>
        </ui5-toolbar-item>

        <!-- ToolbarItem wrapping a Switch -->
        <ui5-toolbar-item>
            <Switch text-on="On" text-off="Off" />
        </ui5-toolbar-item>

        <!-- ToolbarItem wrapping a DatePicker -->
        <ui5-toolbar-item>
            <DatePicker placeholder="Select a date" />
        </ui5-toolbar-item>
    </Toolbar>
    </>
  );
}

export default App;
