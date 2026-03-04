import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/edit.js";

const Avatar = createReactComponent(AvatarClass);

function App() {

  return (
    <>
      <Avatar mode="Interactive" size="M">
    		<ui5-avatar-badge icon="edit" slot="badge"></ui5-avatar-badge>
    	</Avatar>
    </>
  );
}

export default App;
