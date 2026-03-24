import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createReactComponent(AvatarClass);

export const Example = () => {
  return (
    <>
      <Avatar initials="XS" size="XS" />
      <Avatar initials="S" size="S" />
      <Avatar initials="M" size="M" />
      <Avatar initials="L" size="L" />
      <Avatar initials="XL" size="XL" />
    </>
  );
}
