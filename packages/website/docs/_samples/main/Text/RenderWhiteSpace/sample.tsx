import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Text = createComponent(TextClass);

function App() {
  return (
    <>
      <Text style={{ whiteSpace: "pre", width: "300px" }}>
        {" "}
        White spaces are preserved on this line. This line is preceded by an
        empty line. This line is preceded by a tab.
      </Text>
    </>
  );
}

export default App;
