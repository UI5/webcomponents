import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CompatTableClass from "@ui5/webcomponents-compat/dist/Table.js";
import CompatTableRowClass from "@ui5/webcomponents-compat/dist/TableRow.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import CompatTableCellClass from "@ui5/webcomponents-compat/dist/TableCell.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const CompatTable = createReactComponent(CompatTableClass);
const CompatTableRow = createReactComponent(CompatTableRowClass);
const TableColumn = createReactComponent(TableColumnClass);
const CompatTableCell = createReactComponent(CompatTableCellClass);
const Text = createReactComponent(TextClass);

export const Example = () => {
  return (
    <CompatTable>
      <TableColumn slot="columns">
        <Text>Product</Text>
      </TableColumn>
      <TableColumn slot="columns">
        <Text>Supplier</Text>
      </TableColumn>
      <TableColumn slot="columns">
        <Text>Dimensions</Text>
      </TableColumn>
      <TableColumn slot="columns">
        <Text>Weight</Text>
      </TableColumn>
      <TableColumn slot="columns">
        <Text>Price</Text>
      </TableColumn>

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
            <b>800</b>EUR
          </Text>
        </CompatTableCell>
      </CompatTableRow>

      <CompatTableRow>
        <CompatTableCell>
          <Text>iPhone 43</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>Apple</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>12 x 12 x 3cm</Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>
            <b>250</b>G
          </Text>
        </CompatTableCell>
        <CompatTableCell>
          <Text>
            <b>1200</b>EUR
          </Text>
        </CompatTableCell>
      </CompatTableRow>
    </CompatTable>
  );
}
