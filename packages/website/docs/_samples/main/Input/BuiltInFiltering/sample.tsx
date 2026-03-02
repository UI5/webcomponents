import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";
import SuggestionItemGroupClass from "@ui5/webcomponents/dist/SuggestionItemGroup.js";

const Input = createReactComponent(InputClass);
const SuggestionItem = createReactComponent(SuggestionItemClass);
const SuggestionItemGroup = createReactComponent(SuggestionItemGroupClass);

function App() {

  return (
    <>
      <Input filter="Contains" show-suggestions={true}>
    		<SuggestionItemGroup header-text="Vegetables">
    			<SuggestionItem text="Cucumber" />
    			<SuggestionItem text="Carrot" />
    			<SuggestionItem text="Broccoli" />
    		</SuggestionItemGroup>
    		<SuggestionItemGroup header-text="Fruits">
    			<SuggestionItem text="Apple" />
    			<SuggestionItem text="Banana" />
    			<SuggestionItem text="Orange" />
    		</SuggestionItemGroup>
    	</Input>
    </>
  );
}

export default App;
