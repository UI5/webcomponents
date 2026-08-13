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
 * NOTE: the same Figma-side limitations documented in FIGMA_CODE_CONNECT_FINDINGS.md
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
      // figma.enum. design HARDCODED to OverlayText: it CANNOT be driven by
      // Form Factor (a nested figma.enum emits verbatim). text="72" HARDCODED
      // (count in unexposed nested layer, not readable).
      //
      // REACT ASYMMETRY: the `badge` prop references ONE Figma axis, so React
      // drives it from Counter Badge only; the Attention Badge is NOT
      // expressible here (WC emits both). See findings § Button.
      badge: figma.enum("Counter Badge", {
        True: <ButtonBadge design={ButtonBadgeDesign.OverlayText} text="72" />,
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
