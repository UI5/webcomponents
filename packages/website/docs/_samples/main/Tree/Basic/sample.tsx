import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TreeClass from "@ui5/webcomponents/dist/Tree.js";
import TreeItemClass from "@ui5/webcomponents/dist/TreeItem.js";
import "@ui5/webcomponents-icons/dist/paste.js";
import "@ui5/webcomponents-icons/dist/copy.js";

const Tree = createReactComponent(TreeClass);
const TreeItem = createReactComponent(TreeItemClass);

function App() {

  return (
    <>
      <Tree>
        <TreeItem expanded={true} text="Tree 1" icon="paste" selected={true}>
    		<TreeItem expanded={true} text="Tree 1.1" selected={true}>
    			<TreeItem text="Tree 1.1.1" />
    			<TreeItem text="Tree 1.1.2" />
    		</TreeItem>
    	</TreeItem>

    	<TreeItem text="Tree 2" icon="copy">
    		<TreeItem text="Tree 2.1">
    			<TreeItem text="Tree 2.1.1" />

    			<TreeItem text="Tree 2.1.2">
    				<TreeItem text="Tree 2.1.2.1" />
    				<TreeItem text="Tree 2.1.2.2" />
    				<TreeItem text="Tree 2.1.2.3" />
    				<TreeItem text="Tree 2.1.2.5" />
    			</TreeItem>
    		</TreeItem>

    		<TreeItem text="Tree 2.2" />
        </TreeItem>

    	<TreeItem expanded={true} text="Tree 3 (no icon)" />
    </Tree>
    </>
  );
}

export default App;
