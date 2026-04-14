import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { resetConfiguration } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";
import Formatting from "@ui5/webcomponents-localization/dist/sap/base/i18n/Formatting.js";
import Localization from "@ui5/webcomponents-localization/dist/sap/base/i18n/Localization.js";

const setLang = async (lang: string) => {
	await setLanguage(lang);
};

const reset = () => {
	resetConfiguration(true);
};

describe("Localization shim - getLanguageTag", () => {
	afterEach(() => {
		reset();
	});

	it("returns the configured language as a full BCP47 tag", () => {
		cy.wrap(null).then(async () => {
			await setLang("de-DE");
		});

		cy.wrap(Localization)
			.invoke("getLanguageTag")
			.should("equal", "de-DE");
	});

	it("preserves region subtag (en-US)", () => {
		cy.wrap(null).then(async () => {
			await setLang("en-US");
		});

		cy.wrap(Localization)
			.invoke("getLanguageTag")
			.should("equal", "en-US");
	});

	it("preserves region subtag (en-GB)", () => {
		cy.wrap(null).then(async () => {
			await setLang("en-GB");
		});

		cy.wrap(Localization)
			.invoke("getLanguageTag")
			.should("equal", "en-GB");
	});

	it("lowercases the language part", () => {
		cy.wrap(null).then(async () => {
			await setLang("DE");
		});

		cy.wrap(Localization)
			.invoke("getLanguageTag")
			.should("satisfy", (tag: string) => tag.startsWith("de"));
	});

	it("handles language with script subtag (zh-Hans)", () => {
		cy.wrap(null).then(async () => {
			await setLang("zh-Hans");
		});

		cy.wrap(Localization)
			.invoke("getLanguageTag")
			.should("equal", "zh-Hans");
	});

	it("handles language with script and region (zh-Hans-CN)", () => {
		cy.wrap(null).then(async () => {
			await setLang("zh-Hans-CN");
		});

		cy.wrap(Localization)
			.invoke("getLanguageTag")
			.should("equal", "zh-Hans-CN");
	});

	it("returns a string, not an object", () => {
		cy.wrap(null).then(async () => {
			await setLang("fr-FR");
		});

		cy.wrap(Localization)
			.invoke("getLanguageTag")
			.should("be.a", "string");
	});
});

describe("Formatting shim - getLanguageTag", () => {
	afterEach(() => {
		reset();
	});

	it("returns the configured language as a full BCP47 tag", () => {
		cy.wrap(null).then(async () => {
			await setLang("de-DE");
		});

		cy.wrap(Formatting)
			.invoke("getLanguageTag")
			.should("equal", "de-DE");
	});

	it("returns the same value as Localization.getLanguageTag", () => {
		cy.wrap(null).then(async () => {
			await setLang("ja-JP");
		});

		cy.wrap(Formatting)
			.invoke("getLanguageTag")
			.then(formattingTag => {
				cy.wrap(Localization)
					.invoke("getLanguageTag")
					.should("equal", formattingTag);
			});
	});

	it("preserves region subtag (en-US)", () => {
		cy.wrap(null).then(async () => {
			await setLang("en-US");
		});

		cy.wrap(Formatting)
			.invoke("getLanguageTag")
			.should("equal", "en-US");
	});

	it("returns a string, not an object", () => {
		cy.wrap(null).then(async () => {
			await setLang("fr-FR");
		});

		cy.wrap(Formatting)
			.invoke("getLanguageTag")
			.should("be.a", "string");
	});
});
