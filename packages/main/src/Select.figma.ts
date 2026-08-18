/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Select".
 * Node: 181557:7507. Emits <ui5-select>.
 *
 * ⚠️ LARGELY UNMAPPABLE — see FIGMA_CODE_CONNECT_FINDINGS.md § Select. The only Figma
 * axes are `Form Factor` (global density, ignored) and `Drop-Down` (open/closed
 * popover — a runtime visual state, NOT a component prop). The options are a
 * slotted Input instance with no readable option list. So there is nothing
 * dynamic to map; this emits a representative static example.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=181557-7507",
  {
    props: {
      // Value-state message text from the nested "Input Message Popover"
      // instance (deeply nested under Drop-Down > Value Message). Same pattern
      // as Input — top-level prop, referenced as the resolved ${msg.text}.
      msg: figma.nestedProps("Input Message Popover", {
        text: figma.string("✏️ Text"),
      }),
    },
    // Options are a slotted Input instance with no readable option list, so the
    // options are representative placeholders. valueStateMessage slot is always
    // emitted (text resolves empty on non-popover variants).
    example: ({ msg }) =>
      html`<ui5-select>
  <ui5-option>Option 1</ui5-option>
  <ui5-option>Option 2</ui5-option>
  <ui5-option>Option 3</ui5-option>
  <div slot="valueStateMessage">${msg.text}</div>
</ui5-select>`,
  }
);
