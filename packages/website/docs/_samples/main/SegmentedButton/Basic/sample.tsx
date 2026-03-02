import { createReactComponent } from "@ui5/webcomponents-base";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";

const SegmentedButton = createReactComponent(SegmentedButtonClass);
const SegmentedButtonItem = createReactComponent(SegmentedButtonItemClass);

function App() {

  return (
    <>
      <SegmentedButton accessible-name="Font style">
            <SegmentedButtonItem tooltip="Bold" icon="bold-text" selected={true} />
            <SegmentedButtonItem tooltip="Underline" icon="underline-text" />
            <SegmentedButtonItem tooltip="Italic" icon="italic-text" />
        </SegmentedButton>

        <br /><br />

        <SegmentedButton accessible-name="Map style">
            <SegmentedButtonItem>Map</SegmentedButtonItem>
            <SegmentedButtonItem selected={true}>Satellite</SegmentedButtonItem>
            <SegmentedButtonItem>Terrain</SegmentedButtonItem>
        </SegmentedButton>
    </>
  );
}

export default App;
