import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CompatTableClass from "@ui5/webcomponents-compat/dist/Table.js";
import CompatTableRowClass from "@ui5/webcomponents-compat/dist/TableRow.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import CompatTableCellClass from "@ui5/webcomponents-compat/dist/TableCell.js";
import TableGroupRowClass from "@ui5/webcomponents-compat/dist/TableGroupRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const CompatTable = createReactComponent(CompatTableClass);
const CompatTableRow = createReactComponent(CompatTableRowClass);
const CompatTableColumn = createReactComponent(TableColumnClass);
const CompatTableCell = createReactComponent(CompatTableCellClass);
const TableGroupRow = createReactComponent(TableGroupRowClass);
const Text = createReactComponent(TextClass);
const Label = createReactComponent(LabelClass);

export const Example = () => {
  return (
    <CompatTable>
      <CompatTableColumn slot="columns">
        <Label>City</Label>
      </CompatTableColumn>
      <CompatTableColumn
        slot="columns"
        minWidth={500}
        popinText="Supplier"
        demandPopin
      >
        <Label>Supplier</Label>
      </CompatTableColumn>
      <CompatTableColumn slot="columns" minWidth={500}>
        <Label>Date Of Foundation</Label>
      </CompatTableColumn>

      <TableGroupRow>Country: Bulgaria</TableGroupRow>
      <CompatTableRow>
        <CompatTableCell>
          <Text>Sofia</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>Data Analytics</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>1980</Text>
        </CompatTableCell>
      </CompatTableRow>
      <CompatTableRow>
        <CompatTableCell>
          <Text>Plovdiv</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>Old Town Corp</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>1899</Text>
        </CompatTableCell>
      </CompatTableRow>

      <TableGroupRow>
        <Text>Country: USA</Text>
      </TableGroupRow>
      <CompatTableRow>
        <CompatTableCell>
          <Text>New York</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>Deloitte</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>1845</Text>
        </CompatTableCell>
      </CompatTableRow>
      <CompatTableRow>
        <CompatTableCell>
          <Text>Bentonville</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>Walmart</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>1962</Text>
        </CompatTableCell>
      </CompatTableRow>
    </CompatTable>
  );
}
