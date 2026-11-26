/**
 * React Code Connect mapping for the SAP Web UI Kit "Dialog".
 * Node 1101:2510. Mirrors Dialog.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Dialog, Button, Bar } from "@ui5/webcomponents-react";

figma.connect(
  Dialog,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=1101-2510",
  {
    props: {},
    example: () => (
      <Dialog
        headerText="Dialog Title"
        footer={
          <Bar>
            <Button slot="endContent" design="Emphasized">Confirm</Button>
            <Button slot="endContent">Cancel</Button>
          </Bar>
        }
      >
        <p>Dialog content goes here.</p>
      </Dialog>
    ),
  }
);
