import { useState, useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
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
  const personPopoverRef = useRef(null);
  const peoplePopoverRef = useRef(null);
  const avatarGroupRef = useRef(null);
  const [groupWidth, setGroupWidth] = useState("60%");
  const [popAvatar, setPopAvatar] = useState<any>({
    icon: "",
    initials: "",
    colorScheme: "",
    imageSrc: null,
  });
  const [hiddenAvatars, setHiddenAvatars] = useState<any[]>([]);

  const handleAvatarGroupClick = (
    e: UI5CustomEvent<AvatarGroupClass, "click">,
  ) => {
    const group = avatarGroupRef.current;
    if (e.detail.overflowButtonClicked) {
      const items = group.hiddenItems;
      const firstHiddenIndex = group.items.length - items.length;
      const avatars: any[] = [];
      items.forEach((avatar: any, index: number) => {
        const color = group.colorScheme[firstHiddenIndex + index];
        avatars.push({
          icon: avatar.icon,
          initials: avatar.initials,
          colorScheme: color,
          imageSrc: avatar.image.length > 0 ? avatar.image[0].src : null,
        });
      });
      setHiddenAvatars(avatars);
      peoplePopoverRef.current!.opener = e.detail.targetRef;
      peoplePopoverRef.current!.open = true;
    } else {
      const avatarRef = e.detail.targetRef;
      const avatarIndex = group.items.indexOf(avatarRef);
      setPopAvatar({
        colorScheme: group.colorScheme[avatarIndex],
        initials: avatarRef.initials,
        icon: avatarRef.icon,
        imageSrc: avatarRef.image.length > 0 ? avatarRef.image[0].src : null,
      });
      personPopoverRef.current!.open = false;
      personPopoverRef.current!.opener = avatarRef;
      personPopoverRef.current!.open = true;
    }
  };

  const handleSliderInput = (e: UI5CustomEvent<SliderClass, "input">) => {
    setGroupWidth(e.currentTarget.value + "%");
  };

  return (
    <>
      <div className="individual">
        <Popover
          ref={personPopoverRef}
          headerText="Person Card"
          className="personPopover"
          style={{ width: "300px" }}
          placement="Bottom"
          preventFocusRestore={true}
        >
          <div className="avatar-slot" style={{ display: "inline-block" }}>
            <Avatar
              colorScheme={popAvatar.colorScheme}
              initials={popAvatar.initials}
              icon={popAvatar.icon}
            >
              {popAvatar.imageSrc && <img src={popAvatar.imageSrc} alt="Avatar" />}
            </Avatar>
          </div>
          <div className="title-slot" style={{ display: "inline-block" }}>
            <Title level="H5">John Doe</Title>
            <Title level="H5">Software Developer</Title>
          </div>
        </Popover>
        <Popover
          ref={peoplePopoverRef}
          headerText="My people"
          class="peoplePopover"
          style={{ width: "400px" }}
          placement="Bottom"
        >
          <div
            className="placeholder"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {hiddenAvatars.map((av, i) => (
              <div key={i} className="avatar-slot" style={{ padding: "5px" }}>
                <Avatar
                  interactive={true}
                  icon={av.icon}
                  initials={av.initials}
                  colorScheme={av.colorScheme}
                >
                  {av.imageSrc && <img src={av.imageSrc} alt="Avatar" />}
                </Avatar>
              </div>
            ))}
          </div>
        </Popover>
        <Slider
          id="sliderIndividual"
          min={1}
          max={100}
          value={60}
          onInput={handleSliderInput}
        />
        <AvatarGroup
          ref={avatarGroupRef}
          type="Individual"
          style={{ width: groupWidth }}
          onClick={handleAvatarGroupClick}
        >
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
            <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
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
            <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
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
            <img src="/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
          </Avatar>
        </AvatarGroup>
      </div>
    </>
  );
}

export default App;
