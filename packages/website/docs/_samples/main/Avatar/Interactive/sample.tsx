import { useState, useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Avatar = createReactComponent(AvatarClass);
const Label = createReactComponent(LabelClass);

export const Example = () => {
  const counterRef = useRef(0);
  const [labelText, setLabelText] = useState("");

  const handleAvtClick = () => {
    counterRef.current++;
    setLabelText(`Avatar clicked! :: ${counterRef.current}`);
  };

  return (
    <>
      <Avatar
        id="avt"
        mode="Interactive"
        initials="FJ"
        onClick={handleAvtClick}
      />

      <Label id="lbl">{labelText}</Label>
    </>
  );
}
