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

  const handleChange = () => {
    console.log("Selected key", selectionFeature.selected);
	console.log("Selected row", selectionFeature.getRowByKey(selectionFeature.selected));
  };

  const handleChange = (e) => {
    selectionFeature.behavior = e.target.text;
  };

  return (
    <>
      <Table id="table">
    			<ui5-table-selection-single id="selection" slot="features" selected="Row2"></ui5-table-selection-single>
    <!-- playground-fold -->
    			<TableHeaderRow slot="headerRow">
    				<TableHeaderCell id="produtCol" width="1fr"><span>Product</span></TableHeaderCell>
    				<TableHeaderCell id="supplierCol" width="1fr">Supplier</TableHeaderCell>
    				<TableHeaderCell id="dimensionsCol" width="1fr">Dimensions</TableHeaderCell>
    				<TableHeaderCell id="weightCol" width="1fr">Weight</TableHeaderCell>
    				<TableHeaderCell id="priceCol" width="1fr" horizontal-align="End">Price</TableHeaderCell>
    			</TableHeaderRow>
    			<TableRow row-key="Row1">
    				<TableCell><Label><b>Notebook Basic 15</b><br />HT-1000</Label></TableCell>
    				<TableCell><Label>Very Best Screens</Label></TableCell>
    				<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
    				<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.2</b> KG</Label></TableCell>
    				<TableCell><ui5-labe><b>956</b> EUR</Label></TableCell>
    			</TableRow>
    			<TableRow row-key="Row2">
    				<TableCell><Label><b>Notebook Basic 17</b><br />HT-1001</Label></TableCell>
    				<TableCell><Label>Smartcards</Label></TableCell>
    				<TableCell><Label>29 x 17 x 3.1 cm</Label></TableCell>
    				<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.5</b> KG</Label></TableCell>
    				<TableCell><Label><b>1249</b> EUR</Label></TableCell>
    			</TableRow>
    			<TableRow row-key="Row3">
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
