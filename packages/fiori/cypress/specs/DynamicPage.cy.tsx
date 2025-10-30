import DynamicPage from "../../src/DynamicPage.js";
import DynamicPageTitle from "../../src/DynamicPageTitle.js";
import DynamicPageHeader from "../../src/DynamicPageHeader.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import { setAnimationMode } from "@ui5/webcomponents-base";

before(() => {
	if (typeof setAnimationMode !== 'undefined') {
		cy.wrap({ setAnimationMode })
			.then(api => {
				return api.setAnimationMode("none");
			})
	}
});

describe("DynamicPage", () => {
	it("should unpin the header when snapping after being pinned", () => {
		cy.mount(
			<DynamicPage headerPinned={true} style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerPinned", true);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerPinned", false);
	});

	it("toggles the header-snapped state with 'headerSnapped' property", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("slot[name=headerArea]")
			.should("exist");

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("slot[name=headerArea]")
			.should("not.exist");
	});

	it("propagates-down the 'headerSnapped' property", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.should("have.prop", "snapped", true);

		cy.get("[ui5-dynamic-page-title]")
			.should("have.prop", "snapped", true);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.should("have.prop", "snapped", false);

		cy.get("[ui5-dynamic-page-title]")
			.should("have.prop", "snapped", false);
	});

	it("toggles the header-pinned state with 'headerPinned' property", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerPinned", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("header.ui5-dynamic-page-title-header-wrapper > slot[name=headerArea]")
			.should("not.exist");

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container > slot[name=headerArea]")
			.should("exist");

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerPinned", true);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("header.ui5-dynamic-page-title-header-wrapper > slot[name=headerArea]")
			.should("exist");

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container > slot[name=headerArea]")
			.should("not.exist");
	});

	it("propagates-down the 'headerPinned' property", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerPinned", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerPinned", true);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.should("have.prop", "pinned", true);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerPinned", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.should("have.prop", "pinned", false);
	});

	it("toggles the pin-button visibility with 'hidePinButton' property", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "hidePinButton", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.should("have.prop", "hidePinButton", false);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "hidePinButton", true);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.should("have.prop", "hidePinButton", true);
	});

	it("sets scroll padding when content receives focus", () => {
		cy.mount(
			<DynamicPage showFooter style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<input data-testid="test-input" />
				<Bar slot="footerArea" design="FloatingFooter">
					<Button slot="endContent">Save</Button>
				</Bar>
			</DynamicPage>
		);

		cy.get("[data-testid='test-input']").focus();

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container")
			.should("have.css", "scroll-padding-top")
			.and("not.equal", "0px");

		cy.get("[data-testid='test-input']").blur();

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container")
			.should("have.css", "scroll-padding-top", "0px");
	});

	it("scrolls focused elements into view", () => {
		cy.mount(
			<DynamicPage style={{ height: "400px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					<input data-testid="bottom-input" style={{ marginTop: "900px" }} />
				</div>
			</DynamicPage>
		);

		cy.get("[data-testid='bottom-input']").focus();

		cy.get("[data-testid='bottom-input']").should("be.visible");
	});
});

describe("Scroll", () => {
	it("snaps the header upon scroll", () => {
		cy.mount(
			<DynamicPage skipSnapOnScroll={false} style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
					<Button data-testid="scroll-down">Scroll Down</Button>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[data-testid='scroll-down']").then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const scrollContainer = document.querySelector("[ui5-dynamic-page]")
					.shadowRoot.querySelector(".ui5-dynamic-page-scroll-container");
				if (scrollContainer) {
					scrollContainer.scrollTo(0, 500);
				}
			});
		});

		cy.get("[data-testid='scroll-down']").click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);
	});

	it("expands the header upon scroll", () => {
		cy.mount(
			<DynamicPage skipSnapOnScroll={false} style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
					<Button data-testid="scroll-to-top">Scroll to Top</Button>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[data-testid='scroll-to-top']").then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const scrollContainer = document.querySelector("[ui5-dynamic-page]")
					.shadowRoot.querySelector(".ui5-dynamic-page-scroll-container");
				if (scrollContainer) {
					scrollContainer.scrollTo(0, 0);
				}
			});
		});

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container")
			.scrollTo(0, 500);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);

		cy.get("[data-testid='scroll-to-top']").click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);
	});
});

