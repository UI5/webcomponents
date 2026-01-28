import { setLanguage } from "../../src/config/Language.js";
import { registerI18nLoader, getI18nBundle } from "../../src/i18nBundle.js";
import parseProperties from "../../src/PropertiesFileFormat.js";
import I18nParent from "../../test/test-elements/I18nParent.js";
import I18nChild from "../../test/test-elements/I18nChild.js";
import I18nChild2 from "../../test/test-elements/I18nChild2.js";

const props = `PLEASE_WAIT=Patientez.
TEST_1=Text '{0}
TEST_2=Text ''{0}
TEST_3=Text ''{0}''
TEST_4=Text
TEST_5=Text '
TEST_6=Text ''
TEST_7=Text {0}
TEST_8=Text '{0}'
TEST_9=Text '{0}''`;

const texts = [
	{ key: "TEST_1", result: "Text {0}" },
	{ key: "TEST_2", result: "Text 'test" },
	{ key: "TEST_3", result: "Text 'test'" },
	{ key: "TEST_4", result: "Text" },
	{ key: "TEST_5", result: "Text '" },
	{ key: "TEST_6", result: "Text '" },
	{ key: "TEST_7", result: "Text test" },
	{ key: "TEST_8", result: "Text {0}" },
	{ key: "TEST_9", result: "Text {0}'" }
];

describe("i18n texts", () => {
	beforeEach(() => {
		cy.wrap({ setLanguage, registerI18nLoader, getI18nBundle })
			.then(async api => {
				// eslint-disable-next-line @typescript-eslint/require-await
				api.registerI18nLoader("myApp", "fr", async () => {
					return parseProperties(props);
				});

				await api.setLanguage("fr");
			});
	});

	it("Getting text from current language", () => {
		cy.wrap({ getI18nBundle })
			.then(async api => {
				const bundle = await api.getI18nBundle("myApp");

				return bundle.getText("PLEASE_WAIT");
			})
			.should("equal", "Patientez.");

		cy.wrap({ setLanguage })
			.then(async api => {
				await api.setLanguage("bg");
			});

		cy.wrap({ getI18nBundle })
			.then(async api => {
				const bundle = await api.getI18nBundle("myApp");

				return bundle.getText("PLEASE_WAIT");
			})
			.should("equal", "PLEASE_WAIT");
	});

	// Single quote ' escape some symbols after it. For example: "Text '{0}" will result in "Text {0}". To use single
	// quote you have to use: ''
	it("Single quote '", () => {
		texts.forEach(textData => {
			cy.wrap({ getI18nBundle })
				.then(async api => {
					const bundle = await api.getI18nBundle("myApp");

					return bundle.getText(textData.key, "test");
				})
				.should("equal", textData.result);
		});
	});
});

describe("i18n decorator", () => {
	beforeEach(() => {
		cy.wrap({ setLanguage, registerI18nLoader })
			.then(async api => {
				// eslint-disable-next-line @typescript-eslint/require-await
				api.registerI18nLoader("custom-language", "bg", async () => {
					return parseProperties(`PLEASE_WAIT=Моля изчакайте`);
				});

				// eslint-disable-next-line @typescript-eslint/require-await
				api.registerI18nLoader("another-custom-language", "bg", async () => {
					return parseProperties(`SOME_KEY=Някакъв ключ`);
				});

				await api.setLanguage("bg");
			});
	});

	it("Bundle is accessed from every class", () => {
		cy.mount(<>
			<I18nParent />
			<I18nChild />
		</>);

		cy.get("[i18n-parent]")
			.invoke("prop", "i18nText")
			.should("be.equal", "Моля изчакайте");

		cy.get("[i18n-child]")
			.invoke("prop", "i18nText")
			.should("be.equal", "Моля изчакайте");
	});

	it("Bundle storage works correctly", () => {
		cy.mount(<>
			<I18nParent />
			<I18nChild2 />
		</>);

		cy.get("[i18n-parent]")
			.invoke("prop", "i18nText")
			.should("be.equal", "Моля изчакайте");

		cy.get("[i18n-child2]")
			.invoke("prop", "i18nText")
			.should("be.equal", "Някакъв ключ");
	});
});
