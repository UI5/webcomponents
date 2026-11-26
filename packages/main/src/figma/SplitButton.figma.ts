/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Split Button".
 * Node: 188672:2082. Part of the Buttons page. Emits <ui5-split-button>.
 *
 * Figma exposes: Type (design), Left/Right Interaction State (disabled).
 * Form Factor ignored (global density). Icon is INSTANCE_SWAP — not readable.
 * Both Left and Right Interaction State must be Disabled for the component to be disabled.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=188672-2082",
  {
    props: {
      design: figma.enum("Type", {
        Primary: 'design="Emphasized"',
        Secondary: 'design="Default"',
        Tertiary: 'design="Transparent"',
        Accept: 'design="Positive"',
        Reject: 'design="Negative"',
        Attention: 'design="Attention"',
      }),
      disabled: figma.enum("Left Interaction State", {
        Regular: "",
        Hover: "",
        Down: "",
        Disabled: "disabled",
      }),
    },
    example: ({ design, disabled }) =>
      html`<ui5-split-button ${design} ${disabled}>Button Text</ui5-split-button>`,
  }
);
