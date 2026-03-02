import { createReactComponent } from "@ui5/webcomponents-base";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <Title level="H1" size="H1">Title</Title>
    <Title level="H2" size="H2">Title</Title>
    <Title level="H3" size="H3">Title</Title>
    <Title level="H4" size="H4">Title</Title>
    <Title level="H5" size="H5">Title</Title>
    <Title level="H6" size="H6">Title</Title>
    </>
  );
}

export default App;
