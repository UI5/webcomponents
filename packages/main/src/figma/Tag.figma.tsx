/**
 * React Code Connect mapping for the SAP Web UI Kit "Tag".
 * Node 159886:3878. Mirrors Tag.figma.ts.
 *
 * React asymmetry: design="Set1"/"Set2" and colorScheme are separate props,
 * so Set2 colours are NOT reachable here (same limitation as MessageStrip).
 * Icon name is INSTANCE_SWAP — hardcoded placeholder "globe".
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Tag } from "@ui5/webcomponents-react";

figma.connect(
  Tag,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=159886-3878",
  {
    props: {
      // Semantic designs from Value State.
      design: figma.enum("Value State", {
        None: "Neutral",
        Information: "Information",
        Positive: "Positive",
        Critical: "Critical",
        Negative: "Negative",
        "Indication Colors": "Set1",
      }),
      // Color axis → colorScheme (Set2 not reachable, see note above).
      colorScheme: figma.enum("Color", {
        None: undefined,
        Semantic: undefined,
        "Indication 1": "1",
        "Indication 2": "2",
        "Indication 3": "3",
        "Indication 4": "4",
        "Indication 5": "5",
        "Indication 6": "6",
        "Indication 7": "7",
        "Indication 8": "8",
        "Indication 9": "9",
        "Indication 10": "10",
        "Indication 1b": "1",
        "Indication 2b": "2",
        "Indication 3b": "3",
        "Indication 4b": "4",
        "Indication 5b": "5",
        "Indication 6b": "6",
        "Indication 7b": "7",
        "Indication 8b": "8",
        "Indication 9b": "9",
        "Indication 10b": "10",
      }),
      // Label text.
      text: figma.string("✏️ Text"),
      // Icon — INSTANCE_SWAP, placeholder name used.
      icon: figma.boolean("Left Icon", {
        true: "globe",
        false: undefined,
      }),
    },
    example: ({ design, colorScheme, text, icon }) => (
      <Tag design={design} colorScheme={colorScheme} icon={icon}>
        {text}
      </Tag>
    ),
  }
);
