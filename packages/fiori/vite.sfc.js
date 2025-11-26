/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";

const modules = [
    "SearchField.js",
    "ShellBarSearch.js",
    "ShellBar.js",
    "ShellBarBranding.js",
    "SearchItem.js",
    "NavigationLayout.js",
    "SideNavigation.js",
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

const internalParents = new Set();

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

                // Handle unresolved imports (package names)
                if (!isResolved) {
                    const isBase = id === "@ui5/webcomponents-base";
                    const isMain = id === "@ui5/webcomponents";
                    const isIcons = id.startsWith("@ui5/webcomponents-icons");
                    if (isBase || isMain) {
                        return true; // External
                    }
                    if (isIcons) {
                        return false; // Internal
                    }
                }

                if (internalParents.has(parentId)) {
                    console.log("internal (from set)", id, parentId);
                    return false;
                }

                const isEntry = modules.some(module => id.endsWith(module));
                // const isComponentRelated = (id.includes("Template.js") || id.includes(".css.js")) || id.includes("i18n-defaults") || id.includes("/icons/dist/");
                // const isParametersBundle = id.includes("parameters-bundle.css.js");
                // const isExternal = isParametersBundle || !(isComponentRelated || isEntry);
                const isExternal = !isEntry;
                if (isExternal) {
                    // console.log({ id, parentId, isResolved, isParametersBundle, isComponentRelated, isEntry, isExternal });
                    console.log({ id, parentId, isResolved, isEntry, isExternal });
                } else {
                    internalParents.add(id);
                    console.log("internal", id);
                }
                return isExternal;
            },
        },
    },
});
