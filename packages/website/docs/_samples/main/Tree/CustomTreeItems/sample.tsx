import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import TreeClass from "@ui5/webcomponents/dist/Tree.js";
import TreeItemCustomClass from "@ui5/webcomponents/dist/TreeItemCustom.js";

const Button = createComponent(ButtonClass);
const Option = createComponent(OptionClass);
const Select = createComponent(SelectClass);
const Title = createComponent(TitleClass);
const Tree = createComponent(TreeClass);
const TreeItemCustom = createComponent(TreeItemCustomClass);

function App() {

  return (
    <>
      <Tree>

        <div slot="header">
    		<Title level="H5">Tree with custom items</Title>
    	</div>

        <TreeItemCustom expanded={true} showToggleButton={true} hideSelectionElement={true} type="Active" level={1}
        >
        <Button slot="content">Level 1</Button>

        <TreeItemCustom type="Active" showToggleButton={true} level={2} expanded={true}
        >
            <Select slot="content">
                <Option>Level 2</Option>
                <Option>Option 2.1</Option>
                <Option>Option 2.3</Option>
            </Select>
            <TreeItemCustom hideSelectionElement={true} type="Active" level={3}
            >
                <Button slot="content">Level 3</Button>
            </TreeItemCustom>
        </TreeItemCustom>
    </TreeItemCustom>

    </Tree>
    </>
  );
}

export default App;
