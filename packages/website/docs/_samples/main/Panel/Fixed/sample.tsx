import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import PanelClass from "@ui5/webcomponents/dist/Panel.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Label = createComponent(LabelClass);
const Panel = createComponent(PanelClass);
const Title = createComponent(TitleClass);

function App() {
  return (
    <>
      <Panel headerText="Collapsed, Fixed Panel" fixed={true} collapsed={true}>
        <Title level="H5">Heading!</Title>
        <Label>
          Aute ullamco officia fugiat culpa do tempor tempor aute excepteur
          magna. Quis velit adipisicing excepteur do eu duis elit. Sunt ea
          pariatur nulla est laborum proident sunt labore commodo Lorem laboris
          nisi Lorem.
        </Label>
      </Panel>

      <br />
      <br />

      <Panel headerText="Expanded, Fixed Panel" fixed={true}>
        <Title level="H5">Heading!</Title>
        <Label>
          Aute ullamco officia fugiat culpa do tempor tempor aute excepteur
          magna. Quis velit adipisicing excepteur do eu duis elit. Sunt ea
          pariatur nulla est laborum proident sunt labore commodo Lorem laboris
          nisi Lorem.
        </Label>
      </Panel>
    </>
  );
}

export default App;
