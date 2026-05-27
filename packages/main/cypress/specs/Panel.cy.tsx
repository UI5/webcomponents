import Label from "../../src/Label.js";
import Panel from "../../src/Panel.js";
import Title from "../../src/Title.js";
import {
	PANEL_ICON,
} from "../../src/generated/i18n/i18n-defaults.js";
import PanelAccessibleRole from "../../src/types/PanelAccessibleRole.js";
import TitleLevel from "../../src/types/TitleLevel.js";

describe("API", () => {
	it("Change of header text", () => {
		const initialHeader = "Initial Header Text";
		const newHeader = "New Header Text";
		cy.mount(<Panel headerText={initialHeader}></Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-title")
			.as("header");

		cy.get("@header")
			.should("have.text", initialHeader);

		cy.get("[ui5-panel]")
			.invoke("prop", "headerText", newHeader);

		cy.get("@header")
			.should("have.text", newHeader);
	});
});

describe("Interaction", () => {
	function addPageStyles(styles: string) {
		cy.document().then((doc) => {
			const style = doc.createElement('style');
			style.id = "panel-styles";
			style.innerHTML = styles;
			doc.head.appendChild(style);
		});
	}
	function clearPageStyles() {
		cy.window()
			.then($el => {
				const styleTag = $el.document.head.querySelector("style[id='panel-styles']");
				styleTag?.remove();
			});
	}
	it("Collapsing fixed panel is not possible", () => {
		cy.mount(<Panel fixed={true} headerText="Fixed Panel" onToggle={cy.stub().as("toggleEvent")}>
			<Title level={TitleLevel.H2}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		cy.get("@content")
			.should("be.visible");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.realClick();

		cy.get("@content")
			.should("be.visible");

		cy.get("@toggleEvent")
			.should("not.have.been.called");

		cy.get("[ui5-panel]")
			.should("not.have.attr", "collapsed");

		cy.get("@header")
			.should("be.focused");

		cy.get("@header")
			.realPress("Space")

		cy.get("@content")
			.should("be.visible");

		cy.get("[ui5-panel]")
			.should("not.have.attr", "collapsed");

		cy.get("@toggleEvent")
			.should("not.have.been.called");

		cy.get("@header")
			.should("be.focused");

		cy.get("@header")
			.realPress("Enter")

		cy.get("@content")
			.should("be.visible");

		cy.get("@toggleEvent")
			.should("not.have.been.called");

		cy.get("[ui5-panel]")
			.should("not.have.attr", "collapsed");
	});

	it("Collapsing fixed panel is possible when not fixed", () => {
		cy.mount(<Panel headerText="Fixed Panel">
			<Title level={TitleLevel.H2}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		cy.get("@content")
			.should("be.visible");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.realClick();

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("@content")
			.should("not.be.visible");

		cy.get("@header")
			.should("be.focused");

		cy.get("@header")
			.realPress("Space");
		
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("@content")
			.should("be.visible");

		cy.get("@header")
			.should("be.focused");

		cy.get("@header")
			.realPress("Enter");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("@content")
			.should("not.be.visible");
	});

	it("Sticky header when scrolling inner content", () => {
		addPageStyles(`
			#panel-stickyHeader::part(content) {
				max-height: 70px;
				overflow: auto;
			}
		`);
		cy.mount(<Panel headerText="Fixed Panel" stickyHeader={true} id="panel-stickyHeader">
			<Label wrappingType="Normal">Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
				nostrum, vel ea sint dicant postea. Vel ne facete tritani, neglegentur concludaturque sed te. His animal dolorum ut.
				Aeterno appareat ei mei, cu sed elit scripserit, an quodsi oportere accusamus quo. Pri ea probo corpora rationibus,
				soluta incorrupte ex his.
				Mei ei brute cetero, id duo magna aeque torquatos. Quodsi erroribus mediocritatem his ut, ad pri legere iracundia
				democritum. Menandri intellegam in mea, ex vero movet qualisque sed. Maiorum verterem perfecto nec ea, est velit
				elaboraret consequuntur eu, eam ad reque postea admodum. Ne inimicus convenire pri, doctus vidisse te ius.
				Percipitur contentiones in vis, cu vim propriae phaedrum. Has ad magna errem honestatis, duo vero graeco epicurei
				no, populo semper sit ne. Vulputate dissentiunt interpretaris ea vis, nec civibus moderatius at. Cu vim stet
				dissentias, no vidit saperet indoctum nec, et pro magna prima nobis. Vis consul feugiat qualisque in, regione
				persecuti cotidieque id eos, id ius omnesque vituperata.
			</Label>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.then(($headerBefore) => {
				const headerTopBefore = $headerBefore[0].getBoundingClientRect().top;
	
				cy.get("@content")
					.scrollTo("bottom");
	
				cy.get("@header")
					.should(($headerAfter) => {
						const headerTopAfter = $headerAfter[0].getBoundingClientRect().top;
						expect(headerTopAfter).to.eq(headerTopBefore);
					});
			});

		// Clean up the style tag
		clearPageStyles();
	});

	it("Sticky header when scrolling outer container", () => {
		addPageStyles(`
			#my-div {
				height: 1000px;
				overflow: scroll;
			}
			#panel-stickyHeader::part(content) {
				max-height: 70px;
				overflow: auto;
			}
		`);
		cy.mount(
		<div id="my-div">
			<Panel headerText="Fixed Panel" stickyHeader={true} id="panel-stickyHeader">
				<Label wrappingType="Normal">Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
				nostrum, vel ea sint dicant postea. Vel ne facete tritani, neglegentur concludaturque sed te. His animal dolorum ut.
				Aeterno appareat ei mei, cu sed elit scripserit, an quodsi oportere accusamus quo. Pri ea probo corpora rationibus,
				soluta incorrupte ex his.
				Mei ei brute cetero, id duo magna aeque torquatos. Quodsi erroribus mediocritatem his ut, ad pri legere iracundia
				democritum. Menandri intellegam in mea, ex vero movet qualisque sed. Maiorum verterem perfecto nec ea, est velit
				elaboraret consequuntur eu, eam ad reque postea admodum. Ne inimicus convenire pri, doctus vidisse te ius.
				Percipitur contentiones in vis, cu vim propriae phaedrum. Has ad magna errem honestatis, duo vero graeco epicurei
				no, populo semper sit ne. Vulputate dissentiunt interpretaris ea vis, nec civibus moderatius at. Cu vim stet
				dissentias, no vidit saperet indoctum nec, et pro magna prima nobis. Vis consul feugiat qualisque in, regione
				persecuti cotidieque id eos, id ius omnesque vituperata.
				</Label>
			</Panel>
			<div id="my-div" style={{ height: "1000px" }}></div>
		</div>);

		cy.get("#my-div")
			.as("container");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.then(($headerBefore) => {
				const headerTopBefore = $headerBefore[0].getBoundingClientRect().top;
	
				cy.get("@container")
					.scrollTo(0, 50);
	
				cy.get("@header")
					.should(($headerAfter) => {
						const headerTopAfter = $headerAfter[0].getBoundingClientRect().top;
						expect(headerTopAfter).to.eq(headerTopBefore);
					});
			});

		// Clean up the style tag
		clearPageStyles();
	});

	it("Tests toggle expand/collapse animation", () => {
		cy.mount(<Panel headerText="Panel">
			<Title level={TitleLevel.H2}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-button")
			.as("icon");

		cy.get("@icon")
			.should("have.class", "ui5-panel-header-button-animated");

		cy.get("[ui5-panel]")
			.invoke("prop", "noAnimation", true);

		cy.get("@icon")
			.should("not.have.class", "ui5-panel-header-button-animated");
	});
});

describe("Events", () => {
	it("Toggle Event upon header click", () => {
		cy.mount(<Panel headerText="Fixed Panel" onToggle={cy.stub().as("toggleEvent")}>
			<Title level={TitleLevel.H2}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.realClick();

		cy.get("@toggleEvent")
			.should("have.been.calledOnce");
	});

	it("Toggle Event upon custom header", () => {
		cy.mount(<Panel onToggle={cy.stub().as("toggleEvent")}>
			<div slot="header">
				<Title level={TitleLevel.H2}>Custom Header</Title>
            </div>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-button")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@toggleEvent")
			.should("have.been.calledOnce");
	});
});

describe("Keyboard Interactions", () => {
	it("Enter key down expands/collapses panel", () => {
		cy.mount(<Panel headerText="Panel" onToggle={cy.stub().as("toggleEvent")}>
			<Title level={TitleLevel.H4}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		// Initial state - expanded
		cy.get("@content")
			.should("be.visible");

		// Press Enter - should trigger toggle immediately
		cy.get("@header")
			.focus()
			.realPress("Enter");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		// Content should be collapsed after Enter
		cy.get("@content")
			.should("not.be.visible");

		cy.get("@toggleEvent")
			.should("have.been.calledOnce");

		// Press Enter again - should toggle back to expanded
		cy.get("@header")
			.realPress("Enter");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		// Content should be visible again
		cy.get("@content")
			.should("be.visible");

		cy.get("@toggleEvent")
			.should("have.been.calledTwice");
	});

	it("Space key with Escape cancellation prevents toggle", () => {
		cy.mount(<Panel headerText="Panel" onToggle={cy.stub().as("toggleEvent")}>
			<Title level={TitleLevel.H4}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		// Initial state - expanded
		cy.get("@content")
			.should("be.visible");

		// Press and hold Space - this should set pending toggle but not execute yet
		cy.get("@header")
			.focus()
			.realPress(["Space", "Escape"]);

		// Content should still be visible (toggle was canceled by Escape)
		cy.get("@content")
			.should("be.visible");

		cy.get("@toggleEvent")
			.should("not.have.been.called");

		// Verify panel is still in expanded state
		cy.get("[ui5-panel]")
			.should("not.have.attr", "collapsed");
	});

	it("Space key without Escape executes toggle", () => {
		cy.mount(<Panel headerText="Panel" onToggle={cy.stub().as("toggleEvent")}>
			<Title level={TitleLevel.H4}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		// Initial state - expanded
		cy.get("@content")
			.should("be.visible");

		// Press Space - should execute the toggle
		cy.get("@header")
			.focus()
			.realPress("Space");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		// Content should now be collapsed
		cy.get("@content")
			.should("not.be.visible");

		cy.get("@toggleEvent")
			.should("have.been.calledOnce");

		// Verify panel is in collapsed state
		cy.get("[ui5-panel]")
			.should("have.attr", "collapsed");
	});

	it("Space key interrupted by Escape does not toggle", () => {
		cy.mount(<Panel headerText="Panel" onToggle={cy.stub().as("toggleEvent")}>
			<Title level={TitleLevel.H4}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		// Test the Space + Escape cancellation behavior
		cy.get("@header")
			.focus()
			.realPress(["Space", "Escape"]);

		// Should not have toggled because Escape canceled the Space action
		cy.get("@content")
			.should("be.visible");

		cy.get("@toggleEvent")
			.should("not.have.been.called");
	});

	it("Fixed panel (should not toggle)", () => {
		cy.mount(<Panel headerText="Fixed Panel" fixed={true} onToggle={cy.stub().as("toggleEvent")}>
			<Title level={TitleLevel.H4}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		// Content should be visible
		cy.get("@content")
			.should("be.visible");

		// Try Enter - should not toggle fixed panel
		cy.get("@header")
			.focus()
			.realPress("Enter");

		cy.get("@content")
			.should("be.visible");

		cy.get("@toggleEvent")
			.should("not.have.been.called");

		// Try Space - should not toggle fixed panel
		cy.get("@header")
			.realPress("Space");

		cy.get("@content")
			.should("be.visible");

		cy.get("@toggleEvent")
			.should("not.have.been.called");
	});

	it("Custom header (only button should work)", () => {
		cy.mount(<Panel onToggle={cy.stub().as("toggleEvent")}>
			<div slot="header">
				<Title level={TitleLevel.H2}>Custom Header</Title>
            </div>
			<Title level={TitleLevel.H3}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-button")
			.as("toggleButton");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		// Enter on custom header area should not toggle
		cy.get("@header")
			.focus()
			.realPress("Enter");

		cy.get("@content")
			.should("be.visible");

		cy.get("@toggleEvent")
			.should("not.have.been.called");

		// Enter on toggle button should work
		cy.get("@toggleButton")
			.shadow()
			.find(".ui5-button-root")
			.focus()
			.realPress("Enter");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("@content")
			.should("not.be.visible");

		cy.get("@toggleEvent")
			.should("have.been.calledOnce");
	});
});

describe("Accessibility", () => {
	it("Aria attributes on default header", () => {
		cy.mount(<Panel headerText="Panel" headerLevel={TitleLevel.H3}>
			<Title level={TitleLevel.H4}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "role", "form");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-button")
			.should("have.attr", "accessible-name", PANEL_ICON.defaultText)
			.and("match", "ui5-icon");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.should("have.attr", "role", "button")
			.and("have.attr", "aria-expanded", "true")
			.and("have.attr", "aria-controls");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-heading-wrapper")
			.should("have.attr", "aria-level", "3")
			.and("have.attr", "role", "heading");
	});

	it("Aria attributes on fixed header", () => {
			cy.mount(<Panel headerText="Panel" fixed={true}>
				<Title level={TitleLevel.H4}>Content</Title>
			</Panel>);
	
			cy.get("[ui5-panel]")
				.shadow()
				.find(".ui5-panel-header")
				.as("header");

			cy.get("@header")
				.should("not.have.attr", "role");

			cy.get("@header")
				.should("not.have.attr", "aria-expanded");
			
			cy.get("@header")
				.should("not.have.attr", "aria-controls");
	});

	it("Aria attributes on custom header", () => {
		const accessibleNamePanel = "Accessible Name";
		cy.mount(<Panel accessibleRole={PanelAccessibleRole.Region}>
			<div slot="header">
				<Title level={TitleLevel.H2}>Custom Header</Title>
            </div>
			<Title level={TitleLevel.H3}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "role", "region");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.should("not.have.attr", "role");

		cy.get("@header")
			.should("not.have.attr", "aria-expanded");
		
		cy.get("@header")
			.should("not.have.attr", "aria-controls");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-button")
			.shadow()
			.find(".ui5-button-root")
			.as("innerButton");

		cy.get("@innerButton")
			.should("have.attr", "title", PANEL_ICON.defaultText)
			.and("have.attr", "aria-expanded");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-heading-wrapper")
			.as("heading");

		cy.get("@heading")
			.should("not.have.attr", "aria-level");
		
		cy.get("@heading")
			.should("not.have.attr", "role", "heading");

		cy.get("[ui5-panel]")
			.invoke("prop", "accessibleName", accessibleNamePanel);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "aria-label", accessibleNamePanel);
		
		cy.get("@innerButton")
			.should("not.have.attr", "aria-label", accessibleNamePanel);

		cy.get("[ui5-panel]")
			.invoke("prop", "useAccessibleNameForToggleButton", true);

		cy.get("@innerButton")
			.should("have.attr", "aria-label", accessibleNamePanel);
	});

	it("Accessible Name", () => {
		const accessibleNamePanel = "Accessible Name";
		cy.mount(<Panel headerText="Panel" id="panelId">
			<Title level={TitleLevel.H4}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.then($panel => {
				const el = $panel[0];
				cy.get("[ui5-panel]")
					.shadow()
					.find(".ui5-panel-header")
					.should("have.attr", "aria-labelledby", `${el._id}-header-title`);
			});

		cy.get("[ui5-panel]")
			.invoke("prop", "accessibleName", accessibleNamePanel);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "aria-label", accessibleNamePanel);

		cy.get("[ui5-panel]")
			.invoke("prop", "fixed", true);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.should("not.have.attr", "aria-labelledby");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "aria-label", accessibleNamePanel);
	});
});
