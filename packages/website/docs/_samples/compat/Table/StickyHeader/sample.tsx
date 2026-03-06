import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CompatTableClass from "@ui5/webcomponents-compat/dist/Table.js";
import CompatTableRowClass from "@ui5/webcomponents-compat/dist/TableRow.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import CompatTableCellClass from "@ui5/webcomponents-compat/dist/TableCell.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const CompatTable = createComponent(CompatTableClass);
const CompatTableRow = createComponent(CompatTableRowClass);
const CompatTableColumn = createComponent(TableColumnClass);
const CompatTableCell = createComponent(CompatTableCellClass);
const Text = createComponent(TextClass);

function App() {
  return (
    <div style={{ height: "150px", overflow: "scroll" }}>
      <CompatTable stickyColumnHeader>
        <CompatTableColumn slot="columns">
          <Text>Product</Text>
        </CompatTableColumn>
        <CompatTableColumn slot="columns" minWidth="800">
          <Text>Supplier</Text>
        </CompatTableColumn>
        <CompatTableColumn
          slot="columns"
          minWidth="600"
          popinText="Dimensions"
          demandPopin
        >
          <Text>Dimensions</Text>
        </CompatTableColumn>
        <CompatTableColumn
          slot="columns"
          minWidth="600"
          popinText="Weight"
          demandPopin
        >
          <Text>Weight</Text>
        </CompatTableColumn>
        <CompatTableColumn slot="columns">
          <Text>Price</Text>
        </CompatTableColumn>

        <CompatTableRow>
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

        <CompatTableRow>
          <CompatTableCell>
            <Text>Notebook Basic 175</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>Very Best Screens</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>29 x 17 x 3.1cm</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>
              <b>4.5</b>KG
            </Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>
              <b>1249</b>EUR
            </Text>
          </CompatTableCell>
        </CompatTableRow>

        <CompatTableRow>
          <CompatTableCell>
            <Text>Notebook Basic 18</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>Very Best Screens</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>28 x 19 x 2.5cm</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>
              <b>4.2</b>KG
            </Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>
              <b>1570</b>EUR
            </Text>
          </CompatTableCell>
        </CompatTableRow>

        <CompatTableRow>
          <CompatTableCell>
            <Text>Notebook Basic 19</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>New Best Screens</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>38 x 19 x 2.5cm</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>
              <b>5.2</b>KG
            </Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>
              <b>200</b>EUR
            </Text>
          </CompatTableCell>
        </CompatTableRow>

        <CompatTableRow>
          <CompatTableCell>
            <Text>Notebook Basic 21</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>Great Screens</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>44 x 14 x 3.5cm</Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>
              <b>4.2</b>KG
            </Text>
          </CompatTableCell>
          <CompatTableCell>
            <Text>
              <b>300</b>EUR
            </Text>
          </CompatTableCell>
        </CompatTableRow>
      </CompatTable>
    </div>
  );
}

export default App;
