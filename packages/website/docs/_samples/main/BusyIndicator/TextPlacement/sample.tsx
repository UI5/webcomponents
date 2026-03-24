import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";

const BusyIndicator = createReactComponent(BusyIndicatorClass);

export const Example = () => {
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
