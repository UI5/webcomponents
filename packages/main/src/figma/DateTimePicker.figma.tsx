/**
 * React Code Connect mapping for the SAP Web UI Kit "Date Time Picker".
 * Node 353384:17365. Mirrors DateTimePicker.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateTimePicker } from "@ui5/webcomponents-react";

figma.connect(
  DateTimePicker,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=353384-17365",
  {
    props: {},
    example: () => <DateTimePicker />,
  }
);
