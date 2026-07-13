import Card from "../../../src/Card.js";
import CardHeader from "../../../src/CardHeader.js";
import Avatar from "../../../src/Avatar.js";
import Button from "../../../src/Button.js";
import List from "../../../src/List.js";
import ListItemStandard from "../../../src/ListItemStandard.js";

describe("Card visual", () => {
	it("basic state — title only", () => {
		cy.mount(
			<Card>
				<CardHeader slot="header" titleText="Card Title" />
				<List>
					<ListItemStandard>Item 1</ListItemStandard>
					<ListItemStandard>Item 2</ListItemStandard>
					<ListItemStandard>Item 3</ListItemStandard>
				</List>
			</Card>
		);
		cy.screenshot();
	});

	it("header — title, subtitle, additional text", () => {
		cy.mount(
			<Card>
				<CardHeader
					slot="header"
					titleText="Card Title"
					subtitleText="Subtitle"
					additionalText="3 of 10"
				/>
				<List>
					<ListItemStandard>Item 1</ListItemStandard>
					<ListItemStandard>Item 2</ListItemStandard>
				</List>
			</Card>
		);
		cy.screenshot();
	});

	it("header — with avatar slot", () => {
		cy.mount(
			<Card>
				<CardHeader slot="header" titleText="Team Members" subtitleText="5 available">
					<Avatar slot="avatar" initials="TM" colorScheme="Accent1" size="S" />
				</CardHeader>
				<List>
					<ListItemStandard>Alice</ListItemStandard>
					<ListItemStandard>Bob</ListItemStandard>
				</List>
			</Card>
		);
		cy.screenshot();
	});

	it("header — with action slot", () => {
		cy.mount(
			<Card>
				<CardHeader slot="header" titleText="Sales Report">
					<Button slot="action" design="Transparent">See All</Button>
				</CardHeader>
				<List>
					<ListItemStandard>Q1</ListItemStandard>
					<ListItemStandard>Q2</ListItemStandard>
				</List>
			</Card>
		);
		cy.screenshot();
	});

	it("header — interactive", () => {
		cy.mount(
			<Card>
				<CardHeader slot="header" titleText="Clickable Card" interactive />
				<List>
					<ListItemStandard>Item 1</ListItemStandard>
					<ListItemStandard>Item 2</ListItemStandard>
				</List>
			</Card>
		);
		cy.screenshot();
	});

	it("header — interactive focused", () => {
		cy.mount(
			<Card>
				<CardHeader slot="header" titleText="Focused Card" interactive />
				<List>
					<ListItemStandard>Item 1</ListItemStandard>
				</List>
			</Card>
		);
		cy.get("[ui5-card-header]").shadow().find(".ui5-card-header-focusable-element").focus();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Card>
					<CardHeader
						slot="header"
						titleText="Compact Card"
						subtitleText="Subtitle"
						additionalText="3 of 10"
					/>
					<List>
						<ListItemStandard>Item 1</ListItemStandard>
						<ListItemStandard>Item 2</ListItemStandard>
					</List>
				</Card>
			</div>
		);
		cy.screenshot();
	});
});
