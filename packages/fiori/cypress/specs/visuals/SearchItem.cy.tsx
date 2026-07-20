import Search from "../../../src/Search.js";
import SearchItem from "../../../src/SearchItem.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import history from "@ui5/webcomponents-icons/dist/history.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import favorite from "@ui5/webcomponents-icons/dist/favorite.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";

describe("SearchItem visual", () => {
	it("basic state — text only", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" />
				<SearchItem text="Bulgaria" />
				<SearchItem text="Canada" />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={searchIcon} />
				<SearchItem text="Canada" icon={history} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with description", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" description="Country in North Africa" icon={searchIcon} />
				<SearchItem text="Bulgaria" description="Country in Southeast Europe" icon={searchIcon} />
				<SearchItem text="Canada" description="Country in North America" icon={searchIcon} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with image slot", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="John Doe">
					<Avatar slot="image" size="XS" initials="JD" colorScheme="Accent3" />
				</SearchItem>
				<SearchItem text="Jane Smith">
					<Avatar slot="image" size="XS" initials="JS" colorScheme="Accent6" />
				</SearchItem>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("deletable", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" icon={history} deletable />
				<SearchItem text="Bulgaria" icon={history} deletable />
				<SearchItem text="Canada" icon={history} deletable />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with action buttons", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" icon={history}>
					<Button slot="actions" icon={favorite} design="Transparent" />
					<Button slot="actions" icon={edit} design="Transparent" />
				</SearchItem>
				<SearchItem text="Bulgaria" icon={history}>
					<Button slot="actions" icon={favorite} design="Transparent" />
					<Button slot="actions" icon={edit} design="Transparent" />
				</SearchItem>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("selected", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" icon={history} selected />
				<SearchItem text="Bulgaria" icon={history} />
				<SearchItem text="Canada" icon={history} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Search open placeholder="Search...">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={searchIcon} />
					<SearchItem text="Canada" icon={history} />
				</Search>
			</div>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});
