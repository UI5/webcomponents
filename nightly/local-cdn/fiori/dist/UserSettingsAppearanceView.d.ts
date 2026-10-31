import UserSettingsView from "./UserSettingsView.js";
import type UserSettingsAppearanceViewItem from "./UserSettingsAppearanceViewItem.js";
import type UserSettingsAppearanceViewGroup from "./UserSettingsAppearanceViewGroup.js";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type UserSettingsAppearanceViewItemSelectEventDetail = {
    item: UserSettingsAppearanceViewItem;
};
declare class UserSettingsAppearanceView extends UserSettingsView {
    eventDetails: {
        "selection-change": UserSettingsAppearanceViewItemSelectEventDetail;
    };
    /**
     * Defines the items of the component.
     *
     * @public
     */
    items: DefaultSlot<UserSettingsAppearanceViewGroup | UserSettingsAppearanceViewItem>;
    /**
     * Defines additional content displayed below the items list.
     *
     * @public
     */
    additionalContent: Slot<HTMLElement>;
    _getAllItems(): Array<UserSettingsAppearanceViewItem>;
    _handleSelectionChange: (e: CustomEvent<ListSelectionChangeEventDetail>) => void;
}
export default UserSettingsAppearanceView;
export type { UserSettingsAppearanceViewItemSelectEventDetail, };
