/**
 * React Code Connect mapping for the SAP Web UI Kit "Bars" — Header.
 * Node 1101:2416. Mirrors Bar.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Bar } from "@ui5/webcomponents-react";

figma.connect(
  Bar,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=1101-2416",
  {
    props: {},
    example: () => (
      <Bar design="Header">
        <span>Title</span>
      </Bar>
    ),
  }
);
