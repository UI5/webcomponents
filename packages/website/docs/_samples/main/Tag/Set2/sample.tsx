import { createReactComponent } from "@ui5/webcomponents-base";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createReactComponent(TagClass);

function App() {

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "1rem" }}>
            <Tag design="Set2" color-scheme={1}>
                Color Scheme 1
            </Tag>
            <Tag design="Set2" color-scheme={2}>
                Color Scheme 2
            </Tag>
            <Tag design="Set2" color-scheme={3}>
                Color Scheme 3
            </Tag>
            <Tag design="Set2" color-scheme={4}>
                Color Scheme 4
            </Tag>
            <Tag design="Set2" color-scheme={5}>
                Color Scheme 5
            </Tag>
            <Tag design="Set2" color-scheme={6}>
                Color Scheme 6
            </Tag>
            <Tag design="Set2" color-scheme={7}>
                Color Scheme 7
            </Tag>
            <Tag design="Set2" color-scheme={8}>
                Color Scheme 8
            </Tag>
            <Tag design="Set2" color-scheme={9}>
                Color Scheme 9
            </Tag>
            <Tag design="Set2" color-scheme={10}>
                Color Scheme 10
            </Tag>
        </div>
    </>
  );
}

export default App;
