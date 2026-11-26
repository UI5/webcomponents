/**
 * React Code Connect mapping for the SAP Web UI Kit "Illustrated Message".
 * Node 321359:13754. Mirrors IllustratedMessage.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IllustratedMessage } from "@ui5/webcomponents-react";

figma.connect(
  IllustratedMessage,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=321359-13754",
  {
    props: {},
    example: () => (
      <IllustratedMessage
        name="BeforeSearch"
        titleText="No Results"
        subtitleText="Try a different search term."
      />
    ),
  }
);