describe("Page general interaction", () => {
	it("toggles the header when scrollTop is between SCROLL_THRESHOLD and headerHeight", () => {
		cy.mount(
			<DynamicPage showFooter style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
				<Bar slot="footerArea" design="FloatingFooter">
					<Button slot="endContent">Save</Button>
					<Button slot="endContent">Close</Button>
				</Bar>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]").should("exist");

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container")
			.should("exist")
			.then(($container) => {
				$container[0].scrollTop = 20;
			});

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action")
			.first()
			.click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "showHeaderInStickArea", true);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action")
			.first()
			.click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "showHeaderInStickArea", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container")
			.should("have.prop", "scrollTop", 0);
	});

	it("allows toggle the footer", () => {
		cy.mount(
			<DynamicPage showFooter style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
					<Button data-testid="toggle-footer">Toggle Footer</Button>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
				<Bar slot="footerArea" design="FloatingFooter">
					<Button slot="endContent">Save</Button>
					<Button slot="endContent">Close</Button>
				</Bar>
			</DynamicPage>
		);

		cy.get("[data-testid='toggle-footer']").then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const dynamicPage = document.querySelector("[ui5-dynamic-page]");
				const hasFooter = dynamicPage.hasAttribute("show-footer");
				if (hasFooter) {
					dynamicPage.removeAttribute("show-footer");
				} else {
					dynamicPage.setAttribute("show-footer", "true");
				}
			});
		});

		cy.get("[ui5-dynamic-page]")
			.should("have.attr", "show-footer");

		cy.get("[data-testid='toggle-footer']").click();

		cy.get("[ui5-dynamic-page]")
			.should("not.have.attr", "show-footer");
	});

	it("snaps the header upon pressing the snap button", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action")
			.should("have.length.greaterThan", 0);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action")
			.first()
			.click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);
	});

	it("expands the header upon pressing the expand button", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("slot[name=headerArea]")
			.should("not.exist");

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action")
			.first()
			.click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("slot[name=headerArea]")
			.should("exist");
	});

	it("expands the header in the sticky area", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerInContent", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action")
			.first()
			.click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("slot[name=headerArea]")
			.should("exist");
	});

	it("pins the header", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action")
			.eq(1)
			.click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerPinned", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);
	});

	it("keeps the pinned header expanded during scroll", () => {
		cy.mount(
			<DynamicPage headerPinned={true} style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container")
			.scrollTo(0, 500);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerPinned", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container")
			.should("have.prop", "scrollTop", 500);
	});

	it("unpins the header upon press of snap button", () => {
		cy.mount(
			<DynamicPage headerPinned={true} style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action")
			.first()
			.click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerPinned", false);
	});

	it("expands the title with click", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page-title]").click();

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);
	});

	it("snaps the title with click", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page-title]")
			.shadow()
			.find(".ui5-dynamic-page-title-focus-area")
			.click(50, 50);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);
	});

	it("expands the title using keyboard", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page-title]")
			.shadow()
			.find(".ui5-dynamic-page-title-focus-area")
			.focus()
			.realPress('Enter');

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);
	});

	it("snaps the title using keyboard", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page-title]")
			.shadow()
			.find(".ui5-dynamic-page-title-focus-area")
			.focus()
			.realPress('Enter');

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", true);
	});
});

describe("Page layout when content has 100% height", () => {
	it("footer does not hide the content", () => {
		cy.mount(
			<DynamicPage showFooter style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "100%", backgroundColor: "#e0e0e0" }}>
					Content with 100% height
				</div>
				<Bar slot="footerArea" design="FloatingFooter">
					<button slot="endContent">Save</button>
					<button slot="endContent">Close</button>
				</Bar>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "showFooter", true);

		cy.get("[ui5-dynamic-page] > div")
			.then(($content) => {
				const contentBottom = $content[0].getBoundingClientRect().bottom;

				cy.get("[ui5-bar]")
					.then(($footer) => {
						const footerTop = $footer[0].getBoundingClientRect().top;

						expect(contentBottom).to.be.at.most(footerTop);
					});
			});
	});

	it("content expands to fill the space between header and footer", () => {
		cy.mount(
			<DynamicPage showFooter style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "100%", backgroundColor: "#e0e0e0" }}>
					Content with 100% height
				</div>
				<Bar slot="footerArea" design="FloatingFooter">
					<button slot="endContent">Save</button>
					<button slot="endContent">Close</button>
				</Bar>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "showFooter", true);

		cy.get("[ui5-dynamic-page-header]")
			.then(($header) => {
				const headerBottom = $header[0].getBoundingClientRect().bottom;

				cy.get("[ui5-dynamic-page]")
					.shadow()
					.find(".ui5-dynamic-page-spacer")
					.then(($footerSpacer) => {
						const footerTop = $footerSpacer[0].getBoundingClientRect().top;

						cy.get("[ui5-dynamic-page]")
							.shadow()
							.find(".ui5-dynamic-page-fit-content")
							.then(($content) => {
								const contentTop = $content[0].getBoundingClientRect().top;
								const contentBottom = $content[0].getBoundingClientRect().bottom;

								expect(contentTop).to.equal(headerBottom);
								expect(contentBottom).to.equal(footerTop);
							});
					});
			});
	});
});

