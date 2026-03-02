import { createReactComponent } from "@ui5/webcomponents-base";
import AITextAreaClass from "@ui5/webcomponents-ai/dist/TextArea.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";

const AITextArea = createReactComponent(AITextAreaClass);
const Menu = createReactComponent(MenuClass);

function App() {

  const handleBeforeunload = () => {
    stopTypingAnimation();
		resetGenerationState();
  };

  return (
    <>
      <div className="demo-container">

    		<AITextArea id="ai-textarea" value="Innovation managers operate with both creativity and business acumen, driving initiatives that cultivate an innovation-friendly culture." rows={8} placeholder="Write your content here...">

    			<Menu slot="menu" id="ai-menu" />
    		</AITextArea>
    	<!-- playground-fold -->
    	<script type="module" src="main.js"></script>
    </>
  );
}

export default App;
