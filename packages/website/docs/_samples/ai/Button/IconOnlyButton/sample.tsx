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

  const handleItemClick = () => {
    var button = menu.opener;
	if (evt.detail.text === "Regenerate") {
		button.state = "generating";
		startGeneration(button);
  };

  return (
    <>
      <AIButton id="myAiButtonIconOnly" state="generate">
    		<AIButtonState name="generate" icon="ai" />
    		<AIButtonState name="generating" icon="stop" />
    		<AIButtonState name="revise" icon="ai" end-icon="navigation-down-arrow" />
    	</AIButton>

    	<Menu id="menu">
    		<MenuItem text="Regenerate" />
    		<MenuItem text="Fix Spelling & Grammar" starts-section={true} />
    		<MenuItem text="Change Tone">
    			<MenuItem text="Option 1" />
    			<MenuItem text="Option 2" />
    			<MenuItem text="Option 3" />
    		</MenuItem>
    		<MenuItem text="Adjust Length">
    			<MenuItem text="Shorten text" />
    			<MenuItem text="Lengthen text" />
    		</MenuItem>
    		<MenuItem text="Bulleted List" />
    		<MenuItem text="Translate">
    			<MenuItem text="English" />
    			<MenuItem text="German" />
    			<MenuItem text="Spanish" />
    		</MenuItem>
    	</Menu>
    </>
  );
}

export default App;
