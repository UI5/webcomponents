/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Check Box".
 * Node: 154589:905. Emits <ui5-checkbox>.
 *
 * Every readable Figma prop mapped; unmappable ones documented in
 * FIGMA_CODE_CONNECT.md § CheckBox. Form Factor + Hover ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=154589-905",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: "",
        Negative: 'value-state="Negative"',
        Critical: 'value-state="Critical"',
        Positive: 'value-state="Positive"',
        Information: 'value-state="Information"',
      }),
      // Check → checked / indeterminate (Tristate = indeterminate).
      checkAttr: figma.enum("Check", {
        Checked: "checked",
        Tristate: "indeterminate",
        Unchecked: "",
      }),
      // Interaction State → disabled / readonly.
      // "Display Only" has NO ui5-checkbox equivalent — approximated as readonly
      // (documented in FIGMA_CODE_CONNECT.md § CheckBox).
      stateAttr: figma.enum("Interaction State", {
        Disabled: "disabled",
        "Read Only": "readonly",
        "Display Only": "readonly",
        Regular: "",
        Hover: "",
      }),
      // Label switch gates the text: OFF → empty; ON → the typed ✏️ Text value.
      // NOTE: the nested figma.string must be resolved into a PROP (below) and
      // referenced as a plain ${text} placeholder — a figma.* call cannot live
      // inside an html`` template literal (it would be emitted verbatim).
      text: figma.boolean("Label", {
        true: figma.string("✏️ Text"),
        false: "",
      }),
    },
    example: ({ valueState, checkAttr, stateAttr, text }) =>
      html`<ui5-checkbox text="${text}" ${checkAttr} ${valueState} ${stateAttr}></ui5-checkbox>`,
  }
);
