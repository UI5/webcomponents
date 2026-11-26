/**
 * React Code Connect mapping for the SAP Web UI Kit "File Uploader".
 * Node 175454:1328. Mirrors FileUploader.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FileUploader, Button } from "@ui5/webcomponents-react";

figma.connect(
  FileUploader,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=175454-1328",
  {
    props: {},
    example: () => (
      <FileUploader placeholder="Choose a file">
        <Button icon="upload">Upload</Button>
      </FileUploader>
    ),
  }
);
