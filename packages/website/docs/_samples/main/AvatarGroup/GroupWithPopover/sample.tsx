import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import AvatarGroupClass from "@ui5/webcomponents/dist/AvatarGroup.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";

const Avatar = createReactComponent(AvatarClass);
const AvatarGroup = createReactComponent(AvatarGroupClass);
const Popover = createReactComponent(PopoverClass);
const Slider = createReactComponent(SliderClass);

function App() {

  const handleClick = (e) => {
    onAvatarGroupClick(e.detail.targetRef);
  };

  const handleInput = (e) => {
    avatarGroup.style.width = e.target.value + "%";
  };

  return (
    <>
      <div className="group">
            <Popover style={{ width: "400px" }} header-text="My people" className="peoplePopover" placement="Bottom">
                <div className="placeholder" style={{ display: "flex", flexWrap: "wrap" }}></div>
            </Popover>

            <Slider min={1} max={100} value={60} />

            <AvatarGroup type="Group">
                <Avatar size="M" icon="employee" />
                <Avatar size="M" icon="employee" />
                <Avatar size="M" initials="JD" />
                <Avatar size="M">
                    <img src="/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
                </Avatar>
                <Avatar size="M">
                    <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
                </Avatar>
                <Avatar size="M" icon="employee" />
                <Avatar size="M" icon="employee" />
                <Avatar size="M" initials="JD" />
                <Avatar size="M">
                    <img src="/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
                </Avatar>
                <Avatar size="M">
                    <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
                </Avatar>
                <Avatar size="M" icon="employee" />
                <Avatar size="M" icon="employee" />
                <Avatar size="M" initials="JD" />
                <Avatar size="M">
                    <img src="/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
                </Avatar>
                <Avatar size="M">
                    <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
                </Avatar>
            </AvatarGroup>
        </div>
    </>
  );
}

export default App;
