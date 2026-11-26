/**
 * React Code Connect mapping for the SAP Web UI Kit "Date (Range) Picker".
 * Node 160531:1416. Mirrors DatePicker.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DatePicker } from "@ui5/webcomponents-react";

figma.connect(
  DatePicker,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=160531-1416",
  {
    props: {},
    example: () => <DatePicker />,
  }
);
