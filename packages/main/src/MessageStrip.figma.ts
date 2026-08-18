/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Message Strip".
 * Node: 910:2517. Emits <ui5-message-strip>.
 *
 * See FIGMA_CODE_CONNECT_FINDINGS.md § MessageStrip. Form Factor ignored.
 *
 * Design comes from TWO mutually-exclusive Figma axes:
 *  - "Value State" carries the 4 semantic designs (Information/Positive/
 *    Critical/Negative); its "Indication Color" option defers to the Color axis.
 *  - "Color" carries the 20 custom colours as a single enum: Indication 1..10 →
 *    design="ColorSet1" color-scheme="1".."10", and 1b..10b → ColorSet2 + scheme.
 * When a semantic state is selected, Color is "None" (empty); when a custom
 * colour is selected, Value State is "Indication Color" (empty). So the two
 * placeholders never both emit a `design`.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=910-2517",
  {
    props: {
      // Semantic designs. "Indication Color" defers to the Color axis (empty here).
      designSemantic: figma.enum("Value State", {
        Information: 'design="Information"',
        Positive: 'design="Positive"',
        Critical: 'design="Critical"',
        Negative: 'design="Negative"',
        "Indication Color": "",
      }),
      // Custom colours: ColorSet1/2 + color-scheme 1..10 from a single axis.
      designColorSet: figma.enum("Color", {
        None: "",
        "Indication 1": 'design="ColorSet1" color-scheme="1"',
        "Indication 2": 'design="ColorSet1" color-scheme="2"',
        "Indication 3": 'design="ColorSet1" color-scheme="3"',
        "Indication 4": 'design="ColorSet1" color-scheme="4"',
        "Indication 5": 'design="ColorSet1" color-scheme="5"',
        "Indication 6": 'design="ColorSet1" color-scheme="6"',
        "Indication 7": 'design="ColorSet1" color-scheme="7"',
        "Indication 8": 'design="ColorSet1" color-scheme="8"',
        "Indication 9": 'design="ColorSet1" color-scheme="9"',
        "Indication 10": 'design="ColorSet1" color-scheme="10"',
        "Indication 1b": 'design="ColorSet2" color-scheme="1"',
        "Indication 2b": 'design="ColorSet2" color-scheme="2"',
        "Indication 3b": 'design="ColorSet2" color-scheme="3"',
        "Indication 4b": 'design="ColorSet2" color-scheme="4"',
        "Indication 5b": 'design="ColorSet2" color-scheme="5"',
        "Indication 6b": 'design="ColorSet2" color-scheme="6"',
        "Indication 7b": 'design="ColorSet2" color-scheme="7"',
        "Indication 8b": 'design="ColorSet2" color-scheme="8"',
        "Indication 9b": 'design="ColorSet2" color-scheme="9"',
        "Indication 10b": 'design="ColorSet2" color-scheme="10"',
      }),
      // Icon variant False → hide-icon.
      hideIcon: figma.enum("Icon", {
        False: "hide-icon",
        True: "",
      }),
      // Close Button boolean False → hide-close-button.
      hideClose: figma.boolean("Close Button", {
        true: "",
        false: "hide-close-button",
      }),
      // Message text — read the "Text Message" layer directly.
      message: figma.textContent("Text Message"),
      // Custom icon slot when Icon=True. Name is a placeholder ("information") —
      // the Icon instance-swap name isn't readable. (figma.instance("Icon") was
      // tried to resolve the real icon via Code-Connected icons — it emitted
      // EMPTY, so the placeholder is kept. See FIGMA_ICON_NAME_PROPOSAL.md.)
      iconSlot: figma.enum("Icon", {
        True: html`<ui5-icon slot="icon" name="information"></ui5-icon>`,
        False: "",
      }),
    },
    example: ({ designSemantic, designColorSet, hideIcon, hideClose, message, iconSlot }) =>
      html`<ui5-message-strip ${designSemantic} ${designColorSet} ${hideIcon} ${hideClose}>${iconSlot}${message}</ui5-message-strip>`,
  }
);
