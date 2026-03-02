import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import NavigationLayoutClass from "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import NotificationListClass from "@ui5/webcomponents-fiori/dist/NotificationList.js";
import NotificationListGroupItemClass from "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import NotificationListItemClass from "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
import SearchScopeClass from "@ui5/webcomponents-fiori/dist/SearchScope.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import ShellBarSearchClass from "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import ShellBarSpacerClass from "@ui5/webcomponents-fiori/dist/ShellBarSpacer.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import UserMenuClass from "@ui5/webcomponents-fiori/dist/UserMenu.js";
import UserMenuAccountClass from "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import UserMenuItemClass from "@ui5/webcomponents-fiori/dist/UserMenuItem.js";
import UserSettingsAccountViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsAccountView.js";
import UserSettingsAppearanceViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js";
import UserSettingsAppearanceViewGroupClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewGroup.js";
import UserSettingsAppearanceViewItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js";
import UserSettingsDialogClass from "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js";
import UserSettingsItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsItem.js";
import UserSettingsViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsView.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import PanelClass from "@ui5/webcomponents/dist/Panel.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const Bar = createReactComponent(BarClass);
const NavigationLayout = createReactComponent(NavigationLayoutClass);
const NotificationList = createReactComponent(NotificationListClass);
const NotificationListGroupItem = createReactComponent(NotificationListGroupItemClass);
const NotificationListItem = createReactComponent(NotificationListItemClass);
const SearchScope = createReactComponent(SearchScopeClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const ShellBarSearch = createReactComponent(ShellBarSearchClass);
const ShellBarSpacer = createReactComponent(ShellBarSpacerClass);
const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const UserMenu = createReactComponent(UserMenuClass);
const UserMenuAccount = createReactComponent(UserMenuAccountClass);
const UserMenuItem = createReactComponent(UserMenuItemClass);
const UserSettingsAccountView = createReactComponent(UserSettingsAccountViewClass);
const UserSettingsAppearanceView = createReactComponent(UserSettingsAppearanceViewClass);
const UserSettingsAppearanceViewGroup = createReactComponent(UserSettingsAppearanceViewGroupClass);
const UserSettingsAppearanceViewItem = createReactComponent(UserSettingsAppearanceViewItemClass);
const UserSettingsDialog = createReactComponent(UserSettingsDialogClass);
const UserSettingsItem = createReactComponent(UserSettingsItemClass);
const UserSettingsView = createReactComponent(UserSettingsViewClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const CheckBox = createReactComponent(CheckBoxClass);
const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);
const Dialog = createReactComponent(DialogClass);
const Icon = createReactComponent(IconClass);
const Label = createReactComponent(LabelClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const Panel = createReactComponent(PanelClass);
const ResponsivePopover = createReactComponent(ResponsivePopoverClass);
const Switch = createReactComponent(SwitchClass);
const Tag = createReactComponent(TagClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);
const Toast = createReactComponent(ToastClass);
const ToggleButton = createReactComponent(ToggleButtonClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

function App() {

  const handleClick = (e) => {
    const toggleButton = e.target;
		toggleButton.icon = toggleButton.pressed ? "sap-icon://da-2" : "sap-icon://da";
  };

  const handleClick = () => {
    navigationLayout.mode = navigationLayout.isSideCollapsed() ? NavigationLayoutMode.Expanded : NavigationLayoutMode.Collapsed;
  };

  const handleSelectionChange = (e) => {
    const contentTitle = document.getElementById("content-title");
	contentTitle.textContent = e.detail.item?.text;
  };

  const handleClick = () => {
    quickCreateDialog.open = true;
  };

  const handleClick = () => {
    quickCreateDialog.open = false;
  };

  const handleNotificationsClick = (e) => {
    e.preventDefault();
	notificationsPopover.opener = e.detail.targetRef;
	notificationsPopover.open = true;
  };

  const handleItemClose = (e) => {
    let visibleItems = 0;

	// hide the closed Notification item
	e.detail.item.hidden = true;

	Array.from(e.detail.item.parentElement.childNodes).forEach((element) => {
		if (element.nodeName === "UI5-LI-NOTIFICATION" && !element.hidden) {
			visibleItems++;
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

  const handleUi5ProfileClick = (e) => {
    userMenu.opener = e.detail.targetRef;
	userMenu.open = true;
  };

  const handleItemClick = (e) => {
    const item = e.detail.item.getAttribute("data-id");

	switch (item) {
		case "setting":
			settingsDialog.open = true;
			console.log("Open Setting Dialog");
			break;
		case "privacy-policy":
			console.log("Privacy Policy");
			break;
		case "terms-of-use":
			console.log("Terms of Use");
			break;
		default:
			console.log("Default");
  };

  const handleAvatarClick = () => {
    console.log("Avatar clicked");
  };

  const handleManageAccountClick = () => {
    console.log("Manage account clicked");
  };

  const handleEditAccountsClick = () => {
    console.log("Edit accounts clicked");
  };

  const handleChangeAccount = (e) => {
    console.log("Change account account", e.detail);
	e.detail.selectedAccount.loading = true;
	setTimeout(function(){
		e.detail.selectedAccount.loading = false;
  };

  const handleSignOutClick = () => {
    console.log("Sign Out clicked");

	const result = prompt("Sign Out", "Are you sure you want to sign out?");
	if (result) {
		userMenu.open = false;
  };

  const handleSelectionChange = () => {
    additionalDialog.open = true;
  };

  const handleClick = () => {
    additionalDialog.open = false;
  };

  const handleSelectionChange = (e) => {
    console.log(`Selection change: ${e?.detail.item?.text
  };

  const handleSelectionChange = (e) => {
    const selectedItem = e.detail.item;
			
	if (selectedItem?.itemKey) {
		setTheme(selectedItem.itemKey);
  };

  const handleClick = () => {
    mobileSecondPage.selected = true;
	mobileSecondPage.text = "iOS";
  };

  const handleClick = () => {
    mobileSecondPage.selected = true;
	mobileSecondPage.text = "Android";
  };

  const handleClick = () => {
    additionalDialog.open = true;
  };

  const handleClick = () => {
    toastReset.open = true;
  };

  const handleClick = () => {
    toastResetAll.open = true;
  };

  const handleSelectionChange = (e) => {
    console.log(`Selection change: ${e.detail.item?.text
  };

  const handleSelectionChange = (e) => {
    console.log(`Selection change: ${e.detail.view?.text
  };

  const handleOpen = (e) => {
    console.log("Settings dialog opened", e);
  };

  const handleClose = (e) => {
    console.log("Settings dialog closed", e);
  };

  const handleUi5ScopeChange = (e) => {
    const scope = e.detail.scope.value === "all" ? "" : e.detail.scope.value;

    searchScope.items.forEach(item => {
        item.remove();
  };

  return (
    <>
      <NavigationLayout id="navigation-layout">
            <ShellBar slot="header" id="shellbar" notifications-count={10} show-notifications={true} show-product-switch={true} >
    			<ShellBarBranding slot="branding">
    				VEGA CRM
    				<img slot="logo" src="/images/sap-logo-svg.svg" />
    			</ShellBarBranding>
                <Button id="menu-button" icon="menu2" slot="startButton" tooltip="Toggle side navigation" />
                <Tag design="Set2" color-scheme={7} slot="content" data-hide-order={2}>Trial</Tag>
                <Text slot="content" data-hide-order={1}>30 days remaining</Text>

                <ShellBarSpacer slot="content" />

                <ToggleButton icon="sap-icon://da" slot="assistant" />

    			<ShellBarSearch slot="searchField" id="search-scope" scope-value="all" show-clear-icon={true} placeholder="Search Apps, Products">
    				<SearchScope text="All" value="all" slot="scopes" />
    				<SearchScope text="Apps" value="apps" slot="scopes" />
    				<SearchScope text="Products" value="products" slot="scopes" />
    			</ShellBarSearch>

                <ShellBarItem icon="sys-help" text="Help" />
                <Avatar slot="profile">
                    <img src="/images/avatars/man_avatar_3.png" />
                </Avatar>
            </ShellBar>

    		<UserMenu id="userMenu" show-manage-account={true} show-other-accounts={true} show-edit-accounts={true} show-edit-button={true}>
    			<UserMenuAccount slot="accounts" avatar-src="/images/avatars/man_avatar_3.png" title-text="Alain Chevalier 1" subtitle-text="alian.chevalier@sap.com" description="Delivery Manager, SAP SE" selected={true} />
    			<UserMenuAccount slot="accounts" avatar-initials="SD" title-text="John Walker" subtitle-text="john.walker@sap.com" description="Project Manager" />
    			<UserMenuAccount slot="accounts" avatar-initials="DS" title-text="David Wilson" subtitle-text="david.wilson@sap.com" description="Project Manager" />
    			<UserMenuItem icon="action-settings" text="Setting" data-id="setting" />
    			<UserMenuItem icon="official-service" text="Legal Information">
    				<UserMenuItem text="Terms of Use" data-id="terms-of-use" />
    				<UserMenuItem text="Private Policy" data-id="privacy-policy" />
    			</UserMenuItem>
    			<UserMenuItem icon="message-information" text="About" data-id="about" />
    		</UserMenu>

            <SideNavigation id="side-navigation" className="sideNavigation" slot="sideContent" accessible-name="Main">
                <SideNavigationItem text="Home" icon="home" selected={true} />
                <SideNavigationItem text="Favorites" expanded={true} icon="favorite-list" unselectable={true}>
                    <SideNavigationSubItem text="My Accounts" />
                    <SideNavigationSubItem text="My Orders" />
                </SideNavigationItem>
                <SideNavigationItem text="Customer Management" icon="account" expanded={true} unselectable={true}>
                    <SideNavigationSubItem text="Contacts" />
                    <SideNavigationSubItem text="Companies" />
                    <SideNavigationSubItem text="Partners" />
                </SideNavigationItem>
                <SideNavigationItem text="Sales" icon="crm-sales" expanded={true} unselectable={true}>
                    <SideNavigationSubItem text="Leads" />
                    <SideNavigationSubItem text="Opportunuties" />
                    <SideNavigationSubItem text="Quotes" />
                    <SideNavigationSubItem text="Orders" />
                    <SideNavigationSubItem text="Invoices" />
                </SideNavigationItem>
                <SideNavigationItem text="Products" icon="s4hana" expanded={true} unselectable={true}>
                    <SideNavigationSubItem text="Product Catalog" />
                    <SideNavigationSubItem text="Pricing" />
                    <SideNavigationSubItem text="Inventory Management" />
                </SideNavigationItem>
                <SideNavigationItem text="Marketing" icon="business-by-design" expanded={true} unselectable={true}>
                    <SideNavigationSubItem text="Campaigns" />
                    <SideNavigationSubItem text="E-Mail Marketing" />
                    <SideNavigationSubItem text="Marketing Automation" />
                </SideNavigationItem>
                <SideNavigationItem text="Reports" icon="manager-insight" expanded={true} unselectable={true}>
                    <SideNavigationSubItem text="Sales Reports" />
                    <SideNavigationSubItem text="Customer Reports" />
                </SideNavigationItem>
                <SideNavigationItem slot="fixedItems" id="quick-create" text="Quick Create" icon="add" design="Action" unselectable={true} />
                <SideNavigationItem slot="fixedItems" text="Product Settings" icon="settings" />
            </SideNavigation>

            <div className="mainContent">
                <Title id="content-title">Home</Title>
                <br />
                <Text>
                    Content...
                </Text>
            </div>
        </NavigationLayout>

        <Dialog id="quick-create-dialog" className="quickCreateDialog" header-text="Create New Item" draggable={true} resizable={true}>
            <Text>Create new item...</Text>
            <Bar slot="footer" design="Footer">
                <Button slot="endContent" design="Emphasized">Create</Button>
                <Button slot="endContent" id="quick-create-dialog-close">Close</Button>
            </Bar>
        </Dialog>

        <ResponsivePopover id="popover-with-notifications" placement="Bottom" className="notificationsPopover" horizontal-align="End">
    		<div className="notificationsPopoverHeader" slot="header">
    			<Bar className="notificationsPopoverBar" design="Header">
    				<Title level="H5" slot="startContent">Notifications</Title>
    				<Button id="clear-all" design="Transparent" slot="endContent">Clear All</Button>
    				<Button id="btn-sort" design="Transparent" icon="sort" tooltip="Sort" slot="endContent" />
    				<Button design="Transparent" icon="action-settings" tooltip="Go to settings" slot="endContent" />
    			</Bar>
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
    	</ResponsivePopover>
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


    	<UserSettingsDialog id="settings" header-text="Settings" show-search-field={true}>
    		<UserSettingsItem icon="user-settings" text="User Account" tooltip="User Account" header-text="User Account">
    			<UserSettingsAccountView show-manage-account="true">
    				<UserMenuAccount slot="account" avatar-src="/images/avatars/man_avatar_3.png" title-text="Alain Chevalier" subtitle-text="alian.chevalier@sap.com" description="Delivery Manager, SAP SE" selected={true} />
    				<Label htmlFor="reset-all-button">Personalization</Label><br />
    				<Button id="reset-all-button">Reset All Personalization</Button>
    				<Panel fixed={true} className="ua-panel">
    					<Text>
    						Reset your personalization settings for the launchpad (such as theme, language, user activities, and home page content).
    					</Text>
    				</Panel>

    			</UserSettingsAccountView>
    		</UserSettingsItem>

    		<UserSettingsItem icon="palette" text="Appearance" tooltip="Appearance" header-text="Appearance">
    			<UserSettingsAppearanceView text="Themes">
    				<div slot="additionalContent">
    					<div className="ui5-user-settings-appearance-view-additional-content-header">
    						<Text>Optimize for Touch Input</Text>
    						<Switch />
    					</div>
    					<Text className="ui5-user-settings-appearance-view-additional-content-description">
    						Increases the size and spacing of controls to allow you to interact with them more easily using your fingertip.
    						This is useful for hybrid devices that combine touch and mouse events.
    					</Text>
    				</div>
    				<UserSettingsAppearanceViewGroup header-text="SAP Horizon">
    					<UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" />
    					<UserSettingsAppearanceViewItem item-key="sap_horizon_dark" text="SAP Evening Horizon" />
    					<UserSettingsAppearanceViewItem item-key="sap_horizon_hcb" text="SAP Horizon High Contrast Black" />
    					<UserSettingsAppearanceViewItem item-key="sap_horizon_hcw" text="SAP Horizon High Contrast White" />
    				</UserSettingsAppearanceViewGroup>
    				<UserSettingsAppearanceViewGroup header-text="SAP Quartz">
    					<UserSettingsAppearanceViewItem item-key="sap_fiori_3" text="SAP Quartz Light" />
    					<UserSettingsAppearanceViewItem item-key="sap_fiori_3_dark" text="SAP Quartz Dark" />
    					<UserSettingsAppearanceViewItem item-key="sap_fiori_3_hcb" text="SAP Quartz High Contrast Black" />
    					<UserSettingsAppearanceViewItem item-key="sap_fiori_3_hcw" text="SAP Quartz High Contrast White" />
    				</UserSettingsAppearanceViewGroup>
    			</UserSettingsAppearanceView>
    		</UserSettingsItem>

    		<UserSettingsItem text="Language and Region" tooltip="Language and Region" header-text="Language and Region">
    			<UserSettingsView>
    				<div id="language-region-container" className="language-region-container">
    					<Label className="language-region-label">Display Language:</Label>
    					<ComboBox id="language" className="language-region-control" placeholder="Language" value="English (United States)">
    						<ComboBoxItem text="Browser Language" selected={true} additional-text="English" />
    						<ComboBoxItem text="English (United Kingdom)" additional-text="English (United Kingdom)" />
    						<ComboBoxItem text="English (United States)" additional-text="English (United States)" />
    						<ComboBoxItem text="French (France)" additional-text="Français (France)" />
    						<ComboBoxItem text="French (Canada)" additional-text="Français (Canada)" />
    						<ComboBoxItem text="German (Germany)" additional-text="Deutsch (Deutschland)" />
    						<ComboBoxItem text="German (Switzerland)" additional-text="Deutsch (Schweiz)" />
    						<ComboBoxItem text="Japanese" additional-text="日本語 (日本)" />
    						<ComboBoxItem text="Portuguese (Brazil)" additional-text="Português (Brasil)"  />
    						<ComboBoxItem text="Simplified Chinese (China)" additional-text="简体中文（中国)" />
    						<ComboBoxItem text="Spanish (Mexico)" additional-text="Español (América Latina)" />
    						<ComboBoxItem text="Spanish (Spain)" additional-text="Español (España)" />
    					</ComboBox>
    					<Label className="language-region-label">Region:</Label>
    					<ComboBox id="region" className="language-region-control" placeholder="Region" value="United States">
    						<ComboBoxItem text="United Kingdom" additional-text="GB" />
    						<ComboBoxItem text="United States" additional-text="US" />
    						<ComboBoxItem text="French (France)" additional-text="FR" />
    						<ComboBoxItem text="French (Canada)" additional-text="CA" />
    						<ComboBoxItem text="German (Germany)" additional-text="DE" />
    						<ComboBoxItem text="German (Switzerland)" additional-text="CH"  />
    						<ComboBoxItem text="Japanese" additional-text="JP" />
    						<ComboBoxItem text="Portuguese (Brazil)" additional-text="BR" />
    						<ComboBoxItem text="Simplified Chinese (China)" additional-text="CN" />
    						<ComboBoxItem text="Spanish (Mexico)" additional-text="MX" />
    						<ComboBoxItem text="Spanish (Spain)" additional-text="ES" />
    					</ComboBox>
    					<Label className="language-region-label">Date Format:</Label>
    					<ComboBox id="dateFormat" className="language-region-control" placeholder="Date Format" value="MM.DD.YYYY">
    						<ComboBoxItem text="MM/DD/YYYY" additional-text="e.g. 10/23/2025" />
    						<ComboBoxItem text="MM.DD.YYYY" additional-text="e.g. 10.23.2025" />
    						<ComboBoxItem text="MM-DD-YYYY" additional-text="e.g. 10-23-2025" />
    						<ComboBoxItem text="DD/MM/YYYY" additional-text="e.g. 23/10/2025" />
    						<ComboBoxItem text="DD.MM.YYYY" additional-text="e.g. 23.10.2025" />
    						<ComboBoxItem text="DD-MM-YYYY" additional-text="e.g. 23-10-2025" />
    						<ComboBoxItem text="YYYY/MM/DD" additional-text="e.g. 2025/10/23" />
    						<ComboBoxItem text="YYYY.MM.DD" additional-text="e.g. 2025.10.23" />
    						<ComboBoxItem text="YYYY-MM-DD" additional-text="e.g. 2025-10-23" />
    					</ComboBox>
    					<Label className="language-region-label">Time Format:</Label>
    					<ComboBox id="timeFormat" className="language-region-control" placeholder="Time Format" value="12 Hour">
    						<ComboBoxItem text="24 Hour" additional-text="e.g. 12:05:10" />
    						<ComboBoxItem text="12 Hour" additional-text="e.g. 12:05:10 PM" />
    						<ComboBoxItem text="12 Hour (lowercase)" additional-text="e.g. 12:05:10 pm" />
    						<ComboBoxItem text="Hours from 0 to 11" additional-text="e.g. 00:05:10 PM" />
    						<ComboBoxItem text="Hours from 0 to 11 (lowercase)" additional-text="e.g. 00:05:10 pm" />
    					</ComboBox>
    					<Label className="language-region-label">Time Zone:</Label>
    					<ComboBox id="timeZone" className="language-region-control" placeholder="Time Zone" value="Eastern Standard Time (UTC -05:00)">
    						<ComboBoxItem text="Pacific Time (UTC -08:00)" additional-text="Sacramento, United States" />
    						<ComboBoxItem text="Mountain Time (UTC -07:00)" additional-text="Denver, United States" />
    						<ComboBoxItem text="Central Time (UTC -06:00)" additional-text="Austin, United States" />
    						<ComboBoxItem text="Eastern Standard Time (UTC -05:00)" additional-text="Washington, United States" />
    						<ComboBoxItem text="Atlantic Time (UTC -04:00)" additional-text="Halifax, Canada" />
    						<ComboBoxItem text="Newfoundland Time (UTC -03:30)" additional-text="St. John's, Canada" />
    						<ComboBoxItem text="Brasilia Time (UTC -03:00)" additional-text="Brasília, Brazil" />
    						<ComboBoxItem text="Argentina Time (UTC -03:00)" additional-text="Buenos Aires, Argentina" />
    						<ComboBoxItem text="Greenwich Mean Time (UTC +00:00)" additional-text="London, United Kingdom" />
    						<ComboBoxItem text="Central European Time (UTC +01:00)" additional-text="Berlin, Germany" />
    						<ComboBoxItem text="Eastern European Time (UTC +02:00)" additional-text="Athens, Greece" />
    						<ComboBoxItem text="Turkey Time (UTC +03:00)" additional-text="Ankara, Türkiye" />
    						<ComboBoxItem text="Arabian Time (UTC +04:00)" additional-text="Abu Dhabi, United Arab Emirates" />
    						<ComboBoxItem text="Pakistan Standard Time (UTC +05:00)" additional-text="Islamabad, Pakistan" />
    						<ComboBoxItem text="India Standard Time (UTC +05:30)" additional-text="New Delhi, India" />
    						<ComboBoxItem text="Bangladesh Standard Time (UTC +06:00)" additional-text="Dhaka, Bangladesh" />
    						<ComboBoxItem text="Indochina Time (UTC +07:00)" additional-text="Bangkok, Thailand" />
    						<ComboBoxItem text="China Standard Time (UTC +08:00)" additional-text="Beijing, China" />
    						<ComboBoxItem text="Singapore Time (UTC +08:00)" additional-text="Singapore, Singapore" />
    						<ComboBoxItem text="Hong Kong Time (UTC +08:00)" additional-text="Hong Kong, China" />
    						<ComboBoxItem text="Japan Standard Time (UTC +09:00)" additional-text="Tokyo, Japan" />
    						<ComboBoxItem text="Korea Standard Time (UTC +09:00)" additional-text="Seoul, South Korea" />
    						<ComboBoxItem text="Australian Eastern Time (UTC +10:00)" additional-text="Canberra, Australia" />
    						<ComboBoxItem text="New Zealand Time (UTC +12:00)" additional-text="Wellington, New Zealand" />
    					</ComboBox>
    					<Label className="language-region-label">Currency:</Label>
    					<ComboBox id="currency" className="language-region-control" placeholder="Currency" value="USD - United States Dollar">
    						<ComboBoxItem text="USD - United States Dollar" additional-text="USD" value="USD" />
    						<ComboBoxItem text="Euro" additional-text="EUR" />
    						<ComboBoxItem text="British Pound" additional-text="GBP" />
    						<ComboBoxItem text="Japanese Yen" additional-text="JPY" />
    						<ComboBoxItem text="Swiss Franc" additional-text="CHF" />
    						<ComboBoxItem text="Canadian Dollar" additional-text="CAD" />
    						<ComboBoxItem text="Australian Dollar" additional-text="AUD" />
    						<ComboBoxItem text="New Zealand Dollar" additional-text="NZD" />
    						<ComboBoxItem text="Chinese Yuan Renminbi" additional-text="CNY" />
    						<ComboBoxItem text="Indian Rupee" additional-text="INR" />
    						<ComboBoxItem text="Brazilian Real" additional-text="BRL" />
    						<ComboBoxItem text="South African Rand" additional-text="ZAR" />
    						<ComboBoxItem text="Russian Ruble" additional-text="RUB" />
    						<ComboBoxItem text="Mexican Peso" additional-text="MXN" />
    						<ComboBoxItem text="Singapore Dollar" additional-text="SGD" />
    						<ComboBoxItem text="Hong Kong Dollar" additional-text="HKD" />
    						<ComboBoxItem text="Norwegian Krone" additional-text="NOK" />
    						<ComboBoxItem text="Swedish Krona" additional-text="SEK" />
    						<ComboBoxItem text="South Korean Won" additional-text="KRW" />
    						<ComboBoxItem text="Turkish Lira" additional-text="TRY" />
    					</ComboBox>
    					<Label className="language-region-label">Number Format:</Label>
    					<ComboBox id="numberFormat" className="language-region-control" placeholder="Number Format" value="1,234.56">
    						<ComboBoxItem text="1.234,56" additional-text="Germany" />
    						<ComboBoxItem text="1,234.56" additional-text="US/UK" />
    						<ComboBoxItem text="1 234,56" additional-text="France" />
    						<ComboBoxItem text="1'234.56" additional-text="Switzerland" />
    						<ComboBoxItem text="1234,56" additional-text="SI/SO Format" />
    					</ComboBox>
    				</div>
    			</UserSettingsView>
    		</UserSettingsItem>


    		<UserSettingsItem icon="iphone" text="SAP Mobile Start Application" tooltip="SAP Mobile Start Application" header-text="SAP Mobile Start Application">
    			<UserSettingsView>
    				<Button id="mobile1-button">iOS</Button>
    				<Button id="mobile2-button">Android</Button>
    			</UserSettingsView>

    			<UserSettingsView text="Inner Page" id="mobile-second-page" secondary={true}>
    				<Text>Enable access to your site from the SAP Mobile Start application.</Text>
    				<Button id="mobile-install">Install</Button><Button id="mobile-register">Register</Button>
    				<Text>Scan the QR Code to install the mobile application</Text>
    				<Icon style={{ width: "20rem", height: "20rem" }} name="qr-code" />
    			</UserSettingsView>
    		</UserSettingsItem>

    		<UserSettingsItem icon="bell" text="Notifications" tooltip="Notifications" header-text="Notifications">
    			<UserSettingsView>
    				<CheckBox checked={true} text="Show High-Priority Notification Alerts" />
    			</UserSettingsView>
    		</UserSettingsItem>

    		<UserSettingsItem icon="reset" slot="fixedItems" text="Reset Settings" tooltip="Reset Settings" header-text="Reset Settings">
    			<UserSettingsView text="Reset Personalization">
    				<Button id="resetPersonalization">Reset Personalization content</Button>
    				<Toast id="toastReset">Changes Reset.</Toast>
    			</UserSettingsView>
    			<UserSettingsView text="Reset All Settings">
    				<Button id="resetAll">Reset All Settings content</Button>
    				<Toast id="toastResetAll">All changes Reset.</Toast>
    			</UserSettingsView>
    		</UserSettingsItem>
    	</UserSettingsDialog>

    	<Dialog id="additionalDialog" state="Information" header-text="Change Display Language">
    		<Text>Changing the display language to [New Language] will update the language across the user interface.</Text>
    		<Toolbar slot="footer">
    			<ToolbarButton className="dialogCloser" design="Emphasized" text="Change Language" />
    			<ToolbarButton className="dialogCloser" design="Transparent" text="Cancel" />
    		</Toolbar>
    	</Dialog>
    </>
  );
}

export default App;
