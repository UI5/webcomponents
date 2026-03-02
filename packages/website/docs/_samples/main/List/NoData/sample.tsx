import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";

const List = createReactComponent(ListClass);

function App() {

  return (
    <List selection-mode="None" header-text="No Data" no-data-text="No Data Available" />
  );
}

export default App;
