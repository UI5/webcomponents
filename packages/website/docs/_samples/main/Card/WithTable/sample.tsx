import { createReactComponent } from "@ui5/webcomponents-base";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TableClass from "@ui5/webcomponents-compat/dist/Table.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import TableRowClass from "@ui5/webcomponents-compat/dist/TableRow.js";
import TableCellClass from "@ui5/webcomponents-compat/dist/TableCell.js";

const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Label = createReactComponent(LabelClass);
const Text = createReactComponent(TextClass);
const Table = createReactComponent(TableClass);
const TableColumn = createReactComponent(TableColumnClass);
const TableRow = createReactComponent(TableRowClass);
const TableCell = createReactComponent(TableCellClass);

function App() {

  return (
    <>
      <Card style={{ width: "40rem" }}>
            <CardHeader slot="header" title-text="New Purchase Orders" subtitle-text="Today" additional-text="3 of 15" />

            <Table style={{ marginBlockEnd: "0.75rem" }}>
                <TableColumn slot="columns">
                    <Label>Sales Order</Label>
                </TableColumn>
                <TableColumn slot="columns">
                    <Label>Customer</Label>
                </TableColumn>
                <TableColumn slot="columns">
                    <Label>Net Amount</Label>
                </TableColumn>
                <TableColumn slot="columns" min-width={450} popin-text="Status" demand-popin={true}>
                    <Label>Status</Label>
                </TableColumn>

                <TableRow>
                    <TableCell>
                        <Label>5000010050</Label>
                    </TableCell>
                    <TableCell>
                        <Label>Entertainment Argentina</Label>
                    </TableCell>
                    <TableCell>
                        <Label>6k USD</Label>
                    </TableCell>
                    <TableCell>
                        <Text className="status-success">Approved</Text>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Label>5000010051</Label>
                    </TableCell>
                    <TableCell>
                        <Label>Brazil Technologies</Label>
                    </TableCell>
                    <TableCell>
                        <Label>2k USD</Label>
                    </TableCell>
                    <TableCell>
                        <Text className="status-error">Rejected</Text>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Label>5000010052</Label>
                    </TableCell>
                    <TableCell>
                        <Label>Robert Brown Ent.</Label>
                    </TableCell>
                    <TableCell>
                        <Label>17k USD</Label>
                    </TableCell>
                    <TableCell>
                        <Text className="status-warning">Pending</Text>
                    </TableCell>
                </TableRow>
            </Table>
        </Card>
    </>
  );
}

export default App;
