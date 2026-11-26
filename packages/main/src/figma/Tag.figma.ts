/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Tag".
 * Node: 159886:3878. Emits <ui5-tag>.
 *
 * Design / colorScheme follows the same two-axis pattern as MessageStrip:
 *  - "Value State" = None/Information/Positive/Critical/Negative → design (Neutral/Information/Positive/Negative/Critical)
 *  - "Value State=Indication Colors" + "Color" axis → design="Set1"/"Set2" + color-scheme
 *  - Hover/Down Interaction States are visual pseudo-states — ignored.
 *  - Large Design=Yes → design="Large" is NOT a real TagDesign value; ui5-tag has no size prop. Ignored.
 *  - Icon is INSTANCE_SWAP — name unreadable, hardcoded placeholder "globe".
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=159886-3878",
  {
    props: {
      // Semantic design from Value State axis.
      designSemantic: figma.enum("Value State", {
        None: "",
        Information: 'design="Information"',
        Positive: 'design="Positive"',
        Critical: 'design="Critical"',
        Negative: 'design="Negative"',
        "Indication Colors": "",
      }),
      // Custom colours: Set1/Set2 + color-scheme from the Color axis.
      designColorSet: figma.enum("Color", {
        None: "",
        Semantic: "",
        "Indication 1": 'design="Set1" color-scheme="1"',
        "Indication 2": 'design="Set1" color-scheme="2"',
        "Indication 3": 'design="Set1" color-scheme="3"',
        "Indication 4": 'design="Set1" color-scheme="4"',
        "Indication 5": 'design="Set1" color-scheme="5"',
        "Indication 6": 'design="Set1" color-scheme="6"',
        "Indication 7": 'design="Set1" color-scheme="7"',
        "Indication 8": 'design="Set1" color-scheme="8"',
        "Indication 9": 'design="Set1" color-scheme="9"',
        "Indication 10": 'design="Set1" color-scheme="10"',
        "Indication 1b": 'design="Set2" color-scheme="1"',
        "Indication 2b": 'design="Set2" color-scheme="2"',
        "Indication 3b": 'design="Set2" color-scheme="3"',
        "Indication 4b": 'design="Set2" color-scheme="4"',
        "Indication 5b": 'design="Set2" color-scheme="5"',
        "Indication 6b": 'design="Set2" color-scheme="6"',
        "Indication 7b": 'design="Set2" color-scheme="7"',
        "Indication 8b": 'design="Set2" color-scheme="8"',
        "Indication 9b": 'design="Set2" color-scheme="9"',
        "Indication 10b": 'design="Set2" color-scheme="10"',
      }),
      // Label text.
      text: figma.string("✏️ Text"),
      // Left Icon boolean — icon name is INSTANCE_SWAP (unreadable), use placeholder.
      iconAttr: figma.boolean("Left Icon", {
        true: 'icon="globe"',
        false: "",
      }),
    },
    example: ({ designSemantic, designColorSet, text, iconAttr }) =>
      html`<ui5-tag ${designSemantic} ${designColorSet} ${iconAttr}>${text}</ui5-tag>`,
  }
);
