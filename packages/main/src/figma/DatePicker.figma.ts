/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Date (Range) Picker".
 * Node: 160531:1416. Emits <ui5-date-picker>.
 *
 * Figma shows both DatePicker and DateRangePicker on one page.
 * This maps to ui5-date-picker (single date). For range, see DateRangePicker.figma.ts.
 * Figma exposes: Type (One-Month/Two-Month), Orientation — these are calendar popup
 * layout variants, not settable props on the input field itself.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=160531-1416",
  {
    props: {},
    example: () => html`<ui5-date-picker></ui5-date-picker>`,
  }
);
