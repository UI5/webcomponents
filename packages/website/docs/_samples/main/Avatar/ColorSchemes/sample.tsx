import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createComponent(AvatarClass);

function App() {

  return (
    <>
      <Avatar colorScheme="Accent1" />
        <Avatar colorScheme="Accent2" />
        <Avatar colorScheme="Accent3" />
        <Avatar colorScheme="Accent4" />
        <Avatar colorScheme="Accent5" />
        <Avatar colorScheme="Accent7" />
        <Avatar colorScheme="Accent8" />
        <Avatar colorScheme="Accent9" />
        <Avatar colorScheme="Accent10" />
        <Avatar colorScheme="Placeholder" />
    </>
  );
}

export default App;
