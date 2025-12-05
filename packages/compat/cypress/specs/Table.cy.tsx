import Label from "@ui5/webcomponents/dist/Label.js";
import Table from "../../src/Table.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableColumn from "../../src/TableColumn.js";
// @ts-ignore
import prodcuts from "./utils/products.json";

function SimpleTable({ style, accessibleName, accessibleNameRef }: {
	style?: Record<string, any>,
	accessibleName?: Table["accessibleName"],
	accessibleNameRef?: Table["accessibleNameRef"]
}) {
	return <Table style={style} accessibleName={accessibleName} accessibleNameRef={accessibleNameRef} onPopinChange={cy.stub().as("popinChange")}>
		{/* <!-- Columns --> */}
		<TableColumn slot="columns" style={{ width: "350px" }}>
			Product
		</TableColumn>

		<TableColumn minWidth={800} slot="columns" popinText="Supplier">
			Supplier
		</TableColumn>

		<TableColumn slot="columns" minWidth={600} popinText="Dimensions" demandPopin popinDisplay="Inline">
			Dimensions
		</TableColumn>

		<TableColumn slot="columns" minWidth={600} popinText="Weight" demandPopin>
			Weight
		</TableColumn>

		<TableColumn slot="columns">
			Price
		</TableColumn>

		{
			Array.from({ length: 4 }).map((_, index) => (
				<TableRow id={`row-${index}`} key={index}>
					<TableCell><span>{prodcuts.ProductCollection[index].Name} / {prodcuts.ProductCollection[index].ProductId}</span></TableCell>
					<TableCell><span>{prodcuts.ProductCollection[index].SupplierName}</span></TableCell>
					<TableCell><span>{prodcuts.ProductCollection[index].Width} x {prodcuts.ProductCollection[index].Depth} x {prodcuts.ProductCollection[index].Height} {prodcuts.ProductCollection[index].DimUnit}</span></TableCell>
					<TableCell><span>{prodcuts.ProductCollection[index].WeightMeasure} {prodcuts.ProductCollection[index].WeightUnit}</span></TableCell>
					<TableCell><span>{prodcuts.ProductCollection[index].Price} {prodcuts.ProductCollection[index].CurrencyCode}</span></TableCell>
				</TableRow>))
		}
	</Table>
}

function SingleSelectTable() {
	return <Table mode="SingleSelect" id="single" onRowClick={cy.stub().as("rowClick")} onSelectionChange={cy.stub().as("selectionChange")}>
		<TableColumn slot="columns">
			<span>Product</span>
		</TableColumn>
		<TableColumn slot="columns" minWidth={600} demandPopin>
			<span>Supplier</span>
		</TableColumn>
		<TableColumn slot="columns" minWidth={600} demandPopin>
			<span>Dimensions</span>
		</TableColumn>
		<TableColumn slot="columns">
			<span>Weight</span>
		</TableColumn>
		<TableColumn slot="columns">
			<span>Price</span>
		</TableColumn>
		<TableColumn slot="columns">
			<span>Row Type</span>
		</TableColumn>

		<TableRow type="Active" id="firstRowSingleSelect">
			<TableCell>
				<span id="firstCellFirstRowSSLabel">Notebook Basic 15</span>
			</TableCell>
			<TableCell>
				<span>Very Best Screens</span>
			</TableCell>
			<TableCell>
				<span>30 x 18 x 3 cm</span>
			</TableCell>
			<TableCell>
				<span>4.2 KG</span>
			</TableCell>
			<TableCell>
				<span>956 EUR</span>
			</TableCell>
			<TableCell>
				<button id="button1">Active</button>
			</TableCell>
		</TableRow>

		<TableRow type="Active" id="secondRowSingleSelect">
			<TableCell>
				<span>Notebook Basic 17</span>
			</TableCell>
			<TableCell>
				<span>Very Best Screens</span>
			</TableCell>
			<TableCell>
				<span>29 x 17 x 3.1 cm</span>
			</TableCell>
			<TableCell>
				<span>4.5 KG</span>
			</TableCell>
			<TableCell>
				<span>1249 EUR</span>
			</TableCell>
			<TableCell>
				<button>Active</button>
			</TableCell>
		</TableRow>

		<TableRow type="Inactive" id="thirdRowSingleSelect">
			<TableCell>
				<span id="firstCellThirdRowSSLabel">Notebook Basic 18</span>
			</TableCell>
			<TableCell>
				<span>Very Best Screens</span>
			</TableCell>
			<TableCell>
				<span>28 x 19 x 2.5 cm</span>
			</TableCell>
			<TableCell>
				<span>4.2 KG</span>
			</TableCell>
			<TableCell>
				<span>1570 EUR</span>
			</TableCell>
			<TableCell>
				<button>Inactive</button>
			</TableCell>
		</TableRow>

		<TableRow id="forthRowSingleSelect">
			<TableCell>
				<span>Notebook Basic 19</span>
			</TableCell>
			<TableCell>
				<span>Smartcards</span>
			</TableCell>
			<TableCell>
				<span>32 x 21 x 4 cm</span>
			</TableCell>
			<TableCell>
				<span>4.2 KG</span>
			</TableCell>
			<TableCell>
				<span>1650 EUR</span>
			</TableCell>
			<TableCell>
				<button>Inactive</button>
			</TableCell>
		</TableRow>
	</Table>
}

