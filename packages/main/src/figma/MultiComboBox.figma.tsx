/**
 * React Code Connect mapping for the SAP Web UI Kit "Multi Combobox".
 * Node 212722:56058. Mirrors MultiComboBox.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MultiComboBox, MultiComboBoxItem } from "@ui5/webcomponents-react";

figma.connect(
  MultiComboBox,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=212722-56058",
  {
    props: {},
    example: () => (
      <MultiComboBox placeholder="Select options...">
        <MultiComboBoxItem text="Option 1" />
        <MultiComboBoxItem text="Option 2" />
        <MultiComboBoxItem text="Option 3" />
      </MultiComboBox>
    ),
  }
);
