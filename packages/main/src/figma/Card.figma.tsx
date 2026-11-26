/**
 * React Code Connect mapping for the SAP Web UI Kit "Card".
 * Node 323770:4366. Mirrors Card.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardHeader } from "@ui5/webcomponents-react";

figma.connect(
  Card,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=323770-4366",
  {
    props: {},
    example: () => (
      <Card header={<CardHeader titleText="Card Title" subtitleText="Subtitle" />}>
        {/* card content */}
      </Card>
    ),
  }
);