function MultiSelectTable() {
	return <Table id="multi" mode="MultiSelect" stickyColumnHeader onRowClick={cy.stub().as("rowClick")} onSelectionChange={cy.stub().as("selectionChange")}>
		<TableColumn slot="columns">
			<span>Product</span>
		</TableColumn>
		<TableColumn slot="columns">
			<span>Supplier</span>
		</TableColumn>
		<TableColumn slot="columns">
			<span>Dimensions</span>
		</TableColumn>
		<TableColumn slot="columns" minWidth={600} demandPopin>
			<span>Weight</span>
		</TableColumn>
		<TableColumn slot="columns" minWidth={600} demandPopin>
			<span>Price</span>
		</TableColumn>
		<TableColumn slot="columns">
			<span>Row Type</span>
		</TableColumn>

		<TableRow type="Active" id="firstRowMultiSelect">
			<TableCell>
				<span id="firstCellFirstRowMSLabel">Notebook Basic 15</span>
			</TableCell>
			<TableCell>
				<span>Very Best Screens</span>
			</TableCell>
			<TableCell>
				<span>30 x 18 x 3 cm</span>
			</TableCell>
			<TableCell>
				<span>4.2 KG</span>
			</TableCell>
			<TableCell>
				<span>956 EUR</span>
			</TableCell>
			<TableCell>
				<button id="button2">Active</button>
			</TableCell>
		</TableRow>

		<TableRow type="Active" id="secondRowMultiSelect">
			<TableCell>
				<span>Notebook Basic 17</span>
			</TableCell>
			<TableCell>
				<span>Very Best Screens</span>
			</TableCell>
			<TableCell>
				<span>29 x 17 x 3.1 cm</span>
			</TableCell>
			<TableCell>
				<span>4.5 KG</span>
			</TableCell>
			<TableCell>
				<span>1249 EUR</span>
			</TableCell>
			<TableCell>
				<button id="button3">Active</button>
			</TableCell>
		</TableRow>

		<TableRow type="Inactive" id="thirdRowMultiSelect">
			<TableCell>
				<span id="firstCellThirdRowMSLabel">Notebook Basic 18</span>
			</TableCell>
			<TableCell>
				<span>Very Best Screens</span>
			</TableCell>
			<TableCell>
				<span>28 x 19 x 2.5 cm</span>
			</TableCell>
			<TableCell>
				<span>4.2 KG</span>
			</TableCell>
			<TableCell>
				<span>1570 EUR</span>
			</TableCell>
			<TableCell>
				<button>Inactive</button>
			</TableCell>
		</TableRow>

		<TableRow id="forthRowMultiSelect">
			<TableCell>
				<span>Notebook Basic 19</span>
			</TableCell>
			<TableCell>
				<span>Smartcards</span>
			</TableCell>
			<TableCell>
				<span>32 x 21 x 4 cm</span>
			</TableCell>
			<TableCell>
				<span>4.2 KG</span>
			</TableCell>
			<TableCell>
				<span>1650 EUR</span>
			</TableCell>
			<TableCell>
				<button>Inactive</button>
			</TableCell>
		</TableRow>
	</Table>
}

