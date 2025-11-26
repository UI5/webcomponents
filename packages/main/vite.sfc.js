/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";

const modules = [
	"Button.js",
	"Icon.js",
	"BusyIndicator.js",
	"ToggleButton.js",
	"Avatar.js",
	"ListItemStandard.js",
	"Popover.js",
	"Title.js",
	"ToggleButton.js",
	"List.js",
	"Tag.js",
	"Text.js",
	"Bar.js",
	"Dialog.js",
	"Link.js",
	"Icon.js",
	"Label.js",
	"Panel.js",
	"ComboBox.js",
	"ComboBoxItem.js",
	"RadioButton.js",
	"CheckBox.js",
	"Toast.js",
	"Option.js",
	"Select.js",
	"Popover.js",
	"Menu.js",
	"MenuItem.js",
	"Popup.js",
	"DropIndicator.js",
	"ListItemGroup.js",
	"SuggestionItem.js",
	"Input.js",
	"ButtonBadge.js",
	"MenuSeparator.js",
	"MenuItemGroup.js",
	"ListItem.js",
	"ListItemBase.js",
	"Popup.js",
	"Toolbar.js",
	"TabContainer.js",
	"Popover.js",
	"Tab.js",
	"ToolbarButton.js",
	"ResponsivePopover.js",
	"ListItemCustom.js",
	"ListItem.js",
];

export default defineConfig({
	build: {
		emptyOutDir: false,
		lib: {
			entry: modules.map(module => `dist/${module}`),
			formats: ["es"],
			// fileName: (format, entryName) => entryName + ".sfc.js",
		},
		rollupOptions: {
			external: (id, parentId, isResolved) => {
				const isBase = id === "@ui5/webcomponents-base";
				const isEntry = modules.some(module => id.endsWith(module));
				const isComponentRelated = (id.includes("Template.js") || id.includes(".css.js")) || id.includes("i18n-defaults");
				const isParametersBundle = id.includes("parameters-bundle.css.js");
				const isExternal = isBase || isParametersBundle || !(isComponentRelated || isEntry);
				if (id.includes("@ui5/webcomponents-icons")) {
					console.log({ id, isExternal });
				}
				return isExternal;
			},
		},
	},
});
