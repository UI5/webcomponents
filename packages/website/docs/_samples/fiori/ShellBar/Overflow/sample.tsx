import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/example.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";

const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const Icon = createReactComponent(IconClass);
const Label = createReactComponent(LabelClass);
const Popover = createReactComponent(PopoverClass);
const Slider = createReactComponent(SliderClass);
const Tag = createReactComponent(TagClass);
const Text = createReactComponent(TextClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);

function App() {
  const [containerWidth, setContainerWidth] = useState(100);
  const [hiddenItems, setHiddenItems] = useState<any[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleContentItemVisibilityChange = (
    e: UI5CustomEvent<ShellBarClass, "content-item-visibility-change">,
  ) => {
    const items = e.detail.items || [];
    setHiddenItems(items);
    if (items.length === 0) {
      setPopoverOpen(false);
    }
  };

  const handleSliderInput = (e: UI5CustomEvent<SliderClass, "input">) => {
    setContainerWidth(Number(e.currentTarget.value));
  };

  return (
    <>
      <Popover
        open={popoverOpen}
        opener="overflowBtn"
        placement="Bottom"
        horizontalAlign="End"
        onClose={() => setPopoverOpen(false)}
      >
        <div
          style={{
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {hiddenItems.map((item: any, i: number) => (
            <Text key={i}>{item.textContent}</Text>
          ))}
        </div>
      </Popover>

      <div style={{ width: `${containerWidth}%` }}>
        <ShellBar
          showNotifications={true}
          onContentItemVisibilityChange={handleContentItemVisibilityChange}
        >
          <Button icon="menu2" slot="startButton" />

          <ShellBarBranding slot="branding">
            Product
            <img slot="logo" src="/images/sap-logo-svg.svg" alt="logo" />
          </ShellBarBranding>

          {hiddenItems.length > 0 && (
            <Button
              id="overflowBtn"
              icon="slim-arrow-down"
              slot="content"
              data-hide-order="999"
              onClick={() => setPopoverOpen(!popoverOpen)}
            />
          )}

          <Text slot="content" data-hide-order="1">
            Customer Rainbird
          </Text>
          <Tag slot="content" design="Set2" colorScheme="4">
            <Icon slot="icon" name="example" />
            Development - System 1
          </Tag>

          <ShellBarItem icon="sys-help" text="Help" />

          <Avatar slot="profile">
            <img src="/images/avatars/man_avatar_3.png" alt="profile" />
          </Avatar>
        </ShellBar>
      </div>

      <br />
      <Label showColon={true}>Resize</Label>
      <Slider
        min={30}
        max={100}
        value={containerWidth}
        labelInterval={0}
        showTooltip={true}
        onInput={handleSliderInput}
      />
    </>
  );
}

export default App;
