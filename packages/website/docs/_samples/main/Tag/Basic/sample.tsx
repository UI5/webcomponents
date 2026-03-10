import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createReactComponent(TagClass);

function App() {
  return (
    <Tag design="Set1" colorScheme="6">
      Tag Text
    </Tag>
  );
}

export default App;
