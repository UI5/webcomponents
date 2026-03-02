import { createReactComponent } from "@ui5/webcomponents-base";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableSelectionClass from "@ui5/webcomponents/dist/TableSelection.js";

const Table = createReactComponent(TableClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableSelection = createReactComponent(TableSelectionClass);

function App() {

  return (
    <>
      <Table style={{ height: "150px" }} id="table" loading-delay={100} className="ui5-content-density-compact">
    			<ui5-table-virtualizer id="virtualizer" slot="features" row-count="1000" row-height="32"></ui5-table-virtualizer>
    <!-- playground-fold -->
    			<TableSelection slot="features" />
    			<TableHeaderRow slot="headerRow" sticky={true}>
    				<TableHeaderCell min-width="150px">Product Name</TableHeaderCell>
    				<TableHeaderCell>Dimensions</TableHeaderCell>
    				<TableHeaderCell>Weight</TableHeaderCell>
    				<TableHeaderCell horizontal-align="Right">Price</TableHeaderCell>
    			</TableHeaderRow>
    <!-- playground-fold-end -->
    		</Table>
    </>
  );
}

export default App;
