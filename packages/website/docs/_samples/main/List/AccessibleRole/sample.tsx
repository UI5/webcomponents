import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/create.js";
import "@ui5/webcomponents-icons/dist/save.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/filter.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {
  return (
    <>
      {/* Menu: list role="menu", items inherit role="menuitem" */}
      <List accessibleRole="Menu" headerText="Actions">
        <ListItemStandard icon="create">New Document</ListItemStandard>
        <ListItemStandard icon="save">Save</ListItemStandard>
        <ListItemStandard icon="delete">Delete</ListItemStandard>
      </List>

      <br />

      {/* ListBox: list role="listbox", items inherit role="option" */}
      <List accessibleRole="ListBox" headerText="Select a Country">
        <ListItemStandard>Argentina</ListItemStandard>
        <ListItemStandard>Bulgaria</ListItemStandard>
        <ListItemStandard>China</ListItemStandard>
      </List>

      <br />

      {/* Explicit accessible-role on ui5-li overrides the inherited role */}
      <List accessibleRole="Menu" headerText="Mixed Roles (override)">
        <ListItemStandard icon="create">Inherits menuitem</ListItemStandard>
        <ListItemStandard icon="filter" accessibleRole="None">
          Separator-like (role=none)
        </ListItemStandard>
        <ListItemStandard icon="save">Inherits menuitem</ListItemStandard>
      </List>
    </>
  );
}

export default App;
