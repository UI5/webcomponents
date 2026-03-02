import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createReactComponent(AvatarClass);

function App() {

  return (
    <>
      <Avatar size="M">
    		<ui5-avatar-badge icon="edit" slot="badge"></ui5-avatar-badge>
    	</Avatar>
    </>
  );
}

export default App;
