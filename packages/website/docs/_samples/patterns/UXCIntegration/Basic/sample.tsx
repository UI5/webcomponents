import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useRef, useCallback, useState } from "react";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import ShellBarSearchClass from "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import ShellBarSpacerClass from "@ui5/webcomponents-fiori/dist/ShellBarSpacer.js";
import SearchScopeClass from "@ui5/webcomponents-fiori/dist/SearchScope.js";
import SearchItemClass from "@ui5/webcomponents-fiori/dist/SearchItem.js";
import NavigationLayoutClass from "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import NavigationLayoutMode from "@ui5/webcomponents-fiori/dist/types/NavigationLayoutMode.js";
import NotificationListClass from "@ui5/webcomponents-fiori/dist/NotificationList.js";
import NotificationListGroupItemClass from "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import NotificationListItemClass from "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
import UserMenuClass from "@ui5/webcomponents-fiori/dist/UserMenu.js";
import UserMenuAccountClass from "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import UserMenuItemClass from "@ui5/webcomponents-fiori/dist/UserMenuItem.js";
import UserMenuItemGroupClass from "@ui5/webcomponents-fiori/dist/UserMenuItemGroup.js";
import UserSettingsAccountViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsAccountView.js";
import UserSettingsAppearanceViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js";
import UserSettingsAppearanceViewGroupClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewGroup.js";
import UserSettingsAppearanceViewItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js";
import UserSettingsNotificationsViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsNotificationsView.js";
import UserSettingsNotificationsViewGroupClass from "@ui5/webcomponents-fiori/dist/UserSettingsNotificationsViewGroup.js";
import UserSettingsNotificationsViewItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsNotificationsViewItem.js";
import UserSettingsDialogClass from "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js";
import UserSettingsItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsItem.js";
import UserSettingsViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsView.js";

import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import PanelClass from "@ui5/webcomponents/dist/Panel.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/favorite-list.js";
import "@ui5/webcomponents-icons/dist/account.js";
import "@ui5/webcomponents-icons/dist/business-by-design.js";
import "@ui5/webcomponents-icons/dist/crm-sales.js";
import "@ui5/webcomponents-icons/dist/s4hana.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/manager-insight.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/message-information.js";
import "@ui5/webcomponents-icons/dist/expense-report.js";
import "@ui5/webcomponents-icons/dist/user-settings.js";
import "@ui5/webcomponents-icons/dist/person-placeholder.js";
import "@ui5/webcomponents-icons/dist/palette.js";
import "@ui5/webcomponents-icons/dist/iphone.js";
import "@ui5/webcomponents-icons/dist/qr-code.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/reset.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/official-service.js";
import "@ui5/webcomponents-icons/dist/collaborate.js";
import "@ui5/webcomponents-icons/dist/private.js";
import "@ui5/webcomponents-icons/dist/accelerated.js";

