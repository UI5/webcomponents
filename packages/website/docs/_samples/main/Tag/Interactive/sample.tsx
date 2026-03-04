import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createComponent(TagClass);

function App() {

  return (
    <Tag design="Positive" interactive={true} wrappingType="None">
        Success
    </Tag>
  );
}

export default App;
