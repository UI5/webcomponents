import Button from "../../../src/Button.js";
import ButtonBadge from "../../../src/ButtonBadge.js";
import "@ui5/webcomponents-icons/dist/bell.js";

describe("ButtonBadge visual", () => {
	it("design — OverlayText", () => {
		cy.mount(
			<Button>
				Notifications
				<ButtonBadge slot="badge" design="OverlayText" text="3" />
			</Button>
		);
		cy.screenshot();
	});

	it("design — InlineText", () => {
		cy.mount(
			<Button>
				Notifications
				<ButtonBadge slot="badge" design="InlineText" text="3" />
			</Button>
		);
		cy.screenshot();
	});

	it("design — AttentionDot", () => {
		cy.mount(
			<Button>
				Messages
				<ButtonBadge slot="badge" design="AttentionDot" text="" />
			</Button>
		);
		cy.screenshot();
	});

	it("OverlayText — large number", () => {
		cy.mount(
			<Button>
				Notifications
				<ButtonBadge slot="badge" design="OverlayText" text="99+" />
			</Button>
		);
		cy.screenshot();
	});

	it("all designs side by side", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "1rem" }}>
				<Button>
					Overlay
					<ButtonBadge slot="badge" design="OverlayText" text="5" />
				</Button>
				<Button>
					Inline
					<ButtonBadge slot="badge" design="InlineText" text="5" />
				</Button>
				<Button>
					Dot
					<ButtonBadge slot="badge" design="AttentionDot" text="" />
				</Button>
			</div>
		);
		cy.screenshot();
	});

	it("with icon-only button", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "1rem" }}>
				<Button icon="bell">
					<ButtonBadge slot="badge" design="OverlayText" text="7" />
				</Button>
				<Button icon="bell">
					<ButtonBadge slot="badge" design="AttentionDot" text="" />
				</Button>
			</div>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size style={{ display: "flex", gap: "1rem" }}>
				<Button>
					Overlay
					<ButtonBadge slot="badge" design="OverlayText" text="3" />
				</Button>
				<Button>
					Inline
					<ButtonBadge slot="badge" design="InlineText" text="3" />
				</Button>
				<Button>
					Dot
					<ButtonBadge slot="badge" design="AttentionDot" text="" />
				</Button>
			</div>
		);
		cy.screenshot();
	});
});
