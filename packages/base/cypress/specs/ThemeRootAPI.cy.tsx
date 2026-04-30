import TestGeneric from "../../test/test-elements/Generic.js";
import { setThemeRoot } from "../../src/config/ThemeRoot.js";
import { getTheme } from "../../src/config/Theme.js";
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

describe("ThemeRoot via setThemeRoot API — without meta tag", () => {
	before(() => {
		cy.mount(<TestGeneric />);
	});

	afterEach(() => {
		removeThemeLink();
		cy.wrap({ setThemeRoot }).invoke("setThemeRoot", undefined);
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
		it(`${blocked ? "should not create" : "should create"} a link element — ${label}: ${themeRoot}`, () => {
			cy.wrap({ setThemeRoot }).invoke("setThemeRoot", themeRoot);
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

// ─── With meta tag ────────────────────────────────────────────────────────────

describe("ThemeRoot via setThemeRoot API — with meta tag (allowed: http://example.com)", () => {
	before(() => {
		addMetaTag("http://example.com");
		cy.mount(<TestGeneric />);
	});

	afterEach(() => {
		removeThemeLink();
		cy.wrap({ setThemeRoot }).invoke("setThemeRoot", undefined);
	});

	after(() => {
		removeMetaTag();
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
		it(`should not create a link element — blocked: ${label}: ${themeRoot}`, () => {
			cy.wrap({ setThemeRoot }).invoke("setThemeRoot", themeRoot);
			applyAndCheckLink(THEME);
			cy.get(`link[sap-ui-webcomponents-theme='${THEME}']`).should("not.exist");
		});
	});

	allowed.forEach(({ label, themeRoot, expectedHref }) => {
		it(`should create a link element with correct href — allowed: ${label}: ${themeRoot}`, () => {
			cy.wrap({ setThemeRoot }).invoke("setThemeRoot", themeRoot);
			applyAndCheckLink(THEME);
			cy.get(`link[sap-ui-webcomponents-theme='${THEME}']`)
				.should("exist")
				.and("have.attr", "href", expectedHref);
		});
	});

	sameOriginAllowed.forEach(({ label, themeRoot }) => {
		it(`should create a link element — same-origin: ${label}: ${themeRoot}`, () => {
			cy.wrap({ setThemeRoot }).invoke("setThemeRoot", themeRoot);
			applyAndCheckLink(THEME);
			cy.get(`link[sap-ui-webcomponents-theme='${THEME}']`)
				.should("exist")
				.and("have.attr", "href")
				.and("include", `UI5/Base/baseLib/${THEME}/css_variables.css`);
		});
	});
});
