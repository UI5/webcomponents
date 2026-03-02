import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <List id="listDnd1">
            <ListItemStandard icon="checklist-item" movable={true}>Item #1</ListItemStandard>
            <ListItemStandard icon="checklist-item" movable={true}>Item #2</ListItemStandard>
            <ListItemStandard icon="checklist-item" movable={true}>Item #3</ListItemStandard>
            <ListItemStandard icon="checklist-item" movable={true}>Item #4</ListItemStandard>
            <ListItemStandard icon="checklist-item" movable={true}>Item #5</ListItemStandard>
        </List>
    </>
  );
}

export default App;
