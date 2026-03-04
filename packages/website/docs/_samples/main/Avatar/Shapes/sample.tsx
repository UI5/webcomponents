import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createReactComponent(AvatarClass);

function App() {

  return (
    <>
      <Avatar shape="Circle" size="M" initials="CI"
         />

        <Avatar shape="Square" size="M" initials="Sq"
         />
    </>
  );
}

export default App;
