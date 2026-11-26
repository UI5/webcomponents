/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Progress Indicator".
 * Node: 578:5150. Emits <ui5-progress-indicator>.
 *
 * Figma exposes: Value State (Positive/Negative/Critical/Information/None),
 * Interaction State (Regular/Disabled), Text (boolean), ✏️ Text Value (display text).
 * The "✏️ Progress Bar" text is the width annotation — not a real prop.
 * Hover/Down pseudo-states ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=578-5151",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: "",
        Information: 'value-state="Information"',
        Positive: 'value-state="Positive"',
        Critical: 'value-state="Critical"',
        Negative: 'value-state="Negative"',
      }),
      disabled: figma.enum("Interaction State", {
        Regular: "",
        Disabled: "disabled",
      }),
      // hideValue is true when the Text boolean is off.
      hideValue: figma.boolean("Text", {
        true: "",
        false: "hide-value",
      }),
      displayValue: figma.string("✏️ Text Value"),
    },
    example: ({ valueState, disabled, hideValue, displayValue }) =>
      html`<ui5-progress-indicator value="60" display-value="${displayValue}" ${valueState} ${hideValue} ${disabled}></ui5-progress-indicator>`,
  }
);
