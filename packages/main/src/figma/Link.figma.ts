/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Link".
 * Node: 187:305. Emits <ui5-link>.
 *
 * See FIGMA_CODE_CONNECT_FINDINGS.md § Link. Pseudo-states (Hover/Visited/Down) ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=187-305",
  {
    props: {
      // Type → design. Icon Link has no design equivalent → Default.
      design: figma.enum("Type", {
        Regular: "",
        Emphasized: 'design="Emphasized"',
        Subtle: 'design="Subtle"',
        "Icon Link": "",
      }),
      // Interaction State = Disabled → disabled.
      disabled: figma.enum("Interaction State", {
        Disabled: "disabled",
        Regular: "",
        Hover: "",
        Visited: "",
        Down: "",
      }),
      // Link label text (default slot).
      label: figma.textContent("Text"),
      // Icon Position → icon (Left) / end-icon (Right). The icon NAME is a
      // placeholder ("inspect", the kit's default) — the Icon instance-swap
      // name isn't readable. Left→icon, Right→end-icon, N/A→neither.
      iconAttr: figma.enum("Icon Position", {
        Left: 'icon="inspect"',
        Right: 'end-icon="inspect"',
        "N/A": "",
      }),
    },
    example: ({ design, disabled, label, iconAttr }) =>
      html`<ui5-link ${design} ${disabled} ${iconAttr}>${label}</ui5-link>`,
  }
);
