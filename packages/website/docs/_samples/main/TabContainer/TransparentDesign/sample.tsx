import { createReactComponent } from "@ui5/webcomponents-base";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Tab = createReactComponent(TabClass);
const Text = createReactComponent(TextClass);

function App() {

  return (
    <>
      <ui5-tabcontainer id="tabContainerTransparentContent" header-background-design="Solid" content-background-design="Transparent">
        <Tab text="Tab 1" selected={true}>
            <ui5-tabcontainer id="tabContainerBackgroundDesign" header-background-design="Transparent" content-background-design="Transparent">
                <Tab text="Tab 1" selected={true}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptates accusamus est quibusdam inventore ipsam?</Text>
                </Tab>
                <Tab text="Tab 2">
                    <Text>Accusamus minus aperiam sunt ipsam eos quos et maxime facilis tempora neque ratione nemo laborum expedita aliquid officiis nisi, necessitatibus quasi distinctio?</Text>
                </Tab>
                <Tab text="Tab 3">
                    <Text>Dolores totam perferendis numquam incidunt obcaecati, id quo at alias rem deserunt praesentium repellat ipsum commodi consequuntur veniam et ducimus animi qui nobis accusantium tenetur eveniet culpa non!</Text>
                </Tab>
            </ui5-tabcontainer>
        </Tab>
        <Tab text="Tab 2">
            <Text>Accusamus minus aperiam sunt ipsam eos quos et maxime facilis tempora neque ratione nemo laborum expedita aliquid officiis nisi, necessitatibus quasi distinctio?</Text>
        </Tab>
    </ui5-tabcontainer>
    </>
  );
}

export default App;
