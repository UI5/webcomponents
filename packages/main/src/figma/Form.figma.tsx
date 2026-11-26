/**
 * React Code Connect mapping for the SAP Web UI Kit "Form".
 * Node 237212:14330. Mirrors Form.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Form, FormItem, Label, Input } from "@ui5/webcomponents-react";

figma.connect(
  Form,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=237212-14329",
  {
    props: {},
    example: () => (
      <Form headerText="Personal Data">
        <FormItem labelContent={<Label required>Name</Label>}>
          <Input />
        </FormItem>
        <FormItem labelContent={<Label>Email</Label>}>
          <Input type="Email" />
        </FormItem>
      </Form>
    ),
  }
);
