/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Switch".
 * Node: 24087:10369. Emits <ui5-switch>.
 *
 * See FIGMA_CODE_CONNECT_FINDINGS.md § Switch. Form Factor + pseudo-states ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24087-10369",
  {
    props: {
      // Figma "Type" → design. Non-Semantic (neutral blue/grey ✓/dash icons) →
      // Textual; Semantic (green ✓ / red ✗) → Graphical. NOTE: "Textual" does
      // NOT mean text — with no textOn/textOff it still renders check/dash icons
      // in blue/grey, which is exactly the Non-Semantic group. "Graphical" is
      // the positive/negative-icon variant = Semantic.
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
    // textOn/textOff aren't modelled in Figma — omitted.
    example: ({ design, checked, disabled }) =>
      html`<ui5-switch ${design} ${checked} ${disabled}></ui5-switch>`,
  }
);
