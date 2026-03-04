import { useState, useRef } from "react";
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

const MAX_GROW = 3;

function App() {
  const [extraRows, setExtraRows] = useState<Array<{ key: number; name: string; code: string }>>([]);
  const [counter, setCounter] = useState(0);
  const [showGrowing, setShowGrowing] = useState(true);

  const handleGrowingLoadMore = () => {
    const baseCount = 3 + extraRows.length;
    const newRows = [];
    for (let i = 0; i < 2; i++) {
      newRows.push({
        key: baseCount + i,
        name: `Notebook Basic ${18 + baseCount + i}`,
        code: `HT-100${2 + baseCount + i}`,
      });
    }
    setExtraRows((prev) => [...prev, ...newRows]);
    const newCounter = counter + 1;
    setCounter(newCounter);
    if (newCounter >= MAX_GROW) {
      setShowGrowing(false);
    }
  };

  return (
    <>
      <Table id="table">
    			{showGrowing && <TableGrowing id="growing" mode="Button" slot="features" onLoadMore={handleGrowingLoadMore} />}
    {/* playground-fold */}
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
    			{extraRows.map((row) => (
    				<TableRow row-key={row.key} key={row.key}>
    					<TableCell><Label><b>{row.name}</b><br />{row.code}</Label></TableCell>
    					<TableCell><Label>Technocom</Label></TableCell>
    					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
    					<TableCell><Label style={{ color: "#2b7c2b" }}><b>3.7</b> KG</Label></TableCell>
    					<TableCell><Label><b>29</b> EUR</Label></TableCell>
    				</TableRow>
    			))}
    {/* playground-fold-end */}
    		</Table>
    </>
  );
}

export default App;
