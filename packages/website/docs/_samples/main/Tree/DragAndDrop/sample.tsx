import { createReactComponent } from "@ui5/webcomponents-base";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import TreeClass from "@ui5/webcomponents/dist/Tree.js";
import TreeItemClass from "@ui5/webcomponents/dist/TreeItem.js";

const Label = createReactComponent(LabelClass);
const Title = createReactComponent(TitleClass);
const Tree = createReactComponent(TreeClass);
const TreeItem = createReactComponent(TreeItemClass);

function App() {

  return (
    <>
      <Tree id="tree" no-data-text="No data" mode="MultiSelect" accessible-name="Tree with accessibleName">

            <TreeItem movable={true} text="Tree 1" icon="paste" additional-text="Available" indeterminate={true} selected={true} additional-text-state="Information" accessible-name="Tree item with accessibleName">
                <Title slot="content">
                    <Label>Tree 1</Label>
                    <Label>Tree 1</Label>
                </Title>

                <TreeItem movable={true} expanded={true} text="Tree 1.1" additional-text="Re-stock" additional-text-state="Negative" indeterminate={true} selected={true}>
                    <TreeItem movable={true} text="Tree 1.1.1" additional-text="Required" additional-text-state="Critical" selected={true} />
                    <TreeItem movable={true} text="Tree 1.1.2" additional-text="Available" additional-text-state="Positive" />
                </TreeItem>
            </TreeItem>

            <TreeItem movable={true} data-allows-nesting={true} text="Tree 2(Allows Nesting)" icon="copy">
                <TreeItem movable={true} id="firstCollapsedItem" text="Tree 2.1">
                    <TreeItem movable={true} text="Tree 2.1.1" />
                    <TreeItem movable={true} text="Tree 2.1.2">
                        <TreeItem movable={true} text="Tree 2.1.2.1" />
                        <TreeItem movable={true} text="Tree 2.1.2.2" />
                        <TreeItem movable={true} text="Tree 2.1.2.3" />
                        <TreeItem movable={true} text="Tree 2.1.2.5" />
                    </TreeItem>
                </TreeItem>
                <TreeItem movable={true} text="Tree 2.2" />
                <TreeItem movable={true} text="Tree 2.3" />
            </TreeItem>

            <TreeItem movable={true} text="Tree 3 (no icon)" />

        </Tree>
    </>
  );
}

export default App;
