interface ShellBarV2ActionItem {
	id: string;
	icon?: string;
	count?: string;
	visible: boolean;
}

interface ShellBarV2ActionsParams {
	showProfile: boolean;
	hasAssistant: boolean;
	showProductSwitch: boolean;
	showNotifications: boolean;
	notificationsCount?: string;
}

class ShellBarV2Actions {
	getActions(params: ShellBarV2ActionsParams): ShellBarV2ActionItem[] {
		const {
			showNotifications, notificationsCount, showProductSwitch, hasAssistant, showProfile,
		} = params;

		return [
			{
				id: "notifications",
				visible: showNotifications,
				count: notificationsCount,
				icon: "bell",
			},
			{
				id: "product-switch",
				visible: showProductSwitch,
				icon: "grid",
			},
			{
				id: "assistant",
				visible: hasAssistant,
				icon: "da",
			},
			{
				id: "profile",
				visible: showProfile,
			},
		].filter(action => action.visible);
	}
}

export default ShellBarV2Actions;
export type {
	ShellBarV2ActionItem,
	ShellBarV2ActionsParams,
};
