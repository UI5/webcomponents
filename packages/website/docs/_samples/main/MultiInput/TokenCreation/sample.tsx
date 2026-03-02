import { createReactComponent } from "@ui5/webcomponents-base";
import MultiInputClass from "@ui5/webcomponents/dist/MultiInput.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";

const MultiInput = createReactComponent(MultiInputClass);
const SuggestionItem = createReactComponent(SuggestionItemClass);

function App() {

  const handleTokenDelete = (e) => {
    const tokens = e.detail?.tokens;

	if (tokens) {
		tokens.forEach(token => token.remove());
  };

  const handlePaste = (e) => {
    e.preventDefault();
    let pastedText = (e.clipboardData || window.clipboardData).getData('text/plain');;
    if (!pastedText) {
        return;
  };

  const handleChange = (e) => {
    if (!e.target.value) {
        return;
  };

  return (
    <>
      <MultiInput id="multi-input" placeholder="Start typing country name" show-suggestions={true}>
            <SuggestionItem text="Argentina" />
            <SuggestionItem text="Bulgaria" />
            <SuggestionItem text="England" />
            <SuggestionItem text="Finland" />
            <SuggestionItem text="Germany" />
            <SuggestionItem text="Hungary" />
            <SuggestionItem text="Italy" />
            <SuggestionItem text="Luxembourg" />
            <SuggestionItem text="Mexico" />
            <SuggestionItem text="Philippines" />
            <SuggestionItem text="Sweden" />
            <SuggestionItem text="USA" />
            <div slot="valueStateMessage">Token is already in the list</div>
        </MultiInput>
    </>
  );
}

export default App;
