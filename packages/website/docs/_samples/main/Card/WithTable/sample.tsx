import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const TableColumn = createReactComponent(TableColumnClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Label = createReactComponent(LabelClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableRow = createReactComponent(TableRowClass);
const Text = createReactComponent(TextClass);

function App() {

  return (
    <>
      <style>{`
        ui5-card {
            width: 40rem;
        }

        .status-error { color: #b00; }
        .status-warning { color: #e9730c; }
        .status-success { color: #107e3e; }
      `}</style>
      <Card style={{ width: "40rem" }}>
            <CardHeader slot="header" titleText="New Purchase Orders" subtitleText="Today" additionalText="3 of 15" />

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
                <TableColumn slot="columns" min-width={450} popinText="Status" demandPopin={true}>
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
                        <Text class="status-success">Approved</Text>
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
                        <Text class="status-error">Rejected</Text>
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
                        <Text class="status-warning">Pending</Text>
                    </TableCell>
                </TableRow>
            </Table>
        </Card>
    </>
  );
}

export default App;
