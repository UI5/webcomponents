import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type AvatarColorScheme from "@ui5/webcomponents/dist/types/AvatarColorScheme.js";
declare class UserMenuAccount extends UI5Element {
    /**
     * Defines the avatar image url of the user.
     *
     * @default ""
     * @public
     */
    avatarSrc?: string;
    /**
     * Defines the avatar initials of the user.
     *
     * @default undefined
     * @public
     */
    avatarInitials?: string;
    /**
     * Defines the background color of the desired image.
     * If `avatarColorScheme` is set to `Auto`, the avatar will be displayed with the `Accent6` color.
     *
     * @default "Auto"
     * @public
     */
    avatarColorScheme: `${AvatarColorScheme}`;
    /**
     * Defines the title text of the user.
     *
     * @default ""
     * @public
     */
    titleText: string;
    /**
     * Defines additional text of the user.
     *
     * @default ""
     * @public
     */
    subtitleText: string;
    /**
     * Defines description of the user.
     *
     * @default ""
     * @public
     */
    description: string;
    /**
     * Defines additional information for the user.
     *
     * @default ""
     * @public
     */
    additionalInfo: string;
    /**
     * Defines if the user is selected.
     *
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Indicates whether a loading indicator should be shown.
     * @default false
     * @public
     * @since 2.9.0
     */
    loading: boolean;
    get _initials(): string;
}
export default UserMenuAccount;