describe("Table general interaction", () => {
	it("tests doesn't fire loadMore with ArrowDown on last row", () => {
		cy.mount(
			<Table>
				<TableColumn slot="columns" minWidth={350}>
					<Label>Product</Label>
				</TableColumn>

				<TableColumn slot="columns" minWidth={800} popinText="Supplier">
					<Label>Supplier</Label>
				</TableColumn>

				<TableColumn slot="columns" minWidth={600} popinText="Dimensions" demandPopin>
					<Label>Dimensions</Label>
				</TableColumn>

				<TableRow>
					<TableCell>
						<Label>Product 1</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 1</Label>
					</TableCell>
					<TableCell>
						<Label>10x20x30</Label>
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell>
						<Label>Product 2</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 2</Label>
					</TableCell>
					<TableCell>
						<Label>15x25x35</Label>
					</TableCell>
				</TableRow>

				<TableRow id="row-3">
					<TableCell>
						<Label>Product 3</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 3</Label>
					</TableCell>
					<TableCell>
						<Label>20x30x40</Label>
					</TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.then(table => table.get(0).addEventListener("load-more", cy.stub().as("loadMore")));

		cy.get("#row-3")
			.shadow()
			.find(".ui5-table-row-root")
			.as("lastRow")

		cy.get("@lastRow")
			.realClick();

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("@lastRow")
			.realPress("ArrowDown");

		cy.get("@loadMore")
			.should("not.have.been.calledOnce");
	});

	it("tests fire loadMore with ArrowDown on last row", () => {
		cy.mount(
			<Table growing="Scroll">
				<TableColumn slot="columns" minWidth={350}>
					<Label>Product</Label>
				</TableColumn>

				<TableColumn slot="columns" minWidth={800} popinText="Supplier">
					<Label>Supplier</Label>
				</TableColumn>

				<TableColumn slot="columns" minWidth={600} popinText="Dimensions" demandPopin>
					<Label>Dimensions</Label>
				</TableColumn>

				<TableRow>
					<TableCell>
						<Label>Product 1</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 1</Label>
					</TableCell>
					<TableCell>
						<Label>10x20x30</Label>
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell>
						<Label>Product 2</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 2</Label>
					</TableCell>
					<TableCell>
						<Label>15x25x35</Label>
					</TableCell>
				</TableRow>

				<TableRow id="row-3">
					<TableCell>
						<Label>Product 3</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 3</Label>
					</TableCell>
					<TableCell>
						<Label>20x30x40</Label>
					</TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.then(tableGrowing => tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore")));

		cy.get("#row-3")
			.shadow()
			.find(".ui5-table-row-root")
			.as("lastRow")

		cy.get("@lastRow")
			.realClick();

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("@lastRow")
			.realPress("ArrowDown");

		cy.get("@loadMore")
			.should("have.been.calledOnce");
	});

	it("tests if column disapears when min-width is reacted (650px)", () => {
		cy.mount(<SimpleTable style={{ width: "650px" }} />);

		cy.get("[ui5-table]")
			.shadow()
			.find("thead")
			.find("tr")
			.find("slot")
			.as("columnsSlot");

		cy.get("@columnsSlot")
			.should("have.length", 4);

		cy.get("[ui5-table-row]")
			.eq(0)
			.shadow()
			.find(".ui5-table-popin-row")
			.should("not.exist");
	});

	it("tests if column popins when min-width is reacted (500px)", () => {
		cy.mount(<SimpleTable style={{ width: "500px" }} />);

		cy.get("[ui5-table]")
			.shadow()
			.find("thead")
			.find("tr")
			.find("slot")
			.as("columnsSlot");

		cy.get("@columnsSlot")
			.should("have.length", 2);

		cy.get("[ui5-table-row]")
			.eq(0)
			.shadow()
			.find(".ui5-table-popin-row")
			.should("have.length", 2);
	});

	it("tests header's row aria-label value", () => {
		const EXPECTED_TEXT = "Header Row 1 of 5 Product Supplier Dimensions Weight Price";

		cy.mount(<SimpleTable />);

		cy.get("[ui5-table]")
			.shadow()
			.find(".ui5-table-header-row")
			.should("have.attr", "aria-label", EXPECTED_TEXT);
	});

	it("tests if noData div is displayed for empty table", () => {
		cy.mount(
			<Table noDataText="No Data" busy>
				<TableColumn slot="columns">
					Product
				</TableColumn>
				<TableColumn slot="columns">
					Supplier
				</TableColumn>
			</Table>

		)

		cy.get("[ui5-table]")
			.shadow()
			.find("div.ui5-table-no-data-row")
			.should("exist");
	});

	it("tests if popinChange is fired when min-width is reacted (500px)", () => {
		cy.mount(<SimpleTable />);

		cy.wait(200);

		// @ts-ignore
		cy.get("@popinChange").then(stub => stub.resetHistory())

		cy.get("@popinChange").should("not.have.been.called");

		cy.get("[ui5-table]")
			.then($table => {
				$table.width("500px");
			})

		cy.get("@popinChange")
			.should(stub => {
				expect(stub).to.have.been.calledOnce;
				// @ts-ignore
				expect(stub.args.slice(-1)[0][0].detail.poppedColumns.length).to.equal(4);
			})

		cy.get("[ui5-table]")
			.then($table => {
				$table.width("650px");
			})

		cy.get("@popinChange")
			.should(stub => {
				expect(stub).to.have.been.calledTwice;
				debugger
				// @ts-ignore
				expect(stub.args.slice(-1)[0][0].detail.poppedColumns.length).to.equal(2);
			})
	});

	it("tests row-click is fired", () => {
		cy.mount(<Table id="testRowClick" onRowClick={cy.stub().as("rowClick")}>
			<TableColumn id="column-1" slot="columns">
				City
			</TableColumn>

			<TableColumn id="column-2" slot="columns" minWidth={500} popinText="Supplier">
				Supplier
			</TableColumn>

			<TableColumn id="column-3" slot="columns" minWidth={500} popinText="Country" demandPopin>
				Country
			</TableColumn>

			<TableRow type="Active" data-city="Dublin" id="test1">
				<TableCell>Dublin</TableCell>
				<TableCell>J.M. Brothers</TableCell>
				<TableCell>USA</TableCell>
			</TableRow>
			<TableRow type="Active" data-city="London">
				<TableCell>London</TableCell>
				<TableCell>J.M. Brothers</TableCell>
				<TableCell>USA</TableCell>
			</TableRow>
		</Table>)

		cy.get("[ui5-table-row]")
			.eq(0)
			.find("[ui5-table-cell]")
			.realClick();

		cy.get("[ui5-table-row]")
			.eq(0)
			.should("be.focused");

		cy.get("@rowClick")
			.should(stub => {
				expect(stub).to.have.been.calledOnce;
				// @ts-ignore
				expect(stub.args.slice(-1)[0][0].detail.row.getAttribute("data-city")).to.equal("Dublin");
			});

		cy.realPress("Space");

		cy.get("@rowClick")
			.should(stub => {
				expect(stub).to.have.been.calledOnce;
				// @ts-ignore
				expect(stub.args.slice(-1)[0][0].detail.row.getAttribute("data-city")).to.equal("Dublin");
			});


		cy.get("[ui5-table-row]")
			.eq(1)
			.find("[ui5-table-cell]")
			.realClick();

		cy.get("@rowClick")
			.should(stub => {
				expect(stub).to.have.been.calledTwice;
				// @ts-ignore
				expect(stub.args.slice(-1)[0][0].detail.row.getAttribute("data-city")).to.equal("London");
			});

		cy.get("[ui5-table-row]")
			.eq(1)
			.should("be.focused");

		cy.realPress("Enter");

		cy.get("@rowClick")
			.should(stub => {
				expect(stub).to.have.been.calledThrice;
				// @ts-ignore
				expect(stub.args[2][0].detail.row.getAttribute("data-city")).to.equal("London");
			});
	});

	it("tests row aria-label value", () => {
		const EXPECTED_TEXT = "Product Notebook Basic 15 / HT-1000 Supplier Very Best Screens Dimensions 30 x 18 x 3 cm Weight 4.2 KG Price 956 EUR. 2 of 5";

		cy.mount(<SimpleTable />);

		cy.get("#row-0")
			.shadow()
			.find(".ui5-table-row-root")
			.should("have.attr", "aria-label", EXPECTED_TEXT);
	});

	it("tests selectable row aria-label value", () => {
		const EXPECTED_TEXT = "Product Notebook Basic 15 Supplier Very Best Screens. 2 of 3. Not Selected";
		const SELECTED_EXPECTED_TEXT = "Product Notebook Basic 17 Supplier Very Best Screens. 3 of 3. Selected";
		cy.mount(
			<Table mode="SingleSelect" id="single">
				<TableColumn slot="columns">
					Product
				</TableColumn>
				<TableColumn slot="columns">
					Supplier
				</TableColumn>

				<TableRow type="Active">
					<TableCell>
						<span>Notebook Basic 15</span>
					</TableCell>
					<TableCell>
						<span>Very Best Screens</span>
					</TableCell>
				</TableRow>

				<TableRow type="Active" selected>
					<TableCell>
						<span>Notebook Basic 17</span>
					</TableCell>
					<TableCell>
						<span>Very Best Screens</span>
					</TableCell>
				</TableRow>

			</Table>
		)

		cy.get("[ui5-table-row]")
			.eq(0)
			.shadow()
			.find(".ui5-table-row-root")
			.should("have.attr", "aria-label", EXPECTED_TEXT);

		cy.get("[ui5-table-row]")
			.eq(1)
			.shadow()
			.find(".ui5-table-row-root")
			.should("have.attr", "aria-label", SELECTED_EXPECTED_TEXT);
	});

	describe("Accessibility", () => {
		it("Should apply aria-label from the accessibleNameRef property", () => {
			const EXPECTED_TEXT = "Test products table";
			cy.mount(<>
				<span id="test">{EXPECTED_TEXT}</span>
				<SimpleTable accessibleNameRef="test" />
			</>)

			cy.get("[ui5-table]")
				.shadow()
				.find("table")
				.should("have.attr", "aria-label", EXPECTED_TEXT);
		})

		it("Should apply aria-label from the accessibleName property", () => {
			const EXPECTED_LABEL = "Table label";
			cy.mount(<SimpleTable accessibleName={EXPECTED_LABEL} />);

			cy.get("[ui5-table]")
				.shadow()
				.find("table")
				.should("have.attr", "aria-label", EXPECTED_LABEL);
		});

		it("Should announce empty cell in a row", () => {
			const EXPECTED_TEXT = "City Empty Supplier J.M. Brothers. 2 of 2";

			cy.mount(
				<Table>
					<TableColumn slot="columns">
						<span>City</span>
					</TableColumn>

					<TableColumn slot="columns">
						<span>Supplier</span>
					</TableColumn>

					<TableRow>
						<TableCell></TableCell>
						<TableCell><span>J.M. Brothers</span></TableCell>
					</TableRow>
				</Table>
			)

			cy.get("[ui5-table-row]")
				.shadow()
				.find(".ui5-table-row-root")
				.should("have.attr", "aria-label", EXPECTED_TEXT);
		});

		describe("Keyboard handling when popin", () => {
			beforeEach(() => {
				cy.viewport(500, 1200);
			})

			it("Should have correct focus handling when having popin rows", () => {
				cy.mount(
					<>
						<button>Before</button>
						<Table>
							<TableColumn slot="columns">
								<span>Product</span>
							</TableColumn>
							<TableColumn slot="columns" minWidth={1024} popinText="Supplier" demandPopin>
								<span>Supplier</span>
							</TableColumn>
							<TableColumn slot="columns" minWidth={800} popinText="Dimensions" demandPopin>
								<span>Dimensions</span>
							</TableColumn>

							<TableRow>
								<TableCell>Notebook Basic 15</TableCell>
								<TableCell><button>Focused</button></TableCell>
								<TableCell>30 x 18 x 3 cm</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Notebook Basic 19</TableCell>
								<TableCell><button>Focused</button></TableCell>
								<TableCell>50 x 18 x 3 cm</TableCell>
							</TableRow>
						</Table>
						<button>After</button>
					</>
				)

				cy.get("button").contains("Before").realClick();

				cy.get("button").contains("Before").should("be.focused");

				cy.realPress("Tab");
				cy.realPress("Tab");

				cy.get("button").contains("Focused").eq(0).should("be.focused");

				cy.realPress("Tab");

				cy.get("button").contains("After").should("be.focused");
			});

			it("Should have correct focus handling when having popin rows", () => {
				cy.mount(<>
					<Table class="demo-table" id="tbl2" mode="SingleSelect">
						<TableColumn slot="columns" style="width: 12rem">
							<span>Product</span>
						</TableColumn>
						<TableColumn slot="columns" minWidth={800} popinText="Supplier">
							<span>Supplier</span>
						</TableColumn>
						<TableColumn slot="columns" demandPopin minWidth={600} popinText="Dimensions">
							<span>Dimensions</span>
						</TableColumn>
						<TableColumn slot="columns" demandPopin minWidth={600} popinText="Weight">
							<span>Weight</span>
						</TableColumn>
						<TableColumn slot="columns">
							<span></span>
						</TableColumn>

						<TableRow>
							<TableCell>
								<input value="first" />
							</TableCell>
							<TableCell>
								<input value="hidden" />
							</TableCell>
							<TableCell>
								<input value="second" />
							</TableCell>
							<TableCell>
								<input value="third" />
							</TableCell>
							<TableCell>
								<button>Delete</button>
							</TableCell>
						</TableRow>
					</Table>
				</>)

				cy.get("[ui5-table-row]")
					.find("input")
					.eq(0)
					.realClick();

				cy.get("[ui5-table-row]")
					.find("input")
					.eq(0)
					.should("be.focused")
					.and("have.value", "first");

				cy.realPress("Tab");

				cy.get("[ui5-table-row]")
					.find("button")
					.contains("Delete")
					.should("be.focused");

				cy.realPress("Tab");

				cy.get("[ui5-table-row]")
					.find("input")
					.eq(2)
					.should("be.focused")
					.and("have.value", "second");
			});
		});
	});

	describe("Growing Table on 'More' button press", () => {
		it("tests the 'load-more' event", () => {
			cy.mount(
				<Table id="tbl" growing="Button" onLoadMore={cy.stub().as("loadMore")}>
					<TableColumn id="column-1" slot="columns" style={{ width: "350px" }}>
						<span>Product</span>
					</TableColumn>

					<TableColumn id="column-2" slot="columns" minWidth={800} popinText="Supplier">
						<span>Supplier</span>
					</TableColumn>

					<TableColumn id="column-3" slot="columns" minWidth={600} popinText="Dimensions" demandPopin>
						<span>Dimensions</span>
					</TableColumn>

					<TableColumn id="column-4" slot="columns" minWidth={600} popinText="Weight" demandPopin>
						<span>Weight</span>
					</TableColumn>

					<TableColumn id="column-5" slot="columns">
						<span>Price</span>
					</TableColumn>
				</Table>
			);

			cy.get("@loadMore").should("not.have.been.called");

			cy.get("[ui5-table]")
				.shadow()
				.find(".ui5-table-growing-row-inner")
				.as("loadMoreTrigger")
				.realClick();

			cy.get("@loadMoreTrigger")
				.should("be.focused");

			cy.get("@loadMore")
				.should("have.been.calledOnce");

			cy.realPress("Space");

			cy.get("@loadMore")
				.should("have.been.calledTwice");

			cy.realPress("Enter");

			cy.get("@loadMore")
				.should("have.been.calledThrice");
		});
	});

	describe("Growing Table on Scroll", () => {
		it("tests the 'load-more' event", () => {
			cy.mount(<>
				<div id="scrollContainer" style={{ height: "200px", overflow: "scroll" }}>
					<Table growing="Scroll" onLoadMore={cy.stub().as("loadMore")}>
						<TableColumn slot="columns">
							<span>Product</span>
						</TableColumn>
						{
							Array.from({ length: 10 }).map((_, index) => (
								<TableRow key={index}>
									<TableCell><span>{index + 1}</span></TableCell>
								</TableRow>))
						}
					</Table>
				</div>
			</>)

			cy.get("@loadMore").should("not.have.been.called");

			cy.wait(500);

			cy.get("#scrollContainer")
				.then($el => {
					$el[0].scrollTop = $el[0].scrollHeight
				})

			cy.get("@loadMore").should("have.been.calledOnce");
		});

		it("tests 'loadMore' event not fired initially when the table does not overflow", () => {
			cy.mount(<>
				<div id="scrollContainer" style={{ height: "200px", overflow: "scroll" }}>
					<Table growing="Scroll" onLoadMore={cy.stub().as("loadMore")}>
						<TableColumn slot="columns">
							<span>Product</span>
						</TableColumn>
						{
							Array.from({ length: 2 }).map((_, index) => (
								<TableRow key={index}>
									<TableCell><span>{index + 1}</span></TableCell>
								</TableRow>))
						}
					</Table>
				</div>
			</>)

			cy.get("@loadMore").should("not.have.been.called");
		});
	});

	describe("Display cell inline or block according to property popin-display", () => {
		it("Popin-display property should have value Inline", () => {
			cy.mount(<SimpleTable />);

			cy.get("[ui5-table]")
				.find("[ui5-table-column]")
				.eq(2)
				.should("have.attr", "popin-display", "Inline");
		});

		it("Popin-display should have value Block by default", () => {
			cy.mount(<SimpleTable />);

			cy.get("[ui5-table]")
				.find("[ui5-table-column]")
				.eq(0)
				.should("have.attr", "popin-display", "Block");
		});
	});

	describe("Navigated property", () => {
		beforeEach(() => {
			cy.mount(<Table>
				<TableColumn slot="columns">
					Product
				</TableColumn>

				<TableRow navigated>
					<TableCell><span>Row - 1</span></TableCell>
				</TableRow>
				<TableRow>
					<TableCell><span>Row - 2</span></TableCell>
				</TableRow>
			</Table>);
		});

		it("Should apply aria-current when navigated property is true", () => {
			cy.get("[ui5-table-row]")
				.eq(0)
				.shadow()
				.find("tr")
				.should("have.attr", "aria-current", "true");
		});

		it("Aria-current should not be present when navigated property is false", () => {
			cy.get("[ui5-table-row]")
				.eq(1)
				.shadow()
				.find("tr")
				.should("not.have.attr", "aria-current");
		});
	});

	describe("Table selection modes", () => {
		it("test click over Active/Inactive row in SingleSelect mode", () => {
			cy.mount(<SingleSelectTable />);

			cy.get("#firstCellFirstRowSSLabel").as("firstCellFirstRowLabel").realClick();

			cy.get("[ui5-table]").as("table");
			cy.get("#firstRowSingleSelect").as("firstRow");
			cy.get("#thirdRowSingleSelect").as("thirdRow");

			cy.get("#button1").as("contentButton");

			// check whether the table's and row's mode property is set correctly, as well as the row type property
			cy.get("@table").should("have.attr", "mode", "SingleSelect");
			cy.get("@firstRow").should("have.attr", "mode", "SingleSelect");
			cy.get("@firstRow").should("have.attr", "type", "Active");
			cy.get("@thirdRow").should("have.attr", "type", "Inactive");

			// test row-click and selection-change events on click over an Active row
			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledOnce;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("firstRowSingleSelect");
			})

			// act
			cy.get("#firstCellThirdRowSSLabel").as("firstCellThirdRowLabel").realClick();

			// test row-click and selection-change events on click over an Inactive row
			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledTwice;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("thirdRowSingleSelect");
				expect((stub as any).args.slice(-1)[0][0].detail.previouslySelectedRows[0].id).to.equal("firstRowSingleSelect");
			})

			// act
			cy.get("@contentButton").realClick();

			// test row-click and selection-change on click over an active table cell content
			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledTwice;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("thirdRowSingleSelect");
				expect((stub as any).args.slice(-1)[0][0].detail.previouslySelectedRows[0].id).to.equal("firstRowSingleSelect");
			})
		});

		it("test Space/Enter key interaction over Active/Inactive row in SingleSelect mode", () => {
			cy.mount(<>
				<SingleSelectTable />
				<button>After</button>
			</>)

			cy.get("#firstRowSingleSelect").as("firstRow");
			cy.get("#secondRowSingleSelect").as("secondRow");
			cy.get("#thirdRowSingleSelect").as("thirdRow");
			cy.get("#forthRowSingleSelect").as("forthRow");
			cy.get("#button1").as("contentButton");

			cy.get("button").contains("After").realClick();
			cy.get("button").contains("After").should("be.focused");

			cy.realPress(["Shift", "Tab"]);

			cy.get("@firstRow").should("be.focused");

			cy.get("@firstRow").realPress("Enter");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledOnce;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("firstRowSingleSelect");
			})

			cy.realPress("Enter");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should("have.been.calledOnce");

			cy.realPress("ArrowDown");
			cy.realPress("ArrowDown");
			cy.realPress("Enter");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledTwice;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("thirdRowSingleSelect");
				expect((stub as any).args.slice(-1)[0][0].detail.previouslySelectedRows[0].id).to.equal("firstRowSingleSelect");
			})

			cy.realPress("Space");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should("have.been.calledTwice");

			cy.realPress("ArrowDown");
			cy.realPress("Space");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should("have.been.calledThrice");

			cy.realPress("ArrowUp");
			cy.realPress("ArrowUp");
			cy.realPress("Space");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.be.callCount(4);
				expect((stub as any).args[3][0].detail.selectedRows[0].id).to.equal("secondRowSingleSelect");
				expect((stub as any).args[3][0].detail.previouslySelectedRows[0].id).to.equal("forthRowSingleSelect");
			})

			cy.realPress("ArrowUp");
			cy.realPress("Tab");
			cy.get("@contentButton").should("be.focused");

			cy.realPress("Space");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.be.callCount(4);
				expect((stub as any).args[3][0].detail.selectedRows[0].id).to.equal("secondRowSingleSelect");
				expect((stub as any).args[3][0].detail.previouslySelectedRows[0].id).to.equal("forthRowSingleSelect");
			})
		});

		it("test click over Active/Inactive row in MultiSelect mode", () => {
			cy.mount(<MultiSelectTable />);

			cy.get("#multi").as("table");
			cy.get("#firstRowMultiSelect").as("firstRow");
			cy.get("#thirdRowMultiSelect").as("thirdRow");
			cy.get("#firstCellFirstRowMSLabel").as("firstCellFirstRowLabel");
			cy.get("#firstCellThirdRowMSLabel").as("firstCellThirdRowLabel");
			cy.get("#button2").as("contentButton");
			cy.get("@firstRow").shadow().find(".ui5-multi-select-checkbox").shadow().find(".ui5-checkbox-root").as("checkBoxFirstCell");

			cy.get("@firstCellFirstRowLabel").realClick();

			cy.get("@table").should("have.attr", "mode", "MultiSelect");
			cy.get("@firstRow").should("have.attr", "mode", "MultiSelect");
			cy.get("@firstRow").should("have.attr", "type", "Active");
			cy.get("@thirdRow").should("have.attr", "type", "Inactive");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should("have.not.been.called");

			cy.get("@checkBoxFirstCell").realClick();

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledOnce;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("firstRowMultiSelect");
			})

			cy.get("@contentButton").realClick();

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledOnce;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("firstRowMultiSelect");
			})

			cy.get("@firstCellThirdRowLabel").realClick();

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should("have.been.calledOnce");
		});

		it("test Space/Enter key interaction over Active/Inactive row in MultiSelect mode", () => {
			cy.mount(
				<>
					<button>Before</button>
					<MultiSelectTable />
				</>);
			cy.get("#firstRowMultiSelect").as("firstRow");
			cy.get("#secondRowMultiSelect").as("secondRow");
			cy.get("#thirdRowMultiSelect").as("thirdRow");
			cy.get("#button2").as("contentButton");
			cy.get("@secondRow").shadow().find(".ui5-multi-select-checkbox").shadow().find(".ui5-checkbox-root").as("checkBoxFirstCell");

			cy.get("button").contains("Before").realClick();
			cy.get("button").contains("Before").should("be.focused");

			cy.realPress("Tab");

			cy.get("@firstRow").should("be.focused");

			cy.realPress("Enter");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should("have.not.been.called");

			cy.realPress("Tab")

			cy.get("@contentButton").should("be.focused");

			cy.realPress("Enter");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should("have.not.been.called");

			cy.get("@checkBoxFirstCell").focus()
			cy.get("@checkBoxFirstCell").should("be.focused");

			cy.get("@checkBoxFirstCell").realPress("Enter");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledOnce;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("secondRowMultiSelect");
				expect((stub as any).args.slice(-1)[0][0].detail.previouslySelectedRows[0]?.id).to.equal(undefined);
			})

			cy.realPress("Space");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledTwice;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0]?.id).to.equal(undefined);
				expect((stub as any).args.slice(-1)[0][0].detail.previouslySelectedRows[0]?.id).to.equal("secondRowMultiSelect");
			})

			cy.realPress(["Shift", "Tab"]);

			cy.get("@secondRow").should("be.focused");

			cy.realPress("Space");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.calledThrice;
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("secondRowMultiSelect");
				expect((stub as any).args.slice(-1)[0][0].detail.previouslySelectedRows[0]?.id).to.equal(undefined);
			})

			cy.realPress("ArrowDown");

			cy.get("@thirdRow").should("be.focused");

			cy.realPress("Space");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.callCount(4);
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("secondRowMultiSelect");
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[1].id).to.equal("thirdRowMultiSelect");
				expect((stub as any).args.slice(-1)[0][0].detail.previouslySelectedRows[0].id).to.equal("secondRowMultiSelect");
			})

			cy.realPress("Enter");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should(stub => {
				expect(stub).to.have.been.callCount(4);
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[0].id).to.equal("secondRowMultiSelect");
				expect((stub as any).args.slice(-1)[0][0].detail.selectedRows[1].id).to.equal("thirdRowMultiSelect");
				expect((stub as any).args.slice(-1)[0][0].detail.previouslySelectedRows[0].id).to.equal("secondRowMultiSelect");
			})
		});

		it("test selectAll functionallity in MultiSelect mode", () => {
			cy.mount(<MultiSelectTable />);

			cy.get("#firstRowMultiSelect").as("firstRow");
			cy.get("#secondRowMultiSelect").as("secondRow");
			cy.get("#thirdRowMultiSelect").as("thirdRow");
			cy.get("#forthRowMultiSelect").as("forthRow");
			cy.get("#multi").as("table");
			cy.get("@table").shadow().find("thead [ui5-checkbox]").as("selectAllCheckBox");

			cy.get("@firstRow").invoke("prop", "selected", true);
			cy.get("@secondRow").invoke("prop", "selected", true);
			cy.get("@thirdRow").invoke("prop", "selected", true);
			cy.get("@forthRow").invoke("prop", "selected", true);

			cy.get("@firstRow").should("have.attr", "selected");
			cy.get("@secondRow").should("have.attr", "selected");
			cy.get("@thirdRow").should("have.attr", "selected");
			cy.get("@forthRow").should("have.attr", "selected");
			cy.get("@selectAllCheckBox").should("have.prop", "checked", true);

			cy.get("@forthRow").invoke("prop", "selected", false);

			cy.get("@forthRow").should("not.have.attr", "selected");
			cy.get("@selectAllCheckBox").should("have.prop", "checked", false);
		});

		it("test mouse and keyboard interaction over Active/Inactive row in Default mode", () => {
			cy.mount(
				<Table id="default" onRowClick={cy.stub().as("rowClick")} onSelectionChange={cy.stub().as("selectionChange")}>
					<TableColumn slot="columns">
						<span>Product</span>
					</TableColumn>
					<TableColumn slot="columns" minWidth={600} demandPopin>
						<span>Supplier</span>
					</TableColumn>
					<TableColumn slot="columns" minWidth={600} demandPopin>
						<span>Dimensions</span>
					</TableColumn>
					<TableColumn slot="columns">
						<span>Weight</span>
					</TableColumn>
					<TableColumn slot="columns">
						<span>Price</span>
					</TableColumn>
					<TableColumn slot="columns">
						<span>Row Type</span>
					</TableColumn>

					<TableRow type="Active" id="firstRowDefaultMode">
						<TableCell>
							<span id="firstCellFirstRowDefaultLabel">Notebook Basic 15</span>
						</TableCell>
						<TableCell>
							<span>Very Best Screens</span>
						</TableCell>
						<TableCell>
							<span>30 x 18 x 3 cm</span>
						</TableCell>
						<TableCell>
							<span>4.2 KG</span>
						</TableCell>
						<TableCell>
							<span>956 EUR</span>
						</TableCell>
						<TableCell>
							<button>Active</button>
						</TableCell>
					</TableRow>

					<TableRow type="Active" id="secondRowDefaultMode">
						<TableCell>
							<span>Notebook Basic 17</span>
						</TableCell>
						<TableCell>
							<span>Very Best Screens</span>
						</TableCell>
						<TableCell>
							<span>29 x 17 x 3.1 cm</span>
						</TableCell>
						<TableCell>
							<span>4.5 KG</span>
						</TableCell>
						<TableCell>
							<span>1249 EUR</span>
						</TableCell>
						<TableCell>
							<button>Active</button>
						</TableCell>
					</TableRow>

					<TableRow type="Inactive" id="thirdRowDefaultMode">
						<TableCell>
							<span id="firstCellThirdRowDefaultLabel">Notebook Basic 18</span>
						</TableCell>
						<TableCell>
							<span>Very Best Screens</span>
						</TableCell>
						<TableCell>
							<span>28 x 19 x 2.5 cm</span>
						</TableCell>
						<TableCell>
							<span>4.2 KG</span>
						</TableCell>
						<TableCell>
							<span>1570 EUR</span>
						</TableCell>
						<TableCell>
							<button>Inactive</button>
						</TableCell>
					</TableRow>

					<TableRow id="forthRowDefaultMode">
						<TableCell>
							<span>Notebook Basic 19</span>
						</TableCell>
						<TableCell>
							<span>Smartcards</span>
						</TableCell>
						<TableCell>
							<span>32 x 21 x 4 cm</span>
						</TableCell>
						<TableCell>
							<span>4.2 KG</span>
						</TableCell>
						<TableCell>
							<span>1650 EUR</span>
						</TableCell>
						<TableCell>
							<button>Inactive</button>
						</TableCell>
					</TableRow>
				</Table>)

			cy.get("#default").as("table");
			cy.get("#firstRowDefaultMode").as("firstRow");
			cy.get("#thirdRowDefaultMode").as("thirdRow");
			cy.get("#firstCellFirstRowDefaultLabel").as("firstCellFirstRowLabel");
			cy.get("#firstCellThirdRowDefaultLabel").as("firstCellThirdRowLabel");

			cy.get("@firstCellFirstRowLabel").realClick();

			cy.get("@firstRow").should("be.focused");

			cy.get("@table").should("have.attr", "mode", "None");
			cy.get("@firstRow").should("have.attr", "mode", "None");
			cy.get("@firstRow").should("have.attr", "type", "Active");
			cy.get("@thirdRow").should("have.attr", "type", "Inactive");

			cy.get("@rowClick").should("have.been.calledOnce");
			cy.get("@selectionChange").should("have.not.been.called");

			cy.realPress("Enter");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should("have.not.been.called");

			cy.realPress("Space");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should("have.not.been.called");

			cy.get("@firstCellThirdRowLabel").realClick();

			cy.get("@thirdRow").should("be.focused");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should("have.not.been.called");

			cy.realPress("Enter");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should("have.not.been.called");

			cy.realPress("Space");

			cy.get("@rowClick").should("have.been.calledTwice");
			cy.get("@selectionChange").should("have.not.been.called");
		});

		it("tests adding spaces to input fields in a row", () => {
			cy.mount(<Table>
				<TableColumn minWidth={800} slot="columns" popinText="Supplier">
					Supplier
				</TableColumn>

				<TableRow >
					<TableCell><input /></TableCell>
				</TableRow>
			</Table>)

			cy.get("input").realClick()

			cy.get("input").should("be.focused")

			cy.realPress("a");
			cy.realPress("Space");
			cy.realPress("b");

			cy.get("input").should("have.value", "a b");
		});
	});
});


