import { useRef, useEffect } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/TableHeaderCellActionAI.js";
import TableHeaderCellActionAIClass from "@ui5/webcomponents/dist/TableHeaderCellActionAI.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";

const Label = createReactComponent(LabelClass);
const Popover = createReactComponent(PopoverClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const Text = createReactComponent(TextClass);
const TableHeaderCellActionAI = createReactComponent(TableHeaderCellActionAIClass);
const Table = createReactComponent(TableClass);

function App() {
  const popoverRef = useRef(null);
  const aiActionProductRef = useRef(null);
  const aiActionPriceRef = useRef(null);

  useEffect(() => {
    const showGeneratedByAIPopover = (e: CustomEvent) => {
      const popover = popoverRef.current;
      if (popover) {
        popover.opener = e.detail.targetRef;
        popover.open = true;
      }
    };

    const productAction = aiActionProductRef.current;
    const priceAction = aiActionPriceRef.current;

    if (productAction) {
      productAction.addEventListener("click", showGeneratedByAIPopover);
    }
    if (priceAction) {
      priceAction.addEventListener("click", showGeneratedByAIPopover);
    }

    return () => {
      if (productAction) {
        productAction.removeEventListener("click", showGeneratedByAIPopover);
      }
      if (priceAction) {
        priceAction.removeEventListener("click", showGeneratedByAIPopover);
      }
    };
  }, []);

  return (
    <>
      <Table id="table" overflowMode="Popin">
        <TableHeaderRow slot="headerRow">
          <TableHeaderCell id="produtCol" width="200px">
            <Label required={true}>Product</Label>
            <TableHeaderCellActionAI
              slot="action"
              id="aiActionProduct"
              ref={aiActionProductRef}
            ></TableHeaderCellActionAI>
          </TableHeaderCell>
          <TableHeaderCell id="supplierCol">Supplier</TableHeaderCell>
          <TableHeaderCell id="dimensionsCol" importance={-1}>
            Dimensions
          </TableHeaderCell>
          <TableHeaderCell id="weightCol" popinText="Weight">
            Weight
          </TableHeaderCell>
          <TableHeaderCell
            id="priceCol"
            min-width="100px"
            horizontalAlign="End"
            popinText="Price in Popin"
            sortIndicator="Descending"
          >
            <Label>Price</Label>
            <TableHeaderCellActionAI
              slot="action"
              id="aiActionPrice"
              ref={aiActionPriceRef}
            ></TableHeaderCellActionAI>
          </TableHeaderCell>
        </TableHeaderRow>
        <TableRow rowKey="0">
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
            <Text>29 x 17 x 3.1 cm</Text>
          </TableCell>
          <TableCell>
            <Text style={{ color: "#2b7c2b" }}>
              <b>4.5</b> KG
            </Text>
          </TableCell>
          <TableCell>
            <Text>
              <b>1249</b> EUR
            </Text>
          </TableCell>
        </TableRow>
        <TableRow rowKey="1">
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
          <TableCell>
            <Text>
              <b>956</b> EUR
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
          <TableCell>
            <Text>
              <b>290</b> EUR
            </Text>
          </TableCell>
        </TableRow>
      </Table>
      <Popover
        ref={popoverRef}
        style={{ width: "25rem" }}
        id="generatedByAIPopover"
      >
        <Text>
          This content was partially or fully generated by artificial
          intelligence (AI) technologies.
          <br />
          <br />
          The AI-generated content may contain inaccuracies due to using
          multiple information sources. Verify results before use.
        </Text>
      </Popover>
    </>
  );
}

export default App;
