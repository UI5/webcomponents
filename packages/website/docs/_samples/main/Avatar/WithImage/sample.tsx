import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createComponent(AvatarClass);

function App() {
  return (
    <>
      <Avatar fallbackIcon="employee" size="XS">
        <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
      </Avatar>
      <Avatar fallbackIcon="employee" size="S">
        <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
      </Avatar>
      <Avatar fallbackIcon="employee" size="M">
        <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
      </Avatar>
      <Avatar fallbackIcon="employee" size="L">
        <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
      </Avatar>
      <Avatar fallbackIcon="employee" size="XL">
        <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
      </Avatar>
    </>
  );
}

export default App;