describe("Table keyboard interaction", () => {
	it("Tab/Shift+Tab", () => {
		cy.mount(<>
			<button>Before</button>
			<MultiSelectTable />
			<button>After</button>
		</>);

		cy.get("#multi").as("table");
		cy.get("#firstRowMultiSelect").as("firstRow");
		cy.get("#secondRowMultiSelect").as("secondRow");
		cy.get("button").contains("Before").as("precedingElementInTabIndex");
		cy.get("button").contains("After").as("nextElementInTabIndex");
		cy.get("@firstRow").shadow().find("[ui5-checkbox]").as("firstRowCheckBox");
		cy.get("@firstRow").find("#button2").as("buttonInFirstRow");
		cy.get("@secondRow").find("#button3").as("buttonInSecondRow");

		cy.get("@precedingElementInTabIndex").realClick();

		cy.get("@precedingElementInTabIndex").should("be.focused");

		cy.realPress("Tab");

		cy.get("@firstRow").should("be.focused");
		cy.get("@buttonInFirstRow").should("not.be.focused");

		cy.realPress("Tab");

		cy.get("@buttonInFirstRow").should("be.focused");
		cy.get("@firstRow").should("not.be.focused");
		cy.get("@firstRowCheckBox").should("not.be.focused");

		cy.realPress("Tab");

		cy.get("@nextElementInTabIndex").should("be.focused");
		cy.get("@secondRow").should("not.be.focused");
		cy.get("@buttonInSecondRow").should("not.be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@buttonInFirstRow").should("be.focused");
		cy.get("@nextElementInTabIndex").should("not.be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@firstRow").should("be.focused");
		cy.get("@buttonInFirstRow").should("not.be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("@precedingElementInTabIndex").should("be.focused");
		cy.get("@firstRow").should("not.be.focused");
	});

	it("F7", () => {
		cy.mount(<MultiSelectTable />);

		cy.get("#multi").as("table");
		cy.get("#firstCellFirstRowMSLabel").as("firstCellFirstRowLabel");
		cy.get("#firstRowMultiSelect").as("firstRow");
		cy.get("@firstRow").find("#button2").as("buttonInFirstRow");

		cy.get("@firstCellFirstRowLabel").realClick();

		cy.get("@firstRow").should("be.focused");

		cy.realPress("Tab");

		cy.get("@firstRow").should("not.be.focused");
		cy.get("@buttonInFirstRow").should("be.focused");

		cy.realPress("F7");

		cy.get("@firstRow").should("be.focused");
		cy.get("@buttonInFirstRow").should("not.be.focused");

		cy.realPress("F7");

		cy.get("@buttonInFirstRow").should("be.focused");
		cy.get("@firstRow").should("not.be.focused");
	});

	it("Ctrl + A", () => {
		cy.mount(<MultiSelectTable />);

		cy.get("#multi").as("table");
		cy.get("#firstRowMultiSelect").as("firstRow");
		cy.get("@firstRow").shadow().find("[ui5-checkbox]").as("firstRowCheckBox");
		cy.get("#secondRowMultiSelect").as("secondRow");
		cy.get("#thirdRowMultiSelect").as("thirdRow");
		cy.get("#forthRowMultiSelect").as("forthRow");
		cy.get("@table").shadow().find("thead [ui5-checkbox]").as("selectAllCheckBox");
		cy.get("#firstCellFirstRowMSLabel").as("firstCellFirstRowLabel");

		cy.get("@firstCellFirstRowLabel").realClick();

		cy.get("@firstRow").should("be.focused");

		cy.get("@firstRow").should("have.prop", "selected", false);
		cy.get("@firstRowCheckBox").should("have.prop", "checked", false);
		cy.get("@secondRow").should("have.prop", "selected", false);
		cy.get("@thirdRow").should("have.prop", "selected", false);
		cy.get("@forthRow").should("have.prop", "selected", false);
		cy.get("@selectAllCheckBox").should("have.prop", "checked", false);

		cy.realPress(["Control", "a"]);

		cy.get("@firstRow").should("have.prop", "selected", true);
		cy.get("@firstRowCheckBox").should("have.prop", "checked", true);
		cy.get("@secondRow").should("have.prop", "selected", true);
		cy.get("@thirdRow").should("have.prop", "selected", true);
		cy.get("@forthRow").should("have.prop", "selected", true);
		cy.get("@selectAllCheckBox").should("have.prop", "checked", true);
	});

	it("Alt + Up/Down", () => {
		cy.mount(
			<Table id="tbl" growing="Button">
				<TableColumn id="column-1" slot="columns" style={{ width: "350px" }}>
					<span>Product</span>
				</TableColumn>

				<TableColumn id="column-2" slot="columns" minWidth={800} popinText="Supplier">
					<span>Supplier</span>
				</TableColumn>

				<TableColumn id="column-3" slot="columns" minWidth={600} popinText="Dimensions" demandPopin>
					<span>Dimensions</span>
				</TableColumn>

				<TableColumn id="column-4" slot="columns" minWidth={600} popinText="Weight" demandPopin>
					<span>Weight</span>
				</TableColumn>

				<TableColumn id="column-5" slot="columns">
					<span>Price</span>
				</TableColumn>

				<TableRow>
					<TableCell>1-1</TableCell>
					<TableCell>1-2</TableCell>
					<TableCell>1-3</TableCell>
					<TableCell>1-4</TableCell>
				</TableRow>

				<TableRow>
					<TableCell>2-1</TableCell>
					<TableCell>2-2</TableCell>
					<TableCell>2-3</TableCell>
					<TableCell>2-4</TableCell>
				</TableRow>

				<TableRow>
					<TableCell>3-1</TableCell>
					<TableCell>3-2</TableCell>
					<TableCell>3-3</TableCell>
					<TableCell>3-4</TableCell>
				</TableRow>

				<TableRow>
					<TableCell>4-1</TableCell>
					<TableCell>4-2</TableCell>
					<TableCell>4-3</TableCell>
					<TableCell>4-4</TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#tbl").as("table");
		cy.get("@table").shadow().find(".ui5-table-header-row").as("tableHeader");
		cy.get("@table").find("[ui5-table-row]").eq(0).as("firstRow");
		cy.get("@table").find("[ui5-table-row]").eq(1).as("secondRow");
		cy.get("@table").shadow().find('.ui5-table-growing-row-inner').as("moreButton");
		cy.get("@firstRow").find("[ui5-table-cell]").eq(0).as("firstCellFirstRowLabel");

		cy.get("@firstCellFirstRowLabel").realClick();
		cy.get("@firstRow").should("be.focused");

		cy.realPress(["Alt", "ArrowUp"]);

		cy.get("@tableHeader").should("be.focused");
		cy.get("@firstRow").should("not.be.focused");

		cy.realPress(["Alt", "ArrowUp"]);

		cy.get("@moreButton").should("be.focused");
		cy.get("@tableHeader").should("not.be.focused");

		cy.realPress(["Alt", "ArrowUp"]);

		cy.get("@firstRow").should("be.focused");
		cy.get("@moreButton").should("not.be.focused");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("@moreButton").should("be.focused");
		cy.get("@firstRow").should("not.be.focused");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("@tableHeader").should("be.focused");
		cy.get("@moreButton").should("not.be.focused");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("@firstRow").should("be.focused");
		cy.get("@tableHeader").should("not.be.focused");
	});

	it("SHIFT + UP/DOWN", () => {
		cy.mount(<MultiSelectTable />);

		cy.get("#multi").as("table");
		cy.get("#firstRowMultiSelect").as("firstRow");
		cy.get("#secondRowMultiSelect").as("secondRow");
		cy.get("#thirdRowMultiSelect").as("thirdRow");
		cy.get("@firstRow").shadow().find("[ui5-checkbox]").as("firstRowCheckBox");

		cy.get("@firstRowCheckBox").realClick();
		cy.get("@firstRowCheckBox").should("be.focused");
		cy.get("@firstRow").should("have.prop", "selected", true);

		cy.realPress(["Shift", "ArrowDown"]);

		cy.get("@firstRow").should("have.prop", "selected", true);
		cy.get("@secondRow").should("have.prop", "selected", true);

		cy.realPress("ArrowDown");
		cy.realPress(["Shift", "ArrowUp"]);
		cy.realPress(["Shift", "ArrowUp"]);

		cy.get("@firstRow").should("have.prop", "selected", false);
		cy.get("@secondRow").should("have.prop", "selected", false);

		cy.get("@firstRowCheckBox").realClick();
		cy.get("@firstRowCheckBox").should("be.focused");

		cy.realPress(["Shift", "ArrowDown"]);
		cy.realPress(["Shift", "ArrowDown"]);

		cy.get("@firstRowCheckBox").realClick();
		cy.get("@firstRowCheckBox").should("be.focused");

		cy.realPress(["Shift", "ArrowDown"]);
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress(["Shift", "ArrowUp"]);

		cy.get("@secondRow").should("have.prop", "selected", false);
		cy.get("@thirdRow").should("have.prop", "selected", false);
	});

	it("CTRL + HOME/END", () => {
		cy.mount(<MultiSelectTable />);

		cy.get("#multi").as("table");
		cy.get("#firstRowMultiSelect").as("firstRow");
		cy.get("#forthRowMultiSelect").as("fourthRow");
		cy.get("@table").shadow().find(".ui5-table-header-row").as("tableHeader");
		cy.get("@firstRow").shadow().find("[ui5-checkbox]").as("firstRowCheckBox");

		cy.get("@firstRowCheckBox").realClick();
		cy.get("@firstRowCheckBox").should("be.focused");

		cy.realPress(["Control", "Home"]);

		cy.get("@tableHeader").should("have.attr", "tabindex", "0");

		cy.realPress(["Control", "End"]);

		cy.get("@fourthRow").should("have.attr", "forced-tab-index", "0");
	});

	it("SHIFT + HOME/END", () => {
		cy.mount(<MultiSelectTable />);

		cy.get("#multi").as("table");
		cy.get("#firstRowMultiSelect").as("firstRow");
		cy.get("#secondRowMultiSelect").as("secondRow");
		cy.get("#thirdRowMultiSelect").as("thirdRow");
		cy.get("#forthRowMultiSelect").as("fourthRow");
		cy.get("@table").shadow().find(".ui5-table-header-row").as("tableHeader");
		cy.get("@table").find("[ui5-table-column]").first().as("headerFirstLabel");
		cy.get("@headerFirstLabel").shadow().find("th").as("headerFirstLabelDOM");

		cy.get("@headerFirstLabelDOM").realClick();
		cy.get("@tableHeader").should("be.focused");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress(["Shift", "Home"]);

		cy.get("@firstRow").should("have.prop", "selected", true);
		cy.get("@secondRow").should("have.prop", "selected", true);

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");

		cy.realPress(["Shift", "End"]);

		cy.get("@thirdRow").should("have.prop", "selected", true);
		cy.get("@fourthRow").should("have.prop", "selected", true);
	});
});
