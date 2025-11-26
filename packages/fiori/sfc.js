import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const components = [
    "SearchField.js",
    "ShellBarSearch.js",
    "ShellBar.js",
    "ShellBarBranding.js",
    "Search.js",
    "SearchItem.js",
    "NavigationLayout.js",
    "NavigationMenu.js",
    "NavigationMenuItem.js",
    "SideNavigation.js",
    "SideNavigationGroup.js",
    "SideNavigationItem.js",
    "SideNavigationSubItem.js",
    "NotificationList.js",
    "NotificationListItem.js",
    "NotificationListGroupItem.js",
    "UserMenu.js",
    "UserMenuItem.js",
    "UserSettingsDialog.js",
    "UserSettingsItem.js",
    "IllustratedMessage.js",
    "UserSettingsView.js",
    "UserSettingsDialogTemplate.js",
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