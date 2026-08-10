/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Link".
 * Node: 187:305. Emits <ui5-link>.
 *
 * See FIGMA_CODE_CONNECT.md § Link. Pseudo-states (Hover/Visited/Down) ignored.
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
    },
    // Icon slot (Icon Link type) is instance-swap — name not readable, omitted.
    example: ({ design, disabled, label }) =>
      html`<ui5-link ${design} ${disabled}>${label}</ui5-link>`,
  }
);
