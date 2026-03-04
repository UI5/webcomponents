import { useState, useEffect, useCallback, useRef } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableVirtualizerClass from "@ui5/webcomponents/dist/TableVirtualizer.js";
import TableSelectionClass from "@ui5/webcomponents/dist/TableSelection.js";

const Table = createReactComponent(TableClass);
const TableRow = createReactComponent(TableRowClass);
const TableCell = createReactComponent(TableCellClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableVirtualizer = createReactComponent(TableVirtualizerClass);
const TableSelection = createReactComponent(TableSelectionClass);

interface Product {
  key: string;
  name: string;
  height: string;
  weight: string;
  price: string;
}

const productCache: Record<number, Product> = {};

function fetchProduct(index: number): Promise<Product> {
  if (productCache[index]) {
    return Promise.resolve(productCache[index]);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = {
        key: `P${index}`,
        name: `Product ${index}`,
        height: `${(Math.random() * 100).toFixed(0)} cm`,
        weight: `${(Math.random() * 100).toFixed(1)} KG`,
        price: `${(Math.random() * 1000).toFixed(2)} EUR`,
      };
      productCache[index] = product;
      resolve(product);
    }, Math.random() * 10);
  });
}

async function fetchProducts(first: number, last: number): Promise<Product[]> {
  const products: Product[] = [];
  for (let i = first; i < last; i++) {
    const product = await fetchProduct(i);
    products.push(product);
  }
  return products;
}

function App() {
  const [rows, setRows] = useState<Array<{ position: number; product: Product }>>([]);
  const virtualizerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (virtualizerRef.current && (virtualizerRef.current as any).reset) {
      requestAnimationFrame(() => (virtualizerRef.current as any).reset());
    }
  }, []);

  const handleRangeChange = useCallback(async (e: CustomEvent) => {
    const { first, last } = e.detail;
    const products = await fetchProducts(first, last);
    const newRows = products.map((product, index) => ({
      position: first + index,
      product,
    }));
    setRows(newRows);
  }, []);

  return (
    <>
      <Table id="table" loading-delay={100} style={{ height: "150px" }} className="ui5-content-density-compact">
        <TableVirtualizer id="virtualizer" slot="features" row-count={1000} row-height={32} ref={virtualizerRef} onRangeChange={handleRangeChange} />
      {/* playground-fold */}
        <TableSelection slot="features" />
        <TableHeaderRow slot="headerRow" sticky={true}>
          <TableHeaderCell min-width="150px">Product Name</TableHeaderCell>
          <TableHeaderCell>Dimensions</TableHeaderCell>
          <TableHeaderCell>Weight</TableHeaderCell>
          <TableHeaderCell horizontal-align="Right">Price</TableHeaderCell>
        </TableHeaderRow>
      {/* playground-fold-end */}
        {rows.map((row) => (
          <TableRow key={row.product.key} position={row.position} row-key={row.product.key}>
            <TableCell>{row.product.name}</TableCell>
            <TableCell>{row.product.height}</TableCell>
            <TableCell>{row.product.weight}</TableCell>
            <TableCell>{row.product.price}</TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  );
}

export default App;
