import { createReactComponent } from "@ui5/webcomponents-base";
import NotificationListClass from "@ui5/webcomponents-fiori/dist/NotificationList.js";
import NotificationListGroupItemClass from "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import NotificationListItemClass from "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
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

const NotificationList = createReactComponent(NotificationListClass);
const NotificationListGroupItem = createReactComponent(NotificationListGroupItemClass);
const NotificationListItem = createReactComponent(NotificationListItemClass);
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

  const handleItemClose = (e) => {
    let visibleItems = 0;

	// hide the closed Notification item
	e.detail.item.hidden = true;

	Array.from(e.detail.item.parentElement.childNodes).forEach((element) => {
		if (element.nodeName === "UI5-LI-NOTIFICATION" && !element.hidden) {
			visibleItems++;
  };

  const handleNotificationsClick = (e) => {
    e.preventDefault();
	notificationsPopover.opener = e.detail.targetRef;
	notificationsPopover.open = true;
  };

  const handleLoadMore = () => {
    const focusIndex = notificationsListGroupGrowing.items.length;

	notificationsListGroupGrowing.loading = true;
	setTimeout(() => {
		insertItems(notificationsListGroupGrowing);
		notificationsListGroupGrowing.loading = false;

		setTimeout(() => {
			notificationsListGroupGrowing.items[focusIndex].focus();
  };

  const handleClick = () => {
    notificationsPopoverMessageStrip.style.display = "inline-block";
  };

  const handleClose = () => {
    notificationsPopoverMessageStrip.style.display = "none";
  };

  const handleClick = () => {
    clearAllDialog.open = true;
  };

  const handleClick = () => {
    clearAllDialog.open = false;
  };

  const handleClick = () => {
    notificationList.innerHTML = `<ui5-illustrated-message name="NoNotifications"></ui5-illustrated-message>`;
  };

  const handleClick = () => {
    menu.opener = btnOpenMenuSort;
	menu.open = true;
  };

  return (
    <>
      <ShellBar logo="/images/sap-logo-svg.svg" show-notifications={true} notifications-count={10}
    	>
    		<ShellBarBranding slot="branding">Corporate Portal</ShellBarBranding>
    	</ShellBar>
    	<Popover id="popover-with-notifications" placement="Bottom" className="notificationsPopover" horizontal-align="End">
    		<div className="notificationsPopoverHeader" slot="header">
    			<Bar className="notificationsPopoverBar" design="Header">
    				<Title level="H5" slot="startContent">Notifications</Title>
    				<Button id="show-message-strip" design="Emphasized" slot="endContent">Show M. Strip</Button>
    				<Button id="clear-all" design="Transparent" slot="endContent">Clear All</Button>
    				<Button id="btn-sort" design="Transparent" icon="sort" tooltip="Sort" slot="endContent" />
    				<Button design="Transparent" icon="action-settings" tooltip="Go to settings" slot="endContent" />
    			</Bar>

    			<MessageStrip id="message-strip-error" className="notificationsMessageStrip" design="Negative">Something went wrong.</MessageStrip>
    		</div>

    		<NotificationList className="notificationsPopoverList">
    			<NotificationListGroupItem id="notificationsListGroupGrowing" title-text="Today" loading-delay={0} growing="Button">
    				<NotificationListItem title-text="Start Your Day with Your Sales Target!" show-close={true}>
    					<Avatar icon="crm-sales" color-scheme="Accent10" shape="Square" size="XS" slot="avatar" />
    					<span slot="footnotes">Sales</span>
    					<span slot="footnotes">11:13</span>
    					<Menu slot="menu">
    						<MenuItem text="Unsubscribe" />
    					</Menu>
    					Good morning! Don’t forget your daily sales target is $2,000, which needs to be fulfilled by the end of the business day. Let’s make it a great sales day!
    				</NotificationListItem>
    				<NotificationListItem title-text="Upcoming Client Meeting Reminder" importance="Important" show-close={true}>
    					<Avatar icon="crm-sales" color-scheme="Accent10" shape="Square" size="XS" slot="avatar" />
    					<span slot="footnotes">Sales</span>
    					<span slot="footnotes">11:05</span>
    					<Menu slot="menu">
    						<MenuItem text="Open in calendar" />
    						<MenuItem text="Unsubscribe" />
    					</Menu>
    					You have a client meeting scheduled at 3 PM today with Acme Corp. Location: Zoom - link in calendar.
    				</NotificationListItem>
    				<NotificationListItem title-text="Follow-Up Needed for Prospect" show-close={true}>
    					<Avatar icon="crm-sales" color-scheme="Accent10" shape="Square" size="XS" slot="avatar" />
    					<span slot="footnotes">Sales</span>
    					<span slot="footnotes">11:00</span>
    					<Menu slot="menu">
    						<MenuItem text="Follow-up meeting" />
    						<MenuItem text="Unsubscribe" />
    					</Menu>
    					Reminder to follow up with John Doe from XYZ Ltd. Discuss the proposal sent last week.
    				</NotificationListItem>
    				<NotificationListItem title-text="Budget Report Submission Deadline Approaching" importance="Important" show-close={true}>
    					<Avatar icon="expense-report" color-scheme="Accent1" shape="Square" size="XS" slot="avatar" />
    					<span slot="footnotes">Accountant</span>
    					<span slot="footnotes">10:15</span>
    					<Menu slot="menu">
    						<MenuItem text="Unsubscribe" />
    					</Menu>
    					Reminder: The deadline to submit this quarter’s budget report is this Friday.
    				</NotificationListItem>
    				<NotificationListItem title-text="Urgent: Expense Claims Pending Your Approval" importance="Important" show-close={true}>
    					<Avatar icon="expense-report" color-scheme="Accent1" shape="Square" size="XS" slot="avatar" />
    					<span slot="footnotes">Notification</span>
    					<span slot="footnotes">09:30</span>
    					<Menu slot="menu">
    						<MenuItem text="Unsubscribe" />
    					</Menu>
    					You have 5 pending expense claims awaiting your approval. Please review them by EOD.
    				</NotificationListItem>
    				<NotificationListItem title-text="Monthly Reconciliation Process Begins Next Week" show-close={true}>
    					<Avatar icon="expense-report" color-scheme="Accent1" shape="Square" size="XS" slot="avatar" />
    					<span slot="footnotes">Accountant</span>
    					<span slot="footnotes">09:30</span>
    					<Menu slot="menu">
    						<MenuItem text="Unsubscribe" />
    					</Menu>
    					Just a heads-up that we will begin the financial reconciliation process for this month next Monday.
    				</NotificationListItem>
    			</NotificationListGroupItem>

    			<NotificationListGroupItem title-text="Yesterday" collapsed={true}>
    				<NotificationListItem title-text="New Sales Lead Assigned" show-close={true}>
    					<Avatar icon="crm-sales" color-scheme="Accent10" shape="Square" size="XS" slot="avatar" />
    					<span slot="footnotes">Sales</span>
    					<span slot="footnotes">1 Day</span>
    					<Menu slot="menu">
    						<MenuItem text="Unsubscribe" />
    					</Menu>
    					A new lead, Jane Smith from Innovative Tech, has been assigned to you. Contact details in CRM.
    				</NotificationListItem>
    				<NotificationListItem title-text=" Reminder: Submit Your EOD Sales Report" show-close={true}>
    					<Avatar icon="crm-sales" color-scheme="Accent10" shape="Square" size="XS" slot="avatar" />
    					<span slot="footnotes">Sales</span>
    					<span slot="footnotes">1 Day</span>
    					<Menu slot="menu">
    						<MenuItem text="Unsubscribe" />
    					</Menu>
    					Please submit your end-of-day sales report through the portal before logging off today.
    			</NotificationListItem>
    			<NotificationListItem title-text="Tax Filing Deadline Reminder" show-close={true}>
    				<Avatar icon="expense-report" color-scheme="Accent1" shape="Square" size="XS" slot="avatar" />
    				<span slot="footnotes">Accountant</span>
    				<span slot="footnotes">1 Day</span>
    				<Menu slot="menu">
    					<MenuItem text="Unsubscribe" />
    				</Menu>
    				Reminder: The tax filing deadline for this quarter is approaching in two weeks.
    			</NotificationListItem>
    			<NotificationListItem title-text=" Invoice Processing Completed" show-close={true}>
    				<Avatar icon="expense-report" color-scheme="Accent1" shape="Square" size="XS" slot="avatar" />
    				<span slot="footnotes">Notification</span>
    				<span slot="footnotes">1 Day</span>
    				<Menu slot="menu">
    					<MenuItem text="Unsubscribe" />
    				</Menu>
    				All invoices for this month have been successfully processed and payments scheduled.
    			</NotificationListItem>
    			</NotificationListGroupItem>
    		</NotificationList>
    	</Popover>
    	<Menu header-text="Sort By" id="sort-menu">
    		<MenuItem text="Date" />
    		<MenuItem text="Importance" />
    	</Menu>

    	<Dialog id="clear-all-dialog" header-text="Clear All Notifications">
    		<Text>Are you sure you want to clear all the notifications?</Text>
    		<Bar slot="footer" design="Footer">
    			<Button style={{ minWidth: "4rem" }} id="clear-all-action" className="dialogCloser" design="Emphasized" slot="endContent">OK</Button>
    			<Button style={{ minWidth: "4rem" }} className="dialogCloser" slot="endContent">Cancel</Button>
    		</Bar>
    	</Dialog>
    </>
  );
}

export default App;
