import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const Input = createReactComponent(InputClass);

function App() {

  const handleInput = (e) => {
    const value = e.target.value;
	const filtered = countries.filter(country => country.toLowerCase().startsWith(value.toLowerCase()));

	fillInput(filtered, value)
  };

  const handleUi5SelectionChange = (e) => {
    const text = e.detail.item?.text;

	announce(text, "Polite");
  };

  return (
    <Input placeholder="Type something ..." id="field" show-suggestions={true} />
  );
}

export default App;
