/**
 * React Code Connect mapping for the SAP Web UI Kit "Split Button".
 * Node 188672:2082. Mirrors SplitButton.figma.ts.
 * Also maps Icon Split Button node 188746:11223.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SplitButton } from "@ui5/webcomponents-react";

figma.connect(
  SplitButton,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=188672-2082",
  {
    props: {
      design: figma.enum("Type", {
        Primary: "Emphasized",
        Secondary: "Default",
        Tertiary: "Transparent",
        Accept: "Positive",
        Reject: "Negative",
        Attention: "Attention",
      }),
      disabled: figma.enum("Left Interaction State", {
        Regular: false,
        Hover: false,
        Down: false,
        Disabled: true,
      }),
    },
    example: ({ design, disabled }) => (
      <SplitButton design={design} disabled={disabled}>Button Text</SplitButton>
    ),
  }
);

// Icon Split Button — same component, icon-only variant.
figma.connect(
  SplitButton,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=188746-11223",
  {
    props: {
      design: figma.enum("Type", {
        Primary: "Emphasized",
        Secondary: "Default",
        Tertiary: "Transparent",
      }),
      disabled: figma.enum("Left Interaction State", {
        Regular: false,
        Hover: false,
        Down: false,
        Disabled: true,
      }),
    },
    example: ({ design, disabled }) => (
      <SplitButton icon="globe" design={design} disabled={disabled} />
    ),
  }
);
