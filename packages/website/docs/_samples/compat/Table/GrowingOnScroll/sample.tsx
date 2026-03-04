import { useState, useCallback } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import TableClass from "@ui5/webcomponents-compat/dist/Table.js";
import TableRowClass from "@ui5/webcomponents-compat/dist/TableRow.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import TableCellClass from "@ui5/webcomponents-compat/dist/TableCell.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Table = createReactComponent(TableClass);
const TableRow = createReactComponent(TableRowClass);
const TableColumn = createReactComponent(TableColumnClass);
const TableCell = createReactComponent(TableCellClass);
const Text = createReactComponent(TextClass);

const ROWS_PER_LOAD = 2;

const products = [
  { name: "Notebook Basic 15", supplierName: "Very Best Screens", width: 30, depth: 18, height: 3, dimUnit: "cm", weightMeasure: 4.2, weightUnit: "KG", price: 956, currencyCode: "EUR" },
  { name: "Notebook Basic 17", supplierName: "Very Best Screens", width: 29, depth: 17, height: 3.1, dimUnit: "cm", weightMeasure: 4.5, weightUnit: "KG", price: 1249, currencyCode: "EUR" },
  { name: "Notebook Basic 18", supplierName: "Very Best Screens", width: 28, depth: 19, height: 2.5, dimUnit: "cm", weightMeasure: 4.2, weightUnit: "KG", price: 1570, currencyCode: "EUR" },
  { name: "Notebook Basic 19", supplierName: "Smartcards", width: 32, depth: 21, height: 4, dimUnit: "cm", weightMeasure: 4.2, weightUnit: "KG", price: 1650, currencyCode: "EUR" },
  { name: "ITelO Vault", supplierName: "Technocom", width: 32, depth: 22, height: 3, dimUnit: "cm", weightMeasure: 0.2, weightUnit: "KG", price: 299, currencyCode: "EUR" },
  { name: "Notebook Professional 15", supplierName: "Very Best Screens", width: 33, depth: 20, height: 3, dimUnit: "cm", weightMeasure: 4.3, weightUnit: "KG", price: 1999, currencyCode: "EUR" },
  { name: "Notebook Professional 17", supplierName: "Very Best Screens", width: 33, depth: 23, height: 2, dimUnit: "cm", weightMeasure: 4.1, weightUnit: "KG", price: 2299, currencyCode: "EUR" },
  { name: "ITelO Vault Net", supplierName: "Technocom", width: 10, depth: 1.8, height: 17, dimUnit: "cm", weightMeasure: 0.16, weightUnit: "KG", price: 459, currencyCode: "EUR" },
  { name: "ITelO Vault SAT", supplierName: "Technocom", width: 11, depth: 1.7, height: 18, dimUnit: "cm", weightMeasure: 0.18, weightUnit: "KG", price: 149, currencyCode: "EUR" },
  { name: "Comfort Easy", supplierName: "Technocom", width: 84, depth: 1.5, height: 14, dimUnit: "cm", weightMeasure: 0.2, weightUnit: "KG", price: 1679, currencyCode: "EUR" },
];

function App() {
  const [extraRows, setExtraRows] = useState<typeof products>([]);
  const [busy, setBusy] = useState(false);
  const [growing, setGrowing] = useState<string>("Scroll");

  const handleLoadMore = useCallback(() => {
    setBusy(true);

    setTimeout(() => {
      setExtraRows((prev) => {
        const sliceIndex = prev.length;
        const newProducts = products.slice(sliceIndex, sliceIndex + ROWS_PER_LOAD);
        const updated = [...prev, ...newProducts];
        if (updated.length >= products.length) {
          setGrowing("None");
        }
        return updated;
      });
      setBusy(false);
    }, 1500);
  }, []);

  return (
    <>
      <div style={{ height: "200px", overflow: "scroll" }}>
        <Table growing={growing} busy={busy} busy-delay={0} onLoadMore={handleLoadMore}>
          <TableColumn slot="columns">
            <Text>Product</Text>
          </TableColumn>
          <TableColumn slot="columns">
            <Text>Supplier</Text>
          </TableColumn>
          <TableColumn slot="columns">
            <Text>Dimensions</Text>
          </TableColumn>
          <TableColumn slot="columns">
            <Text>Weight</Text>
          </TableColumn>
          <TableColumn slot="columns">
            <Text>Price</Text>
          </TableColumn>

          <TableRow>
            <TableCell>
              <Text>Notebook Basic 15</Text>
            </TableCell>
            <TableCell>
              <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell>
              <Text>30 x 18 x 3cm</Text>
            </TableCell>
            <TableCell>
              <Text><b>4.2</b>KG</Text>
            </TableCell>
            <TableCell>
              <Text><b>956</b>EUR</Text>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Text>Notebook Basic 175</Text>
            </TableCell>
            <TableCell>
              <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell>
              <Text>29 x 17 x 3.1cm</Text>
            </TableCell>
            <TableCell>
              <Text><b>4.5</b>KG</Text>
            </TableCell>
            <TableCell>
              <Text><b>1249</b>EUR</Text>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Text>Notebook Basic 18</Text>
            </TableCell>
            <TableCell>
              <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell>
              <Text>28 x 19 x 2.5cm</Text>
            </TableCell>
            <TableCell>
              <Text><b>4.2</b>KG</Text>
            </TableCell>
            <TableCell>
              <Text><b>1570</b>EUR</Text>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Text>Notebook Basic 18</Text>
            </TableCell>
            <TableCell>
              <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell>
              <Text>28 x 19 x 2.5cm</Text>
            </TableCell>
            <TableCell>
              <Text><b>4.2</b>KG</Text>
            </TableCell>
            <TableCell>
              <Text><b>1570</b>EUR</Text>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Text>Notebook Basic 18</Text>
            </TableCell>
            <TableCell>
              <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell>
              <Text>28 x 19 x 2.5cm</Text>
            </TableCell>
            <TableCell>
              <Text><b>4.2</b>KG</Text>
            </TableCell>
            <TableCell>
              <Text><b>1570</b>EUR</Text>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Text>Notebook Basic 18</Text>
            </TableCell>
            <TableCell>
              <Text>Very Best Screens</Text>
            </TableCell>
            <TableCell>
              <Text>28 x 19 x 2.5cm</Text>
            </TableCell>
            <TableCell>
              <Text><b>4.2</b>KG</Text>
            </TableCell>
            <TableCell>
              <Text><b>1570</b>EUR</Text>
            </TableCell>
          </TableRow>

          {extraRows.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                <Text>{product.name}</Text>
              </TableCell>
              <TableCell>
                <Text>{product.supplierName}</Text>
              </TableCell>
              <TableCell>
                <Text>{product.width} x {product.depth} x {product.height}{product.dimUnit}</Text>
              </TableCell>
              <TableCell>
                <Text><b>{product.weightMeasure}</b>{product.weightUnit}</Text>
              </TableCell>
              <TableCell>
                <Text><b> {product.price}</b>{product.currencyCode}</Text>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </>
  );
}

export default App;
