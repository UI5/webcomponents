import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import HeroBannerClass from "@ui5/webcomponents-fiori/dist/HeroBanner.js";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/cart.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/task.js";
import "@ui5/webcomponents-icons/dist/add-document.js";
import "@ui5/webcomponents-icons/dist/collaborate.js";

const HeroBanner = createReactComponent(HeroBannerClass);
const Search = createReactComponent(SearchClass);
const Button = createReactComponent(ButtonClass);

function App() {
  return (
    <>
      <h4>Search</h4>
      <HeroBanner
        headerText="Good Morning, Anna"
        overlineText="Monday, May 26, 2026"
      >
        <Button slot="headerActions" icon="cart">Cart</Button>
        <Search
          placeholder="Search purchase orders, suppliers, materials..."
          style={{ width: "100%", maxWidth: "100%" }}
        />
      </HeroBanner>

      <br />

      <h4>Header Actions Only</h4>
      <HeroBanner
        headerText="Welcome, Lisa"
        overlineText="Tuesday, May 27, 2026"
      >
        <Button slot="headerActions" icon="action-settings">Settings</Button>
        <Button slot="headerActions" icon="log">Activity Log</Button>
      </HeroBanner>

      <br />

      <h4>Content with Actions</h4>
      <HeroBanner
        headerText="Good Morning, Robert"
        overlineText="Tuesday, May 27, 2026"
        layout="FullWidth"
      >
        <div style={{ margin: 0 }}>You have 3 pending approvals and 12 new notifications since your last visit. Review your tasks below or use the quick actions to get started.</div>
        <div slot="endContent" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Button icon="task" design="Default">Review Approvals</Button>
          <Button icon="add-document" design="Default">Create Report</Button>
          <Button icon="collaborate" design="Default">Team Overview</Button>
        </div>
      </HeroBanner>
    </>
  );
}

export default App;
