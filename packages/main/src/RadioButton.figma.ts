/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Radio Button".
 * Node: 154597:1967. Emits <ui5-radio-button>.
 *
 * Cleanest of the set — every Figma axis maps. See FIGMA_CODE_CONNECT.md
 * § RadioButton. Form Factor + Hover ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=154597-1967",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: "",
        Negative: 'value-state="Negative"',
        Critical: 'value-state="Critical"',
        Positive: 'value-state="Positive"',
        Information: 'value-state="Information"',
      }),
      // Selected → checked.
      checkedAttr: figma.enum("Selected", {
        True: "checked",
        False: "",
      }),
      // Interaction State → disabled / readonly.
      stateAttr: figma.enum("Interaction State", {
        Disabled: "disabled",
        "Read Only": "readonly",
        Regular: "",
        Hover: "",
      }),
      // Label switch gates the text: OFF → empty; ON → the typed ✏️ Text value.
      // Resolved into a PROP and referenced as ${text} — a figma.* call cannot
      // live inside the html`` template literal.
      text: figma.boolean("Label", {
        true: figma.string("✏️ Text"),
        false: "",
      }),
    },
    example: ({ valueState, checkedAttr, stateAttr, text }) =>
      html`<ui5-radio-button text="${text}" ${checkedAttr} ${valueState} ${stateAttr}></ui5-radio-button>`,
  }
);
