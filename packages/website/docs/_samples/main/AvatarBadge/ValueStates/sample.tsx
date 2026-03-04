import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
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
      <Avatar mode="Interactive" size="M" initials="PM" colorScheme="Accent6">
    		<AvatarBadge icon="edit" state="None" slot="badge"></AvatarBadge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="JD" colorScheme="Accent1">
    		<AvatarBadge icon="sys-enter-2" state="Positive" slot="badge"></AvatarBadge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="YM" colorScheme="Accent8">
    		<AvatarBadge icon="alert" state="Critical" slot="badge"></AvatarBadge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="KG" colorScheme="Accent10">
    		<AvatarBadge icon="error" state="Negative" slot="badge"></AvatarBadge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="PI" colorScheme="Accent5">
    		<AvatarBadge icon="information" state="Information" slot="badge"></AvatarBadge>
    	</Avatar>
    </>
  );
}

export default App;