const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const ShellBarSearch = createReactComponent(ShellBarSearchClass);
const ShellBarSpacer = createReactComponent(ShellBarSpacerClass);
const SearchScope = createReactComponent(SearchScopeClass);
const SearchItem = createReactComponent(SearchItemClass);
const NavigationLayout = createReactComponent(NavigationLayoutClass);
const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const NotificationList = createReactComponent(NotificationListClass);
const NotificationListGroupItem = createReactComponent(NotificationListGroupItemClass);
const NotificationListItem = createReactComponent(NotificationListItemClass);
const UserMenu = createReactComponent(UserMenuClass);
const UserMenuAccount = createReactComponent(UserMenuAccountClass);
const UserMenuItem = createReactComponent(UserMenuItemClass);
const UserMenuItemGroup = createReactComponent(UserMenuItemGroupClass);
const UserSettingsAccountView = createReactComponent(UserSettingsAccountViewClass);
const UserSettingsAppearanceView = createReactComponent(UserSettingsAppearanceViewClass);
const UserSettingsAppearanceViewGroup = createReactComponent(UserSettingsAppearanceViewGroupClass);
const UserSettingsAppearanceViewItem = createReactComponent(UserSettingsAppearanceViewItemClass);
const UserSettingsNotificationsView = createReactComponent(UserSettingsNotificationsViewClass);
const UserSettingsNotificationsViewGroup = createReactComponent(UserSettingsNotificationsViewGroupClass);
const UserSettingsNotificationsViewItem = createReactComponent(UserSettingsNotificationsViewItemClass);
const UserSettingsDialog = createReactComponent(UserSettingsDialogClass);
const UserSettingsItem = createReactComponent(UserSettingsItemClass);
const UserSettingsView = createReactComponent(UserSettingsViewClass);
const Avatar = createReactComponent(AvatarClass);
const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Icon = createReactComponent(IconClass);
const Label = createReactComponent(LabelClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const MessageStrip = createReactComponent(MessageStripClass);
const Link = createReactComponent(LinkClass);
const Option = createReactComponent(OptionClass);
const Panel = createReactComponent(PanelClass);
const ResponsivePopover = createReactComponent(ResponsivePopoverClass);
const Select = createReactComponent(SelectClass);
const Switch = createReactComponent(SwitchClass);
const Tag = createReactComponent(TagClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);
const ToggleButton = createReactComponent(ToggleButtonClass);
const Toast = createReactComponent(ToastClass);

const scopeData = [
  { name: "Laptop", scope: "products" },
  { name: "Leave Requests", scope: "apps" },
  { name: "Log work", scope: "apps" },
  { name: "Manage Products", scope: "apps" },
  { name: "Mobile Phones", scope: "products" },
  { name: "Tablet", scope: "products" },
];

function getScopeItems(scope?: string) {
  if (!scope) {
    return scopeData;
  }
  return scopeData.filter((item) => item.scope === scope);
}

function App() {
  const navigationLayoutRef = useRef<NavigationLayoutClass | null>(null);
  const notificationsPopoverRef = useRef<ResponsivePopoverClass | null>(null);
  const notificationListGroupGrowingRef = useRef<NotificationListGroupItemClass | null>(null);
  const sortMenuRef = useRef<MenuClass | null>(null);
  const btnSortRef = useRef<ButtonClass | null>(null);
  const clearAllDialogRef = useRef<DialogClass | null>(null);
  const quickCreateDialogRef = useRef<DialogClass | null>(null);
  const userMenuRef = useRef<UserMenuClass | null>(null);
  const settingsDialogRef = useRef<UserSettingsDialogClass | null>(null);
  const mobileSecondPageRef = useRef<UserSettingsViewClass | null>(null);
  const toastResetRef = useRef<ToastClass | null>(null);
  const toastResetAllRef = useRef<ToastClass | null>(null);

  const [daIcon, setDaIcon] = useState("sap-icon://da");
  const [contentTitle, setContentTitle] = useState("Home");
  const [searchScopeValue, setSearchScopeValue] = useState("all");
  const [notificationItems, setNotificationItems] = useState<Array<{ id: number; title: string; description: string }>>([]);
  const [itemsLoaded, setItemsLoaded] = useState(6);
  const [notificationListCleared, setNotificationListCleared] = useState(false);

  const handleToggleButtonClick = useCallback(
    (e: UI5CustomEvent<ToggleButtonClass, "click">) => {
      const btn = e.target as ToggleButtonClass;
      setDaIcon(btn.pressed ? "sap-icon://da-2" : "sap-icon://da");
    },
    [],
  );

  const handleMenuButtonClick = useCallback(() => {
    const layout = navigationLayoutRef.current;
    if (layout) {
      layout.mode = layout.isSideCollapsed()
        ? NavigationLayoutMode.Expanded
        : NavigationLayoutMode.Collapsed;
    }
  }, []);

  const handleSideNavigationSelectionChange = useCallback(
    (e: UI5CustomEvent<SideNavigationClass, "selection-change">) => {
      setContentTitle(e.detail.item?.text ?? "");
    },
    [],
  );

  const handleQuickCreateClick = useCallback(() => {
    if (quickCreateDialogRef.current) {
      quickCreateDialogRef.current.open = true;
    }
  }, []);

  const handleQuickCreateDialogClose = useCallback(() => {
    if (quickCreateDialogRef.current) {
      quickCreateDialogRef.current.open = false;
    }
  }, []);

  const handleNotificationsClick = useCallback(
    (e: UI5CustomEvent<ShellBarClass, "notifications-click">) => {
      e.preventDefault();
      const popover = notificationsPopoverRef.current;
      if (popover) {
        popover.opener = e.detail.targetRef;
        popover.open = true;
      }
    },
    [],
  );

  const handleNotificationItemClose = useCallback(
    (e: UI5CustomEvent<NotificationListClass, "item-close">) => {
      const item = e.detail.item as NotificationListItemClass & { hidden: boolean };
      item.hidden = true;

      let visibleItems = 0;
      Array.from(item.parentElement?.childNodes ?? []).forEach((node) => {
        const el = node as Element & { hidden?: boolean };
        if (el.nodeName === "UI5-LI-NOTIFICATION" && !el.hidden) {
          visibleItems++;
        }
      });

      if (visibleItems === 0 && item.parentElement) {
        (item.parentElement as HTMLElement & { hidden: boolean }).hidden = true;
      }
    },
    [],
  );

  const handleLoadMore = useCallback(() => {
    const group = notificationListGroupGrowingRef.current;
    if (!group) return;

    const itemsToLoad = 10;
    group.loading = true;

    setTimeout(() => {
      setItemsLoaded((prev) => {
        const newItems: Array<{ id: number; title: string; description: string }> = [];
        for (let i = prev + 1; i <= prev + itemsToLoad; i++) {
          newItems.push({ id: i, title: `Notification Title ${i}`, description: `Description ${i}` });
        }
        setNotificationItems((existing) => [...existing, ...newItems]);
        if (group) {
          group.loading = false;
        }
        return prev + itemsToLoad;
      });
    }, 2000);
  }, []);

  const handleClearAllClick = useCallback(() => {
    if (clearAllDialogRef.current) {
      clearAllDialogRef.current.open = true;
    }
  }, []);

  const handleClearAllDialogClose = useCallback(() => {
    if (clearAllDialogRef.current) {
      clearAllDialogRef.current.open = false;
    }
  }, []);

  const handleClearAllAction = useCallback(() => {
    setNotificationListCleared(true);
    if (clearAllDialogRef.current) {
      clearAllDialogRef.current.open = false;
    }
  }, []);

  const handleSortClick = useCallback(() => {
    const menu = sortMenuRef.current;
    const btn = btnSortRef.current;
    if (menu && btn) {
      menu.opener = btn;
      menu.open = true;
    }
  }, []);

  const handleShellbarProfileClick = useCallback(
    (e: UI5CustomEvent<ShellBarClass, "profile-click">) => {
      const menu = userMenuRef.current;
      if (menu) {
        menu.opener = e.detail.targetRef;
        menu.open = true;
      }
    },
    [],
  );

  const handleUserMenuItemClick = useCallback(
    (e: UI5CustomEvent<UserMenuClass, "item-click">) => {
      const item = e.detail.item.getAttribute("data-id");
      switch (item) {
        case "setting":
          if (settingsDialogRef.current) {
            settingsDialogRef.current.open = true;
          }
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
      }
    },
    [],
  );

  const handleUserMenuAvatarClick = useCallback(() => {
    console.log("Avatar clicked");
  }, []);

  const handleUserMenuManageAccountClick = useCallback(() => {
    console.log("Manage account clicked");
  }, []);

  const handleUserMenuEditAccountsClick = useCallback(() => {
    console.log("Edit accounts clicked");
  }, []);

  const handleUserMenuChangeAccount = useCallback(
    (e: UI5CustomEvent<UserMenuClass, "change-account">) => {
      console.log("Change account", e.detail);
      const selectedAccount = e.detail.selectedAccount as UserMenuAccountClass & { loading: boolean };
      selectedAccount.loading = true;
      setTimeout(() => {
        selectedAccount.loading = false;
      }, 1000);
    },
    [],
  );

  const handleUserMenuSignOutClick = useCallback(
    (e: UI5CustomEvent<UserMenuClass, "sign-out-click">) => {
      console.log("Sign Out clicked");
      const result = prompt("Sign Out", "Are you sure you want to sign out?");
      if (result) {
        if (userMenuRef.current) {
          userMenuRef.current.open = false;
        }
      }
      e.preventDefault();
    },
    [],
  );

  const handleAppearanceViewSelectionChange = useCallback(
    (e: UI5CustomEvent<UserSettingsAppearanceViewClass, "selection-change">) => {
      const selectedItem = e.detail.item;
      if (selectedItem?.itemKey) {
        setTheme(selectedItem.itemKey);
      }
    },
    [],
  );

  const handleMobile1ButtonClick = useCallback(() => {
    if (mobileSecondPageRef.current) {
      mobileSecondPageRef.current.selected = true;
      mobileSecondPageRef.current.text = "iOS";
    }
  }, []);

  const handleMobile2ButtonClick = useCallback(() => {
    if (mobileSecondPageRef.current) {
      mobileSecondPageRef.current.selected = true;
      mobileSecondPageRef.current.text = "Android";
    }
  }, []);

  const handleResetAllButtonClick = useCallback(() => {
    if (toastResetRef.current) {
      toastResetRef.current.open = true;
    }
  }, []);

  const handleResetPersonalizationClick = useCallback(() => {
    if (toastResetRef.current) {
      toastResetRef.current.open = true;
    }
  }, []);

  const handleResetAllClick = useCallback(() => {
    if (toastResetAllRef.current) {
      toastResetAllRef.current.open = true;
    }
  }, []);

  const handleSettingsSelectionChange = useCallback(
    (e: UI5CustomEvent<UserSettingsDialogClass, "selection-change">) => {
      console.log(`Selection change: ${e.detail.item?.text}`, e.detail);
      if (e.detail.item?.text === "Language and Region") {
        e.detail.item.loading = true;
        e.detail.item.loadingReason = "Language & Region loading data...";
        setTimeout(() => {
          e.detail.item.loading = false;
        }, 500);
      }
    },
    [],
  );

  const handleSettingsItemSelectionChange = useCallback(
    (e: UI5CustomEvent<UserSettingsItemClass, "selection-change">) => {
      console.log(`Selection change: ${e.detail.view?.text}`, e.detail);
    },
    [],
  );

  const handleSettingsOpen = useCallback((e: Event) => {
    console.log("Settings dialog opened", e);
  }, []);

  const handleSettingsClose = useCallback((e: Event) => {
    console.log("Settings dialog closed", e);
  }, []);

  const handleScopeChange = useCallback(
    (e: UI5CustomEvent<ShellBarSearchClass, "scope-change">) => {
      const scope = e.detail.scope.value === "all" ? "" : e.detail.scope.value;
      setSearchScopeValue(scope);
    },
    [],
  );

  const currentScopeItems = getScopeItems(searchScopeValue || undefined);

  return (
    <>
      <style>{`
        .ui5-user-settings-appearance-view-additional-content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          width: 100%;
        }
        .ui5-user-settings-appearance-view-additional-content-description {
          display: block;
          color: var(--sapContent_LabelColor);
          font-size: var(--sapFontSmallSize);
        }
        .language-region-form {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .language-region-row {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .language-region-row > [ui5-label] {
          padding: 0.5rem 0 0.125rem 0;
        }
        .language-region-row:first-child > [ui5-label] {
          padding-top: 0;
        }
        .language-region-row > [ui5-select] {
          display: block;
          width: 100%;
        }
        .notificationsPopover {
          width: 25rem;
          max-height: 40rem;
        }
        .notificationsPopoverHeader {
          width: 100%;
        }
        .notificationsPopoverBar {
          width: 100%;
        }
        .notificationsPopoverList {
          width: 100%;
        }
        .quickCreateDialog {
          width: 30rem;
        }
        .mainContent {
          padding: 1rem;
        }
      `}</style>

      <NavigationLayout ref={navigationLayoutRef} id="navigation-layout">
        <ShellBar
          slot="header"
          id="shellbar"
          notificationsCount="10"
          showNotifications
          showProductSwitch
          onNotificationsClick={handleNotificationsClick}
          onProfileClick={handleShellbarProfileClick}
        >
          <ShellBarBranding slot="branding">
            VEGA CRM
            <img slot="logo" src="../assets/images/sap-logo-svg.svg" />
          </ShellBarBranding>
          <Button
            id="menu-button"
            icon="menu2"
            slot="startButton"
            tooltip="Toggle side navigation"
            onClick={handleMenuButtonClick}
          />
          <Tag design="Set2" color-scheme="7" slot="content" data-hide-order="2">
            Trial
          </Tag>
          <Text slot="content" data-hide-order="1">
            30 days remaining
          </Text>

          <ShellBarSpacer slot="content" />

          <ToggleButton
            icon={daIcon}
            slot="assistant"
            onClick={handleToggleButtonClick}
          />

          <ShellBarSearch
            slot="searchField"
            id="search-scope"
            scopeValue="all"
            showClearIcon
            placeholder="Search Apps, Products"
            onScopeChange={handleScopeChange}
          >
            <SearchScope text="All" value="all" slot="scopes" />
            <SearchScope text="Apps" value="apps" slot="scopes" />
            <SearchScope text="Products" value="products" slot="scopes" />
            {currentScopeItems.map((item) => (
              <SearchItem key={item.name} text={item.name} scopeName={item.scope} />
            ))}
          </ShellBarSearch>

          <ShellBarItem icon="sys-help" text="Help" />
          <Avatar slot="profile">
            <img src="../assets/images/avatars/man_avatar_3.png" />
          </Avatar>
        </ShellBar>

        <UserMenu
          ref={userMenuRef}
          id="userMenu"
          showManageAccount
          showOtherAccounts
          showEditAccounts
          showEditButton
          onItemClick={handleUserMenuItemClick}
          onAvatarClick={handleUserMenuAvatarClick}
          onManageAccountClick={handleUserMenuManageAccountClick}
          onEditAccountsClick={handleUserMenuEditAccountsClick}
          onChangeAccount={handleUserMenuChangeAccount}
          onSignOutClick={handleUserMenuSignOutClick}
        >
          <UserMenuAccount
            slot="accounts"
            avatarSrc="../assets/images/avatars/man_avatar_3.png"
            titleText="Alain Chevalier 1"
            subtitleText="alian.chevalier@sap.com"
            description="Delivery Manager, SAP SE"
            selected
          />
          <UserMenuAccount
            slot="accounts"
            avatarInitials="SD"
            titleText="John Walker"
            subtitleText="john.walker@sap.com"
            description="Project Manager"
          />
          <UserMenuAccount
            slot="accounts"
            avatarInitials="DS"
            titleText="David Wilson"
            subtitleText="david.wilson@sap.com"
            description="Project Manager"
          />
          <UserMenuItem icon="action-settings" text="Setting" data-id="setting" />
          <UserMenuItem icon="official-service" text="Legal Information">
            <UserMenuItem text="Terms of Use" data-id="terms-of-use" />
            <UserMenuItem text="Private Policy" data-id="privacy-policy" />
          </UserMenuItem>
          <UserMenuItem icon="message-information" text="About" data-id="about" />
          <UserMenuItem icon="globe" text="Language" data-id="single-select" showSelection>
            <UserMenuItemGroup checkMode="Single">
              <UserMenuItem text="English" data-id="single-select-item1" checked />
              <UserMenuItem text="Deutsch" data-id="single-select-item2" />
            </UserMenuItemGroup>
          </UserMenuItem>
        </UserMenu>

        <SideNavigation
          id="side-navigation"
          class="sideNavigation"
          slot="sideContent"
          accessibleName="Main"
          onSelectionChange={handleSideNavigationSelectionChange}
        >
          <SideNavigationItem text="Home" icon="home" selected />
          <SideNavigationItem text="Favorites" expanded icon="favorite-list" unselectable>
            <SideNavigationSubItem text="My Accounts" />
            <SideNavigationSubItem text="My Orders" />
          </SideNavigationItem>
          <SideNavigationItem text="Customer Management" icon="account" expanded unselectable>
            <SideNavigationSubItem text="Contacts" />
            <SideNavigationSubItem text="Companies" />
            <SideNavigationSubItem text="Partners" />
          </SideNavigationItem>
          <SideNavigationItem text="Sales" icon="crm-sales" expanded unselectable>
            <SideNavigationSubItem text="Leads" />
            <SideNavigationSubItem text="Opportunuties" />
            <SideNavigationSubItem text="Quotes" />
            <SideNavigationSubItem text="Orders" />
            <SideNavigationSubItem text="Invoices" />
          </SideNavigationItem>
          <SideNavigationItem text="Products" icon="s4hana" expanded unselectable>
            <SideNavigationSubItem text="Product Catalog" />
            <SideNavigationSubItem text="Pricing" />
            <SideNavigationSubItem text="Inventory Management" />
          </SideNavigationItem>
          <SideNavigationItem text="Marketing" icon="business-by-design" expanded unselectable>
            <SideNavigationSubItem text="Campaigns" />
            <SideNavigationSubItem text="E-Mail Marketing" />
            <SideNavigationSubItem text="Marketing Automation" />
          </SideNavigationItem>
          <SideNavigationItem text="Reports" icon="manager-insight" expanded unselectable>
            <SideNavigationSubItem text="Sales Reports" />
            <SideNavigationSubItem text="Customer Reports" />
          </SideNavigationItem>
          <SideNavigationItem
            slot="fixedItems"
            id="quick-create"
            text="Quick Create"
            icon="add"
            design="Action"
            unselectable
            onClick={handleQuickCreateClick}
          />
          <SideNavigationItem slot="fixedItems" text="Product Settings" icon="settings" />
        </SideNavigation>

        <div className="mainContent">
          <Title id="content-title">{contentTitle}</Title>
          <br />
          <Text>Content...</Text>
        </div>
      </NavigationLayout>

      <Dialog
        ref={quickCreateDialogRef}
        id="quick-create-dialog"
        class="quickCreateDialog"
        headerText="Create New Item"
        draggable
        resizable
      >
        <Text>Create new item...</Text>
        <Bar slot="footer" design="Footer">
          <Button slot="endContent" design="Emphasized">
            Create
          </Button>
          <Button slot="endContent" id="quick-create-dialog-close" onClick={handleQuickCreateDialogClose}>
            Close
          </Button>
        </Bar>
      </Dialog>

      <ResponsivePopover
        ref={notificationsPopoverRef}
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
              id="clear-all"
              design="Transparent"
              slot="endContent"
              onClick={handleClearAllClick}
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
              onClick={handleSortClick}
            />
            <Button
              design="Transparent"
              icon="action-settings"
              tooltip="Go to settings"
              slot="endContent"
            />
          </Bar>
        </div>

        {notificationListCleared ? (
          <NotificationList class="notificationsPopoverList" />
        ) : (
          <NotificationList
            class="notificationsPopoverList"
            onItemClose={handleNotificationItemClose}
          >
            <NotificationListGroupItem
              ref={notificationListGroupGrowingRef}
              id="notificationsListGroupGrowing"
              titleText="Today"
              loadingDelay={0}
              growing="Button"
              onLoadMore={handleLoadMore}
            >
              <NotificationListItem
                titleText="Start Your Day with Your Sales Target!"
                showClose
              >
                <Avatar icon="crm-sales" colorScheme="Accent10" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">11:13</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Good morning! Don't forget your daily sales target is $2,000, which needs to be fulfilled by the end of the business day. Let's make it a great sales day!
              </NotificationListItem>
              <NotificationListItem
                titleText="Upcoming Client Meeting Reminder"
                importance="Important"
                showClose
              >
                <Avatar icon="crm-sales" colorScheme="Accent10" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">11:05</span>
                <Menu slot="menu">
                  <MenuItem text="Open in calendar" />
                  <MenuItem text="Unsubscribe" />
                </Menu>
                You have a client meeting scheduled at 3 PM today with Acme Corp. Location: Zoom - link in calendar.
              </NotificationListItem>
              <NotificationListItem titleText="Follow-Up Needed for Prospect" showClose>
                <Avatar icon="crm-sales" colorScheme="Accent10" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">11:00</span>
                <Menu slot="menu">
                  <MenuItem text="Follow-up meeting" />
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Reminder to follow up with John Doe from XYZ Ltd. Discuss the proposal sent last week.
              </NotificationListItem>
              <NotificationListItem
                titleText="Budget Report Submission Deadline Approaching"
                importance="Important"
                showClose
              >
                <Avatar icon="expense-report" colorScheme="Accent1" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Accountant</span>
                <span slot="footnotes">10:15</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Reminder: The deadline to submit this quarter's budget report is this Friday.
              </NotificationListItem>
              <NotificationListItem
                titleText="Urgent: Expense Claims Pending Your Approval"
                importance="Important"
                showClose
              >
                <Avatar icon="expense-report" colorScheme="Accent1" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Notification</span>
                <span slot="footnotes">09:30</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                You have 5 pending expense claims awaiting your approval. Please review them by EOD.
              </NotificationListItem>
              <NotificationListItem
                titleText="Monthly Reconciliation Process Begins Next Week"
                showClose
              >
                <Avatar icon="expense-report" colorScheme="Accent1" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Accountant</span>
                <span slot="footnotes">09:30</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Just a heads-up that we will begin the financial reconciliation process for this month next Monday.
              </NotificationListItem>
              {notificationItems.map((item) => (
                <NotificationListItem key={item.id} titleText={item.title} showClose>
                  <Avatar icon="expense-report" colorScheme="Accent1" shape="Square" size="XS" slot="avatar" />
                  <span slot="footnotes">Product Name</span>
                  <span slot="footnotes">Now</span>
                  <Menu slot="menu">
                    <MenuItem text="Unsubscribe" />
                  </Menu>
                  {item.description}
                </NotificationListItem>
              ))}
            </NotificationListGroupItem>

            <NotificationListGroupItem titleText="Yesterday" collapsed>
              <NotificationListItem titleText="New Sales Lead Assigned" showClose>
                <Avatar icon="crm-sales" colorScheme="Accent10" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">1 Day</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                A new lead, Jane Smith from Innovative Tech, has been assigned to you. Contact details in CRM.
              </NotificationListItem>
              <NotificationListItem titleText=" Reminder: Submit Your EOD Sales Report" showClose>
                <Avatar icon="crm-sales" colorScheme="Accent10" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Sales</span>
                <span slot="footnotes">1 Day</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Please submit your end-of-day sales report through the portal before logging off today.
              </NotificationListItem>
              <NotificationListItem titleText="Tax Filing Deadline Reminder" showClose>
                <Avatar icon="expense-report" colorScheme="Accent1" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Accountant</span>
                <span slot="footnotes">1 Day</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                Reminder: The tax filing deadline for this quarter is approaching in two weeks.
              </NotificationListItem>
              <NotificationListItem titleText=" Invoice Processing Completed" showClose>
                <Avatar icon="expense-report" colorScheme="Accent1" shape="Square" size="XS" slot="avatar" />
                <span slot="footnotes">Notification</span>
                <span slot="footnotes">1 Day</span>
                <Menu slot="menu">
                  <MenuItem text="Unsubscribe" />
                </Menu>
                All invoices for this month have been successfully processed and payments scheduled.
              </NotificationListItem>
            </NotificationListGroupItem>
          </NotificationList>
        )}
      </ResponsivePopover>

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
            id="clear-all-action"
            class="dialogCloser"
            design="Emphasized"
            slot="endContent"
            style={{ minWidth: "4rem" }}
            onClick={handleClearAllAction}
          >
            OK
          </Button>
          <Button
            class="dialogCloser"
            slot="endContent"
            style={{ minWidth: "4rem" }}
            onClick={handleClearAllDialogClose}
          >
            Cancel
          </Button>
        </Bar>
      </Dialog>

      <UserSettingsDialog
        ref={settingsDialogRef}
        id="settings"
        headerText="Settings"
        showSearchField
        onSelectionChange={handleSettingsSelectionChange}
        onOpen={handleSettingsOpen}
        onClose={handleSettingsClose}
      >
        <UserSettingsItem
          icon="user-settings"
          text="User Account"
          tooltip="User Account"
          headerText="User Account"
          selected
          onSelectionChange={handleSettingsItemSelectionChange}
        >
          <UserSettingsAccountView showManageAccount>
            <UserMenuAccount
              slot="account"
              avatarSrc="../assets/images/avatars/man_avatar_3.png"
              titleText="Alain Chevalier"
              subtitleText="alian.chevalier@sap.com"
              description="Delivery Manager, SAP SE"
              selected
            />
            <Label for="reset-all-button">Personalization</Label>
            <br />
            <Button id="reset-all-button" onClick={handleResetAllButtonClick}>
              Reset All Personalization
            </Button>
            <Panel fixed class="ua-panel">
              <Text>
                Reset your personalization settings for the launchpad (such as
                theme, language, user activities, and home page content).
              </Text>
            </Panel>
          </UserSettingsAccountView>
        </UserSettingsItem>

        <UserSettingsItem
          icon="palette"
          text="Appearance"
          tooltip="Appearance"
          headerText="Appearance"
          onSelectionChange={handleSettingsItemSelectionChange}
        >
          <UserSettingsAppearanceView
            text="Themes"
            onSelectionChange={handleAppearanceViewSelectionChange}
          >
            <div slot="additionalContent">
              <div className="ui5-user-settings-appearance-view-additional-content-header">
                <Text id="touch-input-label">Optimize for Touch Input</Text>
                <Switch accessibleNameRef="touch-input-label" />
              </div>
              <Text class="ui5-user-settings-appearance-view-additional-content-description">
                Increases the size and spacing of controls to allow you to interact
                with them more easily using your fingertip. This is useful for
                hybrid devices that combine touch and mouse events.
              </Text>
            </div>
            <UserSettingsAppearanceViewGroup headerText="Horizon">
              <UserSettingsAppearanceViewItem
                itemKey="sap_horizon"
                text="Morning Horizon"
                selected
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_horizon_dark"
                text="Evening Horizon"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_horizon_hcb"
                text="Horizon High Contrast Black"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_horizon_hcw"
                text="Horizon High Contrast White"
              />
            </UserSettingsAppearanceViewGroup>
            <UserSettingsAppearanceViewGroup headerText="Quartz">
              <UserSettingsAppearanceViewItem
                itemKey="sap_fiori_3"
                text="Quartz Light"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_fiori_3_dark"
                text="Quartz Dark"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_fiori_3_hcb"
                text="Quartz High Contrast Black"
              />
              <UserSettingsAppearanceViewItem
                itemKey="sap_fiori_3_hcw"
                text="Quartz High Contrast White"
              />
            </UserSettingsAppearanceViewGroup>
          </UserSettingsAppearanceView>
        </UserSettingsItem>

        <UserSettingsItem
          text="Language and Region"
          tooltip="Language and Region"
          headerText="Language and Region"
          onSelectionChange={handleSettingsItemSelectionChange}
        >
          <UserSettingsView>
            <MessageStrip id="language-region-strip" design="Information" hideCloseButton>
              Close to apply your chosen language – the page will reload.
            </MessageStrip>
            <div className="language-region-form">
              <div className="language-region-row">
                <Label for="language" showColon>Display Language</Label>
                <Select id="language">
                  <Option>Browser Language</Option>
                  <Option>English (United Kingdom)</Option>
                  <Option selected>English (United States)</Option>
                  <Option>French (France)</Option>
                  <Option>French (Canada)</Option>
                  <Option>German (Germany)</Option>
                  <Option>German (Switzerland)</Option>
                  <Option>Japanese</Option>
                  <Option>Portuguese (Brazil)</Option>
                  <Option>Simplified Chinese (China)</Option>
                  <Option>Spanish (Mexico)</Option>
                  <Option>Spanish (Spain)</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="region" showColon>Region</Label>
                <Select id="region">
                  <Option>United Kingdom</Option>
                  <Option selected>United States</Option>
                  <Option>France</Option>
                  <Option>Canada</Option>
                  <Option>Germany</Option>
                  <Option>Switzerland</Option>
                  <Option>Japan</Option>
                  <Option>Brazil</Option>
                  <Option>China</Option>
                  <Option>Mexico</Option>
                  <Option>Spain</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="dateFormat" showColon>Date Format</Label>
                <Select id="dateFormat">
                  <Option>MM/DD/YYYY</Option>
                  <Option selected>MM.DD.YYYY</Option>
                  <Option>MM-DD-YYYY</Option>
                  <Option>DD/MM/YYYY</Option>
                  <Option>DD.MM.YYYY</Option>
                  <Option>DD-MM-YYYY</Option>
                  <Option>YYYY/MM/DD</Option>
                  <Option>YYYY.MM.DD</Option>
                  <Option>YYYY-MM-DD</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="timeFormat" showColon>Time Format</Label>
                <Select id="timeFormat">
                  <Option>24 Hour</Option>
                  <Option selected>12 Hour</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="timeZone" showColon>Time Zone</Label>
                <Select id="timeZone">
                  <Option>Pacific Time (UTC -08:00)</Option>
                  <Option>Mountain Time (UTC -07:00)</Option>
                  <Option>Central Time (UTC -06:00)</Option>
                  <Option selected>Eastern Standard Time (UTC -05:00)</Option>
                  <Option>Atlantic Time (UTC -04:00)</Option>
                  <Option>Greenwich Mean Time (UTC +00:00)</Option>
                  <Option>Central European Time (UTC +01:00)</Option>
                  <Option>India Standard Time (UTC +05:30)</Option>
                  <Option>Japan Standard Time (UTC +09:00)</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="currency" showColon>Currency</Label>
                <Select id="currency">
                  <Option selected>USD – United States Dollar</Option>
                  <Option>EUR – Euro</Option>
                  <Option>GBP – British Pound</Option>
                  <Option>JPY – Japanese Yen</Option>
                  <Option>CHF – Swiss Franc</Option>
                  <Option>CAD – Canadian Dollar</Option>
                  <Option>AUD – Australian Dollar</Option>
                  <Option>CNY – Chinese Yuan Renminbi</Option>
                  <Option>INR – Indian Rupee</Option>
                </Select>
              </div>
              <div className="language-region-row">
                <Label for="numberFormat" showColon>Number Format</Label>
                <Select id="numberFormat">
                  <Option>1.234,56</Option>
                  <Option selected>1,234.56</Option>
                  <Option>1 234,56</Option>
                  <Option>1'234.56</Option>
                  <Option>1234,56</Option>
                </Select>
              </div>
            </div>
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem
          icon="iphone"
          text="SAP Mobile Start Application"
          tooltip="SAP Mobile Start Application"
          headerText="SAP Mobile Start Application"
          onSelectionChange={handleSettingsItemSelectionChange}
        >
          <UserSettingsView>
            <Button id="mobile1-button" onClick={handleMobile1ButtonClick}>
              iOS
            </Button>
            <Button id="mobile2-button" onClick={handleMobile2ButtonClick}>
              Android
            </Button>
          </UserSettingsView>
          <UserSettingsView
            text="Inner Page"
            ref={mobileSecondPageRef}
            id="mobile-second-page"
            secondary
          >
            <Text>
              Enable access to your site from the SAP Mobile Start application.
            </Text>
            <Button id="mobile-install">Install</Button>
            <Button id="mobile-register">Register</Button>
            <Text>Scan the QR Code to install the mobile application</Text>
            <Icon name="qr-code" style={{ width: "20rem", height: "20rem" }} />
          </UserSettingsView>
        </UserSettingsItem>

        <UserSettingsItem
          icon="bell"
          text="Notifications"
          tooltip="Notifications"
          headerText="Notifications"
          onSelectionChange={handleSettingsItemSelectionChange}
        >
          <UserSettingsNotificationsView id="notifications-main-view">
            <MessageStrip slot="additionalContent" design="Information" hideCloseButton={true}>
              Some settings are managed by your organization. <Link>Learn More</Link>
            </MessageStrip>
            <UserSettingsNotificationsViewItem slot="headerItems" itemKey="allow-notifications" text="Allow Notifications" checked />
            <UserSettingsNotificationsViewItem slot="headerItems" itemKey="allow-banner-alerts" text="Allow Banner Alerts" bylineText="Switch on Banner for Notifications" checked />
            <UserSettingsNotificationsViewGroup headerText="Sales">
              <UserSettingsNotificationsViewItem itemKey="sales-order-updates" text="Sales Order Updates" checked navigable />
              <UserSettingsNotificationsViewItem itemKey="sales-order-approvals" text="Sales Order Approvals" navigable />
              <UserSettingsNotificationsViewItem itemKey="sales-order-release" text="Sales Order Release" checked navigable />
            </UserSettingsNotificationsViewGroup>
            <UserSettingsNotificationsViewGroup headerText="Purchasing">
              <UserSettingsNotificationsViewItem itemKey="po-approval" text="Purchase Order Approval" checked navigable />
              <UserSettingsNotificationsViewItem itemKey="po-rejection" text="Purchase Order Rejection" />
              <UserSettingsNotificationsViewItem itemKey="po-overdue" text="Purchase Order Overdue" checked navigable />
            </UserSettingsNotificationsViewGroup>
          </UserSettingsNotificationsView>

          <UserSettingsNotificationsView id="allow-notifications" secondary>
            <Text slot="additionalContent">Control how and where you receive notifications.</Text>
            <UserSettingsNotificationsViewGroup headerText="Notification Channels">
              <UserSettingsNotificationsViewItem itemKey="an-panel" text="Notifications Panel" bylineText="Receive notifications through the central notifications panel." checked />
              <UserSettingsNotificationsViewItem itemKey="an-email" text="Email" bylineText="Receive notifications by email." checked />
              <UserSettingsNotificationsViewItem itemKey="an-push" text="Push Notifications" bylineText="Receive notifications instantly on your mobile device." />
            </UserSettingsNotificationsViewGroup>
          </UserSettingsNotificationsView>

          <UserSettingsNotificationsView id="allow-banner-alerts" secondary>
            <Text slot="additionalContent">Configure banner alert behavior for incoming notifications.</Text>
            <UserSettingsNotificationsViewGroup headerText="Banner Settings">
              <UserSettingsNotificationsViewItem itemKey="ab-sound" text="Play Sound" bylineText="Play a sound when a banner alert appears." checked />
              <UserSettingsNotificationsViewItem itemKey="ab-duration" text="Display Duration" bylineText="Choose how long the banner stays on screen.">
                <Select slot="endContent">
                  <Option selected>5 seconds</Option>
                  <Option>10 seconds</Option>
                  <Option>Until dismissed</Option>
                </Select>
              </UserSettingsNotificationsViewItem>
            </UserSettingsNotificationsViewGroup>
          </UserSettingsNotificationsView>

          <UserSettingsNotificationsView id="sales-order-updates" secondary>
            <Text slot="additionalContent">Configure how you want to receive Sales Order Updates notifications.</Text>
            <UserSettingsNotificationsViewGroup headerText="Notification Preferences">
              <UserSettingsNotificationsViewItem itemKey="sou-panel" text="Notifications Panel" bylineText="Receive notifications through the central notifications panel." checked />
              <UserSettingsNotificationsViewItem itemKey="sou-banner" text="Banner Alerts" bylineText="Receive notifications instantly as a fly-in banner." checked />
              <UserSettingsNotificationsViewItem itemKey="sou-push" text="Push Notifications" bylineText="Receive notifications instantly on your mobile device." />
              <UserSettingsNotificationsViewItem itemKey="sou-email" text="Email" bylineText="Receive notifications by email." checked />
              <UserSettingsNotificationsViewItem itemKey="sou-frequency" text="Frequency" bylineText="Choose the frequency of receiving a notification.">
                <Select slot="endContent">
                  <Option selected>Immediate</Option>
                  <Option>Every 15 minutes</Option>
                  <Option>Hourly</Option>
                  <Option>Daily digest</Option>
                </Select>
              </UserSettingsNotificationsViewItem>
            </UserSettingsNotificationsViewGroup>
          </UserSettingsNotificationsView>

          <UserSettingsNotificationsView id="sales-order-approvals" secondary>
            <Text slot="additionalContent">Configure how you want to receive Sales Order Approvals notifications.</Text>
            <UserSettingsNotificationsViewGroup headerText="Notification Preferences">
              <UserSettingsNotificationsViewItem itemKey="soa-panel" text="Notifications Panel" bylineText="Receive notifications through the central notifications panel." checked />
              <UserSettingsNotificationsViewItem itemKey="soa-banner" text="Banner Alerts" bylineText="Receive notifications instantly as a fly-in banner." />
              <UserSettingsNotificationsViewItem itemKey="soa-push" text="Push Notifications" bylineText="Receive notifications instantly on your mobile device." checked />
              <UserSettingsNotificationsViewItem itemKey="soa-email" text="Email" bylineText="Receive notifications by email." checked />
            </UserSettingsNotificationsViewGroup>
          </UserSettingsNotificationsView>

          <UserSettingsNotificationsView id="sales-order-release" secondary>
            <Text slot="additionalContent">Configure how you want to receive Sales Order Release notifications.</Text>
            <UserSettingsNotificationsViewGroup headerText="Notification Preferences">
              <UserSettingsNotificationsViewItem itemKey="sor-panel" text="Notifications Panel" bylineText="Receive notifications through the central notifications panel." checked />
              <UserSettingsNotificationsViewItem itemKey="sor-email" text="Email" bylineText="Receive notifications by email." />
              <UserSettingsNotificationsViewItem itemKey="sor-frequency" text="Frequency" bylineText="Choose the frequency of receiving a notification.">
                <Select slot="endContent">
                  <Option selected>Immediate</Option>
                  <Option>Every 15 minutes</Option>
                  <Option>Daily digest</Option>
                </Select>
              </UserSettingsNotificationsViewItem>
            </UserSettingsNotificationsViewGroup>
          </UserSettingsNotificationsView>

          <UserSettingsNotificationsView id="po-approval" secondary>
            <Text slot="additionalContent">Approval-specific channels. These settings apply only to Purchase Order Approval notifications.</Text>
            <UserSettingsNotificationsViewGroup headerText="Approver Preferences">
              <UserSettingsNotificationsViewItem itemKey="po-approval-mobile" text="Push to mobile" bylineText="Approve or reject directly from your device." checked />
              <UserSettingsNotificationsViewItem itemKey="po-approval-summary" text="Daily summary email" bylineText="Receive one email per day with all pending approvals." />
              <UserSettingsNotificationsViewItem itemKey="po-approval-delegation" text="Delegation" bylineText="Route approvals to a delegate when you are out of office." />
            </UserSettingsNotificationsViewGroup>
          </UserSettingsNotificationsView>

          <UserSettingsNotificationsView id="po-rejection" secondary>
            <Text slot="additionalContent">Configure how you want to receive Purchase Order Rejection notifications.</Text>
            <UserSettingsNotificationsViewGroup headerText="Notification Preferences">
              <UserSettingsNotificationsViewItem itemKey="por-panel" text="Notifications Panel" bylineText="Receive notifications through the central notifications panel." />
              <UserSettingsNotificationsViewItem itemKey="por-email" text="Email" bylineText="Receive notifications by email." checked />
            </UserSettingsNotificationsViewGroup>
          </UserSettingsNotificationsView>

          <UserSettingsNotificationsView id="po-overdue" secondary>
            <Text slot="additionalContent">Configure how you want to receive Purchase Order Overdue notifications.</Text>
            <UserSettingsNotificationsViewGroup headerText="Notification Preferences">
              <UserSettingsNotificationsViewItem itemKey="poo-panel" text="Notifications Panel" bylineText="Receive notifications through the central notifications panel." checked />
              <UserSettingsNotificationsViewItem itemKey="poo-banner" text="Banner Alerts" bylineText="Receive notifications instantly as a fly-in banner." checked />
              <UserSettingsNotificationsViewItem itemKey="poo-push" text="Push Notifications" bylineText="Receive notifications instantly on your mobile device." checked />
              <UserSettingsNotificationsViewItem itemKey="poo-email" text="Email" bylineText="Receive notifications by email." checked />
            </UserSettingsNotificationsViewGroup>
          </UserSettingsNotificationsView>
        </UserSettingsItem>

        <UserSettingsItem
          icon="reset"
          slot="fixedItems"
          text="Reset Settings"
          tooltip="Reset Settings"
          headerText="Reset Settings"
          onSelectionChange={handleSettingsItemSelectionChange}
        >
          <UserSettingsView text="Reset Personalization">
            <Button id="resetPersonalization" onClick={handleResetPersonalizationClick}>
              Reset Personalization content
            </Button>
            <Toast ref={toastResetRef} id="toastReset">
              Changes Reset.
            </Toast>
          </UserSettingsView>
          <UserSettingsView text="Reset All Settings">
            <Button id="resetAll" onClick={handleResetAllClick}>
              Reset All Settings content
            </Button>
            <Toast ref={toastResetAllRef} id="toastResetAll">
              All changes Reset.
            </Toast>
          </UserSettingsView>
        </UserSettingsItem>
      </UserSettingsDialog>
    </>
  );
}

export default App;
