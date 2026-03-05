import { useState, useCallback } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CompatTableClass from "@ui5/webcomponents-compat/dist/Table.js";
import CompatTableRowClass from "@ui5/webcomponents-compat/dist/TableRow.js";
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import CompatTableCellClass from "@ui5/webcomponents-compat/dist/TableCell.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const CompatTable = createComponent(CompatTableClass);
const CompatTableRow = createComponent(CompatTableRowClass);
const CompatTableColumn = createComponent(TableColumnClass);
const CompatTableCell = createComponent(CompatTableCellClass);
const Text = createComponent(TextClass);

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

const ROWS_PER_LOAD = 2;

function App() {
  const [visibleCount, setVisibleCount] = useState(2);
  const [busy, setBusy] = useState(false);

  const handleLoadMore = useCallback(() => {
    setBusy(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ROWS_PER_LOAD, products.length));
      setBusy(false);
    }, 1500);
  }, []);

  const growing = visibleCount >= products.length ? "None" : "Scroll";

  return (
    <div style={{ height: "200px", overflow: "scroll" }}>
      <CompatTable
        growing={growing}
        busyDelay="0"
        busy={busy}
        onLoadMore={handleLoadMore}
      >
        <CompatTableColumn slot="columns"><Text>Product</Text></CompatTableColumn>
        <CompatTableColumn slot="columns"><Text>Supplier</Text></CompatTableColumn>
        <CompatTableColumn slot="columns"><Text>Dimensions</Text></CompatTableColumn>
        <CompatTableColumn slot="columns"><Text>Weight</Text></CompatTableColumn>
        <CompatTableColumn slot="columns"><Text>Price</Text></CompatTableColumn>

        {products.slice(0, visibleCount).map((p, i) => (
          <CompatTableRow key={i}>
            <CompatTableCell><Text>{p.name}</Text></CompatTableCell>
            <CompatTableCell><Text>{p.supplierName}</Text></CompatTableCell>
            <CompatTableCell><Text>{p.width} x {p.depth} x {p.height}{p.dimUnit}</Text></CompatTableCell>
            <CompatTableCell><Text><b>{p.weightMeasure}</b>{p.weightUnit}</Text></CompatTableCell>
            <CompatTableCell><Text><b>{p.price}</b>{p.currencyCode}</Text></CompatTableCell>
          </CompatTableRow>
        ))}
      </CompatTable>
    </div>
  );
}

export default App;
