/**
 * React Code Connect mapping for the SAP Web UI Kit "Shell Bar".
 * Node 285220:5418. Mirrors ShellBar.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ShellBar, ShellBarItem } from "@ui5/webcomponents-react";

figma.connect(
  ShellBar,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=285220-5418",
  {
    props: {},
    example: () => (
      <ShellBar
        primaryTitle="App Title"
        secondaryTitle="Subtitle"
        logo={<img src="logo.svg" alt="Logo" />}
      >
        <ShellBarItem icon="add" text="Add" />
      </ShellBar>
    ),
  }
);
