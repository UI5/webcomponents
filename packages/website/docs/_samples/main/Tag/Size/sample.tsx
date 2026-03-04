import { createReactComponent } from "@ui5/webcomponents-base";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createReactComponent(TagClass);

function App() {

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "start", gap: "1rem" }}>
            <Tag hideStateIcon={true} design="Neutral" size="L" wrappingType="None">
    			Planned
    		</Tag>
    		<Tag design="Negative" size="L" wrappingType="None" />
        </div>
    </>
  );
}

export default App;
