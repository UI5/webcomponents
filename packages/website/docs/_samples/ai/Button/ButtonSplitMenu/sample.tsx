import { createReactComponent } from "@ui5/webcomponents-base";
import AIButtonClass from "@ui5/webcomponents-ai/dist/Button.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/ButtonState.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";

const AIButton = createReactComponent(AIButtonClass);
const AIButtonState = createReactComponent(AIButtonStateClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

function App() {

  return (
    <>
      <AIButton id="myAiButton" state="generate">
    			<AIButtonState name="generate" text="Generate" icon="ai" />
    			<AIButtonState name="generating" text="Stop Generating" icon="stop" />
    			<AIButtonState name="regenerate" text="Regenerate" icon="ai" show-arrow-button={true} />
    		</AIButton>

    		<Menu id="menu">
    			<MenuItem text="Edit prompt" />
    			<MenuItem text="Change tone" />
    		</Menu>
    </>
  );
}

export default App;
