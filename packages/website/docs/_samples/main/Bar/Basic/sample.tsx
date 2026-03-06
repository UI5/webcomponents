import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

const Bar = createComponent(BarClass);
const Button = createComponent(ButtonClass);
const Label = createComponent(LabelClass);

function App() {
  return (
    <>
      <Bar design="Header">
        <Button
          icon="home"
          tooltip="Go home"
          design="Transparent"
          slot="startContent"
        />
        <Label id="basic-label">Content</Label>
        <Button
          icon="action-settings"
          tooltip="Go to settings"
          slot="endContent"
        />
      </Bar>
    </>
  );
}

export default App;
