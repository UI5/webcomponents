import { createReactComponent } from "@ui5/webcomponents-base";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";

const BusyIndicator = createReactComponent(BusyIndicatorClass);

function App() {

  return (
    <>
      <BusyIndicator text="Loading data from backend server.." active={true}>
            <div style={{ height: "200px", width: "200px" }}></div>
        </BusyIndicator>
        <BusyIndicator text="Loading data from backend server..." text-placement="Top" active={true}>
            <div style={{ height: "200px", width: "200px" }}></div>
        </BusyIndicator>
    </>
  );
}

export default App;
