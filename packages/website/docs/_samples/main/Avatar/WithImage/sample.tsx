import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createReactComponent(AvatarClass);

function App() {

  return (
    <>
      <Avatar fallback-icon="employee" size="XS">
            <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
        </Avatar>
        <Avatar fallback-icon="employee" size="S">
            <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
        </Avatar>
        <Avatar fallback-icon="employee" size="M">
            <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
        </Avatar>
        <Avatar fallback-icon="employee" size="L">
            <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
        </Avatar>
        <Avatar fallback-icon="employee" size="XL">
            <img alt="Woman" src="/images/avatars/woman_avatar_1.png" />
        </Avatar>
    </>
  );
}

export default App;
