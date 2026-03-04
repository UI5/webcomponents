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
import ToolbarItemClass from "@ui5/webcomponents/dist/ToolbarItem.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";

const CheckBox = createReactComponent(CheckBoxClass);
const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);
const DatePicker = createReactComponent(DatePickerClass);
const Input = createReactComponent(InputClass);
const MultiComboBox = createReactComponent(MultiComboBoxClass);
const RadioButton = createReactComponent(RadioButtonClass);
const Switch = createReactComponent(SwitchClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarItem = createReactComponent(ToolbarItemClass);
const MultiComboBoxItem = createReactComponent(MultiComboBoxItemClass);

function App() {

  return (
    <>
      <style>{`
        /* Use :state(overflowed) to style items differently when in overflow popover */
        ui5-toolbar-item:state(overflowed) .toolbar-item-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
      `}</style>
      <Toolbar>
        {/* ToolbarItem wrapping Radio Buttons - displays in column when overflowed */}
        <ToolbarItem>
            <div role="radiogroup" aria-label="Options" className="toolbar-item-group">
                <RadioButton name="group1" text="Option 1" checked={true} />
                <RadioButton name="group1" text="Option 2" />
                <RadioButton name="group1" text="Option 3" />
            </div>
        </ToolbarItem>

        {/* ToolbarItem wrapping Checkboxes - displays in column when overflowed */}
        <ToolbarItem>
            <div role="group" aria-label="Checkboxes" className="toolbar-item-group">
                <CheckBox text="Checkbox 1" />
                <CheckBox text="Checkbox 2" checked={true} />
                <CheckBox text="Checkbox 3" />
            </div>
        </ToolbarItem>

        {/* ToolbarItem wrapping an Input Field */}
        <ToolbarItem>
            <Input placeholder="Enter text" />
        </ToolbarItem>

        {/* ToolbarItem wrapping a ComboBox */}
        <ToolbarItem>
            <ComboBox placeholder="Select an option">
                <ComboBoxItem text="Option 1" />
                <ComboBoxItem text="Option 2" />
                <ComboBoxItem text="Option 3" />
            </ComboBox>
        </ToolbarItem>

        {/* ToolbarItem wrapping a MultiComboBox */}
        <ToolbarItem>
            <MultiComboBox placeholder="Select options">
                <MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
                <MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
                <MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
            </MultiComboBox>
        </ToolbarItem>

        {/* ToolbarItem wrapping a Switch */}
        <ToolbarItem>
            <Switch text-on="On" text-off="Off" />
        </ToolbarItem>

        {/* ToolbarItem wrapping a DatePicker */}
        <ToolbarItem>
            <DatePicker placeholder="Select a date" />
        </ToolbarItem>
    </Toolbar>
    </>
  );
}

export default App;
