import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import AvatarGroupClass from "@ui5/webcomponents/dist/AvatarGroup.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Avatar = createReactComponent(AvatarClass);
const AvatarGroup = createReactComponent(AvatarGroupClass);
const Popover = createReactComponent(PopoverClass);
const Slider = createReactComponent(SliderClass);
const Title = createReactComponent(TitleClass);

function App() {

  const handleClick = (e) => {
    if (e.detail.overflowButtonClicked) {
        onButtonClicked(e.detail.targetRef);
  };

  const handleInput = (e) => {
    avatarGroup.style.width = e.target.value + "%";
  };

  return (
    <>
      <div className="individual">
            <Popover style={{ width: "300px" }} header-text="Person Card" className="personPopover" placement="Bottom" prevent-focus-restore=""
            >
                <div className="avatar-slot" style={{ display: "inline-block" }}>
                    <Avatar id="popAvatar" />
                </div>
                <div className="title-slot" style={{ display: "inline-block" }}>
                    <Title level="H5">John Doe</Title>
                    <Title level="H5">Software Developer</Title>
                </div>
            </Popover>
            <Popover style={{ width: "400px" }} header-text="My people" className="peoplePopover" placement="Bottom"
            >
                <div
                    className="placeholder"
                    style={{ display: "flex", flexWrap: "wrap" }}
                ></div>
            </Popover>
            <Slider id="sliderIndividual" min={1} max={100} value={60}
             />
            <AvatarGroup type="Individual">
                <Avatar size="M" icon="employee" />
                <Avatar size="M" icon="employee" />
                <Avatar size="M" initials="JD" />
                <Avatar size="M">
                    <img
                        src="/images/avatars/woman_avatar_5.png"
                        alt="Woman Avatar 5"
                    />
                </Avatar>
                <Avatar size="M">
                    <img
                        src="/images/avatars/man_avatar_3.png"
                        alt="Man Avatar 3"
                    />
                </Avatar>
                <Avatar size="M" icon="employee" />
                <Avatar size="M" icon="employee" />
                <Avatar size="M" initials="JD" />
                <Avatar size="M">
                    <img
                        src="/images/avatars/woman_avatar_5.png"
                        alt="Woman Avatar 5"
                    />
                </Avatar>
                <Avatar size="M">
                    <img
                        src="/images/avatars/man_avatar_3.png"
                        alt="Man Avatar 3"
                    />
                </Avatar>
                <Avatar size="M" icon="employee" />
                <Avatar size="M" icon="employee" />
                <Avatar size="M" initials="JD" />
                <Avatar size="M">
                    <img
                        src="/images/avatars/woman_avatar_5.png"
                        alt="Woman Avatar 5"
                    />
                </Avatar>
                <Avatar size="M">
                    <img
                        src="/images/avatars/man_avatar_3.png"
                        alt="Man Avatar 3"
                    />
                </Avatar>
            </AvatarGroup>
            <script>
           
            </script>
        </div>
    </>
  );
}

export default App;
