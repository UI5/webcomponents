#!/usr/bin/env node

/**
 * Generate React TSX samples from HTML samples
 *
 * Usage:
 *   node scripts/generate-react-samples.mjs              # Generate all samples
 *   node scripts/generate-react-samples.mjs Button       # Generate only Button samples
 *   node scripts/generate-react-samples.mjs --overwrite  # Overwrite existing .tsx files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const samplesDir = path.join(__dirname, "../docs/_samples");

// Parse CLI arguments
const args = process.argv.slice(2);
const filterComponent = args.find(arg => !arg.startsWith("--"));
const overwrite = args.includes("--overwrite");

// Component tag to import path mapping
const componentMappings = {
  // Main package
  "ui5-avatar": { module: "@ui5/webcomponents/dist/Avatar.js", name: "Avatar" },
  "ui5-avatar-group": { module: "@ui5/webcomponents/dist/AvatarGroup.js", name: "AvatarGroup" },
  "ui5-badge": { module: "@ui5/webcomponents/dist/Badge.js", name: "Badge" },
  "ui5-bar": { module: "@ui5/webcomponents/dist/Bar.js", name: "Bar" },
  "ui5-breadcrumbs": { module: "@ui5/webcomponents/dist/Breadcrumbs.js", name: "Breadcrumbs" },
  "ui5-breadcrumbs-item": { module: "@ui5/webcomponents/dist/BreadcrumbsItem.js", name: "BreadcrumbsItem" },
  "ui5-busy-indicator": { module: "@ui5/webcomponents/dist/BusyIndicator.js", name: "BusyIndicator" },
  "ui5-button": { module: "@ui5/webcomponents/dist/Button.js", name: "Button" },
  "ui5-calendar": { module: "@ui5/webcomponents/dist/Calendar.js", name: "Calendar" },
  "ui5-calendar-date": { module: "@ui5/webcomponents/dist/CalendarDate.js", name: "CalendarDate" },
  "ui5-calendar-date-range": { module: "@ui5/webcomponents/dist/CalendarDateRange.js", name: "CalendarDateRange" },
  "ui5-calendar-legend": { module: "@ui5/webcomponents/dist/CalendarLegend.js", name: "CalendarLegend" },
  "ui5-calendar-legend-item": { module: "@ui5/webcomponents/dist/CalendarLegendItem.js", name: "CalendarLegendItem" },
  "ui5-card": { module: "@ui5/webcomponents/dist/Card.js", name: "Card" },
  "ui5-card-header": { module: "@ui5/webcomponents/dist/CardHeader.js", name: "CardHeader" },
  "ui5-carousel": { module: "@ui5/webcomponents/dist/Carousel.js", name: "Carousel" },
  "ui5-cb-item": { module: "@ui5/webcomponents/dist/ComboBoxItem.js", name: "ComboBoxItem" },
  "ui5-cb-item-group": { module: "@ui5/webcomponents/dist/ComboBoxItemGroup.js", name: "ComboBoxItemGroup" },
  "ui5-checkbox": { module: "@ui5/webcomponents/dist/CheckBox.js", name: "CheckBox" },
  "ui5-color-palette": { module: "@ui5/webcomponents/dist/ColorPalette.js", name: "ColorPalette" },
  "ui5-color-palette-item": { module: "@ui5/webcomponents/dist/ColorPaletteItem.js", name: "ColorPaletteItem" },
  "ui5-color-palette-popover": { module: "@ui5/webcomponents/dist/ColorPalettePopover.js", name: "ColorPalettePopover" },
  "ui5-color-picker": { module: "@ui5/webcomponents/dist/ColorPicker.js", name: "ColorPicker" },
  "ui5-combobox": { module: "@ui5/webcomponents/dist/ComboBox.js", name: "ComboBox" },
  "ui5-date-picker": { module: "@ui5/webcomponents/dist/DatePicker.js", name: "DatePicker" },
  "ui5-daterange-picker": { module: "@ui5/webcomponents/dist/DateRangePicker.js", name: "DateRangePicker" },
  "ui5-datetime-picker": { module: "@ui5/webcomponents/dist/DateTimePicker.js", name: "DateTimePicker" },
  "ui5-dialog": { module: "@ui5/webcomponents/dist/Dialog.js", name: "Dialog" },
  "ui5-file-uploader": { module: "@ui5/webcomponents/dist/FileUploader.js", name: "FileUploader" },
  "ui5-form": { module: "@ui5/webcomponents/dist/Form.js", name: "Form" },
  "ui5-form-group": { module: "@ui5/webcomponents/dist/FormGroup.js", name: "FormGroup" },
  "ui5-form-item": { module: "@ui5/webcomponents/dist/FormItem.js", name: "FormItem" },
  "ui5-icon": { module: "@ui5/webcomponents/dist/Icon.js", name: "Icon" },
  "ui5-input": { module: "@ui5/webcomponents/dist/Input.js", name: "Input" },
  "ui5-label": { module: "@ui5/webcomponents/dist/Label.js", name: "Label" },
  "ui5-li": { module: "@ui5/webcomponents/dist/ListItemStandard.js", name: "ListItemStandard" },
  "ui5-li-custom": { module: "@ui5/webcomponents/dist/ListItemCustom.js", name: "ListItemCustom" },
  "ui5-li-group": { module: "@ui5/webcomponents/dist/ListItemGroup.js", name: "ListItemGroup" },
  "ui5-li-groupheader": { module: "@ui5/webcomponents/dist/ListItemGroupHeader.js", name: "ListItemGroupHeader" },
  "ui5-link": { module: "@ui5/webcomponents/dist/Link.js", name: "Link" },
  "ui5-list": { module: "@ui5/webcomponents/dist/List.js", name: "List" },
  "ui5-menu": { module: "@ui5/webcomponents/dist/Menu.js", name: "Menu" },
  "ui5-menu-item": { module: "@ui5/webcomponents/dist/MenuItem.js", name: "MenuItem" },
  "ui5-menu-separator": { module: "@ui5/webcomponents/dist/MenuSeparator.js", name: "MenuSeparator" },
  "ui5-message-strip": { module: "@ui5/webcomponents/dist/MessageStrip.js", name: "MessageStrip" },
  "ui5-multi-combobox": { module: "@ui5/webcomponents/dist/MultiComboBox.js", name: "MultiComboBox" },
  "ui5-multi-input": { module: "@ui5/webcomponents/dist/MultiInput.js", name: "MultiInput" },
  "ui5-option": { module: "@ui5/webcomponents/dist/Option.js", name: "Option" },
  "ui5-option-custom": { module: "@ui5/webcomponents/dist/OptionCustom.js", name: "OptionCustom" },
  "ui5-panel": { module: "@ui5/webcomponents/dist/Panel.js", name: "Panel" },
  "ui5-popover": { module: "@ui5/webcomponents/dist/Popover.js", name: "Popover" },
  "ui5-progress-indicator": { module: "@ui5/webcomponents/dist/ProgressIndicator.js", name: "ProgressIndicator" },
  "ui5-radio-button": { module: "@ui5/webcomponents/dist/RadioButton.js", name: "RadioButton" },
  "ui5-range-slider": { module: "@ui5/webcomponents/dist/RangeSlider.js", name: "RangeSlider" },
  "ui5-rating-indicator": { module: "@ui5/webcomponents/dist/RatingIndicator.js", name: "RatingIndicator" },
  "ui5-responsive-popover": { module: "@ui5/webcomponents/dist/ResponsivePopover.js", name: "ResponsivePopover" },
  "ui5-segmented-button": { module: "@ui5/webcomponents/dist/SegmentedButton.js", name: "SegmentedButton" },
  "ui5-segmented-button-item": { module: "@ui5/webcomponents/dist/SegmentedButtonItem.js", name: "SegmentedButtonItem" },
  "ui5-select": { module: "@ui5/webcomponents/dist/Select.js", name: "Select" },
  "ui5-slider": { module: "@ui5/webcomponents/dist/Slider.js", name: "Slider" },
  "ui5-special-date": { module: "@ui5/webcomponents/dist/SpecialCalendarDate.js", name: "SpecialCalendarDate" },
  "ui5-split-button": { module: "@ui5/webcomponents/dist/SplitButton.js", name: "SplitButton" },
  "ui5-step-input": { module: "@ui5/webcomponents/dist/StepInput.js", name: "StepInput" },
  "ui5-suggestion-item": { module: "@ui5/webcomponents/dist/SuggestionItem.js", name: "SuggestionItem" },
  "ui5-suggestion-item-custom": { module: "@ui5/webcomponents/dist/SuggestionItemCustom.js", name: "SuggestionItemCustom" },
  "ui5-suggestion-item-group": { module: "@ui5/webcomponents/dist/SuggestionItemGroup.js", name: "SuggestionItemGroup" },
  "ui5-switch": { module: "@ui5/webcomponents/dist/Switch.js", name: "Switch" },
  "ui5-tab": { module: "@ui5/webcomponents/dist/Tab.js", name: "Tab" },
  "ui5-tab-container": { module: "@ui5/webcomponents/dist/TabContainer.js", name: "TabContainer" },
  "ui5-tab-separator": { module: "@ui5/webcomponents/dist/TabSeparator.js", name: "TabSeparator" },
  "ui5-table": { module: "@ui5/webcomponents/dist/Table.js", name: "Table" },
  "ui5-table-cell": { module: "@ui5/webcomponents/dist/TableCell.js", name: "TableCell" },
  "ui5-table-header-cell": { module: "@ui5/webcomponents/dist/TableHeaderCell.js", name: "TableHeaderCell" },
  "ui5-table-header-row": { module: "@ui5/webcomponents/dist/TableHeaderRow.js", name: "TableHeaderRow" },
  "ui5-table-row": { module: "@ui5/webcomponents/dist/TableRow.js", name: "TableRow" },
  "ui5-table-growing": { module: "@ui5/webcomponents/dist/TableGrowing.js", name: "TableGrowing" },
  "ui5-table-selection": { module: "@ui5/webcomponents/dist/TableSelection.js", name: "TableSelection" },
  "ui5-tag": { module: "@ui5/webcomponents/dist/Tag.js", name: "Tag" },
  "ui5-text": { module: "@ui5/webcomponents/dist/Text.js", name: "Text" },
  "ui5-textarea": { module: "@ui5/webcomponents/dist/TextArea.js", name: "TextArea" },
  "ui5-time-picker": { module: "@ui5/webcomponents/dist/TimePicker.js", name: "TimePicker" },
  "ui5-title": { module: "@ui5/webcomponents/dist/Title.js", name: "Title" },
  "ui5-toast": { module: "@ui5/webcomponents/dist/Toast.js", name: "Toast" },
  "ui5-toggle-button": { module: "@ui5/webcomponents/dist/ToggleButton.js", name: "ToggleButton" },
  "ui5-token": { module: "@ui5/webcomponents/dist/Token.js", name: "Token" },
  "ui5-tokenizer": { module: "@ui5/webcomponents/dist/Tokenizer.js", name: "Tokenizer" },
  "ui5-toolbar": { module: "@ui5/webcomponents/dist/Toolbar.js", name: "Toolbar" },
  "ui5-toolbar-button": { module: "@ui5/webcomponents/dist/ToolbarButton.js", name: "ToolbarButton" },
  "ui5-toolbar-select": { module: "@ui5/webcomponents/dist/ToolbarSelect.js", name: "ToolbarSelect" },
  "ui5-toolbar-select-option": { module: "@ui5/webcomponents/dist/ToolbarSelectOption.js", name: "ToolbarSelectOption" },
  "ui5-toolbar-separator": { module: "@ui5/webcomponents/dist/ToolbarSeparator.js", name: "ToolbarSeparator" },
  "ui5-toolbar-spacer": { module: "@ui5/webcomponents/dist/ToolbarSpacer.js", name: "ToolbarSpacer" },
  "ui5-tree": { module: "@ui5/webcomponents/dist/Tree.js", name: "Tree" },
  "ui5-tree-item": { module: "@ui5/webcomponents/dist/TreeItem.js", name: "TreeItem" },
  "ui5-tree-item-custom": { module: "@ui5/webcomponents/dist/TreeItemCustom.js", name: "TreeItemCustom" },

  // Fiori package
  "ui5-barcode-scanner-dialog": { module: "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js", name: "BarcodeScannerDialog" },
  "ui5-dynamic-page": { module: "@ui5/webcomponents-fiori/dist/DynamicPage.js", name: "DynamicPage" },
  "ui5-dynamic-page-header": { module: "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js", name: "DynamicPageHeader" },
  "ui5-dynamic-page-header-actions": { module: "@ui5/webcomponents-fiori/dist/DynamicPageHeaderActions.js", name: "DynamicPageHeaderActions" },
  "ui5-dynamic-page-title": { module: "@ui5/webcomponents-fiori/dist/DynamicPageTitle.js", name: "DynamicPageTitle" },
  "ui5-dynamic-side-content": { module: "@ui5/webcomponents-fiori/dist/DynamicSideContent.js", name: "DynamicSideContent" },
  "ui5-fcl": { module: "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js", name: "FlexibleColumnLayout" },
  "ui5-illustrated-message": { module: "@ui5/webcomponents-fiori/dist/IllustratedMessage.js", name: "IllustratedMessage" },
  "ui5-media-gallery": { module: "@ui5/webcomponents-fiori/dist/MediaGallery.js", name: "MediaGallery" },
  "ui5-media-gallery-item": { module: "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js", name: "MediaGalleryItem" },
  "ui5-navigation-layout": { module: "@ui5/webcomponents-fiori/dist/NavigationLayout.js", name: "NavigationLayout" },
  "ui5-li-notification": { module: "@ui5/webcomponents-fiori/dist/NotificationListItem.js", name: "NotificationListItem" },
  "ui5-li-notification-group": { module: "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js", name: "NotificationListGroupItem" },
  "ui5-notification-list": { module: "@ui5/webcomponents-fiori/dist/NotificationList.js", name: "NotificationList" },
  "ui5-page": { module: "@ui5/webcomponents-fiori/dist/Page.js", name: "Page" },
  "ui5-product-switch": { module: "@ui5/webcomponents-fiori/dist/ProductSwitch.js", name: "ProductSwitch" },
  "ui5-product-switch-item": { module: "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js", name: "ProductSwitchItem" },
  "ui5-search": { module: "@ui5/webcomponents-fiori/dist/Search.js", name: "Search" },
  "ui5-search-field": { module: "@ui5/webcomponents-fiori/dist/SearchField.js", name: "SearchField" },
  "ui5-search-item": { module: "@ui5/webcomponents-fiori/dist/SearchItem.js", name: "SearchItem" },
  "ui5-search-item-group": { module: "@ui5/webcomponents-fiori/dist/SearchItemGroup.js", name: "SearchItemGroup" },
  "ui5-search-message-area": { module: "@ui5/webcomponents-fiori/dist/SearchMessageArea.js", name: "SearchMessageArea" },
  "ui5-shellbar": { module: "@ui5/webcomponents-fiori/dist/ShellBar.js", name: "ShellBar" },
  "ui5-shellbar-branding": { module: "@ui5/webcomponents-fiori/dist/ShellBarBranding.js", name: "ShellBarBranding" },
  "ui5-shellbar-item": { module: "@ui5/webcomponents-fiori/dist/ShellBarItem.js", name: "ShellBarItem" },
  "ui5-shellbar-search": { module: "@ui5/webcomponents-fiori/dist/ShellBarSearch.js", name: "ShellBarSearch" },
  "ui5-shellbar-spacer": { module: "@ui5/webcomponents-fiori/dist/ShellBarSpacer.js", name: "ShellBarSpacer" },
  "ui5-search-scope": { module: "@ui5/webcomponents-fiori/dist/SearchScope.js", name: "SearchScope" },
  "ui5-side-navigation": { module: "@ui5/webcomponents-fiori/dist/SideNavigation.js", name: "SideNavigation" },
  "ui5-side-navigation-item": { module: "@ui5/webcomponents-fiori/dist/SideNavigationItem.js", name: "SideNavigationItem" },
  "ui5-side-navigation-sub-item": { module: "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js", name: "SideNavigationSubItem" },
  "ui5-side-navigation-group": { module: "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js", name: "SideNavigationGroup" },
  "ui5-timeline": { module: "@ui5/webcomponents-fiori/dist/Timeline.js", name: "Timeline" },
  "ui5-timeline-item": { module: "@ui5/webcomponents-fiori/dist/TimelineItem.js", name: "TimelineItem" },
  "ui5-timeline-group-item": { module: "@ui5/webcomponents-fiori/dist/TimelineGroupItem.js", name: "TimelineGroupItem" },
  "ui5-upload-collection": { module: "@ui5/webcomponents-fiori/dist/UploadCollection.js", name: "UploadCollection" },
  "ui5-upload-collection-item": { module: "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js", name: "UploadCollectionItem" },
  "ui5-user-menu": { module: "@ui5/webcomponents-fiori/dist/UserMenu.js", name: "UserMenu" },
  "ui5-user-menu-item": { module: "@ui5/webcomponents-fiori/dist/UserMenuItem.js", name: "UserMenuItem" },
  "ui5-user-menu-account": { module: "@ui5/webcomponents-fiori/dist/UserMenuAccount.js", name: "UserMenuAccount" },
  "ui5-user-settings-dialog": { module: "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js", name: "UserSettingsDialog" },
  "ui5-user-settings-item": { module: "@ui5/webcomponents-fiori/dist/UserSettingsItem.js", name: "UserSettingsItem" },
  "ui5-user-settings-view": { module: "@ui5/webcomponents-fiori/dist/UserSettingsView.js", name: "UserSettingsView" },
  "ui5-user-settings-account-view": { module: "@ui5/webcomponents-fiori/dist/UserSettingsAccountView.js", name: "UserSettingsAccountView" },
  "ui5-user-settings-appearance-view": { module: "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js", name: "UserSettingsAppearanceView" },
  "ui5-user-settings-appearance-view-group": { module: "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewGroup.js", name: "UserSettingsAppearanceViewGroup" },
  "ui5-user-settings-appearance-view-item": { module: "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js", name: "UserSettingsAppearanceViewItem" },
  "ui5-view-settings-dialog": { module: "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js", name: "ViewSettingsDialog" },
  "ui5-sort-item": { module: "@ui5/webcomponents-fiori/dist/SortItem.js", name: "SortItem" },
  "ui5-filter-item": { module: "@ui5/webcomponents-fiori/dist/FilterItem.js", name: "FilterItem" },
  "ui5-filter-item-option": { module: "@ui5/webcomponents-fiori/dist/FilterItemOption.js", name: "FilterItemOption" },
  "ui5-wizard": { module: "@ui5/webcomponents-fiori/dist/Wizard.js", name: "Wizard" },
  "ui5-wizard-step": { module: "@ui5/webcomponents-fiori/dist/WizardStep.js", name: "WizardStep" },
  "ui5-wizard-tab": { module: "@ui5/webcomponents-fiori/dist/WizardTab.js", name: "WizardTab" },

  // Compat package
  "ui5-table-column": { module: "@ui5/webcomponents-compat/dist/TableColumn.js", name: "TableColumn" },
  "ui5-table-row-compat": { module: "@ui5/webcomponents-compat/dist/TableRow.js", name: "TableRowCompat" },
  "ui5-table-cell-compat": { module: "@ui5/webcomponents-compat/dist/TableCell.js", name: "TableCellCompat" },
  "ui5-table-compat": { module: "@ui5/webcomponents-compat/dist/Table.js", name: "TableCompat" },
  "ui5-table-group-row": { module: "@ui5/webcomponents-compat/dist/TableGroupRow.js", name: "TableGroupRow" },

  // AI package
  "ui5-ai-button": { module: "@ui5/webcomponents-ai/dist/Button.js", name: "AIButton" },
  "ui5-ai-button-state": { module: "@ui5/webcomponents-ai/dist/ButtonState.js", name: "AIButtonState" },
  "ui5-ai-input": { module: "@ui5/webcomponents-ai/dist/Input.js", name: "AIInput" },
  "ui5-ai-textarea": { module: "@ui5/webcomponents-ai/dist/TextArea.js", name: "AITextArea" },
  "ui5-ai-prompt-input": { module: "@ui5/webcomponents-ai/dist/PromptInput.js", name: "AIPromptInput" },
};

// Boolean attributes that should be converted to boolean props
const booleanAttrs = [
  "disabled", "readonly", "required", "hidden", "checked", "selected", "pressed",
  "interactive", "sticky", "collapsed", "expanded", "indeterminate", "growing",
  "showColon", "wrappingType", "allowCustomValues", "noTypeahead", "loading",
  "noValidation", "valueStateMessage", "clearIcon", "showClearIcon", "showMoreColors",
  "showRecentColors", "showDefaultColor", "demandPopin"
];

// Event name mappings from HTML (ui5-xxx) to React (onXxx)
function convertEventName(htmlEventName) {
  // Remove "ui5-" prefix if present
  const eventName = htmlEventName.replace(/^ui5-/, "");
  // Convert kebab-case to PascalCase and add "on" prefix
  const pascalCase = eventName
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return `on${pascalCase}`;
}

// Extract HTML content between playground-fold markers
function extractSampleContent(html) {
  // Find content between <!-- playground-fold-end --> and <!-- playground-fold -->
  const startMarker = "<!-- playground-fold-end -->";
  const endMarker = "<!-- playground-fold -->";

  const startIdx = html.indexOf(startMarker);
  const endIdx = html.lastIndexOf(endMarker);

  if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) {
    // Fallback: extract body content
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      return bodyMatch[1].trim();
    }
    return html;
  }

  return html.slice(startIdx + startMarker.length, endIdx).trim();
}

// Parse main.js to find component imports, icon imports, and event handlers
function parseMainJS(jsContent) {
  const imports = [];
  const iconImports = [];
  const handlers = [];
  const elementHandlers = new Map(); // Map element ID to array of {eventName, handlerName}

  if (!jsContent) return { imports, iconImports, handlers, elementHandlers };

  // Find all imports
  const importRegex = /import\s+["']([^"']+)["']/g;
  let match;
  while ((match = importRegex.exec(jsContent)) !== null) {
    const importPath = match[1];
    imports.push(importPath);

    // Collect icon imports separately (icons, icons-tnt, icons-business-suite)
    if (importPath.includes("@ui5/webcomponents-icons")) {
      iconImports.push(importPath);
    }
  }

  // Find patterns like: document.getElementById("myBtn").addEventListener("click", handler)
  // or: const btn = document.getElementById("myBtn"); btn.addEventListener("click", handler);
  const getElementByIdRegex = /(?:const|let|var)\s+(\w+)\s*=\s*document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)/g;
  const elementVars = new Map(); // Map variable name to element ID
  while ((match = getElementByIdRegex.exec(jsContent)) !== null) {
    elementVars.set(match[1], match[2]);
  }

  // Helper to create unique handler name from element ID and event name
  const makeHandlerName = (elementId, eventName) => {
    // Convert element ID to PascalCase: "dialog-opener" -> "DialogOpener", "myBtn" -> "MyBtn"
    const idPart = elementId
      .split(/[-_]/)
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join("");
    // Convert event name to PascalCase: "click" -> "Click", "selection-change" -> "SelectionChange"
    const eventPart = eventName
      .split("-")
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join("");
    return `handle${idPart}${eventPart}`;
  };

  // Find direct getElementById().addEventListener patterns
  const directHandlerRegex = /document\.getElementById\s*\(\s*["']([^"']+)["']\s*\)\s*\.addEventListener\s*\(\s*["']([^"']+)["']\s*,\s*(?:function\s*\([^)]*\)\s*\{([^}]*)\}|(\w+))/g;
  while ((match = directHandlerRegex.exec(jsContent)) !== null) {
    const elementId = match[1];
    const eventName = match[2];
    const inlineBody = match[3];
    const handlerRef = match[4];

    // Only wire up handlers with inline bodies - skip external function references
    // (we can't reliably extract external function dependencies)
    if (!inlineBody && handlerRef) {
      continue;
    }

    const handlerName = makeHandlerName(elementId, eventName);

    if (!elementHandlers.has(elementId)) {
      elementHandlers.set(elementId, []);
    }
    elementHandlers.get(elementId).push({ eventName, handlerName });

    if (inlineBody) {
      handlers.push({ eventName, handlerName, body: inlineBody.trim() });
    }
  }

  // Find variable.addEventListener patterns (including direct ID references like colorPaletteBtn.addEventListener)
  // This handles both: 1) variables from getElementById, 2) direct ID references (browser auto-exposes IDs as globals)
  const varHandlerRegex = /(\w+)\.addEventListener\s*\(\s*["']([^"']+)["']\s*,\s*(?:function\s*\([^)]*\)\s*\{([\s\S]*?)\}|(\([^)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>\s*\{([\s\S]*?)\}|(\w+))/g;
  while ((match = varHandlerRegex.exec(jsContent)) !== null) {
    const varName = match[1];
    const eventName = match[2];
    const inlineBody = match[3] || match[5]; // function body or arrow body
    const handlerRef = match[6];

    // Skip if var is "document" (already handled above)
    if (varName === "document") continue;

    // Only wire up handlers with inline bodies - skip external function references
    // (we can't reliably extract external function dependencies)
    if (!inlineBody && handlerRef) {
      continue;
    }

    // The element ID is either from a variable mapping or the varName itself (direct ID reference)
    const elementId = elementVars.get(varName) || varName;

    const handlerName = makeHandlerName(elementId, eventName);

    if (!elementHandlers.has(elementId)) {
      elementHandlers.set(elementId, []);
    }
    elementHandlers.get(elementId).push({ eventName, handlerName });

    if (inlineBody) {
      handlers.push({ eventName, handlerName, body: inlineBody.trim() });
    }
  }

  return { imports, iconImports, handlers, elementHandlers };
}

// Convert HTML attributes to JSX props
function convertAttributes(attrsString, tagName) {
  if (!attrsString || !attrsString.trim()) return "";

  const result = [];

  // First, extract and preserve any already-converted JSX attributes like style={{ ... }}
  const jsxAttrRegex = /(\w+)=(\{\{[^}]*\}\}|\{[^}]+\})/g;
  const jsxAttrs = [];
  let jsxMatch;
  while ((jsxMatch = jsxAttrRegex.exec(attrsString)) !== null) {
    jsxAttrs.push({ name: jsxMatch[1], value: jsxMatch[2], full: jsxMatch[0] });
  }

  // Remove JSX attributes from the string before processing HTML attributes
  let cleanedAttrs = attrsString;
  for (const attr of jsxAttrs) {
    cleanedAttrs = cleanedAttrs.replace(attr.full, '');
    result.push(`${attr.name}=${attr.value}`);
  }

  // Match HTML attributes: name="value", name='value', or just name (boolean)
  const attrRegex = /([a-zA-Z_][a-zA-Z0-9_\-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g;
  let match;

  while ((match = attrRegex.exec(cleanedAttrs)) !== null) {
    const name = match[1];
    const value = match[2] !== undefined ? match[2] : match[3];

    // Skip class (handled separately) and certain HTML-only attributes
    if (name === "class") continue;
    if (name === "style") continue; // style is converted separately in htmlToJsx
    if (name === "xmlns" || name.startsWith("xmlns:")) continue;

    // Convert attribute name
    let propName = name;

    // Convert data-* attributes
    if (name.startsWith("data-")) {
      propName = name; // Keep as-is in React
    }
    // Convert common HTML attributes to React equivalents
    else if (name === "for") {
      propName = "htmlFor";
    }
    else if (name === "tabindex") {
      propName = "tabIndex";
    }
    else if (name === "colspan") {
      propName = "colSpan";
    }
    else if (name === "rowspan") {
      propName = "rowSpan";
    }
    else if (name === "maxlength") {
      propName = "maxLength";
    }
    else if (name === "minlength") {
      propName = "minLength";
    }
    else if (name === "autocomplete") {
      propName = "autoComplete";
    }
    else if (name === "autofocus") {
      propName = "autoFocus";
    }

    // Determine if this is a boolean attribute
    const isBoolean = booleanAttrs.includes(name) || value === undefined;

    if (isBoolean && value === undefined) {
      // Boolean attribute without value: disabled -> disabled={true}
      result.push(`${propName}={true}`);
    }
    else if (isBoolean && (value === "" || value === "true" || value === name)) {
      // Boolean attribute with empty value or "true": disabled="" -> disabled={true}
      result.push(`${propName}={true}`);
    }
    else if (isBoolean && value === "false") {
      // Explicit false
      result.push(`${propName}={false}`);
    }
    else if (/^\d+$/.test(value)) {
      // Numeric value
      result.push(`${propName}={${value}}`);
    }
    else if (value !== undefined) {
      // String value - escape quotes
      const escapedValue = value.replace(/"/g, '\\"');
      result.push(`${propName}="${escapedValue}"`);
    }
  }

  return result.join(" ");
}

// Parse CSS and extract styles for UI5 components
function parseCSS(css) {
  const componentStyles = new Map();
  if (!css) return componentStyles;

  // Simple CSS parser - handles basic selectors like "ui5-card { ... }" or ".class { ... }"
  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;

  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    const declarations = match[2].trim();

    // Only handle simple tag selectors for UI5 components
    if (selector.startsWith("ui5-") && !selector.includes(" ") && !selector.includes(".") && !selector.includes(":")) {
      const styles = {};
      declarations.split(";").forEach(decl => {
        const [prop, val] = decl.split(":").map(x => x.trim());
        if (prop && val) {
          // Convert kebab-case to camelCase
          const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          styles[camelProp] = val;
        }
      });
      componentStyles.set(selector, styles);
    }
  }

  return componentStyles;
}

// Apply CSS styles to JSX
function applyCSSStyles(jsx, componentStyles, usedComponents) {
  if (componentStyles.size === 0) return jsx;

  for (const [tag, mapping] of usedComponents) {
    const styles = componentStyles.get(tag);
    if (!styles) continue;

    // Build style object string
    const styleEntries = Object.entries(styles)
      .map(([prop, val]) => {
        const numericValue = /^-?\d+(\.\d+)?$/.test(val) ? val : `"${val}"`;
        return `${prop}: ${numericValue}`;
      });
    const styleStr = styleEntries.join(", ");

    // Find component tags and add/merge style prop
    const componentRegex = new RegExp(`<${mapping.name}(\\s[^>]*)?>`, "g");
    jsx = jsx.replace(componentRegex, (match, attrs) => {
      attrs = attrs || "";

      // Check if style already exists
      const existingStyleMatch = attrs.match(/style=\{\{([^}]+)\}\}/);
      if (existingStyleMatch) {
        // Merge styles - existing styles take precedence
        const existingStyles = existingStyleMatch[1];
        const mergedStyle = `style={{ ${styleStr}, ${existingStyles} }}`;
        attrs = attrs.replace(/style=\{\{[^}]+\}\}/, mergedStyle);
        return `<${mapping.name}${attrs}>`;
      } else {
        // Add new style
        return `<${mapping.name} style={{ ${styleStr} }}${attrs}>`;
      }
    });
  }

  return jsx;
}

// Convert HTML to JSX
function htmlToJsx(html, usedComponents, elementHandlers = new Map()) {
  let jsx = html;

  // Step 1: Convert class to className for all elements
  jsx = jsx.replace(/\bclass=/g, "className=");

  // Step 2: Convert style strings to objects
  jsx = jsx.replace(/style="([^"]+)"/g, (match, styleStr) => {
    const styles = styleStr.split(";")
      .filter(s => s.trim())
      .map(s => {
        const [prop, val] = s.split(":").map(x => x.trim());
        if (!prop || val === undefined) return null;
        // Convert kebab-case to camelCase
        const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        // Handle numeric values
        const numericValue = /^-?\d+(\.\d+)?$/.test(val) ? val : `"${val}"`;
        return `${camelProp}: ${numericValue}`;
      })
      .filter(Boolean);
    return `style={{ ${styles.join(", ")} }}`;
  });

  // Step 3: Convert self-closing HTML void elements BEFORE UI5 tag conversion
  // This must happen before step 4 because component names like "Link" or "ColorPalette"
  // could match HTML void elements like "link" or "col" (case-insensitive)
  jsx = jsx.replace(/<(img|input|hr|meta|link|area|base|col|embed|param|source|track|wbr)(?=\s|>)([^>]*?)(?<!\/)>/gi,
    (match, tag, attrs) => `<${tag}${attrs} />`);

  // Step 4: Convert <br> to <br />
  jsx = jsx.replace(/<br\s*>/gi, "<br />");
  jsx = jsx.replace(/<br\s*\/?\s*>/gi, "<br />");

  // Step 5: Convert UI5 component tags
  const tagRegex = /<(ui5-[a-z0-9-]+)([^>]*?)(\s*\/?)>/gi;

  jsx = jsx.replace(tagRegex, (match, tagName, attrsStr, selfClose) => {
    const lowerTag = tagName.toLowerCase();
    const mapping = componentMappings[lowerTag];

    if (!mapping) {
      console.warn(`Warning: Unknown component tag: ${tagName}`);
      return match;
    }

    usedComponents.set(lowerTag, mapping);
    let convertedAttrs = convertAttributes(attrsStr, lowerTag);

    // Check if this element has an ID and event handlers
    const idMatch = attrsStr.match(/\bid\s*=\s*["']([^"']+)["']/);
    if (idMatch) {
      const elementId = idMatch[1];
      const handlers = elementHandlers.get(elementId);
      if (handlers && handlers.length > 0) {
        // Add event handler props
        for (const { eventName, handlerName } of handlers) {
          // Convert event name to React prop: click -> onClick, selection-change -> onSelectionChange
          const reactEventName = "on" + eventName
            .split("-")
            .map((part, i) => part.charAt(0).toUpperCase() + part.slice(1))
            .join("");
          convertedAttrs += ` ${reactEventName}={${handlerName}}`;
        }
      }
    }

    const propsStr = convertedAttrs ? ` ${convertedAttrs}` : "";

    // Keep the self-closing nature
    return `<${mapping.name}${propsStr}${selfClose}>`;
  });

  // Step 6: Convert closing tags
  for (const [tag, mapping] of usedComponents) {
    const closeRegex = new RegExp(`</${tag}>`, "gi");
    jsx = jsx.replace(closeRegex, `</${mapping.name}>`);
  }

  // Step 7: Convert truly empty elements to self-closing
  // This regex matches opening and closing tags with ONLY whitespace between them
  for (const [tag, mapping] of usedComponents) {
    // Match: <Component attrs></Component> or <Component attrs>  </Component> (only whitespace)
    const emptyRegex = new RegExp(`<${mapping.name}([^>]*)>\\s*</${mapping.name}>`, "g");
    jsx = jsx.replace(emptyRegex, `<${mapping.name}$1 />`);
  }

  // Step 8: Fix image paths - convert relative ../assets/images to /images
  // Handle various attribute names (src, logo, avatarSrc, etc.)
  jsx = jsx.replace(/"\.\.\/assets\/images\//g, '"/images/');

  return jsx;
}

// Generate React component from sample
function generateReactSample(sampleDir) {
  const htmlPath = path.join(sampleDir, "sample.html");
  const jsPath = path.join(sampleDir, "main.js");
  const cssPath = path.join(sampleDir, "main.css");
  const tsxPath = path.join(sampleDir, "sample.tsx");

  // Check if tsx already exists and we're not overwriting
  if (fs.existsSync(tsxPath) && !overwrite) {
    return { skipped: true };
  }

  // Read HTML
  if (!fs.existsSync(htmlPath)) {
    return { error: "No sample.html found" };
  }
  const html = fs.readFileSync(htmlPath, "utf-8");

  // Read JS (optional)
  const js = fs.existsSync(jsPath) ? fs.readFileSync(jsPath, "utf-8") : "";

  // Read CSS (optional)
  const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf-8") : "";

  // Extract sample content
  const sampleContent = extractSampleContent(html);

  // Parse JS for handlers and icon imports FIRST (need elementHandlers for JSX conversion)
  const { handlers, iconImports, elementHandlers } = parseMainJS(js);

  // Track used components
  const usedComponents = new Map();

  // Convert to JSX, passing elementHandlers to inject event props
  let jsxContent = htmlToJsx(sampleContent, usedComponents, elementHandlers);

  // Parse CSS and apply styles to components
  const componentStyles = parseCSS(css);
  jsxContent = applyCSSStyles(jsxContent, componentStyles, usedComponents);

  // Generate imports
  const imports = ['import { createReactComponent } from "@ui5/webcomponents-base";'];
  const componentDecls = [];

  // Sort components by module to group imports
  const sortedComponents = [...usedComponents.entries()].sort((a, b) =>
    a[1].module.localeCompare(b[1].module)
  );

  for (const [tag, mapping] of sortedComponents) {
    imports.push(`import ${mapping.name}Class from "${mapping.module}";`);
    componentDecls.push(`const ${mapping.name} = createReactComponent(${mapping.name}Class);`);
  }

  // Add icon imports (these are side-effect imports, no named export)
  for (const iconImport of iconImports) {
    imports.push(`import "${iconImport}";`);
  }

  // Check if we need useRef (for refs in handlers)
  const needsRef = js.includes("getElementById") || js.includes("querySelector");
  const needsState = js.includes("useState") || handlers.some(h => h.body && h.body.includes("="));

  // Build the React component
  let sample = imports.join("\n");
  sample += "\n\n";
  sample += componentDecls.join("\n");
  sample += "\n\n";
  sample += "function App() {\n";

  // Add handler functions if any
  for (const handler of handlers) {
    if (handler.body) {
      // Check if handler body uses event parameter
      const usesEvent = /\bevent\b|\be\.|\bevent\./.test(handler.body);
      const eventParam = usesEvent ? "(e)" : "()";
      // Replace 'event' with 'e' for consistency
      let body = handler.body.replace(/\bevent\b/g, "e");
      sample += `\n  const ${handler.handlerName} = ${eventParam} => {\n`;
      sample += `    ${body}\n`;
      sample += `  };\n`;
    }
  }

  // Determine if we need a fragment wrapper
  const trimmedJsx = jsxContent.trim();
  const hasMultipleRoots = (trimmedJsx.match(/^<[^/]/gm) || []).length > 1 ||
                          trimmedJsx.split("\n").filter(l => l.trim().match(/^<[a-zA-Z]/)).length > 1;

  sample += "\n  return (\n";
  if (hasMultipleRoots) {
    sample += "    <>\n";
    sample += `      ${jsxContent.split("\n").map(l => l.trim() ? "    " + l : l).join("\n").trim()}\n`;
    sample += "    </>\n";
  } else {
    sample += `    ${jsxContent.trim()}\n`;
  }
  sample += "  );\n";
  sample += "}\n\n";
  sample += "export default App;\n";

  return { content: sample, usedComponents: sortedComponents };
}

// Find all sample directories
function findSampleDirs(baseDir) {
  const dirs = [];

  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    // Check if this directory has sample.html
    if (entries.some(e => e.name === "sample.html")) {
      dirs.push(dir);
    }

    // Recurse into subdirectories
    for (const entry of entries) {
      if (entry.isDirectory()) {
        scan(path.join(dir, entry.name));
      }
    }
  }

  scan(baseDir);
  return dirs;
}

// Main execution
console.log("Generating React samples...\n");

const packageDirs = ["main", "fiori", "ai", "compat", "patterns"];
let generated = 0;
let skipped = 0;
let errors = 0;

for (const pkg of packageDirs) {
  const pkgDir = path.join(samplesDir, pkg);
  if (!fs.existsSync(pkgDir)) continue;

  const sampleDirs = findSampleDirs(pkgDir);

  for (const sampleDir of sampleDirs) {
    // Apply filter if specified
    if (filterComponent) {
      const relativePath = path.relative(pkgDir, sampleDir);
      if (!relativePath.toLowerCase().includes(filterComponent.toLowerCase())) {
        continue;
      }
    }

    const relativePath = path.relative(samplesDir, sampleDir);
    const result = generateReactSample(sampleDir);

    if (result.skipped) {
      skipped++;
    } else if (result.error) {
      console.error(`Error in ${relativePath}: ${result.error}`);
      errors++;
    } else {
      const tsxPath = path.join(sampleDir, "sample.tsx");
      fs.writeFileSync(tsxPath, result.content);
      console.log(`Generated: ${relativePath}/sample.tsx`);
      generated++;
    }
  }
}

console.log(`\nDone! Generated: ${generated}, Skipped: ${skipped}, Errors: ${errors}`);
