import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";

const BusyIndicator = createComponent(BusyIndicatorClass);

function App() {
  return (
    <>
      <BusyIndicator text="Loading data from backend server.." active={true}>
        <div style={{ height: "200px", width: "200px" }}></div>
      </BusyIndicator>
      <BusyIndicator
        text="Loading data from backend server..."
        textPlacement="Top"
        active={true}
      >
        <div style={{ height: "200px", width: "200px" }}></div>
      </BusyIndicator>
    </>
  );
}

export default App;
