import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/employee.js";

const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <div>
            <Label>Cozy</Label>
            <br />
            <Button design="Emphasized" icon="employee">Requests
                <ui5-button-badge design="OverlayText" text="999+" slot="badge"></ui5-button-badge>
            </Button>
            <Button>Reviews
                <ui5-button-badge design="AttentionDot" slot="badge"></ui5-button-badge>
            </Button>

            <div data-ui5-compact-size>
                <Label>Compact</Label>
                <br />
                <Button>Messages
                    <ui5-button-badge design="InlineText" text="72" slot="badge"></ui5-button-badge>
                </Button>
                <Button>Reviews
                    <ui5-button-badge design="AttentionDot" slot="badge"></ui5-button-badge>
                </Button>
            </div>
        </div>
    </>
  );
}

export default App;
