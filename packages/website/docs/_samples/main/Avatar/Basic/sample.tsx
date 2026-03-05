import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createComponent(AvatarClass);

function App() {

  return (
    <Avatar initials="FJ" />
  );
}

export default App;
