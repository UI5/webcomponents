import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import NotificationListClass from "@ui5/webcomponents-fiori/dist/NotificationList.js";
import NotificationListItemClass from "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

const NotificationList = createComponent(NotificationListClass);
const NotificationListItem = createComponent(NotificationListItemClass);
const Avatar = createComponent(AvatarClass);
const Menu = createComponent(MenuClass);
const MenuItem = createComponent(MenuItemClass);
const Toast = createComponent(ToastClass);

function App() {
  const toastRef = useRef(null);

  const handleNotificationListItemClose = (
    e: UI5CustomEvent<NotificationListClass, "item-close">,
  ) => {
    e.detail.item.hidden = true;
  };

  const handleMenuWithActionsUi5ItemClick = (
    e: UI5CustomEvent<MenuClass, "item-click">,
  ) => {
    toastRef.current!.textContent =
      "Menu button '" +
      e.detail.text +
      "' pressed" +
      " on Notification List Item with id '" +
      e.currentTarget.parentElement.id +
      "'.";
    toastRef.current!.open = true;
  };

  return (
    <>
      <NotificationList onItemClose={handleNotificationListItemClose}>
        <NotificationListItem
          id="firstNotificationListItem"
          titleText="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
          state="Positive"
          importance="Important"
          showClose={true}
        >
          <Avatar size="XS" slot="avatar">
            <img src="/images/avatars/woman_avatar_1.png" alt="Profile" />
          </Avatar>
          <span slot="footnotes">Monique Legrand</span>
          <span slot="footnotes">2 Days</span>
          And with a very long description - Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque
          pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at
          nunc.
          <Menu
            id="menuWithActions"
            slot="menu"
            onItemClick={handleMenuWithActionsUi5ItemClick}
          >
            <MenuItem icon="accept" text="Accept" />
            <MenuItem icon="message-error" text="Reject" />
          </Menu>
        </NotificationListItem>
        <NotificationListItem
          showClose={true}
          titleText="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
          state="Critical"
        >
          <Avatar size="XS" slot="avatar">
            <img src="/images/avatars/man_avatar_1.png" alt="Profile" />
          </Avatar>
          <span slot="footnotes">Alain Chevalier</span>
          <span slot="footnotes">2 Days</span>
          And with a very long description - Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque
          pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at
          nunc.
        </NotificationListItem>
        <NotificationListItem
          showClose={true}
          titleText="New order (#2525) With a short title"
          state="Information"
          read={true}
        >
          <Avatar size="XS" slot="avatar">
            <img src="/images/avatars/man_avatar_2.png" alt="Profile" />
          </Avatar>
          <span slot="footnotes">John Doe</span>
          <span slot="footnotes">2 Days</span>
          And with a very long description - Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque
          pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at
          nunc.
        </NotificationListItem>
      </NotificationList>
      <Toast ref={toastRef} id="wcToast" duration={2000} />
    </>
  );
}

export default App;
