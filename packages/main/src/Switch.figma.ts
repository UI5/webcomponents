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
      // NOTE: Figma "Type" (Non-Semantic/Semantic) is about colour semantics
      // (neutral vs green/red), which ui5-switch has NO property for. It does
      // NOT map to `design` (Textual/Graphical): screenshot of node 24087:10369
      // shows ALL Figma switches render icons (✓/✗), i.e. all are effectively
      // `design="Graphical"`. So `design` cannot be driven by Type — omitted.
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
    // design (Textual/Graphical), textOn/textOff aren't derivable from Figma.
    example: ({ checked, disabled }) =>
      html`<ui5-switch ${checked} ${disabled}></ui5-switch>`,
  }
);
