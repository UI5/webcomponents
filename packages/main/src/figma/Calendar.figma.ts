/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Calendar".
 * Node: 12845:11142. Emits <ui5-calendar>.
 *
 * Figma exposes: Week Numbers (boolean) → hideWeekNumbers (inverted),
 * Selection (Day/Month/Year/Year Range) — this is the picker view shown in the popup,
 * not the WC selectionMode (Single/Multiple/Range). No direct mapping.
 * Mixed Calendar and Week Header are visual annotations — no WC props.
 * Form Factor ignored (global density).
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=12845-11142",
  {
    props: {
      hideWeekNumbers: figma.boolean("Week Numbers", {
        true: "",
        false: "hide-week-numbers",
      }),
    },
    example: ({ hideWeekNumbers }) =>
      html`<ui5-calendar ${hideWeekNumbers}></ui5-calendar>`,
  }
);
