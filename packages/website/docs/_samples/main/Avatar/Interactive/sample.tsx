import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Avatar = createReactComponent(AvatarClass);
const Label = createReactComponent(LabelClass);

function App() {

  const handleClick = () => {
    label.innerHTML = `Avatar clicked! :: ${++counter
  };

  return (
    <>
      <Avatar id="avt" mode="Interactive" initials="FJ" />

        <Label id="lbl" />
    </>
  );
}

export default App;
