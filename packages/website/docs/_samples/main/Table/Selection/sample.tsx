import { useRef } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableSelectionClass from "@ui5/webcomponents/dist/TableSelection.js";

const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const RadioButton = createReactComponent(RadioButtonClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const TableSelection = createReactComponent(TableSelectionClass);

function App() {
  const selectionRef = useRef(null);

  const handleSelectionGroupChange = (e) => {
    if (selectionRef.current) {
      selectionRef.current.selected = "";
      selectionRef.current.mode = e.target.text;
    }
  };

  return (
    <>
      <div id="selectionGroup" role="radiogroup" onChange={handleSelectionGroupChange}>
    			<RadioButton name="selection" text="Multiple" checked={true} />
    			<RadioButton name="selection" text="Single" />
    			<RadioButton name="selection" text="None" />
    		</div>

    		<Table id="table" accessible-name-ref="title" no-data-text="No data found">
    			<TableSelection ref={selectionRef} id="selection" slot="features" />
    {/* playground-fold */}
    			<TableHeaderRow slot="headerRow">
    				<TableHeaderCell id="produtCol" width="300px"><span>Product</span></TableHeaderCell>
    				<TableHeaderCell id="supplierCol">Supplier</TableHeaderCell>
    				<TableHeaderCell id="dimensionsCol" importance="-1" min-width="300px">Dimensions</TableHeaderCell>
    				<TableHeaderCell id="weightCol" popin-text="Weight">Weight</TableHeaderCell>
    				<TableHeaderCell style={{ textAlign: "end" }} id="priceCol" min-width="220px">Price</TableHeaderCell>
    			</TableHeaderRow>
    			<TableRow row-key={0}>
    				<TableCell><Label><b>Notebook Basic 15</b><br />HT-1000</Label></TableCell>
    				<TableCell><Label>Very Best Screens</Label></TableCell>
    				<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
    				<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.2</b> KG</Label></TableCell>
    				<TableCell style={{ textAlign: "end" }}><Label style={{ textAlign: "end" }}><b>956</b> EUR</Label></TableCell>
    			</TableRow>
    			<TableRow row-key={1}>
    				<TableCell><Label><b>Notebook Basic 17</b><br />HT-1001</Label></TableCell>
    				<TableCell><Label>Smartcards</Label></TableCell>
    				<TableCell><Input value="29 x 17 x 3.1 cm" accessible-name-ref="dimensionsCol" /></TableCell>
    				<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.5</b> KG</Label></TableCell>
    				<TableCell style={{ textAlign: "end" }}><Label style={{ textAlign: "end" }}><b>1249</b> EUR</Label></TableCell>
    			</TableRow>
    			<TableRow row-key={2}>
    				<TableCell><Label><b>Notebook Basic 18</b><br />HT-1002</Label></TableCell>
    				<TableCell><Label>Technocom</Label></TableCell>
    				<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
    				<TableCell><Label style={{ color: "#2b7c2b" }}><b>3.7</b> KG</Label></TableCell>
    				<TableCell style={{ textAlign: "end" }}><Label style={{ textAlign: "end" }}><b>29</b> EUR</Label></TableCell>
    			</TableRow>
    {/* playground-fold-end */}
    		</Table>
    </>
  );
}

export default App;
