/**
 * React Code Connect mapping for the SAP Web UI Kit "Product Switch".
 * Node 454469:7014. Mirrors ProductSwitch.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProductSwitch, ProductSwitchItem } from "@ui5/webcomponents-react";

figma.connect(
  ProductSwitch,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=454469-7014",
  {
    props: {},
    example: () => (
      <ProductSwitch>
        <ProductSwitchItem titleText="Home" subtitleText="Central Home" icon="home" />
        <ProductSwitchItem titleText="Analytics" subtitleText="Data Analysis" icon="business-objects-experience" />
      </ProductSwitch>
    ),
  }
);
