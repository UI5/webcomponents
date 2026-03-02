import { createReactComponent } from "@ui5/webcomponents-base";
import AIPromptInputClass from "@ui5/webcomponents-ai/dist/PromptInput.js";

const AIPromptInput = createReactComponent(AIPromptInputClass);

function App() {

  const handleUi5Input = () => {
    input.valueState = input.value.length > input.maxlength ? "Negative" : "None";
	input.innerHTML = "";

	countries.forEach(country => {
		const suggestionItem = document.createElement('ui5-suggestion-item');
		suggestionItem.setAttribute('text', country);

		if (country.toLowerCase().includes(input.value.toLowerCase())) {
			input.appendChild(suggestionItem);
  };

  return (
    <>
      <div style={{ height: "320px" }}>
    			<AIPromptInput id="prompt-input" show-clear-icon={true} placeholder="Ask me anything..." label="User prompt:" maxLength={10} show-exceeded-text={true} show-suggestions={true} />
    		</div>
    </>
  );
}

export default App;
