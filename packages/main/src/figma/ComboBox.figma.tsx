/**
 * React Code Connect mapping for the SAP Web UI Kit "Drop-Down".
 * Node 182813:5890. Mirrors ComboBox.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComboBox, ComboBoxItem } from "@ui5/webcomponents-react";

figma.connect(
  ComboBox,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=182813-5890",
  {
    props: {},
    example: () => (
      <ComboBox placeholder="Select or type...">
        <ComboBoxItem text="Option 1" />
        <ComboBoxItem text="Option 2" />
        <ComboBoxItem text="Option 3" />
      </ComboBox>
    ),
  }
);
