/* eslint-disable @typescript-eslint/no-unused-vars */
import testAssets from "@ui5/webcomponents/dist/bundle.esm.js";
import * as defaultFioriTexts from "./generated/i18n/i18n-defaults.js";

// FIORI assets
import "./Assets.js";

// FIORI illustrations
import "./illustrations/AllIllustrations.js";

// FIORI components
import BarcodeScannerDialog from "./BarcodeScannerDialog.js";
import DynamicPage from "./DynamicPage.js";
import DynamicPageHeader from "./DynamicPageHeader.js";
import DynamicPageTitle from "./DynamicPageTitle.js";
import DynamicPageHeaderActions from "./DynamicPageHeaderActions.js";
import DynamicSideContent from "./DynamicSideContent.js";
import FilterItem from "./FilterItem.js";
import FilterItemOption from "./FilterItemOption.js";
import FlexibleColumnLayout from "./FlexibleColumnLayout.js";
import GroupItem from "./GroupItem.js";
import IllustratedMessage from "./IllustratedMessage.js";
import MediaGallery from "./MediaGallery.js";
import MediaGalleryItem from "./MediaGalleryItem.js";
import NavigationMenu from "./NavigationMenu.js";
import NavigationMenuItem from "./NavigationMenuItem.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";
import NotificationListItem from "./NotificationListItem.js";
import NotificationList from "./NotificationList.js";
import Page from "./Page.js";
import ProductSwitch from "./ProductSwitch.js";
import ProductSwitchItem from "./ProductSwitchItem.js";
import ShellBar from "./ShellBar.js";
import SearchField from "./SearchField.js";
import SearchScope from "./SearchScope.js";
import Search from "./Search.js";
import ShellBarSearch from "./ShellBarSearch.js";
import SearchMessageArea from "./SearchMessageArea.js";
import SearchItem from "./SearchItem.js";
import SearchItemShowMore from "./SearchItemShowMore.js";
import SearchItemGroup from "./SearchItemGroup.js";
import ShellBarBranding from "./ShellBarBranding.js";
import ShellBarSpacer from "./ShellBarSpacer.js";
import ShellBarItem from "./ShellBarItem.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationSubItem from "./SideNavigationSubItem.js";
import SideNavigationGroup from "./SideNavigationGroup.js";
import SideNavigation from "./SideNavigation.js";
import SortItem from "./SortItem.js";
import UserSettingsItem from "./UserSettingsItem.js";
import SettingsDialog from "./UserSettingsDialog.js";
import UserSettingsView from "./UserSettingsView.js";
import UserSettingsAccountView from "./UserSettingsAccountView.js";
import UserSettingsAppearanceView from "./UserSettingsAppearanceView.js";
import UserSettingsAppearanceViewItem from "./UserSettingsAppearanceViewItem.js";
import UserSettingsAppearanceViewGroup from "./UserSettingsAppearanceViewGroup.js";
import Timeline from "./Timeline.js";
import TimelineGroupItem from "./TimelineGroupItem.js";
import NavigationLayout from "./NavigationLayout.js";
import UploadCollection from "./UploadCollection.js";
import UploadCollectionItem from "./UploadCollectionItem.js";
import UserMenu from "./UserMenu.js";
import UserMenuAccount from "./UserMenuAccount.js";
import UserMenuItem from "./UserMenuItem.js";
import UserMenuItemGroup from "./UserMenuItemGroup.js";
import ViewSettingsDialog from "./ViewSettingsDialog.js";
import Wizard from "./Wizard.js";

testAssets.defaultTexts = { ...testAssets.defaultTexts, ...defaultFioriTexts };
export default testAssets;
