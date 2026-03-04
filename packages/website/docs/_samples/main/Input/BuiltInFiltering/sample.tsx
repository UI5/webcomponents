import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";
import SuggestionItemGroupClass from "@ui5/webcomponents/dist/SuggestionItemGroup.js";

const Input = createComponent(InputClass);
const SuggestionItem = createComponent(SuggestionItemClass);
const SuggestionItemGroup = createComponent(SuggestionItemGroupClass);

function App() {

  return (
    <>
      <Input filter="Contains" showSuggestions={true}>
    		<SuggestionItemGroup headerText="Vegetables">
    			<SuggestionItem text="Cucumber" />
    			<SuggestionItem text="Carrot" />
    			<SuggestionItem text="Broccoli" />
    		</SuggestionItemGroup>
    		<SuggestionItemGroup headerText="Fruits">
    			<SuggestionItem text="Apple" />
    			<SuggestionItem text="Banana" />
    			<SuggestionItem text="Orange" />
    		</SuggestionItemGroup>
    	</Input>
    </>
  );
}

export default App;
