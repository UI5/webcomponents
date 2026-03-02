import { createReactComponent } from "@ui5/webcomponents-base";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createReactComponent(TagClass);

function App() {

  return (
    <Tag design="Positive" interactive={true} wrapping-type="None">
        Success
    </Tag>
  );
}

export default App;
