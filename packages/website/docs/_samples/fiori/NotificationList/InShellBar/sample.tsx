import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useRef, useState, useCallback } from "react";
import NotificationListClass from "@ui5/webcomponents-fiori/dist/NotificationList.js";
import NotificationListGroupItemClass from "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import NotificationListItemClass from "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import "@ui5/webcomponents-fiori/dist/illustrations/NoNotifications.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/crm-sales.js";
import "@ui5/webcomponents-icons/dist/expense-report.js";

const NotificationList = createReactComponent(NotificationListClass);
const NotificationListGroupItem = createReactComponent(
  NotificationListGroupItemClass,
);
const NotificationListItem = createReactComponent(NotificationListItemClass);
const IllustratedMessage = createReactComponent(IllustratedMessageClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const Avatar = createReactComponent(AvatarClass);
const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const MessageStrip = createReactComponent(MessageStripClass);
const Popover = createReactComponent(PopoverClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);

function App() {
  const clearAllDialogRef = useRef(null);
  const notificationsListGroupGrowingRef = useRef(null);
  const popoverRef = useRef(null);
  const sortMenuRef = useRef(null);
  const btnSortRef = useRef(null);

  const [showMessageStrip, setShowMessageStrip] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [extraItems, setExtraItems] = useState<
    { id: number; title: string; description: string }[]
  >([]);
  const itemsLoadedRef = useRef(6);

  const handleNotificationListItemClose = useCallback(
    (e: UI5CustomEvent<NotificationListClass, "item-close">) => {
      let visibleItems = 0;
      e.detail.item.hidden = true;

      Array.from(e.detail.item.parentElement.childNodes).forEach((element) => {
        if (element.nodeName === "UI5-LI-NOTIFICATION" && !(element as NotificationListItemClass).hidden) {
          visibleItems++;
        }
      });

      if (visibleItems === 0) {
        e.detail.item.parentElement.hidden = true;
      }
    },
    [],
  );

  const handleShellbarNotificationsClick = useCallback(
    (e: UI5CustomEvent<ShellBarClass, "notifications-click">) => {
      e.preventDefault();
      if (popoverRef.current) {
        popoverRef.current!.opener = e.detail.targetRef;
        popoverRef.current!.open = true;
      }
    },
    [],
  );

  const handleNotificationsListGroupGrowingLoadMore = useCallback(() => {
    const group = notificationsListGroupGrowingRef.current;
    if (!group) return;
    const focusIndex = group.items.length;

    group.loading = true;
    setTimeout(() => {
      const newItems = [];
      for (
        let i = itemsLoadedRef.current + 1;
        i <= itemsLoadedRef.current + 10;
        i++
      ) {
        newItems.push({
          id: i,
          title: `Notification Title  ${i}`,
          description: `Description ${i}`,
        });
      }
      itemsLoadedRef.current += 10;
      setExtraItems((prev) => [...prev, ...newItems]);
      group.loading = false;

      setTimeout(() => {
        if (group.items[focusIndex]) {
          group.items[focusIndex].focus();
        }
      }, 500);
    }, 2000);
  }, []);

  const handleBtnShowMessageStripClick = useCallback(() => {
    setShowMessageStrip(true);
  }, []);

  const handleNotificationsPopoverMessageStripClose = useCallback(() => {
    setShowMessageStrip(false);
  }, []);

  const handleBtnClearAllClick = useCallback(() => {
    if (clearAllDialogRef.current) {
      clearAllDialogRef.current!.open = true;
    }
  }, []);

  const handleDialogCloseClick = useCallback(() => {
    if (clearAllDialogRef.current) {
      clearAllDialogRef.current!.open = false;
    }
  }, []);

  const handleBtnClearAllActionClick = useCallback(() => {
    setCleared(true);
    if (clearAllDialogRef.current) {
      clearAllDialogRef.current!.open = false;
    }
  }, []);

  const handleBtnSortClick = useCallback(() => {
    if (sortMenuRef.current && btnSortRef.current) {
      sortMenuRef.current!.opener = btnSortRef.current;
      sortMenuRef.current!.open = true;
    }
  }, []);

  return (
    <>
      <style>{`
        .notificationsPopover {
        	width: 27rem;
        	max-height: 40rem;
        }

        .notificationsPopover::part(header) {
        	padding: 0;
        	box-shadow: none;
        }

        .notificationsPopover::part(content) {
        	padding: 0;
        }

        .notificationsPopoverHeader {
        	display: flex;
        	flex: 1;
        	flex-direction: column;
        }

        .notificationsPopoverList {
        	height: 100%;
        }

        .notificationsPopoverBar,
        .notificationsPopoverBar::part(bar) {
        	box-shadow: none;
        }

        .notificationsMessageStrip {
        	margin: 0.5rem;
        	width: auto;
        }
      `}</style>

      <ShellBar
        showNotifications={true}
        notificationsCount="10"
        onNotificationsClick={handleShellbarNotificationsClick}
      >
		<img slot="logo" src="/images/sap-logo-svg.svg" alt="SAP Logo" />
        <ShellBarBranding slot="branding">Corporate Portal</ShellBarBranding>
      </ShellBar>

      <Popover
        ref={popoverRef}
        id="popover-with-notifications"
        placement="Bottom"
        class="notificationsPopover"
        horizontalAlign="End"
      >
        <div className="notificationsPopoverHeader" slot="header">
          <Bar class="notificationsPopoverBar" design="Header">
            <Title level="H5" slot="startContent">
              Notifications
            </Title>
            <Button
              id="show-message-strip"
              design="Emphasized"
              slot="endContent"
              onClick={handleBtnShowMessageStripClick}
            >
              Show M. Strip
            </Button>
            <Button
              id="clear-all"
              design="Transparent"
              slot="endContent"
              onClick={handleBtnClearAllClick}
            >
              Clear All
            </Button>
            <Button
              ref={btnSortRef}
              id="btn-sort"
              design="Transparent"
              icon="sort"
              tooltip="Sort"
              slot="endContent"
              onClick={handleBtnSortClick}
            />
            <Button
              design="Transparent"
              icon="action-settings"
              tooltip="Go to settings"
              slot="endContent"
            />
          </Bar>

          {showMessageStrip && (
            <MessageStrip
              class="notificationsMessageStrip"
              design="Negative"
              onClose={handleNotificationsPopoverMessageStripClose}
            >
              Something went wrong.
            </MessageStrip>
          )}
        </div>

        {cleared ? (
          <IllustratedMessage name="NoNotifications" />
        ) : (
          <NotificationList
            class="notificationsPopoverList"
            onItemClose={handleNotificationListItemClose}
          >
            <NotificationListGroupItem
              ref={notificationsListGroupGrowingRef}
              id="notificationsListGroupGrowing"
              titleText="Today"
              loadingDelay={0}
              growing="Button"
              onLoadMore={handleNotificationsListGroupGrowingLoadMore}
            >
              <NotificationListItem
                titleText="Start Your Day with Your Sales Target!"
                showClose={true}
              >
                <Avatar
                  icon="crm-sales"
                  colorScheme="Accent10"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">11:13</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Good morning! Don't forget your daily sales target is $2,000,
                which needs to be fulfilled by the end of the business day.
                Let's make it a great sales day!
              </NotificationListItem>
              <NotificationListItem
                titleText="Upcoming Client Meeting Reminder"
                importance="Important"
                showClose={true}
              >
                <Avatar
                  icon="crm-sales"
                  colorScheme="Accent10"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">11:05</span>
                <Menu slot="menu">
                  <MenuItem text="Open in calendar" />
                  <MenuItem text="Unsubscribe" />
                </Menu>
                You have a client meeting scheduled at 3 PM today with Acme
                Corp. Location: Zoom - link in calendar.
              </NotificationListItem>
              <NotificationListItem
                titleText="Follow-Up Needed for Prospect"
                showClose={true}
              >
                <Avatar
                  icon="crm-sales"
                  colorScheme="Accent10"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">11:00</span>
                <Menu slot="menu">
                  <MenuItem text="Follow-up meeting" />
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Reminder to follow up with John Doe from XYZ Ltd. Discuss the
                proposal sent last week.
              </NotificationListItem>
              <NotificationListItem
                titleText="Budget Report Submission Deadline Approaching"
                importance="Important"
                showClose={true}
              >
                <Avatar
                  icon="expense-report"
                  colorScheme="Accent1"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Accountant</span>
                <span slot="footnotes">10:15</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Reminder: The deadline to submit this quarter's budget report is
                this Friday.
              </NotificationListItem>
              <NotificationListItem
                titleText="Urgent: Expense Claims Pending Your Approval"
                importance="Important"
                showClose={true}
              >
                <Avatar
                  icon="expense-report"
                  colorScheme="Accent1"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Notification</span>
                <span slot="footnotes">09:30</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                You have 5 pending expense claims awaiting your approval. Please
                review them by EOD.
              </NotificationListItem>
              <NotificationListItem
                titleText="Monthly Reconciliation Process Begins Next Week"
                showClose={true}
              >
                <Avatar
                  icon="expense-report"
                  colorScheme="Accent1"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Accountant</span>
                <span slot="footnotes">09:30</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Just a heads-up that we will begin the financial reconciliation
                process for this month next Monday.
              </NotificationListItem>
              {extraItems.map((item) => (
                <NotificationListItem
                  key={item.id}
                  titleText={item.title}
                  showClose={true}
                >
                  <Avatar
                    icon="expense-report"
                    colorScheme="Accent1"
                    shape="Square"
                    size="XS"
                    slot="avatar"
                  />
                  <span slot="footnotes">Product Name</span>
                  <span slot="footnotes">Now</span>
                  <Menu slot="menu">
                    <MenuItem text="Unsubscribe" />
                  </Menu>
                  {item.description}
                </NotificationListItem>
              ))}
            </NotificationListGroupItem>

            <NotificationListGroupItem titleText="Yesterday" collapsed={true}>
              <NotificationListItem
                titleText="New Sales Lead Assigned"
                showClose={true}
              >
                <Avatar
                  icon="crm-sales"
                  colorScheme="Accent10"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">1 Day</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                A new lead, Jane Smith from Innovative Tech, has been assigned
                to you. Contact details in CRM.
              </NotificationListItem>
              <NotificationListItem
                titleText=" Reminder: Submit Your EOD Sales Report"
                showClose={true}
              >
                <Avatar
                  icon="crm-sales"
                  colorScheme="Accent10"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">1 Day</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Please submit your end-of-day sales report through the portal
                before logging off today.
              </NotificationListItem>
              <NotificationListItem
                titleText="Tax Filing Deadline Reminder"
                showClose={true}
              >
                <Avatar
                  icon="expense-report"
                  colorScheme="Accent1"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Accountant</span>
                <span slot="footnotes">1 Day</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Reminder: The tax filing deadline for this quarter is
                approaching in two weeks.
              </NotificationListItem>
              <NotificationListItem
                titleText=" Invoice Processing Completed"
                showClose={true}
              >
                <Avatar
                  icon="expense-report"
                  colorScheme="Accent1"
                  shape="Square"
                  size="XS"
                  slot="avatar"
                />
                <span slot="footnotes">Notification</span>
                <span slot="footnotes">1 Day</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                All invoices for this month have been successfully processed and
                payments scheduled.
              </NotificationListItem>
            </NotificationListGroupItem>
          </NotificationList>
        )}
      </Popover>

      <Menu ref={sortMenuRef} headerText="Sort By" id="sort-menu">
        <MenuItem text="Date" />
        <MenuItem text="Importance" />
      </Menu>

      <Dialog
        ref={clearAllDialogRef}
        id="clear-all-dialog"
        headerText="Clear All Notifications"
      >
        <Text>Are you sure you want to clear all the notifications?</Text>
        <Bar slot="footer" design="Footer">
          <Button
            style={{ minWidth: "4rem" }}
            design="Emphasized"
            slot="endContent"
            onClick={handleBtnClearAllActionClick}
          >
            OK
          </Button>
          <Button
            style={{ minWidth: "4rem" }}
            slot="endContent"
            onClick={handleDialogCloseClick}
          >
            Cancel
          </Button>
        </Bar>
      </Dialog>
    </>
  );
}

export default App;
