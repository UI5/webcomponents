/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Avatar".
 * Node: 573:3623. Emits <ui5-avatar>.
 *
 * See FIGMA_CODE_CONNECT_FINDINGS.md § Avatar. Pseudo-states ignored.
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
      // Content → shape. Person → Circle, Object → Square.
      // VERIFIED by screenshot of node 573:3623: Person column renders circles,
      // Object column renders squares. NOTE misalignment: in Figma shape is
      // COUPLED to Content (content source), but in the WC `shape` is an
      // INDEPENDENT prop — Figma can't express e.g. a square person avatar.
      shape: figma.enum("Content", {
        Person: 'shape="Circle"',
        Object: 'shape="Square"',
      }),
      // Interaction State = Disabled → disabled.
      disabled: figma.enum("Interaction State", {
        Disabled: "disabled",
        Regular: "",
        Hover: "",
        Active: "",
        "Toggled Hover": "",
      }),
      // Initials text — the Figma Initials layer only exists on Type=Initials
      // variants, so this resolves empty (attribute omitted) on Image/Icon.
      initials: figma.string("✏️ Initials"),
      // Type=Icon → icon="employee" (WC default). Icon NAME is a placeholder —
      // Person/Object Icon are instance-swaps, not readable. Emitted only for
      // the Icon type.
      icon: figma.enum("Type", {
        Icon: 'icon="employee"',
        Image: "",
        Initials: "",
      }),
      // Type=Image → slotted <img> with a placeholder URL (the actual image
      // fill isn't readable). Consumer swaps the src.
      image: figma.enum("Type", {
        Image: html`<img src="https://via.placeholder.com/48" />`,
        Icon: "",
        Initials: "",
      }),
      // Badge boolean → slotted <ui5-avatar-badge> with placeholder icon="edit"
      // (badge content isn't readable — presence only).
      badge: figma.boolean("Badge", {
        true: html`<ui5-avatar-badge slot="badge" icon="edit"></ui5-avatar-badge>`,
        false: "",
      }),
    },
    example: ({ size, colorScheme, shape, disabled, initials, icon, image, badge }) =>
      html`<ui5-avatar ${size} ${shape} ${colorScheme} ${disabled} ${icon} initials="${initials}">${image}${badge}</ui5-avatar>`,
  }
);
