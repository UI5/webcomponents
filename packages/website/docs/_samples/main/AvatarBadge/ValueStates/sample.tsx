import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/information.js";
import AvatarBadgeClass from "@ui5/webcomponents/dist/AvatarBadge.js";

const Avatar = createReactComponent(AvatarClass);
const AvatarBadge = createReactComponent(AvatarBadgeClass);

function App() {

  return (
    <>
      <Avatar mode="Interactive" size="M" initials="PM" color-scheme="Accent6">
    		<AvatarBadge icon="edit" state="None" slot="badge"></AvatarBadge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="JD" color-scheme="Accent1">
    		<AvatarBadge icon="sys-enter-2" state="Positive" slot="badge"></AvatarBadge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="YM" color-scheme="Accent8">
    		<AvatarBadge icon="alert" state="Critical" slot="badge"></AvatarBadge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="KG" color-scheme="Accent10">
    		<AvatarBadge icon="error" state="Negative" slot="badge"></AvatarBadge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="PI" color-scheme="Accent5">
    		<AvatarBadge icon="information" state="Information" slot="badge"></AvatarBadge>
    	</Avatar>
    </>
  );
}

export default App;
