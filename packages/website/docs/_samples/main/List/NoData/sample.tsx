import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ListClass from "@ui5/webcomponents/dist/List.js";

const List = createComponent(ListClass);

function App() {

  return (
    <List selectionMode="None" headerText="No Data" noDataText="No Data Available" />
  );
}

export default App;
