import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const components = [
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

const iconsPathResolved = fileURLToPath(import.meta.resolve("@ui5/webcomponents-icons/package.json")).replace("package.json", "");
const parentIds = new Set();
components.forEach(component => {
    build({
        build: {
            emptyOutDir: false,
            lib: {
                entry: `dist/${component}`,
                formats: ["es"],
                fileName: (format, entryName) => component
            },
            rollupOptions: {
                external: (id, parentId, isResolved) => {
                    const isIcon = id.includes("@ui5/webcomponents-icons") || id.startsWith(iconsPathResolved);
                    if (isIcon) {
                        parentIds.add(id);
                        return false;
                    }

                    const isBase = id === "@ui5/webcomponents-base";
                    if (isBase) {
                        return true;
                    }

                    const isEntry = id.includes(component);
                    if (isEntry) {
                        return false;
                    }

                    const isParametersBundle = id.includes("parameters-bundle.css.js");
                    if (isParametersBundle) {
                        return true;
                    }

                    const isComponentRelated = (id.includes("Template.js") || id.includes(".css.js")) || id.includes("i18n-defaults");
                    const isExternal =  !isComponentRelated;
                    if (isExternal && parentIds.has(parentId)) {
                        console.log("internal (from set)", id, parentId);
                        return false;
                    }
                    return isExternal;
                },
            },
        },
    })
});