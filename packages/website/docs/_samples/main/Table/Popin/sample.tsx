import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";

const Bar = createReactComponent(BarClass);
const Label = createReactComponent(LabelClass);
const SegmentedButton = createReactComponent(SegmentedButtonClass);
const SegmentedButtonItem = createReactComponent(SegmentedButtonItemClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);

function App() {

  const handleSelectionChange = (e) => {
    const selectedItem = e.detail.selectedItems[0];
	table.style.width = selectedItem.textContent;
  };

  const handleSelectionChange = (e) => {
    const selectedItem = e.detail.selectedItems[0];
	setPopinState(selectedItem.tooltip === "Hide Details");
  };

  return (
    <>
      <Bar>
    	<SegmentedButton id="sizeBtn" accessible-name="Switch Table Size">
    		<SegmentedButtonItem>25%</SegmentedButtonItem>
    		<SegmentedButtonItem>50%</SegmentedButtonItem>
    		<SegmentedButtonItem>75%</SegmentedButtonItem>
    		<SegmentedButtonItem selected={true}>100%</SegmentedButtonItem>
    	</SegmentedButton>
    	<SegmentedButton id="showHideDetailsBtn" slot="endContent" accessible-name="Show/Hide Details">
    		<SegmentedButtonItem tooltip="Show Details" icon="detail-more" />
    		<SegmentedButtonItem tooltip="Hide Details" icon="detail-less" selected={true} />
    	</SegmentedButton>
    </Bar>
    <Table id="table" overflow-mode="Popin">
    	<TableHeaderRow slot="headerRow">
    		<TableHeaderCell id="produtCol" min-width="300px"><span>Product</span></TableHeaderCell>
    		<TableHeaderCell id="supplierCol" min-width="200px">Supplier</TableHeaderCell>
    		<TableHeaderCell id="dimensionsCol" importance="-1" min-width="200px" popin-hidden={true}>Dimensions</TableHeaderCell>
    		<TableHeaderCell id="weightCol" importance="-1" min-width="100px" popin-hidden={true}>Weight</TableHeaderCell>
    		<TableHeaderCell id="priceCol" min-width="150px">Price</TableHeaderCell>
    	</TableHeaderRow>
    <!-- playground-fold -->
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
    <!-- playground-fold-end -->
    </Table>
    </>
  );
}

export default App;
