import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ColorPaletteClass from "@ui5/webcomponents/dist/ColorPalette.js";
import ColorPaletteItemClass from "@ui5/webcomponents/dist/ColorPaletteItem.js";

const ColorPalette = createReactComponent(ColorPaletteClass);
const ColorPaletteItem = createReactComponent(ColorPaletteItemClass);

function App() {
  return (
    <>
      <ColorPalette>
        <ColorPaletteItem value="darkblue" />
        <ColorPaletteItem value="pink" />
        <ColorPaletteItem value="#444444" tooltip="charcoal" />
        <ColorPaletteItem value="rgb(0,200,0)" tooltip="bright green" />
        <ColorPaletteItem value="green" />
        <ColorPaletteItem value="darkred" />
        <ColorPaletteItem value="yellow" />
        <ColorPaletteItem value="blue" />
        <ColorPaletteItem value="cyan" />
        <ColorPaletteItem value="orange" />
        <ColorPaletteItem value="#5480e7" tooltip="periwinkle" />
        <ColorPaletteItem value="#ff6699" tooltip="brilliant rose" />
      </ColorPalette>
    </>
  );
}

export default App;
