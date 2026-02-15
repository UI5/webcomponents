import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type WizardContentLayout from "./types/WizardContentLayout.js";
import "./WizardStep.js";
import type WizardTab from "./WizardTab.js";
import type WizardStep from "./WizardStep.js";
type WizardStepChangeEventDetail = {
    step: WizardStep;
    previousStep: WizardStep;
    withScroll: boolean;
};
type AccessibilityInformation = {
    ariaSetsize: number;
    ariaPosinset: number;
    ariaLabel: string;
};
type StepInfo = {
    icon?: string;
    titleText?: string;
    subtitleText?: string;
    number: number;
    selected: boolean;
    disabled: boolean;
    hideSeparator: boolean;
    activeSeparator: boolean;
    branchingSeparator: boolean;
    pos: number;
    accInfo: AccessibilityInformation;
    refStepId: string;
    styles: {
        zIndex: number;
    };
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-wizard` helps users to complete a complex task by dividing it into sections and guiding them through it.
 * It has two main areas - a navigation area at the top showing the step sequence and a content area below it.
 *
 * ### Structure
 * #### Navigation area
 * The top most area of the `ui5-wizard` is occupied by the navigation area.
 * It shows the sequence of steps, where the recommended number of steps is between 3 and 8 steps.
 *
 * -  Steps can have different visual representations - numbers or icons.
 * -  Steps might have labels for better readability - titleText and subTitleText.
 * -  Steps are defined by using the `ui5-wizard-step` as slotted element within the `ui5-wizard`.
 *
 * **Note:** If no selected step is defined, the first step will be auto selected.
 *
 * **Note:** If multiple selected steps are defined, the last step will be selected.
 *
 * ### Keyboard Handling
 * The user can navigate using the following keyboard shortcuts:
 *
 * #### Wizard Progress Navigation
 *
 * 	- [Left] or [Down] - Focus moves backward to the WizardProgressNavAnchors.
 * 	- [Up] or [Right] - Focus moves forward to the WizardProgressNavAnchor.
 * 	- [Space] / [Enter] or [Return] - Selects an active step
 * 	- [Home] or [PAGE UP] - Focus goes to the first step
 * 	- [End] or [PAGE DOWN] - Focus goes to the last step
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * #### Content
 * The content occupies the main part of the page. It can hold any type of HTML elements.
 * It's defined by using the `ui5-wizard-step` as slotted element within the `ui5-wizard`.
 *
 * ### Scrolling
 * The component handles user scrolling by selecting the closest step, based on the current scroll position
 * and scrolls to particular place, when the user clicks on the step within the navigation area.
 *
 * **Important:** In order the component's scrolling behaviour to work, it has to be limited from the outside parent element in terms of height.
 * The component or its parent has to be given percentage or absolute height. Otherwise, the component will be scrolled out with the entire page.
 *
 * **For example:**
 *
 * ```html
 * <ui5-dialog style="height: 80%">
 * 	<ui5-wizard></ui5-wizard>
 * </ui5-dialog>
 * ```
 *
 * #### Moving to next step
 * The `ui5-wizard-step` provides the necessary API and it's up to the user of the component to use it to move to the next step.
 * You have to set its `selected` property (and remove the `disabled` one if set) to `true`.
 * The `ui5-wizard` will automatically scroll to the content of the newly selected step.
 *
 * The Fiori 3 guidelines recommends having a "nextStep" button in the content area.
 * You can place a button, or any other type of element to trigger step change, inside the `ui5-wizard-step`,
 * and show/hide it when certain fields are filled or user defined criteria is met.
 *
 * ### Usage
 * #### When to use:
 * When the user has to accomplish a long or unfamiliar task.
 *
 * #### When not to use:
 * When the task has less than 3 steps.
 *
 * ### Responsive Behavior
 * On small widths the step's titleText, subtitleText and separators in the navigation area shrink and from particular point the steps are grouped together and overlap.
 * Tapping on them will show a popover to select the step to navigate to. On mobile device, the grouped steps are presented within a dialog.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/Wizard.js";` (includes <ui5-wizard-step/>)
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.10
 * @public
 * @csspart navigator - Used to style the progress navigator of the `ui5-wizard`.
 * @csspart step-content - Used to style a `ui5-wizard-step` container.
 */
declare class Wizard extends UI5Element {
    eventDetails: {
        "step-change": WizardStepChangeEventDetail;
    };
    /**
     * Defines how the content of the `ui5-wizard` would be visualized.
     * @public
     * @since 1.14.0
     * @default "MultipleSteps"
     */
    contentLayout: `${WizardContentLayout}`;
    /**
     * Defines the width of the `ui5-wizard`.
     * @private
     */
    width?: number;
    /**
     * Defines the threshold to switch between steps upon user scrolling.
     *
     * **For Example:**
     *
     * (1) To switch to the next step, when half of the step is scrolled out - set `step-switch-threshold="0.5"`.
     * (2) To switch to the next step, when the entire current step is scrolled out - set `step-switch-threshold="1"`.
     *
     * **Note:** Supported values are between 0.5 and 1
     * and values out of the range will be normalized to 0.5 and 1 respectively.
     * @private
     * @default 0.7
     * @since 1.0.0-rc.13
     */
    stepSwitchThreshold: number;
    /**
     * Defines the height of the `ui5-wizard` content.
     * @private
     */
    contentHeight?: number;
    /**
     * Stores references to the grouped steps.
     * @private
     */
    _groupedTabs: Array<WizardTab>;
    /**
     * Defines the steps.
     *
     * **Note:** Use the available `ui5-wizard-step` component.
     * @public
     */
    steps: DefaultSlot<WizardStep>;
    static i18nBundle: I18nBundle;
    stepScrollOffsets: Array<number>;
    selectedStepIndex: number;
    previouslySelectedStepIndex: number;
    selectionRequestedByClick: boolean;
    selectionRequestedByScroll: boolean;
    _prevWidth: number;
    _prevContentHeight: number;
    _itemNavigation: ItemNavigation;
    _onStepResize: ResizeObserverCallback;
    constructor();
    static get SCROLL_DEBOUNCE_RATE(): number;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    /**
     * Normalizes the step selection as follows:
     * (1) If there is no selected step - the first step is going to be selected.
     * (2) If the selected steps are more than one - the last step is going to be selected.
     * (3) If the selected step is also disabled - log a warning.
     * @private
     */
    syncSelection(): void;
    /**
     * Selects the first step.
     * @private
     */
    selectFirstStep(): void;
    /**
     * Selects the last step from multiple selected ones.
     * @private
     */
    selectLastSelectedStep(): void;
    /**
     * Deselects all steps.
     * @private
     */
    deselectAll(): void;
    /**
     * Stores the scroll offsets of the steps,
     * e.g. the steps' starting point.
     *
     * **Note:** the disabled ones has negative offsets.
     * @private
     */
    storeStepScrollOffsets(): void;
    /**
     * Handles user click on steps' tabs within the header.
     * **Note:** the handler is bound in the template.
     * @private
     */
    onSelectionChangeRequested(e: CustomEvent): void;
    /**
     * Handles user scrolling with debouncing.
     * **Note:** the handler is bound in the template.
     * @private
     */
    onScroll(e: Event): void;
    /**
     * Handles when a step in the header is focused in order to update the `ItemNavigation`.
     * **Note:** the handler is bound in the template.
     * @private
     */
    onStepInHeaderFocused(e: CustomEvent): void;
    /**
     * Handles resize in order to:
     * (1) sync steps' scroll offset and selection
     * (2) adapt navition step header
     * @private
     */
    onStepResize(): void;
    attachStepsResizeObserver(): void;
    detachStepsResizeObserver(): void;
    /**
     * Updates the expanded attribute for each ui5-wizard-tab based on the ui5-wizard width
     * @private
     */
    _adjustHeaderOverflow(): void;
    _isGroupAtStart(selectedStep: WizardTab): boolean;
    _isGroupAtEnd(selectedStep: WizardTab): boolean;
    _showPopover(oDomTarget: WizardTab, isAtStart: boolean): void;
    _onGroupedTabClick(e: MouseEvent): void;
    _onOverflowStepButtonClick(e: UI5CustomEvent<Button, "click">): void;
    _closeRespPopover(): void;
    _respPopover(): ResponsivePopover;
    /**
     * Called upon `onScroll`.
     * Selects the closest step, based on the user scroll position.
     * @param scrollPos the current scroll position
     * @private
     */
    changeSelectionByScroll(scrollPos: number): void;
    /**
     * Called upon `onSelectionChangeRequested`.
     * Selects the external step (ui5-wizard-step),
     * based on the clicked or activated via keyboard step in the header (ui5-wizard-tab).
     * @param stepInHeader the step equivalent in the header
     * @private
     */
    changeSelectionByStepAction(stepInHeader: WizardTab): Promise<void>;
    getContentHeight(): number;
    getFocusDomRef(): HTMLElement | undefined;
    getStepAriaLabelText(step: WizardStep, ariaLabel: string): string;
    get stepsDOM(): HTMLElement[];
    get progressNavigatorListDOM(): Element;
    get _stepsInHeader(): StepInfo[];
    get _steps(): WizardStep[];
    get stepsCount(): number;
    get selectedStep(): WizardStep | null;
    get lastSelectedStep(): WizardStep | null;
    get selectedSteps(): WizardStep[];
    get enabledSteps(): WizardStep[];
    get selectedStepsCount(): number;
    get slottedSteps(): WizardStep[];
    get contentDOM(): Element;
    get stepsInHeaderDOM(): WizardTab[];
    get enabledStepsInHeaderDOM(): WizardTab[];
    get navAriaRoleDescription(): string;
    get navAriaLabelText(): string;
    get navAriaDescribedbyText(): string;
    get listAriaLabelText(): string;
    get actionSheetStepsText(): string;
    get navStepDefaultHeading(): string;
    get optionalStepText(): string;
    get activeStepText(): string;
    get inactiveStepText(): string;
    get ariaLabelText(): string;
    get _dialogCancelButtonText(): string;
    get effectiveStepSwitchThreshold(): number;
    /**
     * Returns an array of data objects, based on the user defined steps
     * to later build the steps (tabs) within the header.
     * @private
     */
    getStepsInfo(): StepInfo[];
    /**
     * Returns the index of the selected step.
     * @private
     */
    getSelectedStepIndex(): number;
    /**
     * Returns the index of the last enabled step.
     * @private
     */
    getLastEnabledStepIndex(): number;
    getStepByRefId(refId: string): WizardStep;
    getStepWrapperByRefId(refId: string): HTMLElement;
    getStepWrapperByIdx(idx: number): HTMLElement;
    /**
     * Scrolls to the content of the selected step, used in `onAfterRendering`.
     * @private
     */
    scrollToSelectedStep(): void;
    /**
     * Scrolls to the content item within the `ui5-wizard` shadowDOM
     * by given step index.
     * @private
     * @param stepIndex the index of a step
     */
    scrollToContentItem(stepIndex: number): void;
    /**
     * Returns to closest scroll position for the given step index.
     * @private
     * @param stepIndex the index of a step
     */
    getClosestScrollPosByStepIndex(stepIndex: number): number;
    /**
     * Returns the closest step index by given scroll position.
     * @private
     * @param scrollPos the scroll position
     */
    getClosestStepIndexByScrollPos(scrollPos: number): number;
    /**
     * Switches the selection from the old step to the newly selected step.
     * @param selectedStep the old step
     * @param stepToSelect the step to be selected
     * @param stepToSelectIndex the index of the newly selected step
     * @param withScroll the selection changed due to user scrolling
     * @private
     */
    switchSelectionFromOldToNewStep(selectedStep: WizardStep | null, stepToSelect: WizardStep, stepToSelectIndex: number, withScroll: boolean): void;
    /**
     * Sorter method for sorting an array in ascending order.
     * @private
     */
    sortAscending(a: number, b: number): 0 | 1 | -1;
}
export type { WizardStepChangeEventDetail, };
export default Wizard;
