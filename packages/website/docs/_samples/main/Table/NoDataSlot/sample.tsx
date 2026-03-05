import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";

const IllustratedMessage = createComponent(IllustratedMessageClass);
const Table = createComponent(TableClass);
const TableHeaderCell = createComponent(TableHeaderCellClass);
const TableHeaderRow = createComponent(TableHeaderRowClass);

function App() {
  return (
    <>
      <Table id="table" overflowMode="Popin">
        <IllustratedMessage slot="noData" name="NoData" />
        {/* playground-fold */}
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell id="produtCol" width="300px">
            <span>Product</span>
          </TableHeaderCell>
          <TableHeaderCell id="supplierCol" width="200px">
            Supplier
          </TableHeaderCell>
          <TableHeaderCell id="dimensionsCol" width="300px">
            Dimensions
          </TableHeaderCell>
          <TableHeaderCell id="weightCol" width="100px">
            Weight
          </TableHeaderCell>
          <TableHeaderCell id="priceCol" width="220px">
            Price
          </TableHeaderCell>
        </TableHeaderRow>
        {/* playground-fold-end */}
      </Table>
    </>
  );
}

export default App;
