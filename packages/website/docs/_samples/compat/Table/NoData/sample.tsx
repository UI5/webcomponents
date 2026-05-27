import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CompatTableClass from "@ui5/webcomponents-compat/dist/Table.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const CompatTable = createReactComponent(CompatTableClass);
const CompatTableColumn = createReactComponent(TableColumnClass);
const Text = createReactComponent(TextClass);

function App() {
  return (
    <CompatTable noDataText="No data found">
      <CompatTableColumn slot="columns">
        <Text>Product</Text>
      </CompatTableColumn>
      <CompatTableColumn slot="columns">
        <Text>Supplier</Text>
      </CompatTableColumn>
      <CompatTableColumn slot="columns">
        <Text>Dimensions</Text>
      </CompatTableColumn>
      <CompatTableColumn slot="columns">
        <Text>Weight</Text>
      </CompatTableColumn>
      <CompatTableColumn slot="columns">
        <Text>Price</Text>
      </CompatTableColumn>
    </CompatTable>
  );
}

export default App;
