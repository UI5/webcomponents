import { createReactComponent } from "@ui5/webcomponents-base";
import { useState, useCallback, useEffect, useRef } from "react";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/write-new.js";

const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationGroup = createReactComponent(SideNavigationGroupClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Text = createReactComponent(TextClass);

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const quickActionRef = useRef(null);

  useEffect(() => {
    if (quickActionRef.current) {
      quickActionRef.current!.accessibilityAttributes = {
        hasPopup: "dialog"
      };
    }
  }, []);

  const handleQuickActionClick = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseClick = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <>
      <style>{`
        [ui5-side-navigation] {
          height: 600px;
        }
        #quickActionDialog::part(footer) {
          padding-inline: 0;
        }
      `}</style>
      <SideNavigation>
        <SideNavigationItem text="Home" icon="home" />
        <SideNavigationGroup text="Group 1" expanded={true}>
          <SideNavigationItem text="People" expanded={true} icon="group" unselectable={true}>
            <SideNavigationSubItem text="From My Team" />
            <SideNavigationSubItem text="From Other Teams" />
          </SideNavigationItem>
        </SideNavigationGroup>
        <SideNavigationItem
          ref={quickActionRef}
          slot="fixedItems"
          text="Quick Action"
          design="Action"
          unselectable={true}
          icon="write-new"
          onClick={handleQuickActionClick}
        />
        <SideNavigationItem slot="fixedItems" text="History" icon="history" />
      </SideNavigation>

      <Dialog open={dialogOpen} headerText="Create New Item" draggable={true} resizable={true} id="quickActionDialog" onClose={() => setDialogOpen(false)}>
        <Text>Create new item...</Text>
        <Bar slot="footer" design="Footer">
          <Button slot="endContent" design="Emphasized">Create</Button>
          <Button slot="endContent" onClick={handleCloseClick}>Close</Button>
        </Bar>
      </Dialog>
    </>
  );
}

export default App;
