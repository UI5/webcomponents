import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Text = createComponent(TextClass);

function App() {
  return (
    <>
      <Text style={{ color: "var(--sapPositiveColor)", fontSize: "1.25rem" }}>
        Styled Text
      </Text>
      <Text
        style={{
          color: "var(--sapNegativeColor)",
          fontSize: "1rem",
          fontStyle: "italic",
        }}
      >
        Styled Text
      </Text>
    </>
  );
}

export default App;
