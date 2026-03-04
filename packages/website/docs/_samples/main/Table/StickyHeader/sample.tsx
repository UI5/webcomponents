import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
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

  return (
    <>
      <Table style={{ height: "150px" }} id="table">
    		<TableHeaderRow slot="headerRow" sticky={true}>
    			<TableHeaderCell id="produtCol"><span>Product</span></TableHeaderCell>
    			<TableHeaderCell id="supplierCol">Supplier</TableHeaderCell>
    			<TableHeaderCell id="dimensionsCol">Dimensions</TableHeaderCell>
    			<TableHeaderCell id="weightCol">Weight</TableHeaderCell>
    			<TableHeaderCell style={{ textAlign: "end" }} id="priceCol">Price</TableHeaderCell>
    		</TableHeaderRow>
    {/* playground-fold */}
    		<TableRow>
    			<TableCell><Label><b>Notebook Basic 15</b><br />HT-1000</Label></TableCell>
    			<TableCell><Label>Very Best Screens</Label></TableCell>
    			<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
    			<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.2</b> KG</Label></TableCell>
    			<TableCell><Label><b>956</b> EUR</Label></TableCell>
    		</TableRow>
    		<TableRow>
    			<TableCell><Label><b>Notebook Basic 17</b><br />HT-1001</Label></TableCell>
    			<TableCell><Label>Smartcards</Label></TableCell>
    			<TableCell><Label>29 x 17 x 3.1 cm</Label></TableCell>
    			<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.5</b> KG</Label></TableCell>
    			<TableCell><Label><b>1249</b> EUR</Label></TableCell>
    		</TableRow>
    		<TableRow>
    			<TableCell><Label><b>Notebook Basic 18</b><br />HT-1002</Label></TableCell>
    			<TableCell><Label>Technocom</Label></TableCell>
    			<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
    			<TableCell><Label style={{ color: "#2b7c2b" }}><b>3.7</b> KG</Label></TableCell>
    			<TableCell><Label><b>29</b> EUR</Label></TableCell>
    		</TableRow>
    		<TableRow>
    			<TableCell><Label><b>Notebook Basic 19</b><br />HT-1003</Label></TableCell>
    			<TableCell><Label>Very Best Screens</Label></TableCell>
    			<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
    			<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.2</b> KG</Label></TableCell>
    			<TableCell><Label><b>956</b> EUR</Label></TableCell>
    		</TableRow>
    		<TableRow>
    			<TableCell><Label><b>Notebook Basic 20</b><br />HT-1004</Label></TableCell>
    			<TableCell><Label>Smartcards</Label></TableCell>
    			<TableCell><Label>29 x 17 x 3.1 cm</Label></TableCell>
    			<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.5</b> KG</Label></TableCell>
    			<TableCell><Label><b>1249</b> EUR</Label></TableCell>
    		</TableRow>
    		<TableRow>
    			<TableCell><Label><b>Notebook Basic 21</b><br />HT-1005</Label></TableCell>
    			<TableCell><Label>Technocom</Label></TableCell>
    			<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
    			<TableCell><Label style={{ color: "#2b7c2b" }}><b>3.7</b> KG</Label></TableCell>
    			<TableCell><Label><b>29</b> EUR</Label></TableCell>
    		</TableRow>
    {/* playground-fold-end */}
    	</Table>
    </>
  );
}

export default App;
