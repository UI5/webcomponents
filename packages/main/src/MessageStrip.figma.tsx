/**
 * React Code Connect mapping for the SAP Web UI Kit "Message Strip".
 * Node 910:2517. Mirrors MessageStrip.figma.ts. See FIGMA_CODE_CONNECT_FINDINGS.md.
 *
 * NOTE (React vs WC asymmetry): the React parser requires each prop to be a
 * single enum ref and cannot merge two axes into one `design` attribute, so
 * `design` is driven by "Value State" only (Indication Color → ColorSet1) while
 * `colorScheme` is made dynamic from the "Color" axis (1..10). ColorSet2 (the
 * "…b" colours) is therefore NOT reachable in the React variant — the WC variant
 * (MessageStrip.figma.ts) maps it fully via raw-string template fragments.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MessageStrip, Icon } from "@ui5/webcomponents-react";

figma.connect(
  MessageStrip,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=910-2517",
  {
    props: {
      // Value State → design. "Indication Color" → ColorSet1 (ColorSet2 not reachable here).
      design: figma.enum("Value State", {
        Information: "Information",
        Positive: "Positive",
        Critical: "Critical",
        Negative: "Negative",
        "Indication Color": "ColorSet1",
      }),
      // Color axis → color-scheme "1".."10" (both the base and "…b" rows map to
      // the same scheme number; the ColorSet1-vs-2 distinction is lost, see note).
      colorScheme: figma.enum("Color", {
        None: undefined,
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
      hideIcon: figma.enum("Icon", {
        False: true,
        True: false,
      }),
      hideCloseButton: figma.boolean("Close Button", {
        true: false,
        false: true,
      }),
      // Message text — read the "Text Message" layer directly.
      message: figma.textContent("Text Message"),
      // Custom icon slot when Icon=True. Name is a placeholder ("information") —
      // the Icon instance-swap name isn't readable.
      icon: figma.enum("Icon", {
        True: <Icon slot="icon" name="information" />,
        False: undefined,
      }),
    },
    example: ({ design, colorScheme, hideIcon, hideCloseButton, message, icon }) => (
      <MessageStrip design={design} colorScheme={colorScheme} hideIcon={hideIcon} hideCloseButton={hideCloseButton} icon={icon}>
        {message}
      </MessageStrip>
    ),
  }
);
