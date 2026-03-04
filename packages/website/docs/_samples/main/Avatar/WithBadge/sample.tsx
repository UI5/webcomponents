import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";

const Avatar = createReactComponent(AvatarClass);

function App() {

  return (
    <>
      <Avatar mode="Interactive" size="M" initials="JD" color-scheme="Accent5">
    		<ui5-avatar-badge icon="edit" state="None" slot="badge"></ui5-avatar-badge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" icon="employee" color-scheme="Accent10">
    		<ui5-avatar-badge icon="alert" state="Critical" slot="badge"></ui5-avatar-badge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M">
    		<img src="/images/avatars/man_avatar_1.png" alt="Man Avatar 1" />
    		<ui5-avatar-badge icon="sys-enter-2" state="Positive" slot="badge"></ui5-avatar-badge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" shape="Square">
    		<img src="/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
    		<ui5-avatar-badge icon="error" state="Negative" slot="badge"></ui5-avatar-badge>
    	</Avatar>
    </>
  );
}

export default App;
