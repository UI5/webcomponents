import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/information.js";

const Avatar = createReactComponent(AvatarClass);

function App() {

  return (
    <>
      <Avatar mode="Interactive" size="M" initials="PM" color-scheme="Accent6">
    		<ui5-avatar-badge icon="edit" state="None" slot="badge"></ui5-avatar-badge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="JD" color-scheme="Accent1">
    		<ui5-avatar-badge icon="sys-enter-2" state="Positive" slot="badge"></ui5-avatar-badge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="YM" color-scheme="Accent8">
    		<ui5-avatar-badge icon="alert" state="Critical" slot="badge"></ui5-avatar-badge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="KG" color-scheme="Accent10">
    		<ui5-avatar-badge icon="error" state="Negative" slot="badge"></ui5-avatar-badge>
    	</Avatar>

    	<Avatar mode="Interactive" size="M" initials="PI" color-scheme="Accent5">
    		<ui5-avatar-badge icon="information" state="Information" slot="badge"></ui5-avatar-badge>
    	</Avatar>
    </>
  );
}

export default App;
