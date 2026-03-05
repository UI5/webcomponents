import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CompatTableClass from "@ui5/webcomponents-compat/dist/Table.js";
import CompatTableRowClass from "@ui5/webcomponents-compat/dist/TableRow.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import CompatTableCellClass from "@ui5/webcomponents-compat/dist/TableCell.js";
import TableGroupRowClass from "@ui5/webcomponents-compat/dist/TableGroupRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const CompatTable = createComponent(CompatTableClass);
const CompatTableRow = createComponent(CompatTableRowClass);
const CompatTableColumn = createComponent(TableColumnClass);
const CompatTableCell = createComponent(CompatTableCellClass);
const TableGroupRow = createComponent(TableGroupRowClass);
const Text = createComponent(TextClass);
const Label = createComponent(LabelClass);

function App() {
  return (
    <CompatTable>
      <CompatTableColumn slot="columns"><Label>City</Label></CompatTableColumn>
      <CompatTableColumn slot="columns" minWidth="500" popinText="Supplier" demandPopin><Label>Supplier</Label></CompatTableColumn>
      <CompatTableColumn slot="columns" minWidth="500"><Label>Date Of Foundation</Label></CompatTableColumn>

      <TableGroupRow>Country: Bulgaria</TableGroupRow>
      <CompatTableRow>
        <CompatTableCell><Text>Sofia</Text></CompatTableCell>
        <CompatTableCell><Text>Data Analytics</Text></CompatTableCell>
        <CompatTableCell><Text>1980</Text></CompatTableCell>
      </CompatTableRow>
      <CompatTableRow>
        <CompatTableCell><Text>Plovdiv</Text></CompatTableCell>
        <CompatTableCell><Text>Old Town Corp</Text></CompatTableCell>
        <CompatTableCell><Text>1899</Text></CompatTableCell>
      </CompatTableRow>

      <TableGroupRow><Text>Country: USA</Text></TableGroupRow>
      <CompatTableRow>
        <CompatTableCell><Text>New York</Text></CompatTableCell>
        <CompatTableCell><Text>Deloitte</Text></CompatTableCell>
        <CompatTableCell><Text>1845</Text></CompatTableCell>
      </CompatTableRow>
      <CompatTableRow>
        <CompatTableCell><Text>Bentonville</Text></CompatTableCell>
        <CompatTableCell><Text>Walmart</Text></CompatTableCell>
        <CompatTableCell><Text>1962</Text></CompatTableCell>
      </CompatTableRow>
    </CompatTable>
  );
}

export default App;
