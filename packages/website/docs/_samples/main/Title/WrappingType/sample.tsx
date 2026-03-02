import { createReactComponent } from "@ui5/webcomponents-base";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Title = createReactComponent(TitleClass);

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
