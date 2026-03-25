import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CompatTableClass from "@ui5/webcomponents-compat/dist/Table.js";
import CompatTableRowClass from "@ui5/webcomponents-compat/dist/TableRow.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import CompatTableCellClass from "@ui5/webcomponents-compat/dist/TableCell.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const CompatTable = createReactComponent(CompatTableClass);
const CompatTableRow = createReactComponent(CompatTableRowClass);
const CompatTableColumn = createReactComponent(TableColumnClass);
const CompatTableCell = createReactComponent(CompatTableCellClass);
const Text = createReactComponent(TextClass);

function App() {
  return (
    <CompatTable>
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

      <CompatTableRow type="Active">
        <CompatTableCell>
          <Text>Notebook Basic 15</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>Very Best Screens</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>30 x 18 x 3cm</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>
            <b>4.2</b>KG
          </Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>
            <b>956</b>EUR
          </Text>
        </CompatTableCell>
      </CompatTableRow>

      <CompatTableRow type="Active">
        <CompatTableCell>
          <Text>iPhone 13</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>Apple</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>10 x 12 x 3cm</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>
            <b>150</b>G
          </Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>
            <b>100</b>EUR
          </Text>
        </CompatTableCell>
      </CompatTableRow>
    </CompatTable>
  );
}

export default App;
