/**
 * React Code Connect mapping for the SAP Web UI Kit "Button".
 *
 * Same Figma node (91702:11733) and same prop mapping as the Web Components
 * mapping in `Button.figma.ts`, but emitting @ui5/webcomponents-react syntax
 * under the "React" label. With both labels present on the node, Figma Dev Mode
 * shows a React / Web Components framework switcher.
 *
 * Published from this repo via `figma.config.react.json` (parser: "react").
 * The React parser only reads the import string — @ui5/webcomponents-react does
 * not need to be installed here for publishing to succeed.
 *
 * NOTE: the same Figma-side limitations documented in FIGMA_CODE_CONNECT.md
 * apply here — the icon name and badge design/text are hardcoded because Figma
 * does not expose them as readable properties.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, ButtonBadge, ButtonBadgeDesign } from "@ui5/webcomponents-react";

figma.connect(
  Button,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=91702-11733",
  {
    props: {
      // Button label — "Text" is a text layer, not a component property.
      label: figma.textContent("Text"),

      // Figma "Type" variant → ui5 Button `design` prop.
      design: figma.enum("Type", {
        Primary: "Emphasized",
        Secondary: "Default",
        Tertiary: "Transparent",
        Accept: "Positive",
        Reject: "Negative",
        Attention: "Attention",
      }),

      // Only the "Disabled" interaction state sets `disabled`.
      disabled: figma.enum("Interaction State", {
        Disabled: true,
        Regular: false,
        Hover: false,
        Down: false,
      }),

      // Counter badge presence → <ButtonBadge> child on the `badge` prop.
      // Counter Badge is a Figma VARIANT (True/False), NOT a boolean — use
      // figma.enum. ASSUMPTION (design rule, per kit owners, NOT visually
      // re-verified): Form Factor drives badge design — Compact → InlineText,
      // Cozy → OverlayText. HARDCODED: text="72" — count is NOT read from Figma
      // (unexposed nested layer), won't track the Figma number.
      //
      // REACT ASYMMETRY: the `badge` prop can only reference ONE Figma axis for
      // PRESENCE (parser rejects compound placeholders like `counter ??
      // attention`), so React drives `badge` from Counter Badge only. The
      // Attention Badge (a separate Figma boolean) is NOT expressible here — the
      // WC mapping (Button.figma.ts) emits both. See findings § Button.
      badge: figma.enum("Counter Badge", {
        True: (
          <ButtonBadge
            design={figma.enum("Form Factor", {
              Compact: ButtonBadgeDesign.InlineText,
              Cozy: ButtonBadgeDesign.OverlayText,
            })}
            text="72"
          />
        ),
        False: undefined,
      }),
    },
    example: ({ label, design, disabled, badge }) => (
      <Button design={design} disabled={disabled} badge={badge}>
        {label}
      </Button>
    ),
  }
);
