import SuggestionItem from "../../src/SuggestionItem.js";
import MultiInput from "../../src/MultiInput.js";
import "../../src/Token.js";
import Token from "../../src/Token.js";
import Button from "../../src/Button.js";
import Input from "../../src/Input.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import SuggestionItemCustom from "../../src/SuggestionItemCustom.js";
import { MULTIINPUT_VALUE_HELP } from "../../src/generated/i18n/i18n-defaults.js";
import { TOKENIZER_SHOW_ALL_ITEMS } from "../../src/generated/i18n/i18n-defaults.js";
import { MULTIINPUT_SHOW_MORE_TOKENS } from "../../src/generated/i18n/i18n-defaults.js";

const createTokenFromText = (text: string): HTMLElement => {
	const token = document.createElement("ui5-token");
	token.setAttribute("text", text);
	token.setAttribute("slot", "tokens");
	return token;
};

const addTokenToMI = (token: HTMLElement, id: string) => {
	document.getElementById(id)?.appendChild(token);
};

const handleTokenDelete = (event) => {
	var mi = event.target;

	event.detail.tokens.forEach(token => {
		mi.removeChild(token);
	});
}

describe("MultiInput Web Component", () => {
	it("creates only one token when typing 'ad' and pressing Enter", () => {
		cy.mount(
			<MultiInput showSuggestions={true} showValueHelpIcon={true} id="suggestion-token">
				<SuggestionItem text="Aute"></SuggestionItem>
				<SuggestionItem text="ad"></SuggestionItem>
				<SuggestionItem text="exercitation"></SuggestionItem>
				<SuggestionItem text="esse"></SuggestionItem>
				<SuggestionItem text="labore"></SuggestionItem>
				<SuggestionItem text="amet"></SuggestionItem>
				<SuggestionItem text="aute"></SuggestionItem>
				<SuggestionItem text="excepteur"></SuggestionItem>
			</MultiInput>
		);

		cy.get("#suggestion-token").then(multiInput => {
			multiInput[0].addEventListener("keydown", (event: KeyboardEvent) => {
				const inputElement = multiInput[0] as HTMLInputElement;
				if (event.key === "Enter" && inputElement.value) {
					const token = createTokenFromText(inputElement.value);
					inputElement.appendChild(token);
					inputElement.value = "";
				}
			});
		});

		cy.get("#suggestion-token")
			.shadow()
			.find("input")
			.realClick();

		cy.realType("ad");
		cy.realPress("Enter");

		cy.get("[ui5-multi-input]")
			.find("[ui5-token]")
			.should("have.length", 1)
			.and("have.attr", "text", "ad");
	});

	it("Value Help announcement", () => {
		const valueHelpId = "hiddenText-value-help";

		cy.mount(<MultiInput showValueHelpIcon={true}></MultiInput>);

		cy.get("[ui5-multi-input]")
			.as("multiInput");

		cy.get("@multiInput")
			.shadow()
			.find("input")
			.should("have.attr", "aria-describedby")
			.and("include", valueHelpId);

		cy.get("@multiInput")
			.shadow()
			.find(`#${valueHelpId}`)
			.should("have.text", MULTIINPUT_VALUE_HELP.defaultText);
	});

	it("tests expanding of tokenizer", () => {
		cy.mount(
			<MultiInput id="basic-overflow">
				<Token slot="tokens" text="Amet"></Token>
				<Token slot="tokens" text="Incididunt"></Token>
				<Token slot="tokens" text="laboris"></Token>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.as("multiInput");

		cy.get("@multiInput")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@multiInput")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realPress("Tab");

		cy.get("@tokenizer")
			.should("have.prop", "expanded", false);
	});

	it("tests opening of tokenizer Popover", () => {
		cy.mount(
			<MultiInput id="basic-overflow">
				<Token slot="tokens" text="Amet"></Token>
				<Token slot="tokens" text="Incididunt"></Token>
				<Token slot="tokens" text="laboris"></Token>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.as("multiInput");

		cy.get("@multiInput")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer");

		cy.get("@tokenizer")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("nMoreLabel");

		cy.get("@nMoreLabel")
			.realClick();

		cy.get("@tokenizer")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("respPopover");

		cy.get("@respPopover")
			.ui5PopoverOpened();
	});

	it("fires value-help-trigger on icon press", () => {
		cy.mount(
			<MultiInput showValueHelpIcon={true} id="basic-overflow-and-icon">
				<Token slot="tokens" text="Amet"></Token>
			</MultiInput>
		);
		cy.get("[ui5-multi-input]")
			.as("multiInput");

		cy.get("@multiInput")
			.then($multiInput => {
				$multiInput[0].addEventListener("value-help-trigger", cy.stub().as("valueHelpTrigger"));
			});

		cy.get("@multiInput")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@valueHelpTrigger")
			.should("have.been.calledOnce");
	});

	it("fires value-help-trigger with F4 and Alt/Option + ArrowUp/Down", () => {
		cy.mount(
			<MultiInput id="multi-with-value-help-icon" showValueHelpIcon={true}></MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.as("multiInput");

		cy.get("@multiInput")
			.then($multiInput => {
				$multiInput[0].addEventListener("value-help-trigger", cy.stub().as("valueHelpTrigger"));
			});

		cy.get("@multiInput")
			.shadow()
			.find(".ui5-input-inner")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick();

		cy.get("@innerInput")
			.realPress(["Alt", "ArrowUp"]);

		cy.get("@valueHelpTrigger")
			.should("have.been.called");

		cy.get("@multiInput")
			.realPress("F4");

		cy.get("@valueHelpTrigger")
			.should("have.been.calledTwice");
	});
})

describe("MultiInput tokens", () => {
	it("adds a token to multi input", () => {
		cy.mount(
			<>
				<MultiInput id="single-token">
					<Token slot="tokens" text="Amet"></Token>
				</MultiInput>
				<Button id="add-to-single">Add more tokens</Button>
			</>
		);

		cy.get("[ui5-multi-input]")
			.as("multiInput");

		cy.get("[ui5-button]")
			.then(button => {
				button[0].addEventListener("click", () => {
					addTokenToMI(createTokenFromText("test"), "single-token");
				});
			});

		cy.get("[ui5-token]")
			.should("have.length", 1);

		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-token]")
			.should("have.length", "2");

		cy.get("[ui5-token]")
			.eq(0)
			.should("have.prop", "overflows", false);

		cy.get("[ui5-token]")
			.eq(1)
			.should("have.prop", "overflows", false);
	});

	it("adds multiple tokens to multi input", () => {
		cy.mount(
			<>
				<MultiInput id="no-tokens2"></MultiInput>
				<Button id="add-multiple-tokens">Add more tokens</Button>
			</>
		);

		cy.get("[ui5-button]")
			.then(button => {
				button[0].addEventListener("click", function (event) {
					addTokenToMI(createTokenFromText("One"), "no-tokens2");
					addTokenToMI(createTokenFromText("Two"), "no-tokens2");
				});
			});

		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-token]")
			.should("have.length", "2");

		cy.get("[ui5-token]")
			.eq(0)
			.should("have.prop", "overflows", false);

		cy.get("[ui5-token]")
			.eq(1)
			.should("have.prop", "overflows", false);
	});

	it("adds an overflowing token to multi input", () => {
		cy.mount(
			<>
				<MultiInput id="multiple-token">
					<Token slot="tokens" text="ea"></Token>
					<Token slot="tokens" text="eu"></Token>
					<Token slot="tokens" text="Incididunt"></Token>
					<Token slot="tokens" text="laboris"></Token>
					<Token slot="tokens" text="ipsum"></Token>
				</MultiInput>
				<Button id="add-to-multiple">Add more tokens</Button>
			</>
		);

		cy.get("[ui5-token]")
			.should("have.length", "5");

		cy.get("[ui5-token]")
			.eq(0)
			.should("not.have.attr", "overflows");

		cy.get("[ui5-token]")
			.eq(1)
			.should("not.have.attr", "overflows");

		cy.get("[ui5-token]")
			.eq(2)
			.should("have.attr", "overflows");

		cy.get("[ui5-token]")
			.eq(3)
			.should("have.attr", "overflows");

		cy.get("[ui5-token]")
			.eq(4)
			.should("have.attr", "overflows");

		cy.get("[ui5-button]")
			.then(button => {
				button[0].addEventListener("click", () => {
					addTokenToMI(createTokenFromText("test"), "multiple-token");
				});
			});

		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-token]")
			.should("have.length", "6");

		cy.get("[ui5-token]")
			.eq(5)
			.should("have.attr", "overflows");

	});

	it("Should fire a change event", () => {
		cy.mount(
			<MultiInput showSuggestions={true} showValueHelpIcon={true}>
				<SuggestionItem text="Aute" />
				<SuggestionItem text="ad" />
				<SuggestionItem text="exercitation" />
			</MultiInput>
		);

		const changeSpy = cy.stub().as("changeSpy");

		cy.get("[ui5-multi-input]").then(multiInput => {
			multiInput[0].addEventListener("ui5-change", changeSpy);
		});

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input")
			.realClick();
		cy.get("@input")
			.realType("a");

		cy.get("[ui5-suggestion-item]")
			.eq(0)
			.realClick();

		cy.get("@changeSpy").should("have.been.calledOnce");
	});

	it("should show suggestions (not tokens) when typing for a second token", () => {
		cy.mount(
			<MultiInput showSuggestions>
				<Token slot="tokens" text="Argentina"></Token>
				<SuggestionItem text="Bulgaria"></SuggestionItem>
				<SuggestionItem text="Brazil"></SuggestionItem>
				<SuggestionItem text="Belgium"></SuggestionItem>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.realType("b");

		cy.get("[ui5-multi-input]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-multi-input]")
			.find("[ui5-suggestion-item]")
			.should("have.length", 3)
			.should("be.visible");

		cy.get("@popover")
			.find("[ui5-list].ui5-tokenizer-list")
			.should("not.exist");
	});

	it("Tokens should not have delete icon when MI is readonly", () => {
		cy.mount(
			<MultiInput id="readonly-mi" readonly>
				<Token slot="tokens" text="Amet"></Token>
				<Token slot="tokens" text="Dolor"></Token>
			</MultiInput>
		);

		cy.get("[ui5-token]")
			.eq(0)
			.shadow()
			.find("[ui5-icon]")
			.should("not.exist");

		cy.get("[ui5-token]")
			.eq(1)
			.shadow()
			.find("[ui5-icon]")
			.should("not.exist");
	});

	it("Tokens should not have delete icon when MI is readonly and displayed in n-more popover", () => {
		cy.mount(
			<MultiInput id="readonly-mi" readonly>
				<Token slot="tokens" text="Amet"></Token>
				<Token slot="tokens" text="Dolor"></Token>
				<Token slot="tokens" text="esse"></Token>
				<Token slot="tokens" text="ad"></Token>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer");

		cy.get("@tokenizer")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("nMoreLabel");

		cy.get("@nMoreLabel")
			.realClick();

		cy.get("@tokenizer")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("respPopover");

		cy.get("@tokenizer")
			.shadow()
			.find("ui5-li")
			.as("liTokens");

		cy.get("@liTokens")
			.eq(0)
			.shadow()
			.find("[ui5-icon]")
			.should("not.exist");

		cy.get("@liTokens")
			.eq(1)
			.shadow()
			.find("[ui5-icon]")
			.should("not.exist");

		cy.get("@liTokens")
			.eq(3)
			.shadow()
			.find("[ui5-icon]")
			.should("not.exist");
	});

	it("should empty the field when value is cleared in the change handler", () => {
		cy.mount(
			<MultiInput showSuggestions id="token-unique" showValueHelpIcon>
				<div slot="valueStateMessage" id="value-state-wrapper">Token is already in the list</div>
				<SuggestionItem text="Argentina"></SuggestionItem>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.then(multiInput => {
				multiInput[0].addEventListener("ui5-value-help-trigger", function (event) {
					(event.target as ResponsivePopover).open = true;
				});
				multiInput[0].addEventListener("ui5-change", (event) => {
				(event.target as HTMLElement).appendChild(createTokenFromText((event.target as HTMLInputElement).value));
				(event.target as HTMLInputElement).value = "";
				});
			});

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("[ui5-icon]")
			.as("valueHelpIcon");

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@valueHelpIcon")
			.realClick();

		cy.get("[ui5-suggestion-item]")
			.realClick();

		cy.get("[ui5-multi-input]")
			.should("have.attr", "value", "");
	});

	it("Should apply correct text to the tokens overflow indicator", () => {

		cy.mount(
			<>
				<MultiInput id="mi-items">
					<Token text="Lorem ipsum" slot="tokens"></Token>
					<Token text="Lorem ipsum 1" slot="tokens"></Token>
				</MultiInput>
				<MultiInput id="mi-more">
					<Token text="Token 1" slot="tokens"></Token>
					<Token text="Enim do esse anim magna enim fugiat Lorem enim nostrud sit laborum ea." slot="tokens"></Token>
				</MultiInput>
			</>
		);

		cy.get("#mi-items").then(($miItems) => {
		const miItemsEl = $miItems[0];
		const i18nBundle = (miItemsEl.constructor as any).i18nBundle;
		const miItemsLabelText = i18nBundle.getText(TOKENIZER_SHOW_ALL_ITEMS.defaultText, 2);
		const miMoreLabelText = i18nBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS.defaultText, 1);

		cy.get("#mi-items")
			.shadow()
			.find("ui5-tokenizer")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.should("have.text", miItemsLabelText);

		cy.get("#mi-more")
			.shadow()
			.find("ui5-tokenizer")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.should("have.text", miMoreLabelText);
		});
	});

	it("Tests autocomplete(type-ahead) of custom suggestions", () => {
		cy.mount(
			<MultiInput id="mi-custom-suggestions" showSuggestions>
				<SuggestionItemCustom text="Bulgaria">
					<span>Bulgaria</span>
				</SuggestionItemCustom>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@input")
			.realClick();

		cy.get("@input")
			.type("b");

		cy.get("[ui5-multi-input]")
			.should("have.attr", "value", "Bulgaria");
	});
});
describe("MultiInput Truncated Token", () => {
	beforeEach(() => {
		cy.mount(
			<>
			<MultiInput id="truncated-token">
				<Token text="Enim do esse anim magna enim fugiat Lorem enim nostrud sit laborum ea." slot="tokens"></Token>
			</MultiInput>
			<Button id="dummyBtn">button</Button>
			</>
		);
		cy.get("[ui5-token]")
			.should("have.attr", "single-token");

		cy.get("[ui5-token]")
			.realClick();

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer");

		cy.get("@tokenizer")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("respPopover");

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("input");

		cy.get("@respPopover")
			.ui5PopoverOpened();

		cy.get("@tokenizer")
			.shadow()
			.find("ui5-li")
			.as("tokenLi");

		cy.get("@tokenLi")
			.should("have.focus");

		cy.get("[ui5-token]")
			.should("have.attr", "selected");
	});

	it("should open responsive popover on click on single truncated token and close and deselect the token on clicking it again", () => {

		cy.get("[ui5-token]")
			.realClick();

		cy.get("[ui5-token]")
			.should("have.focus");

		cy.get("[ui5-token]")
			.should("not.have.attr", "selected");

		cy.get("@respPopover")
			.should("not.have.property", "open");
	});

	it("should close truncation popover and deselect selected tokens when clicked outside the component", () => {
		cy.get("#dummyBtn")
			.realClick();

		cy.get("[ui5-token]")
			.should("not.have.focus");

		cy.get("[ui5-token]")
			.should("not.have.attr", "selected");

		cy.get("@respPopover")
			.should("not.have.property", "open");
	});

	it("should close truncation popover and deselect selected tokens when clicked in input field", () => {
		cy.get("@input")
			.realClick();

		cy.get("[ui5-token]")
			.should("not.have.focus");

		cy.get("[ui5-token]")
			.should("not.have.attr", "selected");

		cy.get("@respPopover")
			.should("not.have.property", "open");
	});

	it("should truncate token when a long token is added", () => {

		cy.mount(
			<>
			<MultiInput id="truncated-token"></MultiInput>
			<Button>button</Button>
			</>
		);

		cy.get("[ui5-multi-input]").then(multiInput => {
			multiInput[0].addEventListener("ui5-token-delete", handleTokenDelete);
		});

		cy.get("[ui5-button]").then(button => {
			button[0].addEventListener("click", () => {
				const longText = "Officia enim ullamco sunt sunt nisi ullamco cillum velit ullamco cillum velit ullamco cillum";
				addTokenToMI(createTokenFromText(longText), "truncated-token");
			});
		});

		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-token]")
			.realClick();

		cy.get("[ui5-token]")
			.should("have.attr", "selected");

		cy.get("[ui5-token]")
			.should("have.attr", "single-token");

		cy.get("@tokenizer")
			.shadow()
			.find("[ui5-responsive-popover]")
			.ui5PopoverOpened();
	});

	it("should not throw exception when MI with 1 token is added to the page", () => {
		cy.mount(
			<>
				<Button id="add-single-token">Add MultiInput with single token</Button>
				<div id="container"></div>
			</>
		);

		cy.get("[ui5-button]").then(button => {
			button[0].addEventListener("click", () => {
				cy.get("#container").then(container => {
					const multiInput = window.document.createElement("ui5-multi-input");
					multiInput.setAttribute("id", "added-mi");

					addTokenToMI(createTokenFromText("test"), "added-mi");
					container[0].appendChild(multiInput);
				});
			});
		});

		cy.get("[ui5-button]").realClick();

		cy.get("#added-mi")
			.should("exist")
			.and("be.visible");
	});
});

describe("ARIA attributes", () => {
	it("aria-describedby value according to the tokens count", () => {
		cy.mount(
			<>
				<MultiInput id="no-tokens" />
				<Button id="add-tokens" onClick={() => {
					const mi = document.getElementById("no-tokens");
					addTokenToMI(createTokenFromText("new token"), "no-tokens");
				}}>Add Token</Button>
			</>
		);
		cy.get("#no-tokens")
			.as("multiInput");

		cy.get("#add-tokens")
			.as("addButton");

		cy.get("@multiInput")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@multiInput")
			.shadow()
			.find(".ui5-hidden-text")
			.as("invisibleText");

		cy.get("@multiInput")
			.find("[ui5-token]")
			.should("have.length", 0);

		cy.get("@innerInput")
			.invoke("attr", "aria-describedby")
			.then((describedby) => {
				cy.get("@invisibleText")
					.invoke("attr", "id")
					.should("eq", describedby);
			});

		cy.get("@invisibleText")
			.invoke("text")
			.should("include", "No Tokens");

		cy.get("@addButton")
			.realClick();

		cy.get("@multiInput")
			.find("[ui5-token]")
			.should("have.length", 1);

		cy.get("@invisibleText")
			.invoke("text")
			.should("include", "Contains 1 token");

		cy.get("@addButton")
			.realClick();

		cy.get("@multiInput")
			.find("[ui5-token]")
			.should("have.length", 2);

		cy.get("@invisibleText")
			.invoke("text")
			.should("include", "Contains 2 tokens");
	});

	it("aria-describedby value according to the tokens and suggestions count", () => {
		cy.mount(
			<MultiInput
				id="suggestion-token"
				showSuggestions={true}
				showValueHelpIcon={true}
			>
				<SuggestionItem text="Aute" />
				<SuggestionItem text="ad" />
			</MultiInput>
		);

		cy.get("#suggestion-token")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick()
			.type("a");

		cy.get("@innerInput")
			.realPress("ArrowDown");

		cy.get("@innerInput")
			.realPress("Enter");

		cy.get("@innerInput")
			.invoke("attr", "aria-describedby")
			.then((describedby: string) => {
				expect(describedby).to.include("hiddenText-nMore");
				expect(describedby).to.include("suggestionsText");
				expect(describedby).to.include("hiddenText-value-help");
			});
	});

	it("aria-roledescription is set properly", () => {
		cy.mount(
			<MultiInput/>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.invoke("attr", "aria-roledescription")
			.should("eq", "Multi Value Input");
	});

	it("aria-haspopup attribute with value 'dialog'", () => {
		cy.mount(
			<MultiInput id="suggestion-token" showSuggestions={true} />
		);

		cy.get("#suggestion-token")
			.shadow()
			.find("input")
			.should("have.attr", "aria-haspopup", "dialog");
	});
})

describe("Keyboard handling", () => {
	it("left/right arrow navigation", () => {
		cy.mount(
			<MultiInput id="basic-overflow">
				<Token slot="tokens" text="laboris"></Token>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick();

		cy.realPress("ArrowLeft");

		cy.get("[ui5-multi-input]")
			.should("not.be.focused");

		cy.get("[ui5-token]")
			.should("be.focused");

		cy.realPress("ArrowRight");

		cy.get("[ui5-token]")
			.should("not.be.focused");

		cy.get("[ui5-multi-input]")
			.should("be.focused");
	});

	it("home/end navigation", () => {
		cy.mount(
			<MultiInput id="basic-overflow">
				<Token slot="tokens" text="Amet"></Token>
				<Token slot="tokens" text="Incididunt"></Token>
				<Token slot="tokens" text="laboris"></Token>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick();

		cy.realPress("Home");

		cy.get("[ui5-token]")
			.eq(0)
			.should("be.focused");

		cy.realPress("End");

		cy.get("[ui5-token]")
			.eq(2)
			.should("be.focused");

		cy.realPress("End");

		cy.get("[ui5-token]")
			.eq(2)
			.should("not.be.focused");

	});

	it("should select tokens with key modifiers (Shift + [Ctrl])", () => {
		cy.mount(
			<MultiInput id="basic-overflow">
			<Token slot="tokens" text="eu"></Token>
			<Token slot="tokens" text="amet"></Token>
			<Token slot="tokens" text="do"></Token>
		</MultiInput>
		);
		cy.get("[ui5-multi-input]")
		.shadow()
		.find("input")
		.as("innerInput");

		cy.get("[ui5-token]")
			.as("tokens");

		cy.get("@innerInput")
			.realClick();

		cy.realPress("ArrowLeft");

		cy.realPress(["Shift", "ArrowLeft"]);

		cy.get("@tokens")
			.eq(0)
			.should("not.have.attr", "selected");

		cy.get("@tokens")
			.eq(2)
			.should("have.attr", "selected");

		cy.get("@tokens")
			.eq(1)
			.should("have.attr", "selected");

		// Press Ctrl + Shift + ArrowLeft to select three tokens
		cy.realPress(["Control", "Shift", "ArrowLeft"]);

		cy.get("@tokens")
			.eq(2)
			.should("have.attr", "selected");

		cy.get("@tokens")
			.eq(1)
			.should("have.attr", "selected");

		cy.get("@tokens")
			.eq(0)
			.should("have.attr", "selected");

		cy.get("@tokens")
			.eq(1)
			.realClick();

		cy.get("@tokens")
			.eq(2)
			.should("not.have.attr", "selected");

		cy.get("@tokens")
			.eq(1)
			.should("not.have.attr", "selected");

		cy.get("@tokens")
			.eq(1)
			.should("be.focused");

		cy.get("@tokens")
			.eq(0)
			.should("not.have.attr", "selected");
	});

	it("should move caret to start of input, when a value is present and Home is pressed", () => {
		cy.mount(
			<MultiInput id="two-tokens" value="abc">
				<Token slot="tokens" id="firstToken" text="aa"></Token>
				<Token slot="tokens" id="secondToken" text="bb"></Token>
			</MultiInput>
		)

		cy.get("#two-tokens")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick();

		cy.realPress("End");

		cy.get("@innerInput").then($input => {
			const inputEl = $input[0];
			expect((inputEl as HTMLInputElement).selectionStart).to.equal(3);
			expect((inputEl as HTMLInputElement).selectionEnd).to.equal(3);
		});

		cy.get("@innerInput")
			.realPress("Home");

		cy.get("@innerInput").then($input => {
			const inputEl = $input[0];
			expect((inputEl as HTMLInputElement).selectionStart).to.equal(0);
			expect((inputEl as HTMLInputElement).selectionEnd).to.equal(0);
		});

		cy.get("[ui5-token]")
			.eq(0)
			.should("have.prop", "focused", false);

		cy.get("@innerInput")
			.realPress("Home");

		cy.get("[ui5-token]")
			.eq(0)
			.should("have.prop", "focused", true);
	});

	it("Should focus the input when all tokens are deleted", () => {
		cy.mount(
			<MultiInput id="two-tokens">
				<Token slot="tokens" id="firstToken" text="aa"></Token>
				<Token slot="tokens" id="secondToken" text="bb"></Token>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.then(multiInput => {
				const handleTokenDelete = (event) => {
					var mi = event.target;

					event.detail.tokens.forEach(token => {
						mi.removeChild(token);
					});
				}
				multiInput[0].addEventListener("ui5-token-delete", handleTokenDelete);
			});

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick();

		cy.realPress("ArrowLeft");
		cy.realPress(["Shift", "ArrowLeft"]);

		cy.realPress("Backspace");

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("[ui5-token]")
			.should("have.length", 0);

		cy.get("[ui5-multi-input]")
			.should("be.focused");
	});

	it("should focus token on backspace for inputs of type 'Number' and 'Email'", () => {
		cy.mount(
			<MultiInput id="two-tokens">
				<Token slot="tokens" id="firstToken" text="aa"></Token>
				<Token slot="tokens" id="secondToken" text="bb"></Token>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("[ui5-token]")
			.eq(1)
			.as("lastToken");

		// Set the input type to 'Number'
		cy.get("@innerInput")
			.invoke("attr", "type", "number");

		cy.get("@innerInput")
			.realClick();

		cy.realPress("Backspace");

		cy.get("@lastToken")
			.should("be.focused");
	});

	it("should focus token last token when caret is at the beginning of the value", () => {
		cy.mount(
			<MultiInput id="two-tokens" value="abc">
				<Token slot="tokens" id="firstToken" text="aa"></Token>
				<Token slot="tokens" id="secondToken" text="bb"></Token>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick();

		cy.realPress("ArrowLeft");
		cy.realPress("ArrowLeft");
		cy.realPress("ArrowLeft");

		cy.realPress("Backspace");

		cy.get("[ui5-token]")
			.eq(1)
			.should("be.focused");
	});

	// Test is skipped for now as it fails randomly
	it.skip("should delete value on backspace", () => {
		cy.mount(
			<MultiInput id="two-tokens" value="abc">
				<Token slot="tokens" id="firstToken" text="aa"></Token>
				<Token slot="tokens" id="secondToken" text="bb"></Token>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("[ui5-token]")
			.eq(1)
			.as("lastToken");

		cy.get("@innerInput").realClick();
		cy.realPress(["Control", "a"]);

		cy.realPress("Backspace");
		cy.get("@innerInput").should("have.value", "");

		cy.realPress("Backspace");

		cy.get("[ui5-multi-input]").should("not.be.focused");
		cy.get("@lastToken").should("be.focused");
	});

	it("should change input's value when set in selection change event", () => {
		cy.mount(
			<MultiInput showSuggestions showValueHelpIcon>
				<SuggestionItem text="Aute"></SuggestionItem>
				<SuggestionItem text="ad"></SuggestionItem>
				<SuggestionItem text="exercitation"></SuggestionItem>
				<SuggestionItem text="esse"></SuggestionItem>
				<SuggestionItem text="labore"></SuggestionItem>
				<SuggestionItem text="amet"></SuggestionItem>
				<SuggestionItem text="aute"></SuggestionItem>
				<SuggestionItem text="excepteur"></SuggestionItem>
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.then(multiInput => {
				multiInput[0].addEventListener("keydown", (event: KeyboardEvent) => {
					const inputElement = multiInput[0] as HTMLInputElement;
					if (event.key === "Enter" && inputElement.value) {
						const token = createTokenFromText(inputElement.value);
						inputElement.appendChild(token);
						inputElement.value = "";
					}
				});
			})

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick();

		cy.realType("a");
		cy.realPress("Enter");

		cy.get("[ui5-multi-input]")
			.should("have.value", "")

		cy.get("@innerInput")
			.realPress("ArrowLeft")

		cy.get("[ui5-multi-input]")
			.should("not.be.focused");

		cy.get("@innerInput")
			.realPress("ArrowRight")

		cy.get("[ui5-multi-input]")
			.should("be.focused");
	});

	it("should focus text field always when focus in", () => {
		cy.mount(
			<>
				<Button id="dummyBtn">Dummy Button</Button>
				<MultiInput id="one-token">
					<Token slot="tokens" text="Sample Token"></Token>
				</MultiInput>
			</>
		);
		cy.get("[ui5-multi-input]")
			.realClick();

		cy.realPress("ArrowLeft");

		cy.realPress(["Shift", "Tab"]);
		cy.realPress("Tab");

		cy.get("#one-token")
			.should("be.focused");
	});

	it("should trigger change event on enter", () => {
		cy.mount(
			<MultiInput showSuggestions id="token-unique" showValueHelpIcon>
				<div slot="valueStateMessage" id="value-state-wrapper">Token is already in the list</div>
				<SuggestionItem text="Argentina" />
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
		.then(multiInput => {

			multiInput[0].addEventListener("ui5-change", function (event) {
				const target = event.target as HTMLInputElement;
				if (!target.value) {
					return;
				}

				var isDuplicate = (event.target as MultiInput).tokens.some(function(token) {
					return token.text === (event.target as HTMLInputElement).value
				});

				if (isDuplicate) {
					(event.target as Input).valueState = "Negative";

					setTimeout(function () {
						(event.target as Input).valueState = "None";
					}, 200);

					return;
				}

				(event.target as HTMLElement).appendChild(createTokenFromText((event.target as HTMLInputElement).value));
				(event.target as HTMLInputElement).value = "";
			});
		});

		 cy.get("[ui5-multi-input]")
		 	.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick();

		cy.realType("a");
		cy.realPress("Enter");

		cy.get("@innerInput")
			.realClick();
		cy.realType("a");
		cy.realPress("Enter");

		cy.get("[ui5-multi-input]")
			.should("have.attr", "value-state", "Negative");

		// Pause and check if value state changes to None
		cy.get("[ui5-multi-input]", {timeout: 250});

		cy.get("[ui5-multi-input]")
			.should("have.attr", "value-state", "None");
	});

	it("should trigger change event on enter with no suggestions", () => {
		const changeSpy = cy.stub().as("changeSpy");
		cy.mount(
			<MultiInput onChange={changeSpy}></MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.shadow()
			.find("input")
			.realClick();

		cy.realType("asd");
		cy.realPress("Enter");

		cy.get("@changeSpy")
			.should("have.been.calledOnce");
	});
});

describe("MultiInput Composition", () => {
	it("should handle Korean composition correctly", () => {
		cy.mount(
			<MultiInput
				id="multiinput-composition-korean"
				showSuggestions
				placeholder="Type in Korean ..."
			>
				<SuggestionItem text="안녕하세요" />
				<SuggestionItem text="고맙습니다" />
				<SuggestionItem text="사랑" />
				<SuggestionItem text="한국" />
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.as("multiinput")
			.realClick();

		cy.get("@multiinput")
			.shadow()
			.find("input")
			.as("nativeInput")
			.focus();

		cy.get("@nativeInput").trigger("compositionstart", { data: "" });

		cy.get("@multiinput").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionupdate", { data: "사랑" });

		cy.get("@multiinput").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionend", { data: "사랑" });

		cy.get("@nativeInput")
			.invoke("val", "사랑")
			.trigger("input", { inputType: "insertCompositionText" });

		cy.get("@multiinput").should("have.prop", "_isComposing", false);

		cy.get("@multiinput").should("have.attr", "value", "사랑");

		cy.get("@multiinput")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@multiinput")
			.realPress("Enter");

		cy.get("@multiinput").should("have.attr", "value", "사랑");
	});

	it("should handle Japanese composition correctly", () => {
		cy.mount(
			<MultiInput
				id="multiinput-composition-japanese"
				showSuggestions
				placeholder="Type in Japanese ..."
			>
				<SuggestionItem text="こんにちは" />
				<SuggestionItem text="ありがとう" />
				<SuggestionItem text="東京" />
				<SuggestionItem text="日本" />
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.as("multiinput")
			.realClick();

		cy.get("@multiinput")
			.shadow()
			.find("input")
			.as("nativeInput")
			.focus();

		cy.get("@nativeInput").trigger("compositionstart", { data: "" });

		cy.get("@multiinput").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionupdate", { data: "ありがとう" });

		cy.get("@multiinput").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionend", { data: "ありがとう" });

		cy.get("@nativeInput")
			.invoke("val", "ありがとう")
			.trigger("input", { inputType: "insertCompositionText" });

		cy.get("@multiinput").should("have.prop", "_isComposing", false);

		cy.get("@multiinput").should("have.attr", "value", "ありがとう");

		cy.get("@multiinput")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@multiinput")
			.realPress("Enter");

		cy.get("@multiinput").should("have.attr", "value", "ありがとう");
	});

	it("should handle Chinese composition correctly", () => {
		cy.mount(
			<MultiInput
				id="multiinput-composition-chinese"
				showSuggestions
				placeholder="Type in Chinese ..."
			>
				<SuggestionItem text="你好" />
				<SuggestionItem text="谢谢" />
				<SuggestionItem text="北京" />
				<SuggestionItem text="中国" />
			</MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.as("multiinput")
			.realClick();

		cy.get("@multiinput")
			.shadow()
			.find("input")
			.as("nativeInput")
			.focus();

		cy.get("@nativeInput").trigger("compositionstart", { data: "" });

		cy.get("@multiinput").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionupdate", { data: "谢谢" });

		cy.get("@multiinput").should("have.prop", "_isComposing", true);

		cy.get("@nativeInput").trigger("compositionend", { data: "谢谢" });

		cy.get("@nativeInput")
			.invoke("val", "谢谢")
			.trigger("input", { inputType: "insertCompositionText" });

		cy.get("@multiinput").should("have.prop", "_isComposing", false);

		cy.get("@multiinput").should("have.attr", "value", "谢谢");

		cy.get("@multiinput")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@multiinput")
			.realPress("Enter");

		cy.get("@multiinput").should("have.attr", "value", "谢谢");
	});
});
