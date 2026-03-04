import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ColorPaletteItemClass from "@ui5/webcomponents/dist/ColorPaletteItem.js";
import ColorPalettePopoverClass from "@ui5/webcomponents/dist/ColorPalettePopover.js";

const Button = createReactComponent(ButtonClass);
const ColorPaletteItem = createReactComponent(ColorPaletteItemClass);
const ColorPalettePopover = createReactComponent(ColorPalettePopoverClass);

function App() {
  const colorPalettePopoverRef = useRef(null);

  const handleColorPaletteBtnClick = () => {
    colorPalettePopoverRef.current.open = !colorPalettePopoverRef.current.open;
  };

  return (
    <>
      <Button id="colorPaletteBtn" onClick={handleColorPaletteBtnClick}>Open ColorPalettePopover</Button>
        <ColorPalettePopover ref={colorPalettePopoverRef} id="colorPalettePopover" opener="colorPaletteBtn">
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
        </ColorPalettePopover>
    </>
  );
}

export default App;
