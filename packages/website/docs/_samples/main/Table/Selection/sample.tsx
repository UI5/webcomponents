import { useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableSelectionClass from "@ui5/webcomponents/dist/TableSelection.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Input = createReactComponent(InputClass);
const RadioButton = createReactComponent(RadioButtonClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const TableSelection = createReactComponent(TableSelectionClass);
const Text = createReactComponent(TextClass);

function App() {
  const selectionRef = useRef(null);

  const handleSelectionGroupChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as any;
    if (selectionRef.current && target.text) {
      selectionRef.current!.selected = "";
      selectionRef.current!.mode = target.text;
    }
  };

  return (
    <>
      <div
        id="selectionGroup"
        role="radiogroup"
        onChange={handleSelectionGroupChange}
      >
        <RadioButton name="selection" text="Multiple" checked={true} />
        <RadioButton name="selection" text="Single" />
        <RadioButton name="selection" text="None" />
      </div>

      <Table id="table" accessibleNameRef="title" noDataText="No data found">
        <TableSelection ref={selectionRef} id="selection" slot="features" />
        {/* playground-fold */}
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell id="produtCol" width="300px">
            <span>Product</span>
          </TableHeaderCell>
          <TableHeaderCell id="supplierCol">Supplier</TableHeaderCell>
          <TableHeaderCell id="dimensionsCol" importance={-1} min-width="300px">
            Dimensions
          </TableHeaderCell>
          <TableHeaderCell id="weightCol" popinText="Weight">
            Weight
          </TableHeaderCell>
          <TableHeaderCell
            style={{ textAlign: "end" }}
            id="priceCol"
            min-width="220px"
          >
            Price
          </TableHeaderCell>
        </TableHeaderRow>
        <TableRow rowKey="0">
          <TableCell>
            <Text>
              <b>Notebook Basic 15</b>
              <br />
              HT-1000
            </Text>
          </TableCell>
          <TableCell>
            <Text>Very Best Screens</Text>
          </TableCell>
          <TableCell>
            <Text>30 x 18 x 3 cm</Text>
          </TableCell>
          <TableCell>
            <Text style={{ color: "#2b7c2b" }}>
              <b>4.2</b> KG
            </Text>
          </TableCell>
          <TableCell style={{ textAlign: "end" }}>
            <Text style={{ textAlign: "end" }}>
              <b>956</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="1">
          <TableCell>
            <Text>
              <b>Notebook Basic 17</b>
              <br />
              HT-1001
            </Text>
          </TableCell>
          <TableCell>
            <Text>Smartcards</Text>
          </TableCell>
          <TableCell>
            <Input value="29 x 17 x 3.1 cm" accessibleNameRef="dimensionsCol" />
          </TableCell>
          <TableCell>
            <Text style={{ color: "#2b7c2b" }}>
              <b>4.5</b> KG
            </Text>
          </TableCell>
          <TableCell style={{ textAlign: "end" }}>
            <Text style={{ textAlign: "end" }}>
              <b>1249</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="2">
          <TableCell>
            <Text>
              <b>Notebook Basic 18</b>
              <br />
              HT-1002
            </Text>
          </TableCell>
          <TableCell>
            <Text>Technocom</Text>
          </TableCell>
          <TableCell>
            <Text>32 x 21 x 4 cm</Text>
          </TableCell>
          <TableCell>
            <Text style={{ color: "#2b7c2b" }}>
              <b>3.7</b> KG
            </Text>
          </TableCell>
          <TableCell style={{ textAlign: "end" }}>
            <Text style={{ textAlign: "end" }}>
              <b>29</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        {/* playground-fold-end */}
      </Table>
    </>
  );
}

export default App;
