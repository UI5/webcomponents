import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import PanelClass from "@ui5/webcomponents/dist/Panel.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Label = createReactComponent(LabelClass);
const Panel = createReactComponent(PanelClass);
const Title = createReactComponent(TitleClass);

export const Example = () => {
  return (
    <>
      <Panel headerText="Panel">
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
