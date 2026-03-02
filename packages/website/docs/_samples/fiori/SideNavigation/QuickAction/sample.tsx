import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Bar = createReactComponent(BarClass);
const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationGroup = createReactComponent(SideNavigationGroupClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Text = createReactComponent(TextClass);

function App() {

  const handleClick = () => {
    dialog.open = true;
  };

  const handleClick = () => {
    dialog.open = false;
  };

  return (
    <>
      <SideNavigation>
    		<SideNavigationItem text="Home" icon="home" />
    		<SideNavigationGroup text="Group 1" expanded={true}>
    			<SideNavigationItem text="People" expanded={true} icon="group" unselectable={true}>
    				<SideNavigationSubItem text="From My Team" />
    				<SideNavigationSubItem text="From Other Teams" />
    			</SideNavigationItem>
    		</SideNavigationGroup>
    		<SideNavigationItem slot="fixedItems" id="quickAction" text="Quick Action" design="Action" unselectable={true} icon="write-new" />
    		<SideNavigationItem slot="fixedItems" text="History" icon="history" />
    	</SideNavigation>

    	<Dialog header-text="Create New Item" draggable={true} resizable={true} id="quickActionDialog">
    		<Text>Create new item...</Text>
    		<Bar slot="footer" design="Footer">
    			<Button slot="endContent" design="Emphasized">Create</Button>
    			<Button slot="endContent" id="quickActionCloseBtn">Close</Button>
    		</Bar>
    	</Dialog>
    </>
  );
}

export default App;