describe("Page layout when content overflows", () => {
	it("footer does not hide the content", () => {
		cy.mount(
			<DynamicPage showFooter style={{ height: "700px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1500px", backgroundColor: "#f0f0f0" }}>
					Very tall content that overflows and requires scrolling
				</div>
				<Bar slot="footerArea" design="FloatingFooter">
					<button slot="endContent">Save</button>
					<button slot="endContent">Close</button>
				</Bar>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "showFooter", true);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container")
			.scrollTo(0, 500);

		cy.get("[ui5-dynamic-page] > div").should("be.visible");

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-scroll-container")
			.should("have.prop", "scrollTop")
			.and("be.greaterThan", 0);

		cy.get("[ui5-bar]").should("be.visible");
	});
});

describe("ARIA attributes", () => {
	it("sets expanded state attributes", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.should("have.prop", "headerSnapped", false);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-title-header-wrapper")
			.should("have.attr", "aria-label", "Header Expanded");

		cy.get("[ui5-dynamic-page-header]")
			.shadow()
			.find(".ui5-dynamic-page-header-root")
			.should("have.attr", "role", "region")
			.should("have.attr", "aria-label", "Header Expanded");

		cy.get("[ui5-dynamic-page-title]")
			.shadow()
			.find(".ui5-dynamic-page-title-focus-area")
			.should("have.attr", "aria-expanded", "true")
			.should("have.attr", "role", "button");

		cy.get("[ui5-dynamic-page-title]")
			.should("have.prop", "__id")
			.then((titleId) => {
				cy.get("[ui5-dynamic-page-title]")
					.shadow()
					.find(".ui5-dynamic-page-title-focus-area")
					.should("have.attr", "aria-describedby", `${titleId}-toggle-description`);
			});

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find("[ui5-button].ui5-dynamic-page-header-action-expand")
			.should("have.prop", "accessibleName", "Snap Header")
			.should("have.prop", "tooltip", "Snap Header");

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find("[ui5-toggle-button].ui5-dynamic-page-header-action-pin")
			.should("have.prop", "accessibleName", "Pin Header")
			.should("have.prop", "tooltip", "Pin Header");
	});

	it("sets snapped state attributes", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]")
			.invoke("prop", "headerSnapped", true);

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find(".ui5-dynamic-page-title-header-wrapper")
			.should("have.attr", "aria-label", "Header Snapped");

		cy.get("[ui5-dynamic-page-header]")
			.shadow()
			.find(".ui5-dynamic-page-header-root")
			.should("have.attr", "aria-label", "Header Snapped");

		cy.get("[ui5-dynamic-page-title]")
			.shadow()
			.find(".ui5-dynamic-page-title-focus-area")
			.should("have.attr", "aria-expanded", "false")
			.should("have.attr", "role", "button");

		cy.get("[ui5-dynamic-page-title]")
			.should("have.prop", "__id")
			.then((titleId) => {
				cy.get("[ui5-dynamic-page-title]")
					.shadow()
					.find(".ui5-dynamic-page-title-focus-area")
					.should("have.attr", "aria-describedby", `${titleId}-toggle-description`);
			});

		cy.get("[ui5-dynamic-page]")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find("[ui5-button]")
			.should("exist")
			.should("have.prop", "accessibleName", "Expand Header")
			.should("have.prop", "tooltip", "Expand Header");
	});

	it("should show correct tooltip for pin button based on pinned state", () => {
		cy.mount(
			<DynamicPage style="height: 600px;">
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page]").as("dynamicPage");

		// Initially the header should not be pinned, so tooltip should be "Pin Header"
		cy.get("@dynamicPage")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action-pin")
			.should("have.attr", "tooltip", "Pin Header");

		// Pin the header
		cy.get("@dynamicPage")
			.invoke("prop", "headerPinned", true);

		// After pinning, tooltip should change to "Unpin Header"
		cy.get("@dynamicPage")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action-pin")
			.should("have.attr", "tooltip", "Unpin Header");

		// Unpin the header
		cy.get("@dynamicPage")
			.invoke("prop", "headerPinned", false);

		// After unpinning, tooltip should change back to "Pin Header"
		cy.get("@dynamicPage")
			.shadow()
			.find("[ui5-dynamic-page-header-actions]")
			.shadow()
			.find(".ui5-dynamic-page-header-action-pin")
			.should("have.attr", "tooltip", "Pin Header");
	});

	it("should use default aria-label based on header state", () => {
		cy.mount(
			<DynamicPage style={{ height: "600px" }}>
				<DynamicPageTitle slot="titleArea">
					<div slot="heading">Page Title</div>
				</DynamicPageTitle>
				<DynamicPageHeader slot="headerArea">
					<div>Header Content</div>
				</DynamicPageHeader>
				<div style={{ height: "1000px" }}>
					Page content with enough height to enable scrolling
				</div>
			</DynamicPage>
		);

		cy.get("[ui5-dynamic-page-header]")
			.shadow()
			.find(".ui5-dynamic-page-header-root")
			.should("have.attr", "aria-label", "Header Expanded");
	});
});