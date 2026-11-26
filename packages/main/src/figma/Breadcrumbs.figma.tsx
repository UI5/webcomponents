/**
 * React Code Connect mapping for the SAP Web UI Kit "Breadcrumb".
 * Node 153806:1972. Mirrors Breadcrumbs.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Breadcrumbs, BreadcrumbsItem } from "@ui5/webcomponents-react";

figma.connect(
  Breadcrumbs,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=153806-1972",
  {
    props: {},
    example: () => (
      <Breadcrumbs>
        <BreadcrumbsItem href="/">Home</BreadcrumbsItem>
        <BreadcrumbsItem href="/section">Section</BreadcrumbsItem>
        <BreadcrumbsItem>Current Page</BreadcrumbsItem>
      </Breadcrumbs>
    ),
  }
);
