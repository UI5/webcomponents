import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons-tnt/dist/actor.js";
import "@ui5/webcomponents-icons-tnt/dist/aggregator.js";
import "@ui5/webcomponents-icons-tnt/dist/association.js";
import "@ui5/webcomponents-icons-tnt/dist/network.js";
import "@ui5/webcomponents-icons-tnt/dist/repeater.js";

const Icon = createReactComponent(IconClass);

function App() {

  return (
    <>
      <Icon name="tnt/actor" />
        <Icon name="tnt/aggregator" />
        <Icon name="tnt/association" />
        <Icon name="tnt/network" />
        <Icon name="tnt/repeater" />
    </>
  );
}

export default App;
