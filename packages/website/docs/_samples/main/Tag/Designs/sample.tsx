import { createReactComponent } from "@ui5/webcomponents-base";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createReactComponent(TagClass);

function App() {

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "1rem" }}>
            <Tag design="Neutral" wrapping-type="None">
                Neutral
            </Tag>
            <Tag design="Information" wrapping-type="None">
                Information
            </Tag>
            <Tag design="Positive" wrapping-type="None">
                Positive
            </Tag>
            <Tag design="Negative" wrapping-type="None">
                Negative
            </Tag>
            <Tag design="Critical" wrapping-type="None">
                Critical
            </Tag>
            <Tag design="Set1" wrapping-type="None">
                Set1
            </Tag>
            <Tag design="Set2" wrapping-type="None">
                Set2
            </Tag>
        </div>
    </>
  );
}

export default App;
