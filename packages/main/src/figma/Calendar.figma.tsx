/**
 * React Code Connect mapping for the SAP Web UI Kit "Calendar".
 * Node 12845:11142. Mirrors Calendar.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Calendar } from "@ui5/webcomponents-react";

figma.connect(
  Calendar,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=12845-11142",
  {
    props: {
      hideWeekNumbers: figma.boolean("Week Numbers", {
        true: false,
        false: true,
      }),
    },
    example: ({ hideWeekNumbers }) => (
      <Calendar hideWeekNumbers={hideWeekNumbers} />
    ),
  }
);
