import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Bar = createReactComponent(BarClass);
const Table = createReactComponent(TableClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableRow = createReactComponent(TableRowClass);
const Title = createReactComponent(TitleClass);
const Text = createReactComponent(TextClass);

function App() {
  return (
    <>
      <div style={{ height: "150px", overflow: "auto" }}>
        <Bar
          style={{ position: "sticky", top: 0, zIndex: 2, height: "50px" }}
          id="toolbar"
          design="Header"
          accessible-name-ref="title"
        >
          <Title tabIndex={0} level="H3" id="title" slot="startContent">
            My Sticky Toolbar
          </Title>
        </Bar>
        <Table style={{ height: "100px" }} id="table">
          <TableHeaderRow slot="headerRow" sticky={true}>
            <TableHeaderCell id="produtCol">
              <span>Product</span>
            </TableHeaderCell>
            <TableHeaderCell id="supplierCol">Supplier</TableHeaderCell>
            <TableHeaderCell id="dimensionsCol">Dimensions</TableHeaderCell>
            <TableHeaderCell id="weightCol">Weight</TableHeaderCell>
            <TableHeaderCell style={{ textAlign: "end" }} id="priceCol">
              Price
            </TableHeaderCell>
          </TableHeaderRow>
          {/* playground-fold */}
          <TableRow>
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
          <TableRow>
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
          <TableRow>
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
                <b>29</b> EUR
              </Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>
                <b>Notebook Basic 19</b>
                <br />
                HT-1003
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
          <TableRow>
            <TableCell>
              <Text>
                <b>Notebook Basic 20</b>
                <br />
                HT-1004
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
          <TableRow>
            <TableCell>
              <Text>
                <b>Notebook Basic 21</b>
                <br />
                HT-1005
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
                <b>29</b> EUR
              </Text>
            </TableCell>
          </TableRow>
          {/* playground-fold-end */}
        </Table>
      </div>
    </>
  );
}

export default App;
