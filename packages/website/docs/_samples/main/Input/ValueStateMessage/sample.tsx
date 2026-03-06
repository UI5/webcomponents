import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";

const Input = createComponent(InputClass);
const SuggestionItem = createComponent(SuggestionItemClass);

function App() {
  return (
    <>
      <Input
        placeholder="Choose content density"
        valueState="Negative"
        showSuggestions={true}
      >
        <div slot="valueStateMessage">
          This is an error message. Extra long text used as an error message.
        </div>
        <SuggestionItem text="Cozy" />
        <SuggestionItem text="Compact" />
        <SuggestionItem text="Condensed" />
      </Input>
    </>
  );
}

export default App;
