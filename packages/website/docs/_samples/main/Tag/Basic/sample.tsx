import { createReactComponent } from "@ui5/webcomponents-base";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createReactComponent(TagClass);

function App() {

  return (
    <Tag design="Set1" color-scheme={6}>
        Tag Text
    </Tag>
  );
}

export default App;
