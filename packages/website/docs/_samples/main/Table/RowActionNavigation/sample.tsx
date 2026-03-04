import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableRowActionNavigation.js";
import TableRowActionNavigationClass from "@ui5/webcomponents/dist/TableRowActionNavigation.js";

const Label = createReactComponent(LabelClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const TableRowActionNavigation = createReactComponent(TableRowActionNavigationClass);

function App() {
  const handleTableRowActionClick = (e) => {
    const row = e.detail.row;
    console.log(`Navigate action of row ${row.rowKey} is clicked`);
  };

  return (
    <>
      <Table id="table" rowActionCount={1} onRowActionClick={handleTableRowActionClick}>
    {/* playground-fold */}
    	<TableHeaderRow slot="headerRow">
    		<TableHeaderCell>Product</TableHeaderCell>
    		<TableHeaderCell>Supplier</TableHeaderCell>
    		<TableHeaderCell horizontalAlign="End">Price</TableHeaderCell>
    	</TableHeaderRow>
    	<TableRow rowKey={1}>
    		<TableCell><Label><b>Notebook Basic 15</b><br /><a href="#">HT-1000</a></Label></TableCell>
    		<TableCell><Label>Very Best Screens</Label></TableCell>
    		<TableCell><Label><b>899.99</b> EUR</Label></TableCell>
    		<TableRowActionNavigation slot="actions" interactive></TableRowActionNavigation>
    	</TableRow>
    {/* playground-fold-end */}
    	<TableRow rowKey={2} interactive={true}>
    		<TableCell><Label><b>Astro Laptop 216</b><br /><a href="#">HT-1251</a></Label></TableCell>
    		<TableCell><Label>Technocom</Label></TableCell>
    		<TableCell><Label><b>679.99</b> EUR</Label></TableCell>
    		<TableRowActionNavigation slot="actions"></TableRowActionNavigation>
    	</TableRow>
    {/* playground-fold */}
    	<TableRow rowKey={3} navigated={true}>
    		<TableCell><Label><b>Benda Laptop 1408</b><br /><a href="#">HT-6102</a></Label></TableCell>
    		<TableCell><Label>Ultrasonic United</Label></TableCell>
    		<TableCell><Label><b>699.99</b> EUR</Label></TableCell>
    		<TableRowActionNavigation slot="actions" invisible></TableRowActionNavigation>
    	</TableRow>
    	<TableRow rowKey={4}>
    		<TableCell><Label><b>Broad Screen 22HD</b><br /><a href="#">HT-1255</a></Label></TableCell>
    		<TableCell><Label>Speaker Experts</Label></TableCell>
    		<TableCell><Label><b>399.99</b> EUR</Label></TableCell>
    		<TableRowActionNavigation slot="actions" interactive></TableRowActionNavigation>
    	</TableRow>
    {/* playground-fold-end */}
    </Table>
    </>
  );
}

export default App;
