import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import ButtonBadgeClass from "@ui5/webcomponents/dist/ButtonBadge.js";

const Button = createComponent(ButtonClass);
const Label = createComponent(LabelClass);
const ButtonBadge = createComponent(ButtonBadgeClass);

function App() {
  return (
    <>
      <div>
        <Label>Cozy</Label>
        <br />
        <Button design="Emphasized" icon="employee">
          Requests
          <ButtonBadge
            design="OverlayText"
            text="999+"
            slot="badge"
          ></ButtonBadge>
        </Button>
        <Button>
          Reviews
          <ButtonBadge design="AttentionDot" slot="badge"></ButtonBadge>
        </Button>

        <div data-ui5-compact-size>
          <Label>Compact</Label>
          <br />
          <Button>
            Messages
            <ButtonBadge
              design="InlineText"
              text="72"
              slot="badge"
            ></ButtonBadge>
          </Button>
          <Button>
            Reviews
            <ButtonBadge design="AttentionDot" slot="badge"></ButtonBadge>
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
