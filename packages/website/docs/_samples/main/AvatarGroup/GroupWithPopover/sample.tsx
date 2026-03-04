import { useState, useRef } from "react";
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
  const popoverRef = useRef(null);
  const avatarGroupRef = useRef(null);
  const [groupWidth, setGroupWidth] = useState("60%");
  const [popoverAvatars, setPopoverAvatars] = useState<any[]>([]);

  const handleAvatarGroupClick = (e: any) => {
    const group = avatarGroupRef.current;
    const avatars: any[] = [];
    group.items.forEach((avatar: any, index: number) => {
      const avatarColor = group.colorScheme[index];
      avatars.push({
        icon: avatar.icon,
        initials: avatar.initials,
        colorScheme: avatarColor,
        imageSrc: avatar.image.length > 0 ? avatar.image[0].src : null,
      });
    });
    setPopoverAvatars(avatars);
    popoverRef.current.open = false;
    popoverRef.current.opener = e.detail.targetRef;
    popoverRef.current.open = true;
  };

  const handleSliderInput = (e: any) => {
    setGroupWidth(e.target.value + "%");
  };

  return (
    <>
      <div className="group">
        <Popover ref={popoverRef} header-text="My people" className="peoplePopover" style={{ width: "400px" }} placement="Bottom">
          <div className="placeholder" style={{ display: "flex", flexWrap: "wrap" }}>
            {popoverAvatars.map((av, i) => (
              <div key={i} className="avatar-slot" style={{ padding: "5px" }}>
                <Avatar interactive={true} icon={av.icon} initials={av.initials} color-scheme={av.colorScheme}>
                  {av.imageSrc && <img src={av.imageSrc} />}
                </Avatar>
              </div>
            ))}
          </div>
        </Popover>

        <Slider min={1} max={100} value={60} onInput={handleSliderInput} />

        <AvatarGroup ref={avatarGroupRef} type="Group" style={{ width: groupWidth }} onClick={handleAvatarGroupClick}>
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
