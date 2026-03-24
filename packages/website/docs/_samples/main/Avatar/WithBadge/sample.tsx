import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import AvatarBadgeClass from "@ui5/webcomponents/dist/AvatarBadge.js";

const Avatar = createReactComponent(AvatarClass);
const AvatarBadge = createReactComponent(AvatarBadgeClass);

export const Example = () => {
  return (
    <>
      <Avatar mode="Interactive" size="M" initials="JD" colorScheme="Accent5">
        <AvatarBadge icon="edit" state="None" slot="badge"></AvatarBadge>
      </Avatar>

      <Avatar
        mode="Interactive"
        size="M"
        icon="employee"
        colorScheme="Accent10"
      >
        <AvatarBadge icon="alert" state="Critical" slot="badge"></AvatarBadge>
      </Avatar>

      <Avatar mode="Interactive" size="M">
        <img src="/images/avatars/man_avatar_1.png" alt="Man Avatar 1" />
        <AvatarBadge
          icon="sys-enter-2"
          state="Positive"
          slot="badge"
        ></AvatarBadge>
      </Avatar>

      <Avatar mode="Interactive" size="M" shape="Square">
        <img src="/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
        <AvatarBadge icon="error" state="Negative" slot="badge"></AvatarBadge>
      </Avatar>
    </>
  );
}
