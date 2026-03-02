import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ColorPaletteItemClass from "@ui5/webcomponents/dist/ColorPaletteItem.js";
import ColorPalettePopoverClass from "@ui5/webcomponents/dist/ColorPalettePopover.js";

const Button = createReactComponent(ButtonClass);
const ColorPaletteItem = createReactComponent(ColorPaletteItemClass);
const ColorPalettePopover = createReactComponent(ColorPalettePopoverClass);

function App() {

  const handleClick = () => {
    colorPalettePopover.open = !colorPalettePopover.open;
  };

  return (
    <>
      <Button id="colorPaletteBtn">Open ColorPalettePopover</Button>

        <ColorPalettePopover id="colorPalettePopover" opener="colorPaletteBtn" show-recent-colors={true} show-more-colors={true} show-default-color={true} default-color="orange"
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

export default App;
