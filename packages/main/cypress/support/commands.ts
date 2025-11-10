/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import "@ui5/cypress-internal/commands.js";
import { internals, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { ModifierKey } from "./commands/common/types.js";

// Please keep this list in alphabetical order
import "./commands/Calendar.commands.js";
import "./commands/ColorPalette.commands.js";
import "./commands/ColorPalettePopover.commands.js";
import "./commands/ColorPicker.commands.js";
import "./commands/DateTimePicker.commands.js";
import "./commands/DateRangePicker.commands.js";
import "./commands/Dialog.commands.ts";
import "./commands/Popover.commands.ts";
import "./commands/ResponsivePopover.commands.js";
import "./commands/DatePicker.commands.js";
import "./commands/Menu.commands.js";
import "./commands/SegmentedButton.commands.js";
import "./commands/StepInput.commands.js";
import "./commands/Switch.commands.js";
import "./commands/TabContainer.commands.js";
import "./commands/TimeSelectionClocks.commands.js";
import "./commands/ToggleButton.commands.js";
import "./commands/TimePicker.commands.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

type SimulationDevices = "phone"

declare global {
	namespace Cypress {
		interface Chainable {
			ui5SimulateDevice(device?: SimulationDevices): Chainable<void>
			ui5DOMRef(): Chainable<void>
			ui5CalendarGetDay(calendarSelector: string, timestamp: string): Chainable<JQuery<HTMLElement>>
			ui5CalendarGetMonth(calendarSelector: string, timestamp: string): Chainable<JQuery<HTMLElement>>
			ui5CalendarShowYearRangePicker(): Chainable<void>
			ui5ColorPickerToggleColorMode(): Chainable<void>
			ui5ColorPickerUpdateInput(name: string, value: string): Chainable<void>
			ui5ColorPickerValidateInput(name: string, value: string): Chainable<void>
			ui5ColorPaletteCheckSelectedColor(colorPaletteItem: string, values: { r: string, g: string, b: string, a: string }): Chainable<void>
			ui5ColorPaletteNavigateAndCheckSelectedColor(colorPalette: string, startIndex: number, key: string, expectedValue: string): Chainable<void>
			ui5DatePickerGetInnerInput(): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetPopoverDate(timestamp: number): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetDisplayedDay(index: number): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetFirstDisplayedDate(): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetFirstDisplayedYear(): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetDisplayedMonth(index: number): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetDisplayedYear(index: number): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetNextButton(): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetPreviousButton(): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetMonthButton(): Chainable<JQuery<HTMLElement>>
			ui5DatePickerGetYearButton(): Chainable<JQuery<HTMLElement>>
			ui5DatePickerValueHelpIconPress(): Chainable<void>
			ui5DatePickerTypeDate(value: string, delay?: number): Chainable<void>
			ui5SegmentedButtonItemToggleSelect(deselect?: boolean): Chainable<void>
			ui5SegmentedButtonFocusFirstItem(): Chainable<void>
			ui5SwitchCheckAttributeInShadowDomRoot(attrName: string, attrValue: string): Chainable<void>
			ui5TabContainerOpenEndOverflow(): Chainable<void>,
			ui5TabContainerDragAndDrop(elementToDrag: HTMLElement, placement: `${MovePlacement}`, target: HTMLElement, orientation?: `${Orientation}`): Chainable<void>,
			ui5TimeSelectionClocksInnerButton(name: string, index: number): Chainable<JQuery<HTMLElement>>
			ui5TimeSelectionClocksIsActiveClock(name: string, index: number): Chainable<boolean>
			ui5ToggleButtonRealClick(isClickPrevented: boolean, pressedKey?: ModifierKey): Chainable<void>
		}
	}
}

const deviceFuncForStub: Record<SimulationDevices, keyof typeof internals> = {
	phone: "_isPhone",
};

const deviceName: Record<SimulationDevices, Cypress.ViewportPreset> = {
	phone: "iphone-x",
};

Cypress.Commands.add("ui5SimulateDevice", (device: SimulationDevices = "phone") => {
	cy.stub(internals, deviceFuncForStub[device])
		.callsFake(() => {
			return true;
		});

	if (device === "phone") {
		cy.stub(internals, "windows").value(false);
	}

	cy.viewport(deviceName[device]);

	cy.wrap({ isPhone })
		.invoke("isPhone")
		.should("be.true");
});
