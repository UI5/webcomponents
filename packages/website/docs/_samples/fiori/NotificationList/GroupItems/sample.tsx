import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import NotificationListClass from "@ui5/webcomponents-fiori/dist/NotificationList.js";
import NotificationListGroupItemClass from "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import NotificationListItemClass from "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/accept.js";

const NotificationList = createComponent(NotificationListClass);
const NotificationListGroupItem = createComponent(NotificationListGroupItemClass);
const NotificationListItem = createComponent(NotificationListItemClass);
const Avatar = createComponent(AvatarClass);
const Menu = createComponent(MenuClass);
const MenuItem = createComponent(MenuItemClass);

function App() {

  const handleNotificationListItemClose = (e: UI5CustomEvent<NotificationListClass, "item-close">) => {
    var visibleItems = 0;

    // hide the closed Notification item
    e.detail.item.hidden = true;

    Array.from(e.detail.item.parentElement.childNodes).forEach((element) => {
        if (element.nodeName === "UI5-LI-NOTIFICATION" && !element.hidden) {
            visibleItems++;
        }
    });

    // hide the Notification group if empty
    if (visibleItems === 0) {
        e.detail.item.parentElement.hidden = true;
    }
  };

  return (
    <>
      <NotificationList onItemClose={handleNotificationListItemClose}>
            <NotificationListGroupItem titleText="Orders" >
                <NotificationListItem showClose={true} importance="Important" titleText="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Positive">
                    <Avatar icon="employee" size="XS" slot="avatar" />
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <Menu slot="menu">
    					<MenuItem icon="accept" text="Accept" />
    					<MenuItem icon="message-error" text="Reject" />
    				</Menu>
                    And with a very long description - Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula
                    dolor,
                    nec elementum lectus turpis at nunc.
                </NotificationListItem>
                <NotificationListItem showClose={true} titleText="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Critical">
                    <Avatar icon="employee" size="XS" slot="avatar" />
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <Menu slot="menu">
                        <MenuItem icon="message-error" text="Reject" />
    					<MenuItem icon="accept" text="Accept" />
    				</Menu>
                    And with a very long description - Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula
                    dolor,
                    nec elementum lectus turpis at nunc.
                </NotificationListItem>
            </NotificationListGroupItem>
            <NotificationListGroupItem titleText="Deliveries" collapsed={true}>
                <NotificationListItem showClose={true} titleText="New Delivery (#2900) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Information">
                    <Avatar icon="employee" size="XS" slot="avatar" />
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <Menu slot="menu">
    					<MenuItem icon="accept" text="Accept" />
    				</Menu>
                    And with a very long description - Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula
                    dolor,
                    nec elementum lectus turpis at nunc.
                </NotificationListItem>

                <NotificationListItem showClose={true} titleText="New Delivery (#29001) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="None">
                    <Avatar icon="employee" size="XS" slot="avatar" />
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <Menu slot="menu">
    					<MenuItem icon="accept" text="Accept" />
    				</Menu>
                    And with a very long description - Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula
                    dolor,
                    nec elementum lectus turpis at nunc.
                </NotificationListItem>
            </NotificationListGroupItem>

            <NotificationListGroupItem collapsed={true} titleText="Meetings With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.">
                <NotificationListItem showClose={true} titleText="New meeting at Building (#35001)" state="Positive" read={true}>
                    <Avatar icon="employee" size="XS" slot="avatar" />
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    And with a very long description  - Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula
                    dolor,
                    nec elementum lectus turpis at nunc.
                </NotificationListItem>

                <NotificationListItem showClose={true} titleText="New meeting at Building (#35001)" state="Information" read={true}>
                    <Avatar icon="employee" size="XS" slot="avatar" />
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    And with a very long description - Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula
                    dolor,
                    nec elementum lectus turpis at nunc.
                </NotificationListItem>
            </NotificationListGroupItem>
        </NotificationList>
    </>
  );
}

export default App;
