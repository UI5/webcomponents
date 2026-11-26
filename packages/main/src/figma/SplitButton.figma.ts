/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Split Button".
 * Node: 188672:2082. Part of the Buttons page. Emits <ui5-split-button>.
 *
 * Figma exposes: Type (design), Left/Right Interaction State (disabled).
 * Form Factor ignored (global density). Icon is INSTANCE_SWAP — not readable.
 * Both Left and Right Interaction State must be Disabled for the component to be disabled.
 *
 * Also maps "Icon Split Button" (node 188746:11223) — same WC component, icon-only variant.
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

// Icon Split Button — same component, icon-only variant (no text child).
// Icon is INSTANCE_SWAP so name is not readable; "globe" is a placeholder.
figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=188746-11223",
  {
    props: {
      design: figma.enum("Type", {
        Primary: 'design="Emphasized"',
        Secondary: 'design="Default"',
        Tertiary: 'design="Transparent"',
      }),
      disabled: figma.enum("Left Interaction State", {
        Regular: "",
        Hover: "",
        Down: "",
        Disabled: "disabled",
      }),
    },
    example: ({ design, disabled }) =>
      html`<ui5-split-button icon="globe" ${design} ${disabled}></ui5-split-button>`,
  }
);
