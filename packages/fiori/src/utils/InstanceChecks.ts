import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import type SideNavigationGroup from "../SideNavigationGroup.js";
import type SideNavigationItem from "../SideNavigationItem.js";
import type SideNavigationItemBase from "../SideNavigationItemBase.js";
import type SideNavigationSelectableItemBase from "../SideNavigationSelectableItemBase.js";
import type UserMenuItemGroup from "../UserMenuItemGroup.js";

export const isInstanceOfSideNavigationGroup = createInstanceChecker<SideNavigationGroup>("isSideNavigationGroup");
export const isInstanceOfSideNavigationItem = createInstanceChecker<SideNavigationItem>("isSideNavigationItem");
export const isInstanceOfSideNavigationItemBase = createInstanceChecker<SideNavigationItemBase>("isSideNavigationItemBase");
export const isInstanceOfSideNavigationSelectableItemBase = createInstanceChecker<SideNavigationSelectableItemBase>("isSideNavigationSelectableItemBase");
export const isInstanceOfUserMenuItemGroup = createInstanceChecker<UserMenuItemGroup>("isGroup");
