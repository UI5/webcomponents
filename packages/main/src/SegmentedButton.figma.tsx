/**
 * React Code Connect mapping for the SAP Web UI Kit "Segmented Button".
 * Node 91702:11986. Mirrors SegmentedButton.figma.ts. See FIGMA_CODE_CONNECT.md.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SegmentedButton, SegmentedButtonItem } from "@ui5/webcomponents-react";

figma.connect(
  SegmentedButton,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=91702-11986",
  {
    props: {
      // Type → text-vs-icon form. Item 1 keeps `selected` (representative
      // default — not readable from Figma). Icon names are placeholders
      // ("home") — instance-swap, not readable.
      item1: figma.enum("Type", {
        Text: <SegmentedButtonItem selected>Option 1</SegmentedButtonItem>,
        Icon: <SegmentedButtonItem selected icon="home" />,
      }),
      item2: figma.enum("Type", {
        Text: <SegmentedButtonItem>Option 2</SegmentedButtonItem>,
        Icon: <SegmentedButtonItem icon="home" />,
      }),
      thirdItem: figma.boolean("3rd Button", {
        true: figma.enum("Type", {
          Text: <SegmentedButtonItem>Option 3</SegmentedButtonItem>,
          Icon: <SegmentedButtonItem icon="home" />,
        }),
        false: undefined,
      }),
      fourthItem: figma.boolean("4th Button", {
        true: figma.enum("Type", {
          Text: <SegmentedButtonItem>Option 4</SegmentedButtonItem>,
          Icon: <SegmentedButtonItem icon="home" />,
        }),
        false: undefined,
      }),
      fifthItem: figma.boolean("5th Button", {
        true: figma.enum("Type", {
          Text: <SegmentedButtonItem>Option 5</SegmentedButtonItem>,
          Icon: <SegmentedButtonItem icon="home" />,
        }),
        false: undefined,
      }),
    },
    example: ({ item1, item2, thirdItem, fourthItem, fifthItem }) => (
      <SegmentedButton>
        {item1}
        {item2}
        {thirdItem}
        {fourthItem}
        {fifthItem}
      </SegmentedButton>
    ),
  }
);
