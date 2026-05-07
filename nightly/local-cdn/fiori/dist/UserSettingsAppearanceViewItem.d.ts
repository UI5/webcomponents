import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import "@ui5/webcomponents-icons/dist/product.js";
declare class UserSettingsAppearanceViewItem extends ListItemCustom {
    /**
     * Defines the unique identifier of the item.
     * @default ""
     * @public
     */
    itemKey: string;
    /**
     * Defines the text label displayed for the appearance item.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines the icon of the appearance item.
     * @default "product"
     * @public
     */
    icon: string;
    /**
     * Defines the color scheme of the avatar.
     * @default "Accent7"
     * @public
     */
    colorScheme: string;
    get isUserSettingsAppearanceViewItem(): boolean;
}
export declare const isInstanceOfUserSettingsAppearanceViewItem: (object: any) => object is UserSettingsAppearanceViewItem;
export default UserSettingsAppearanceViewItem;
