import { createReactComponent } from "@ui5/webcomponents-base";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";

const Tab = createReactComponent(TabClass);
const Text = createReactComponent(TextClass);
const TabContainer = createReactComponent(TabContainerClass);

function App() {

  return (
    <>
      <TabContainer id="tabContainerTransparentContent" headerBackgroundDesign="Solid" contentBackgroundDesign="Transparent">
        <Tab text="Tab 1" selected={true}>
            <TabContainer id="tabContainerBackgroundDesign" headerBackgroundDesign="Transparent" contentBackgroundDesign="Transparent">
                <Tab text="Tab 1" selected={true}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptates accusamus est quibusdam inventore ipsam?</Text>
                </Tab>
                <Tab text="Tab 2">
                    <Text>Accusamus minus aperiam sunt ipsam eos quos et maxime facilis tempora neque ratione nemo laborum expedita aliquid officiis nisi, necessitatibus quasi distinctio?</Text>
                </Tab>
                <Tab text="Tab 3">
                    <Text>Dolores totam perferendis numquam incidunt obcaecati, id quo at alias rem deserunt praesentium repellat ipsum commodi consequuntur veniam et ducimus animi qui nobis accusantium tenetur eveniet culpa non!</Text>
                </Tab>
            </TabContainer>
        </Tab>
        <Tab text="Tab 2">
            <Text>Accusamus minus aperiam sunt ipsam eos quos et maxime facilis tempora neque ratione nemo laborum expedita aliquid officiis nisi, necessitatibus quasi distinctio?</Text>
        </Tab>
    </TabContainer>
    </>
  );
}

export default App;
