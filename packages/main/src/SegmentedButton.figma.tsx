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
      thirdItem: figma.boolean("3rd Button", {
        true: <SegmentedButtonItem>Option 3</SegmentedButtonItem>,
        false: undefined,
      }),
      fourthItem: figma.boolean("4th Button", {
        true: <SegmentedButtonItem>Option 4</SegmentedButtonItem>,
        false: undefined,
      }),
      fifthItem: figma.boolean("5th Button", {
        true: <SegmentedButtonItem>Option 5</SegmentedButtonItem>,
        false: undefined,
      }),
    },
    example: ({ thirdItem, fourthItem, fifthItem }) => (
      <SegmentedButton>
        <SegmentedButtonItem selected>Option 1</SegmentedButtonItem>
        <SegmentedButtonItem>Option 2</SegmentedButtonItem>
        {thirdItem}
        {fourthItem}
        {fifthItem}
      </SegmentedButton>
    ),
  }
);
