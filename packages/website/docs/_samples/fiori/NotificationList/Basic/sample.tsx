import { createReactComponent } from "@ui5/webcomponents-base";
import NotificationListClass from "@ui5/webcomponents-fiori/dist/NotificationList.js";
import NotificationListItemClass from "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

const NotificationList = createReactComponent(NotificationListClass);
const NotificationListItem = createReactComponent(NotificationListItemClass);
const Avatar = createReactComponent(AvatarClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const Toast = createReactComponent(ToastClass);

function App() {

  const handleItemClose = (e) => {
    e.detail.item.hidden = true;
  };

  const handleUi5ItemClick = (e) => {
    wcToast.textContent = "Menu button '" + e.detail.text + "' pressed" + " on Notification List Item with id '" + e.target.parentElement.id + "'.";
    wcToast.open = true;
  };

  return (
    <>
      <NotificationList>
            <NotificationListItem id="firstNotificationListItem" title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Positive" importance="Important" show-close={true}>
                <Avatar size="XS" slot="avatar">
                    <img src="/images/avatars/woman_avatar_1.png" />
                </Avatar>
                <span slot="footnotes">Monique Legrand</span>
                <span slot="footnotes">2 Days</span>
                And with a very long description - Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec
                elementum
                lectus turpis at nunc.
                <Menu id="menuWithActions" slot="menu">
                    <MenuItem icon="accept" text="Accept" />
                    <MenuItem icon="message-error" text="Reject" />
                </Menu>
            </NotificationListItem>
            <NotificationListItem show-close={true} title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Critical">
                <Avatar size="XS" slot="avatar">
                    <img src="/images/avatars/man_avatar_1.png" />
                </Avatar>
                <span slot="footnotes">Alain Chevalier</span>
                <span slot="footnotes">2 Days</span>
                And with a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
            </NotificationListItem>
            <NotificationListItem show-close={true} title-text="New order (#2525) With a short title" state="Information" read={true}>
                <Avatar size="XS" slot="avatar">
                    <img src="/images/avatars/man_avatar_2.png" />
                </Avatar>
                <span slot="footnotes">John Doe</span>
                <span slot="footnotes">2 Days</span>
                And with a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
            </NotificationListItem>
        </NotificationList>
        <Toast id="wcToast" duration={2000} />
    </>
  );
}

export default App;
