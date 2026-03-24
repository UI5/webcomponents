import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import AvatarGroupClass from "@ui5/webcomponents/dist/AvatarGroup.js";

const Avatar = createReactComponent(AvatarClass);
const AvatarGroup = createReactComponent(AvatarGroupClass);

export const Example = () => {
  return (
    <>
      <AvatarGroup type="Individual">
        <Avatar size="S">
          <img src="/images/avatars/man_avatar_1.png" alt="Man Avatar 1" />
        </Avatar>
        <Avatar size="S" initials="JD" />
        <Avatar size="S">
          <img src="/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
        </Avatar>
        <Avatar size="S">
          <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
        </Avatar>
      </AvatarGroup>
      <br />

      <AvatarGroup type="Individual">
        <Avatar size="M">
          <img src="/images/avatars/man_avatar_1.png" alt="Man Avatar 1" />
        </Avatar>
        <Avatar size="M" initials="JD" />
        <Avatar size="M">
          <img src="/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
        </Avatar>
        <Avatar size="M">
          <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
        </Avatar>
      </AvatarGroup>

      <br />

      <AvatarGroup>
        <Avatar size="L">
          <img src="/images/avatars/man_avatar_1.png" alt="Man Avatar 1" />
        </Avatar>
        <Avatar size="L" initials="JD" />
        <Avatar size="L">
          <img src="/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
        </Avatar>
        <Avatar size="L">
          <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
        </Avatar>
      </AvatarGroup>

      <br />

      <AvatarGroup>
        <Avatar size="XL">
          <img src="/images/avatars/man_avatar_1.png" alt="Man Avatar 1" />
        </Avatar>
        <Avatar size="XL" initials="JD" />
        <Avatar size="XL">
          <img src="/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
        </Avatar>
        <Avatar size="XL">
          <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
        </Avatar>
      </AvatarGroup>
    </>
  );
}
