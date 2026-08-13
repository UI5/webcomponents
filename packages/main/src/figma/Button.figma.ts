/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Button".
 *
 * This maps the SAME Figma Button component set (node 91702:11733) that is
 * already connected under the "React" label (@ui5/webcomponents-react) — but
 * under the "Web Components" label. With both labels present, Figma Dev Mode
 * shows a framework switcher (React / Web Components) on the Button.
 *
 * The snippet targets the framework-agnostic UI5 Web Component <ui5-button>,
 * usable from plain HTML, Angular, Vue, and React alike.
 *
 * Uses the single-argument figma.connect() signature: there is no code
 * component to import, we render a custom-element tag from a template.
 *
 * HTML-parser rules (stricter than the React parser):
 *  - No inline conditionals/ternaries in the template — every attribute value
 *    is resolved to a final string inside `props` via figma.enum/figma.boolean.
 *  - Nested child elements (the badge) are provided as html`` partials so they
 *    render as real elements rather than escaped text.
 *  - The button label is a text *layer* named "Text", so it is read with
 *    figma.textContent (not figma.string, which expects a component property).
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=91702-11733",
  {
    props: {
      // Button label — "Text" is a text layer, not a component property.
      label: figma.textContent("Text"),

      // Figma "Type" variant → ui5-button `design` attribute.
      design: figma.enum("Type", {
        Primary: "Emphasized",
        Secondary: "Default",
        Tertiary: "Transparent",
        Accept: "Positive",
        Reject: "Negative",
        Attention: "Attention",
      }),

      // Only the "Disabled" interaction state emits the `disabled` attribute.
      disabledAttr: figma.enum("Interaction State", {
        Disabled: "disabled",
        Regular: "",
        Hover: "",
        Down: "",
      }),

      // Leading icon presence → `icon="…"`.
      // LIMITATION: icon NAME hardcoded to "globe". Button takes the icon as a
      // name-string attribute (icon="globe"), but Figma models it as an
      // INSTANCE_SWAP. figma.instance() returns the icon ELEMENT (<ui5-icon>),
      // not a bare string, so it can't feed icon="…". Only Option A (an
      // `Icon Name` text prop + figma.string) makes this dynamic. See
      // FIGMA_ICON_NAME_PROPOSAL.md.
      iconAttr: figma.boolean("Icon Left", {
        true: 'icon="globe"',
        false: "",
      }),

      // Counter badge → slotted <ui5-button-badge>. Counter Badge is a Figma
      // VARIANT (True/False), NOT a boolean.
      // design="OverlayText" HARDCODED: it CANNOT be driven by Form Factor —
      // both a nested figma.enum in the template AND a cross-prop ${prop} ref
      // emit VERBATIM (parser resolves neither inside a prop's template value).
      // text="72" HARDCODED: count is in an unexposed nested layer, not readable.
      counterBadge: figma.enum("Counter Badge", {
        True: html`<ui5-button-badge slot="badge" design="OverlayText" text="72"></ui5-button-badge>`,
        False: "",
      }),

      // Attention badge → slotted <ui5-button-badge> attention dot.
      // Attention Badge IS a real Figma BOOLEAN.
      attentionBadge: figma.boolean("Attention Badge", {
        true: html`<ui5-button-badge slot="badge" design="AttentionDot"></ui5-button-badge>`,
        false: "",
      }),
    },
    example: ({ label, design, disabledAttr, iconAttr, counterBadge, attentionBadge }) =>
      html`<ui5-button design="${design}" ${iconAttr} ${disabledAttr}>${label}${counterBadge}${attentionBadge}</ui5-button>`,
  }
);
