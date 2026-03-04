import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Text = createReactComponent(TextClass);

function App() {

  return (
    <>
      <Text style={{ hyphens: "auto", width: "60px" }}>An extraordinarily long English word!</Text>
    	<br />
    	<Text style={{ hyphens: "manual", width: "60px" }}>An extraord­inarily long English word!</Text>
    </>
  );
}

export default App;
