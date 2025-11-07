interface ShellBarV2ActionItem {
	id: string;
	icon?: string;
	count?: string;
	visible: boolean;
}

interface ShellBarV2ActionsParams {
	hasSearch: boolean;
	showProfile: boolean;
	hasAssistant: boolean;
	showProductSwitch: boolean;
	showNotifications: boolean;
	notificationsCount?: string;
}

class ShellBarV2Actions {
	getActions(params: ShellBarV2ActionsParams): ShellBarV2ActionItem[] {
		const {
			hasSearch,
			showProfile,
			hasAssistant,
			showProductSwitch,
			showNotifications,
			notificationsCount,
		} = params;

		return [
			{
				id: "search",
				visible: hasSearch,
				icon: "search",
			},
			{
				id: "profile",
				visible: showProfile,
			},
			{
				id: "assistant",
				visible: hasAssistant,
				icon: "da",
			},
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
		].filter(action => action.visible);
	}
}

export default ShellBarV2Actions;
export type {
	ShellBarV2ActionItem,
	ShellBarV2ActionsParams,
};
