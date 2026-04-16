import { assert } from "chai";

describe("Some settings can be set via SAP UI URL params", () => {
	beforeEach(async () => {
		await browser.url("test/pages/Configuration.html?sap-ui-rtl=true&sap-ui-language=ja&sap-ui-calendarType=Japanese&sap-ui-theme=sap_belize_hcb@https://example.com&sap-ui-animationMode=basic");
	});

	it("Tests that language is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getLanguage());
		});
		assert.strictEqual(res, 'ja', "language is japanese");
	});

	it("Tests that calendarType is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getCalendarType());
		});
		assert.strictEqual(res, 'Japanese', "calendarType is japanese");
	});

	it("Tests that theme is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getTheme());
		});
		assert.strictEqual(res, 'sap_belize_hcb', "Theme is HCB");
	});

	it("Tests that theme root is applied", async () => {
		let location;
		let res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getThemeRoot());
		});
		assert.strictEqual(res, 'https://example.com', "Theme root is https://example.com");

		// The origin https://example.com is allowed via sap-allowedThemeOrigins meta tag,
		// so the link should be added to the DOM.
		let linkHref = await browser.executeAsync(done => {
			const link = document.querySelector(`head > link[sap-ui-webcomponents-theme="sap_belize_hcb"]`);
			done(link ? link.href : null);
		});
		assert.ok(linkHref, "A theme link is added to the DOM for an allowed origin");
		assert.include(linkHref, "https://example.com", "Theme link href contains the allowed theme root");
		assert.include(linkHref, "sap_belize_hcb/css_variables.css", "Theme link href points to the theme CSS variables file");

		await browser.url("test/pages/Configuration.html?sap-ui-theme=sap_belize_hcb@https://another-example.com");

		res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getThemeRoot());
		});
		location = await browser.executeAsync(done => {
			done(window.location);
		});

		assert.strictEqual(res, `${location.origin}`, `Theme root is ${location.origin}`);

		// The origin https://another-example.com is not in allowed origins and is cross-origin,
		// so validation fails and no link should be added to the DOM.
		linkHref = await browser.executeAsync(done => {
			const link = document.querySelector(`head > link[sap-ui-webcomponents-theme="sap_belize_hcb"]`);
			done(link ? link.href : null);
		});
		assert.isNull(linkHref, "No theme link is added to the DOM for a disallowed cross-origin theme root");

		await browser.url("test/pages/Configuration.html?sap-ui-theme=sap_belize_hcb@./test");

		res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getThemeRoot());
		});

		assert.strictEqual(res, "./test", `Theme root is ./test`);

		// A relative URL is treated as same-origin, so the link should be added to the DOM.
		linkHref = await browser.executeAsync(done => {
			const link = document.querySelector(`head > link[sap-ui-webcomponents-theme="sap_belize_hcb"]`);
			done(link ? link.href : null);
		});
		assert.ok(linkHref, "A theme link is added to the DOM for a relative theme root");
		assert.include(linkHref, "sap_belize_hcb/css_variables.css", "Theme link href points to the theme CSS variables file");
	});

	it("Tests that animationMode is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getAnimationMode());
		});
		assert.strictEqual(res, 'basic', "animationMode is basic");
	});
});


describe("Some settings can be set via SAP URL params", () => {
	before(async () => {
		await browser.url("test/pages/Configuration.html?sap-language=bg&sap-theme=sap_fiori_3_dark");
	});

	it("Tests that language is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getLanguage());
		});
		assert.strictEqual(res, 'bg', "language is bulgarian");
	});

	it("Tests that theme is applied", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getTheme());
		});
		assert.strictEqual(res, 'sap_fiori_3_dark', "Theme is Fiori Dark");
	});
});


describe("SAP UI params take precedence over the SAP params", () => {
	before(async () => {
		await browser.url("test/pages/Configuration.html?sap-language=bg&sap-ui-language=de&sap-theme=sap_fiori_3_dark&sap-theme=sap_fiori_3_hcb");
	});

	it("Tests that language is applied via sap-ui-language", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getLanguage());
		});
		assert.strictEqual(res, 'de', "language is german");
	});

	it("Tests that theme is applied via sap-ui-theme", async () => {
		const res = await browser.executeAsync(done => {
			const config = window['sap-ui-webcomponents-bundle'].configuration;
			done(config.getTheme());
		});
		assert.strictEqual(res, 'sap_fiori_3_hcb', "Thems is Fiori HCB");
	});
});