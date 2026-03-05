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
      <div style={{ height: "250px", overflow: "scroll" }}>
        <Panel headerText="Sticky header" stickyHeader={true}>
          <Title level="H5">Heading!</Title>
          <Label>
            Aute ullamco officia fugiat culpa do tempor tempor aute excepteur
            magna. Quis velit adipisicing excepteur do eu duis elit. Sunt ea
            pariatur nulla est laborum proident sunt labore commodo Lorem
            laboris nisi Lorem. Aute ullamco officia fugiat culpa do tempor
            tempor aute excepteur magna. Quis velit adipisicing excepteur do eu
            duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
            commodo Lorem laboris nisi Lorem. Aute ullamco officia fugiat culpa
            do tempor tempor aute excepteur magna. Quis velit adipisicing
            excepteur do eu duis elit. Sunt ea pariatur nulla est laborum
            proident sunt labore commodo Lorem laboris nisi Lorem. Aute ullamco
            officia fugiat culpa do tempor tempor aute excepteur magna. Quis
            velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla
            est laborum proident sunt labore commodo Lorem laboris nisi Lorem.
            Aute ullamco officia fugiat culpa do tempor tempor aute excepteur
            magna. Quis velit adipisicing excepteur do eu duis elit. Sunt ea
            pariatur nulla est laborum proident sunt labore commodo Lorem
            laboris nisi Lorem. Aute ullamco officia fugiat culpa do tempor
            tempor aute excepteur magna. Quis velit adipisicing excepteur do eu
            duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
            commodo Lorem laboris nisi Lorem. Aute ullamco officia fugiat culpa
            do tempor tempor aute excepteur magna. Quis velit adipisicing
            excepteur do eu duis elit. Sunt ea pariatur nulla est laborum
            proident sunt labore commodo Lorem laboris nisi Lorem. Aute ullamco
            officia fugiat culpa do tempor tempor aute excepteur magna. Quis
            velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla
            est laborum proident sunt labore commodo Lorem laboris nisi Lorem.
            Aute ullamco officia fugiat culpa do tempor tempor aute excepteur
            magna. Quis velit adipisicing excepteur do eu duis elit. Sunt ea
            pariatur nulla est laborum proident sunt labore commodo Lorem
            laboris nisi Lorem. Aute ullamco officia fugiat culpa do tempor
            tempor aute excepteur magna. Quis velit adipisicing excepteur do eu
            duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
            commodo Lorem laboris nisi Lorem. Aute ullamco officia fugiat culpa
            do tempor tempor aute excepteur magna. Quis velit adipisicing
            excepteur do eu duis elit. Sunt ea pariatur nulla est laborum
            proident sunt labore commodo Lorem laboris nisi Lorem. Aute ullamco
            officia fugiat culpa do tempor tempor aute excepteur magna. Quis
            velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla
            est laborum proident sunt labore commodo Lorem laboris nisi Lorem.
            Aute ullamco officia fugiat culpa do tempor tempor aute excepteur
            magna. Quis velit adipisicing excepteur do eu duis elit. Sunt ea
            pariatur nulla est laborum proident sunt labore commodo Lorem
            laboris nisi Lorem. Aute ullamco officia fugiat culpa do tempor
            tempor aute excepteur magna. Quis velit adipisicing excepteur do eu
            duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
            commodo Lorem laboris nisi Lorem. Aute ullamco officia fugiat culpa
            do tempor tempor aute excepteur magna. Quis velit adipisicing
            excepteur do eu duis elit. Sunt ea pariatur nulla est laborum
            proident sunt labore commodo Lorem laboris nisi Lorem. Aute ullamco
            officia fugiat culpa do tempor tempor aute excepteur magna. Quis
            velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla
            est laborum proident sunt labore commodo Lorem laboris nisi Lorem.
          </Label>
        </Panel>
      </div>
    </>
  );
}

export default App;
