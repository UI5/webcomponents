import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Title = createComponent(TitleClass);

function App() {

  return (
    <>
      <Title style={{ width: "15ch" }} level="H5" wrapping-type="None">Truncates Long Title Title Title Title</Title>

    <br />

    <Title style={{ width: "15ch" }} level="H5" wrapping-type="Normal">Wrapping Long Title Title Title Title</Title>
    </>
  );
}

export default App;
