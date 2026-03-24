import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ColorPaletteItemClass from "@ui5/webcomponents/dist/ColorPaletteItem.js";
import ColorPalettePopoverClass from "@ui5/webcomponents/dist/ColorPalettePopover.js";

const Button = createReactComponent(ButtonClass);
const ColorPaletteItem = createReactComponent(ColorPaletteItemClass);
const ColorPalettePopover = createReactComponent(ColorPalettePopoverClass);

export const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button id="colorPaletteBtn" onClick={() => setOpen(!open)}>
        Open ColorPalettePopover
      </Button>
      <ColorPalettePopover
        open={open}
        id="colorPalettePopover"
        opener="colorPaletteBtn"
        showDefaultColor={true}
        defaultColor="orange"
        onClose={() => setOpen(false)}
      >
        <ColorPaletteItem value="lightsalmon" />
        <ColorPaletteItem value="lightpink" />
        <ColorPaletteItem value="rgb(216,124,172)" />
        <ColorPaletteItem value="#6c666d" />
        <ColorPaletteItem value="rgb(55,81,95)" />
        <ColorPaletteItem value="#0072bb" />
        <ColorPaletteItem value="powderblue" />
        <ColorPaletteItem value="rgb(143,201,58)" />
        <ColorPaletteItem value="rgb(195,172,206)" />
        <ColorPaletteItem value="orange" />
        <ColorPaletteItem value="#ef3054" />
        <ColorPaletteItem value="#ff6f59" />
        <ColorPaletteItem value="moccasin" />
        <ColorPaletteItem value="#07A0C3" />
        <ColorPaletteItem value="rgb(8,103,136)" />
      </ColorPalettePopover>
    </>
  );
}
