import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createComponent(TagClass);

function App() {

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "1rem" }}>
            <Tag style={{ width: "200px" }} wrapping-type="None">
                This would truncate as it is too long
            </Tag>
            <Tag style={{ width: "200px" }}>
                This would wrap as it is too long
            </Tag>
        </div>
    </>
  );
}

export default App;
