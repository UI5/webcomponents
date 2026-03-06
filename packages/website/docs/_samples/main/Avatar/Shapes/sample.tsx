import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createComponent(AvatarClass);

function App() {
  return (
    <>
      <Avatar shape="Circle" size="M" initials="CI" />

      <Avatar shape="Square" size="M" initials="Sq" />
    </>
  );
}

export default App;
