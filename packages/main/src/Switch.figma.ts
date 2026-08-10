/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Switch".
 * Node: 24087:10369. Emits <ui5-switch>.
 *
 * See FIGMA_CODE_CONNECT.md § Switch. Form Factor + pseudo-states ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24087-10369",
  {
    props: {
      // Type → design. Non-Semantic → Textual, Semantic → Graphical.
      design: figma.enum("Type", {
        "Non-Semantic": 'design="Textual"',
        Semantic: 'design="Graphical"',
      }),
      // Checked variant → checked.
      checked: figma.enum("Checked", {
        True: "checked",
        False: "",
      }),
      // Interaction State = Disabled → disabled.
      disabled: figma.enum("Interaction State", {
        Disabled: "disabled",
        Regular: "",
        Hover: "",
      }),
    },
    // textOn/textOff aren't modeled in Figma — omitted.
    example: ({ design, checked, disabled }) =>
      html`<ui5-switch ${design} ${checked} ${disabled}></ui5-switch>`,
  }
);
