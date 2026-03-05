import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import AvatarBadgeClass from "@ui5/webcomponents/dist/AvatarBadge.js";

const Avatar = createComponent(AvatarClass);
const AvatarBadge = createComponent(AvatarBadgeClass);

function App() {
  return (
    <>
      <Avatar mode="Interactive" size="M">
        <AvatarBadge icon="edit" slot="badge"></AvatarBadge>
      </Avatar>
    </>
  );
}

export default App;
