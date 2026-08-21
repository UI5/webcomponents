import { internals } from "../../src/Location.js";
import TestGeneric from "../../test/test-elements/Generic.js";
import { resetConfiguration } from "../../src/InitialConfiguration.js";
import { getTheme } from "../../src/config/Theme.js";
import { getThemeRoot } from "../../src/config/ThemeRoot.js";
import applyTheme from "../../src/theming/applyTheme.js";

const THEME = "sap_horizon";

const addMetaTag = (content: string) => {
	cy.window().then($win => {
		const metaTag = $win.document.createElement("meta");
		metaTag.name = "sap-allowed-theme-origins";
		metaTag.content = content;
		$win.document.head.append(metaTag);
	});
};

const removeMetaTag = () => {
	cy.window().then($win => {
		$win.document.head.querySelector("[name='sap-allowed-theme-origins']")?.remove();
	});
};

const removeThemeLink = () => {
	cy.window().then($win => {
		$win.document.head.querySelector("link[sap-ui-webcomponents-theme]")?.remove();
	});
};

const applyAndCheckLink = (theme: string) => {
	cy.wrap({ applyTheme, getTheme })
		.invoke("getTheme")
		.then(() => {
			return cy.wrap({ applyTheme }).invoke("applyTheme", theme);
		});
};

// ─── Without meta tag ────────────────────────────────────────────────────────

describe("ThemeRoot via URL param — without meta tag", () => {
	afterEach(() => {
		removeThemeLink();
	});

	[
		{ label: "absolute URL (different origin)", themeRoot: "http://example2.com/themes/", blocked: true },
		{ label: "absolute URL (different protocol)", themeRoot: "https://example.com/themes/", blocked: true },
		{ label: "absolute URL (different port)", themeRoot: "http://example:9090.com/themes/", blocked: true },
		{ label: "absolute URL (same host, no meta tag)", themeRoot: "http://example.com/themes/", blocked: true },
		{ label: "protocol-relative (different origin)", themeRoot: "//example2.com/themes/", blocked: true },
		{ label: "protocol-relative (different port)", themeRoot: "//example:9090.com/themes/", blocked: true },
		{ label: "protocol-relative (same host, no meta tag)", themeRoot: "//example.com/themes/", blocked: true },
		{ label: "root-relative", themeRoot: "/themes/", blocked: false },
		{ label: "relative (current dir)", themeRoot: "./themes/", blocked: false },
		{ label: "relative (parent dir)", themeRoot: "../themes/", blocked: false },
	].forEach(({ label, themeRoot, blocked }) => {
		describe(`${label}: ${themeRoot}`, () => {
			before(() => {
				cy.stub(internals, "search").callsFake(() => {
					return `sap-ui-theme=${THEME}@${themeRoot}`;
				});

				cy.wrap({ resetConfiguration }).invoke("resetConfiguration", true);
				cy.mount(<TestGeneric />);
			});

			it(blocked ? "should not create a link element" : "should create a link element (same-origin, no meta tag needed)", () => {
				applyAndCheckLink(THEME);
				if (blocked) {
					cy.get(`link[sap-ui-webcomponents-theme='${THEME}']`).should("not.exist");
				} else {
					cy.get(`link[sap-ui-webcomponents-theme='${THEME}']`)
						.should("exist")
						.and("have.attr", "href")
						.and("include", `UI5/Base/baseLib/${THEME}/css_variables.css`);
				}
			});
		});
	});
});

// ─── With meta tag ────────────────────────────────────────────────────────────

describe("ThemeRoot via URL param — with meta tag (allowed: http://example.com)", () => {
	afterEach(() => {
		removeThemeLink();
	});

	after(() => {
		removeMetaTag();
	});

	before(() => {
		addMetaTag("http://example.com");
	});

	const blocked = [
		{ label: "absolute URL (different origin)", themeRoot: "http://example2.com/themes/" },
		{ label: "absolute URL (different protocol)", themeRoot: "https://example.com/themes/" },
		{ label: "absolute URL (different port)", themeRoot: "http://example:9090.com/themes/" },
		{ label: "protocol-relative (different origin)", themeRoot: "//example2.com/themes/" },
		{ label: "protocol-relative (different port)", themeRoot: "//example:9090.com/themes/" },
	];

	const allowed = [
		{
			label: "absolute URL (matches allowed origin)",
			themeRoot: "http://example.com/themes/",
			expectedHref: "http://example.com/themes/UI5/Base/baseLib/sap_horizon/css_variables.css",
		},
		{
			label: "protocol-relative (resolves to allowed origin)",
			themeRoot: "//example.com/themes/",
			expectedHref: "http://example.com/themes/UI5/Base/baseLib/sap_horizon/css_variables.css",
		},
	];

	const sameOriginAllowed = [
		{ label: "root-relative", themeRoot: "/themes/" },
		{ label: "relative (current dir)", themeRoot: "./themes/" },
		{ label: "relative (parent dir)", themeRoot: "../themes/" },
	];

	blocked.forEach(({ label, themeRoot }) => {
		describe(`blocked — ${label}: ${themeRoot}`, () => {
			before(() => {
				cy.stub(internals, "search").callsFake(() => {
					return `sap-ui-theme=${THEME}@${themeRoot}`;
				});
				cy.wrap({ resetConfiguration }).invoke("resetConfiguration", true);
				cy.mount(<TestGeneric />);
			});

			it("should not create a link element", () => {
				applyAndCheckLink(THEME);
				cy.get(`link[sap-ui-webcomponents-theme='${THEME}']`).should("not.exist");
			});
		});
	});

	allowed.forEach(({ label, themeRoot, expectedHref }) => {
		describe(`allowed — ${label}: ${themeRoot}`, () => {
			before(() => {
				cy.stub(internals, "search").callsFake(() => {
					return `sap-ui-theme=${THEME}@${themeRoot}`;
				});
				cy.wrap({ resetConfiguration }).invoke("resetConfiguration", true);
				cy.mount(<TestGeneric />);
			});

			it("should create a link element with correct href", () => {
				applyAndCheckLink(THEME);
				cy.get(`link[sap-ui-webcomponents-theme='${THEME}']`)
					.should("exist")
					.and("have.attr", "href", expectedHref);
			});
		});
	});

	sameOriginAllowed.forEach(({ label, themeRoot }) => {
		describe(`allowed (same-origin) — ${label}: ${themeRoot}`, () => {
			before(() => {
				cy.stub(internals, "search").callsFake(() => {
					return `sap-ui-theme=${THEME}@${themeRoot}`;
				});
				cy.wrap({ resetConfiguration }).invoke("resetConfiguration", true);
				cy.mount(<TestGeneric />);
			});

			it("should create a link element", () => {
				applyAndCheckLink(THEME);
				cy.get(`link[sap-ui-webcomponents-theme='${THEME}']`)
					.should("exist")
					.and("have.attr", "href")
					.and("include", `UI5/Base/baseLib/${THEME}/css_variables.css`);
			});
		});
	});
});
