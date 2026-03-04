import { createReactComponent } from "@ui5/webcomponents-base";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import ExpandableTextClass from "@ui5/webcomponents/dist/ExpandableText.js";

const Label = createReactComponent(LabelClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const ExpandableText = createReactComponent(ExpandableTextClass);

function App() {

  return (
    <>
      <Table>
            <TableHeaderRow slot="headerRow">
                <TableHeaderCell>Product</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell>Dimensions</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
            </TableHeaderRow>
            <TableRow>
                <TableCell><b>Notebook Basic 15</b></TableCell>
                <TableCell>
                    <ExpandableText
                        overflowMode="Popover"
                        text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis accusamus assumenda debitis excepturi distinctio adipisci magnam qui a id, praesentium ullam voluptatem ad, modi quo perspiciatis soluta quasi facere molestiae"></ExpandableText>
                </TableCell>
                <TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
                <TableCell><Label><b>956</b> EUR</Label></TableCell>
            </TableRow>
            <TableRow>
                <TableCell><b>Notebook Basic 17</b></TableCell>
                <TableCell>
                    <ExpandableText
                        overflowMode="Popover"
                        text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis accusamus assumenda debitis excepturi distinctio adipisci magnam qui a id, praesentium ullam voluptatem ad, modi quo perspiciatis soluta quasi facere molestiae"></ExpandableText>
                </TableCell>
                <TableCell><Label>29 x 17 x 3.1 cm</Label></TableCell>
                <TableCell><Label><b>1249</b> EUR</Label></TableCell>
            </TableRow>
        </Table>
    </>
  );
}

export default App;
