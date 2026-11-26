/**
 * React Code Connect mapping for the SAP Web UI Kit "Time Picker".
 * Node 194605:104343. Mirrors TimePicker.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TimePicker } from "@ui5/webcomponents-react";

figma.connect(
  TimePicker,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=194605-104343",
  {
    props: {},
    example: () => <TimePicker />,
  }
);
