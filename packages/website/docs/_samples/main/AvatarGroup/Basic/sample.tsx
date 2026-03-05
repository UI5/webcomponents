import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import AvatarGroupClass from "@ui5/webcomponents/dist/AvatarGroup.js";

const Avatar = createComponent(AvatarClass);
const AvatarGroup = createComponent(AvatarGroupClass);

function App() {

  return (
    <>
      <AvatarGroup>
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
    </>
  );
}

export default App;
