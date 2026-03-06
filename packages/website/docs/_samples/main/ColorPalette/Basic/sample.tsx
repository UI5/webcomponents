import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ColorPaletteClass from "@ui5/webcomponents/dist/ColorPalette.js";
import ColorPaletteItemClass from "@ui5/webcomponents/dist/ColorPaletteItem.js";

const ColorPalette = createComponent(ColorPaletteClass);
const ColorPaletteItem = createComponent(ColorPaletteItemClass);

function App() {
  return (
    <>
      <ColorPalette>
        <ColorPaletteItem value="darkblue" />
        <ColorPaletteItem value="pink" />
        <ColorPaletteItem value="#444444" />
        <ColorPaletteItem value="rgb(0,200,0)" />
        <ColorPaletteItem value="green" />
        <ColorPaletteItem value="darkred" />
        <ColorPaletteItem value="yellow" />
        <ColorPaletteItem value="blue" />
        <ColorPaletteItem value="cyan" />
        <ColorPaletteItem value="orange" />
        <ColorPaletteItem value="#5480e7" />
        <ColorPaletteItem value="#ff6699" />
      </ColorPalette>
    </>
  );
}

export default App;
