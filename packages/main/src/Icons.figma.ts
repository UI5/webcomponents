/**
 * PROTOTYPE (Option B): Code Connect entries for individual icons.
 *
 * Proves that connecting each icon component to emit its own name lets a host
 * component read the SELECTED icon via figma.instance() — making icon names
 * dynamic instead of hardcoded placeholders.
 *
 * Hand-written for a handful of icons as proof of concept. The parser requires
 * a LITERAL URL per figma.connect (no loops/computed URLs), so the real thing
 * would be GENERATED from @ui5/webcomponents-icons + the icon node IDs.
 * See FIGMA_ICON_NAME_PROPOSAL.md. Icons live on page "❖ Iconography".
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=1095-2437",
  { example: () => html`<ui5-icon name="globe"></ui5-icon>` }
);

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=1105-2390",
  { example: () => html`<ui5-icon name="information"></ui5-icon>` }
);

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=1105-2394",
  { example: () => html`<ui5-icon name="inspect"></ui5-icon>` }
);

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=1105-2344",
  { example: () => html`<ui5-icon name="home"></ui5-icon>` }
);
