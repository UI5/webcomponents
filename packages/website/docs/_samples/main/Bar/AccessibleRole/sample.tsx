import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <Label>Bar with two or more active items:</Label>
        <Bar design="Header" accessibleRole="Toolbar">
            <Button icon="home" tooltip="Go home" design="Transparent" slot="startContent" />
            <Label id="basic-label">Content</Label>
            <Button icon="action-settings" tooltip="Go to settings" slot="endContent" />
        </Bar>
        <br />
        <Label>Bar with less than two active items:</Label>
        <Bar design="Header">
            <Label id="basic-label">Storybook title</Label>
        </Bar>
    </>
  );
}

export default App;
