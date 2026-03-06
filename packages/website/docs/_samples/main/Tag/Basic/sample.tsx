import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createComponent(TagClass);

function App() {
  return (
    <Tag design="Set1" colorScheme="6">
      Tag Text
    </Tag>
  );
}

export default App;
