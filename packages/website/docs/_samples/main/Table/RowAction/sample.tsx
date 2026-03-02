import { createReactComponent } from "@ui5/webcomponents-base";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";

const Label = createReactComponent(LabelClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);

function App() {

  const handleRowActionClick = () => {
    const { action, row
  };

  return (
    <>
      <Table id="table" row-action-count={3}>
    <!-- playground-fold -->
    	<TableHeaderRow slot="headerRow">
    		<TableHeaderCell>Product</TableHeaderCell>
    		<TableHeaderCell>Supplier</TableHeaderCell>
    		<TableHeaderCell horizontal-align="End">Price</TableHeaderCell>
    	</TableHeaderRow>
    	<TableRow row-key={1} interactive={true}>
    		<TableCell><Label><b>Notebook Basic 15</b><br /><a href="#">HT-1000</a></Label></TableCell>
    		<TableCell><Label>Very Best Screens</Label></TableCell>
    		<TableCell><Label><b>899.99</b> EUR</Label></TableCell>
    		<ui5-table-row-action-navigation slot="actions"></ui5-table-row-action-navigation>
    	</TableRow>
    <!-- playground-fold-end -->
    	<TableRow row-key={2}>
    		<TableCell><Label><b>Astro Laptop 216</b><br /><a href="#">HT-1251</a></Label></TableCell>
    		<TableCell><Label>Technocom</Label></TableCell>
    		<TableCell><Label><b>679.99</b> EUR</Label></TableCell>
    		<ui5-table-row-action slot="actions" icon="delete" text="Delete" handler="onDelete"></ui5-table-row-action>
    		<ui5-table-row-action slot="actions" icon="add" text="Add" handler="onAdd"></ui5-table-row-action>
    		<ui5-table-row-action slot="actions" icon="edit" text="Edit" handler="onEdit"></ui5-table-row-action>
    		<ui5-table-row-action slot="actions" icon="share" text="Share" handler="onShare"></ui5-table-row-action>
    		<ui5-table-row-action slot="actions" icon="heart" text="Like" handler="onLike"></ui5-table-row-action>
    		<ui5-table-row-action-navigation slot="actions" handler="onNavigate" interactive></ui5-table-row-action-navigation>
    	</TableRow>
    <!-- playground-fold -->
    	<TableRow row-key={3} navigated={true}>
    		<TableCell><Label><b>Benda Laptop 1408</b><br /><a href="#">HT-6102</a></Label></TableCell>
    		<TableCell><Label>Ultrasonic United</Label></TableCell>
    		<TableCell><Label><b>699.99</b> EUR</Label></TableCell>
    		<ui5-table-row-action slot="actions" icon="share" text="Share" handler="onShare"></ui5-table-row-action>
    		<ui5-table-row-action slot="actions" icon="edit" text="Edit" handler="onEdit" invisible></ui5-table-row-action>
    		<ui5-table-row-action slot="actions" icon="heart" text="Like" handler="onLike"></ui5-table-row-action>
    	</TableRow>
    	<TableRow row-key={4}>
    		<TableCell><Label><b>Broad Screen 22HD</b><br /><a href="#">HT-1255</a></Label></TableCell>
    		<TableCell><Label>Speaker Experts</Label></TableCell>
    		<TableCell><Label><b>399.99</b> EUR</Label></TableCell>
    		<ui5-table-row-action slot="actions" icon="share" text="Share" handler="onShare"></ui5-table-row-action>
    		<ui5-table-row-action slot="actions" icon="add" text="Add" handler="onAdd"></ui5-table-row-action>
    	</TableRow>
    <!-- playground-fold-end -->
    </Table>
    </>
  );
}

export default App;
