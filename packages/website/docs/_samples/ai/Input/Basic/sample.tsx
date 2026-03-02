import { createReactComponent } from "@ui5/webcomponents-base";
import AIInputClass from "@ui5/webcomponents-ai/dist/Input.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";

const AIInput = createReactComponent(AIInputClass);
const MenuItem = createReactComponent(MenuItemClass);

function App() {

  return (
    <>
      <div style={{ height: "200px" }}>
            <AIInput style={{ width: "400px" }} id="ai-input" placeholder="Write your title">
                <MenuItem text="Generate" slot="actions" data-menu-action="generate" />
            </AIInput>
        </div>
    </>
  );
}

export default App;
