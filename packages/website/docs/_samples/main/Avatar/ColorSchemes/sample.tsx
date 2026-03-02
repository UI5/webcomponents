import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createReactComponent(AvatarClass);

function App() {

  return (
    <>
      <Avatar color-scheme="Accent1" />
        <Avatar color-scheme="Accent2" />
        <Avatar color-scheme="Accent3" />
        <Avatar color-scheme="Accent4" />
        <Avatar color-scheme="Accent5" />
        <Avatar color-scheme="Accent7" />
        <Avatar color-scheme="Accent8" />
        <Avatar color-scheme="Accent9" />
        <Avatar color-scheme="Accent10" />
        <Avatar color-scheme="Placeholder" />
    </>
  );
}

export default App;
