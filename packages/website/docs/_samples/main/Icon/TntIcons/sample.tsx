import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons-tnt/dist/actor.js";
import "@ui5/webcomponents-icons-tnt/dist/aggregator.js";
import "@ui5/webcomponents-icons-tnt/dist/association.js";
import "@ui5/webcomponents-icons-tnt/dist/network.js";
import "@ui5/webcomponents-icons-tnt/dist/repeater.js";

const Icon = createComponent(IconClass);

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
