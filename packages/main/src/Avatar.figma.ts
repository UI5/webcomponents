/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Avatar".
 * Node: 573:3623. Emits <ui5-avatar>.
 *
 * See FIGMA_CODE_CONNECT.md § Avatar. Pseudo-states ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=573-3623",
  {
    props: {
      // Size → size (1:1).
      size: figma.enum("Size", {
        XS: 'size="XS"',
        S: 'size="S"',
        M: 'size="M"',
        L: 'size="L"',
        XL: 'size="XL"',
      }),
      // Color axis → color-scheme. 1..10 → Accent1..Accent10; Transparent/
      // Placeholder map 1:1; Image/Tile have no color-scheme equivalent.
      colorScheme: figma.enum("Color", {
        "1": 'color-scheme="Accent1"',
        "2": 'color-scheme="Accent2"',
        "3": 'color-scheme="Accent3"',
        "4": 'color-scheme="Accent4"',
        "5": 'color-scheme="Accent5"',
        "6": 'color-scheme="Accent6"',
        "7": 'color-scheme="Accent7"',
        "8": 'color-scheme="Accent8"',
        "9": 'color-scheme="Accent9"',
        "10": 'color-scheme="Accent10"',
        Transparent: 'color-scheme="Transparent"',
        Placeholder: 'color-scheme="Placeholder"',
        Image: "",
        Tile: "",
      }),
      // Initials text (Type = Initials).
      initials: figma.string("✏️ Initials"),
    },
    // Person/Object Icon are instance-swaps; Badge is a slot — omitted.
    example: ({ size, colorScheme, initials }) =>
      html`<ui5-avatar ${size} ${colorScheme} initials="${initials}"></ui5-avatar>`,
  }
);
