/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Segmented Button".
 * Node: 91702:11986. Emits <ui5-segmented-button> with slotted items.
 *
 * LIMITATIONS (see FIGMA_CODE_CONNECT_FINDINGS.md § SegmentedButton):
 *  - Item labels are placeholders — the real text lives in Figma slots
 *    (⿻ Text/Icon Segments), not readable.
 *  - Icon NAMES are placeholders ("home") — instance-swap, not readable.
 *  - `Type` (Text/Icon) IS readable and switches each item between text form
 *    and icon form.
 *  - The `selected` item can't be read from Figma; item 1 is marked selected
 *    as a representative default (does NOT reflect the actually-pressed segment).
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=91702-11986",
  {
    props: {
      // Type → text-vs-icon form for the two always-present items.
      // Item 1 keeps `selected` (representative default — not readable).
      item1: figma.enum("Type", {
        Text: html`<ui5-segmented-button-item selected>Option 1</ui5-segmented-button-item>`,
        Icon: html`<ui5-segmented-button-item selected icon="home"></ui5-segmented-button-item>`,
      }),
      item2: figma.enum("Type", {
        Text: html`<ui5-segmented-button-item>Option 2</ui5-segmented-button-item>`,
        Icon: html`<ui5-segmented-button-item icon="home"></ui5-segmented-button-item>`,
      }),
      // 3rd/4th/5th optional segments — presence from booleans, form from Type.
      thirdItem: figma.boolean("3rd Button", {
        true: figma.enum("Type", {
          Text: html`<ui5-segmented-button-item>Option 3</ui5-segmented-button-item>`,
          Icon: html`<ui5-segmented-button-item icon="home"></ui5-segmented-button-item>`,
        }),
        false: "",
      }),
      fourthItem: figma.boolean("4th Button", {
        true: figma.enum("Type", {
          Text: html`<ui5-segmented-button-item>Option 4</ui5-segmented-button-item>`,
          Icon: html`<ui5-segmented-button-item icon="home"></ui5-segmented-button-item>`,
        }),
        false: "",
      }),
      fifthItem: figma.boolean("5th Button", {
        true: figma.enum("Type", {
          Text: html`<ui5-segmented-button-item>Option 5</ui5-segmented-button-item>`,
          Icon: html`<ui5-segmented-button-item icon="home"></ui5-segmented-button-item>`,
        }),
        false: "",
      }),
    },
    example: ({ item1, item2, thirdItem, fourthItem, fifthItem }) =>
      html`<ui5-segmented-button>
  ${item1}
  ${item2}
  ${thirdItem}${fourthItem}${fifthItem}
</ui5-segmented-button>`,
  }
);
