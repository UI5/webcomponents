import { createReactComponent } from "@ui5/webcomponents-base";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableGrowingClass from "@ui5/webcomponents/dist/TableGrowing.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";

const Label = createReactComponent(LabelClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableGrowing = createReactComponent(TableGrowingClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);

function App() {

  const handleLoadMore = () => {
    for (let i = 0; i < 2; i++) {
		const newRow = document.createElement("ui5-table-row");
		newRow.setAttribute("key", table.rows.length + i);
		newRow.innerHTML = `
			<ui5-table-cell><ui5-label><b>Notebook Basic ${18 + table.rows.length + i
  };

  return (
    <>
      <Table id="table">
    			<TableGrowing id="growing" mode="Button" slot="features" />
    <!-- playground-fold -->
    			<TableHeaderRow slot="headerRow">
    				<TableHeaderCell id="produtCol"><span>Product</span></TableHeaderCell>
    				<TableHeaderCell id="supplierCol">Supplier</TableHeaderCell>
    				<TableHeaderCell id="dimensionsCol">Dimensions</TableHeaderCell>
    				<TableHeaderCell id="weightCol">Weight</TableHeaderCell>
    				<TableHeaderCell id="priceCol">Price</TableHeaderCell>
    			</TableHeaderRow>
    			<TableRow row-key={0}>
    				<TableCell><Label><b>Notebook Basic 15</b><br />HT-1000</Label></TableCell>
    				<TableCell><Label>Very Best Screens</Label></TableCell>
    				<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
    				<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.2</b> KG</Label></TableCell>
    				<TableCell><Label><b>956</b> EUR</Label></TableCell>
    			</TableRow>
    			<TableRow row-key={1}>
    				<TableCell><Label><b>Notebook Basic 17</b><br />HT-1001</Label></TableCell>
    				<TableCell><Label>Smartcards</Label></TableCell>
    				<TableCell><Label>29 x 17 x 3.1 cm</Label></TableCell>
    				<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.5</b> KG</Label></TableCell>
    				<TableCell><Label><b>1249</b> EUR</Label></TableCell>
    			</TableRow>
    			<TableRow row-key={2}>
    				<TableCell><Label><b>Notebook Basic 18</b><br />HT-1002</Label></TableCell>
    				<TableCell><Label>Technocom</Label></TableCell>
    				<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
    				<TableCell><Label style={{ color: "#2b7c2b" }}><b>3.7</b> KG</Label></TableCell>
    				<TableCell><Label><b>29</b> EUR</Label></TableCell>
    			</TableRow>
    <!-- playground-fold-end -->
    		</Table>
    </>
  );
}

export default App;
