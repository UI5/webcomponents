import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/activities.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/discussion.js";

const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "var(--sapNeutralTextColor)",
  margin: "0 0 4px 0",
};

const frameStyle: React.CSSProperties = {
  border: "1px solid var(--sapList_BorderColor, #ccc)",
  marginBottom: 24,
  boxSizing: "content-box",
};

function ShellBarInstance() {
  return (
    <ShellBar primaryTitle="Application Title" secondaryTitle="Secondary">
      <ShellBarBranding slot="branding">
        <img slot="logo" src="/images/sap-logo-svg.svg" alt="SAP Logo" />
      </ShellBarBranding>

      <Button slot="startButton" icon="menu2" tooltip="Menu" />
      <Button slot="startButton" icon="nav-back" tooltip="Back" />

      <Button slot="content" icon="slim-arrow-down" tooltip="Application Title" />

      <Avatar slot="profile" initials="JM" />

      <ShellBarItem icon="activities" text="Activities" />
      <ShellBarItem icon="bell" text="Notifications" />
      <ShellBarItem icon="action-settings" text="Settings" />
      <ShellBarItem icon="sys-help" text="Help" />
      <ShellBarItem icon="discussion" text="Discussion" />
    </ShellBar>
  );
}

function App() {
  return (
    <>
      <p style={labelStyle}>320px viewport — content button is dropped</p>
      <div style={{ ...frameStyle, width: 320 }}>
        <ShellBarInstance />
      </div>

      <p style={labelStyle}>360px viewport — content button visible</p>
      <div style={{ ...frameStyle, width: 360 }}>
        <ShellBarInstance />
      </div>
    </>
  );
}

export default App;
