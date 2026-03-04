import { createReactComponent } from "@ui5/webcomponents-base";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import "@ui5/webcomponents-icons/dist/bold-text.js";
import "@ui5/webcomponents-icons/dist/underline-text.js";
import "@ui5/webcomponents-icons/dist/italic-text.js";

const SegmentedButton = createReactComponent(SegmentedButtonClass);
const SegmentedButtonItem = createReactComponent(SegmentedButtonItemClass);

function App() {

  return (
    <>
      <SegmentedButton accessible-name="Font style" items-fit-content={true}>
            <SegmentedButtonItem selected={true}>Map</SegmentedButtonItem>
            <SegmentedButtonItem>Some Big Satellite</SegmentedButtonItem>
            <SegmentedButtonItem>Terrain</SegmentedButtonItem>
            <SegmentedButtonItem tooltip="Italic" icon="italic-text" />
        </SegmentedButton>
    </>
  );
}

export default App;
