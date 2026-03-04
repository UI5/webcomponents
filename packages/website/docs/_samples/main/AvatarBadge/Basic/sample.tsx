import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import AvatarBadgeClass from "@ui5/webcomponents/dist/AvatarBadge.js";

const Avatar = createReactComponent(AvatarClass);
const AvatarBadge = createReactComponent(AvatarBadgeClass);

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
