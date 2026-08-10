/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Segmented Button".
 * Node: 91702:11986. Emits <ui5-segmented-button> with slotted items.
 *
 * LIMITATION: the segment items live in Figma SLOTS (2 fixed + 3rd/4th/5th
 * booleans). Their labels/icons are not exposed as readable properties, so the
 * emitted items are placeholders. `Type` (Text vs Icon) selects text-vs-icon
 * item shape. See FIGMA_CODE_CONNECT.md.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=91702-11986",
  {
    props: {
      // 3rd/4th/5th optional segments → extra placeholder items.
      thirdItem: figma.boolean("3rd Button", {
        true: html`<ui5-segmented-button-item>Option 3</ui5-segmented-button-item>`,
        false: "",
      }),
      fourthItem: figma.boolean("4th Button", {
        true: html`<ui5-segmented-button-item>Option 4</ui5-segmented-button-item>`,
        false: "",
      }),
      fifthItem: figma.boolean("5th Button", {
        true: html`<ui5-segmented-button-item>Option 5</ui5-segmented-button-item>`,
        false: "",
      }),
    },
    example: ({ thirdItem, fourthItem, fifthItem }) =>
      html`<ui5-segmented-button>
  <ui5-segmented-button-item selected>Option 1</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 2</ui5-segmented-button-item>
  ${thirdItem}${fourthItem}${fifthItem}
</ui5-segmented-button>`,
  }
);
