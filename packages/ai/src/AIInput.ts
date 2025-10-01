import { customElement, property, slot } from "@ui5/webcomponents-base";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import AIInputTemplate from "./AIInputTemplate.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import AIInputCss from "./generated/themes/AIInput.css.js";
import InputCss from "@ui5/webcomponents/src/generated/themes/Input.css.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

import "@ui5/webcomponents-icons/dist/arrow-left.js";
import "@ui5/webcomponents-icons/dist/arrow-right.js";
import type Menu from "@ui5/webcomponents/src/Menu.js";
import SuggestionsCss from "@ui5/webcomponents/src/generated/themes/Suggestions.css.js";
import ValueStateMessageCss from "@ui5/webcomponents/src/generated/themes/ValueStateMessage.css.js";
import ResponsivePopoverCommonCss from "@ui5/webcomponents/src/generated/themes/ResponsivePopoverCommon.css.js";

type VersionClickEventDetail1 = {
    backwards: boolean;
}

@customElement({
    tag: "ui5-ai-input",
    languageAware: true,
    renderer: jsxRenderer,
    template: AIInputTemplate,
    styles: [
        AIInputCss,
        InputCss,
        ResponsivePopoverCommonCss,
        ValueStateMessageCss,
        SuggestionsCss,
    ]
})

/**
 * Fired when the user presses generating button while loading.
 * @public
 */
@event("stop-generation")


@event("generate-icon-click")

class AIInput extends Input {
    eventDetails!: Input["eventDetails"] & {
        "version-change": VersionClickEventDetail1,
        "stop-generation": null;
        "generate-icon-click": { clickTarget: HTMLElement };
    };

    @property({ type: Number })
    currentVersionIndex = 0;

    // @property()
    // menuItems: Array<{ text: string}> = [];

    /**
     * Indicates the total number of result versions available.
     *
     * When not set or `0`, versioning UI will be hidden.
     *
     * @default 0
     * @public
     */
    @property({ type: Number })
    totalVersions = 0;

    @property({ type: Boolean })
    loading: boolean = false;

    /**
     * Indicates if the menu is open.
     * @default 0
     * @private
     */
    @property({ type: Boolean })
    _isMenuOpen: boolean = false;

    @slot({
        type: HTMLElement,
        // "default": true,
        invalidateOnChildChange: true
    })
    menuItems!: Array<HTMLElement>;

    isFocused: boolean = false;
    // loading: boolean = false;


    // onEnterDOM(): void {
    //     debugger;
    // }

    onBeforeRendering(): void {
        super.onBeforeRendering();
        const menu = this.menu;

            menu?.addEventListener("item-click", (e: Event) => {
                const customEvent = e as CustomEvent;
                this.dispatchEvent(new CustomEvent("item-click", {
                    detail: customEvent.detail,   // { item: <ui5-menu-item> }
                    bubbles: true,
                    composed: true
                }));
            });
        }

    _onfocusin(e: FocusEvent): void {
        super._onfocusin(e);
        this.isFocused = true;
    }

    _onfocusout(e: FocusEvent): void {
        super._onfocusout(e);
        this.isFocused = false;
    }

    _manageFocus() {
        const previousButton = this.shadowRoot?.querySelectorAll("ui5-button")[0] as HTMLElement;
        const nextButton = this.shadowRoot?.querySelectorAll("ui5-button")[1] as HTMLElement;
        const isPreviousDisabled = this.currentVersionIndex <= 1;
        const isNextDisabled = this.currentVersionIndex >= this.totalVersions;

        if (isPreviousDisabled && previousButton) {
            setTimeout(() => {
                nextButton.focus();
            }, 0)

        } else if (isNextDisabled && nextButton) {
            setTimeout(() => {
                previousButton.focus();
            }, 0);
        }
    }

    _handleAIIconClick(e: CustomEvent) {
        const target = e.target as HTMLElement & { name?: string };
        if (target?.name === "stop") {
            this.fireDecoratorEvent("stop-generation");
        } else {
            const menu = this.shadowRoot?.querySelector("ui5-menu") as Menu;
            this.fireDecoratorEvent("generate-icon-click", { clickTarget: target });
            menu.opener = target;
            menu.open = true;
        }
    }


    // _handleVersionChange(e: CustomvEent<{ backwards: boolean }>) {
	// 	this.fireDecoratorEvent("version-change", { backwards: e.detail.backwards });
	// 	this._syncEditorContent();
	// }
    _onVersionChange(e: CustomEvent<{ backwards: boolean }>) {
        this.fireDecoratorEvent("version-change", {
            backwards: e.detail.backwards
        });

    }

    _handleArrowLeftClick() {
        if (this.currentVersionIndex > 1) {
            this.currentVersionIndex--;
            this._onVersionChange(new CustomEvent("version-change", { detail: { backwards: true }}));
            this._manageFocus();
        }
    }

    _handleArrowRightClick() {
        if (this.currentVersionIndex < this.totalVersions) {
            this.currentVersionIndex++;
            this._onVersionChange(new CustomEvent("version-change", { detail: { backwards: false }}));
            this._manageFocus();
        }

    }

    _onkeydown(e: KeyboardEvent): void {
        super._onkeydown(e);
        const menu = this.shadowRoot?.querySelector("ui5-menu") as Menu;
        menu.opener = this.shadowRoot?.getElementById("ai-menu-icon");

        if (e.key === "F4" && e.shiftKey) {
            e.preventDefault();
            menu.open = true;
            // keep existing key handling logic...
        }
        const goPreviousStep = e.key == "Z" && e.shiftKey && e.ctrlKey;
        const goNextStep = e.key == "Y" && e.shiftKey && e.ctrlKey;

        if (goPreviousStep) {
            e.preventDefault();

            if (this.currentVersionIndex <= 1) {
                return;
            }
            this._onVersionChange(new CustomEvent("version-change", { detail: { backwards: true }}));
            menu.open = true;

            this._manageFocus();

        } else if (goNextStep) {
            e.preventDefault();

            if (this.currentVersionIndex < this.totalVersions) {
                this.currentVersionIndex++;
            }
            this._onVersionChange(new CustomEvent("version-change", { detail: { backwards: false }}));

            menu.open = true;
            this._manageFocus();
        }
    }
     get iconAccName() {
        return "AI Writing Assistant (Shift + F4)";
    }

    get menu() {
        return this.shadowRoot?.querySelector("ui5-menu");
    }

}

AIInput.define();

export default AIInput;