import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createComponent(TagClass);

function App() {

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "1rem" }}>
            <Tag design="Neutral" wrappingType="None">
                Neutral
            </Tag>
            <Tag design="Information" wrappingType="None">
                Information
            </Tag>
            <Tag design="Positive" wrappingType="None">
                Positive
            </Tag>
            <Tag design="Negative" wrappingType="None">
                Negative
            </Tag>
            <Tag design="Critical" wrappingType="None">
                Critical
            </Tag>
            <Tag design="Set1" wrappingType="None">
                Set1
            </Tag>
            <Tag design="Set2" wrappingType="None">
                Set2
            </Tag>
        </div>
    </>
  );
}

export default App;
