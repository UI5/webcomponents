import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";

const Avatar = createReactComponent(AvatarClass);

export const Example = () => {
  return (
    <>
      <Avatar
        style={{
          width: "250px",
          height: "250px",
          border: "1px solid var(--sapField_BorderColor)",
        }}
        size="XL"
        shape="Square"
      >
        <img
          src="/images/avatars/Lamp_avatar_01.jpg"
          alt="Lamp"
          style={{ objectFit: "contain" }}
        />
      </Avatar>
    </>
  );
}
