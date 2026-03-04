import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";

const List = createReactComponent(ListClass);

function App() {

  return (
    <List selectionMode="None" headerText="No Data" noDataText="No Data Available" />
  );
}

export default App;
