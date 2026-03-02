import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import PanelClass from "@ui5/webcomponents/dist/Panel.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);
const Panel = createReactComponent(PanelClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <Panel>

                <div slot="header" className="header">
                    <Title level="H4">Countries</Title>
                    <div>
                        <Button design="Emphasized">Add</Button>
                        <Button design="Negative">Remove</Button>
                        <Button>Edit</Button>
                    </div>
                </div>

                <Title level="H5">Heading!</Title>
                <Label>
                    Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna.
                    Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
                    commodo Lorem laboris nisi Lorem.
                    Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna.
                    Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
                    commodo Lorem laboris nisi Lorem.
                </Label>
            </Panel>
    </>
  );
}

export default App;
