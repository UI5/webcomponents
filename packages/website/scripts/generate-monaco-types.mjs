/**
 * This script generates Monaco Editor type definitions from UI5 Web Components.
 * It extracts ALL properties and events from each component's .d.ts file
 * by parsing the class declarations directly.
 *
 * Usage: node scripts/generate-monaco-types.mjs
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache for enum values - maps enum name to array of values
const enumCache = new Map();

/**
 * Extract enum values from a TypeScript enum file
 */
function extractEnumValues(enumName, packagesDir) {
  if (enumCache.has(enumName)) {
    return enumCache.get(enumName);
  }

  // Search for enum in main, fiori, ai, and base packages
  const searchPaths = [
    path.join(packagesDir, "main", "src", "types", `${enumName}.ts`),
    path.join(packagesDir, "fiori", "src", "types", `${enumName}.ts`),
    path.join(packagesDir, "ai", "src", "types", `${enumName}.ts`),
    path.join(packagesDir, "base", "src", "types", `${enumName}.ts`),
  ];

  for (const enumPath of searchPaths) {
    if (fs.existsSync(enumPath)) {
      const content = fs.readFileSync(enumPath, "utf-8");
      // Match enum values: EnumValue = "value" or EnumValue = "value",
      const valueMatches = content.matchAll(/^\s*([A-Za-z][A-Za-z0-9]*)\s*=\s*["']([^"']+)["']/gm);
      const values = [];
      for (const match of valueMatches) {
        values.push(match[2]); // The string value
      }
      if (values.length > 0) {
        enumCache.set(enumName, values);
        return values;
      }
    }
  }

  enumCache.set(enumName, null);
  return null;
}

// Will be set in main()
let packagesDir = null;

// Components to generate types for
const COMPONENTS = [
  // main package
  { name: "Button", package: "main", tag: "ui5-button" },
  { name: "ButtonBadge", package: "main", tag: "ui5-button-badge" },
  { name: "Input", package: "main", tag: "ui5-input" },
  { name: "Label", package: "main", tag: "ui5-label" },
  { name: "Link", package: "main", tag: "ui5-link" },
  { name: "CheckBox", package: "main", tag: "ui5-checkbox" },
  { name: "Switch", package: "main", tag: "ui5-switch" },
  { name: "Card", package: "main", tag: "ui5-card" },
  { name: "CardHeader", package: "main", tag: "ui5-card-header" },
  { name: "Tag", package: "main", tag: "ui5-tag" },
  { name: "Menu", package: "main", tag: "ui5-menu" },
  { name: "MenuItem", package: "main", tag: "ui5-menu-item" },
  { name: "MenuSeparator", package: "main", tag: "ui5-menu-separator" },
  { name: "MenuItemGroup", package: "main", tag: "ui5-menu-item-group" },
  { name: "Select", package: "main", tag: "ui5-select" },
  { name: "Option", package: "main", tag: "ui5-option" },
  { name: "OptionCustom", package: "main", tag: "ui5-option-custom" },
  { name: "List", package: "main", tag: "ui5-list" },
  { name: "ListItemStandard", package: "main", tag: "ui5-li" },
  { name: "ListItemCustom", package: "main", tag: "ui5-li-custom" },
  { name: "ListItemGroup", package: "main", tag: "ui5-li-group" },
  { name: "Dialog", package: "main", tag: "ui5-dialog" },
  { name: "Icon", package: "main", tag: "ui5-icon" },
  { name: "Avatar", package: "main", tag: "ui5-avatar" },
  { name: "AvatarGroup", package: "main", tag: "ui5-avatar-group" },
  { name: "AvatarBadge", package: "main", tag: "ui5-avatar-badge" },
  { name: "DatePicker", package: "main", tag: "ui5-date-picker" },
  { name: "TimePicker", package: "main", tag: "ui5-time-picker" },
  { name: "DateTimePicker", package: "main", tag: "ui5-datetime-picker" },
  { name: "DateRangePicker", package: "main", tag: "ui5-daterange-picker" },
  { name: "DynamicDateRange", package: "main", tag: "ui5-dynamic-date-range" },
  { name: "TextArea", package: "main", tag: "ui5-textarea" },
  { name: "RadioButton", package: "main", tag: "ui5-radio-button" },
  { name: "ProgressIndicator", package: "main", tag: "ui5-progress-indicator" },
  { name: "RatingIndicator", package: "main", tag: "ui5-rating-indicator" },
  { name: "Slider", package: "main", tag: "ui5-slider" },
  { name: "RangeSlider", package: "main", tag: "ui5-range-slider" },
  { name: "StepInput", package: "main", tag: "ui5-step-input" },
  { name: "Popover", package: "main", tag: "ui5-popover" },
  { name: "ResponsivePopover", package: "main", tag: "ui5-responsive-popover" },
  { name: "Toast", package: "main", tag: "ui5-toast" },
  { name: "MessageStrip", package: "main", tag: "ui5-message-strip" },
  { name: "BusyIndicator", package: "main", tag: "ui5-busy-indicator" },
  { name: "TabContainer", package: "main", tag: "ui5-tabcontainer" },
  { name: "Tab", package: "main", tag: "ui5-tab" },
  { name: "TabSeparator", package: "main", tag: "ui5-tab-separator" },
  { name: "Table", package: "main", tag: "ui5-table" },
  { name: "TableHeaderRow", package: "main", tag: "ui5-table-header-row" },
  { name: "TableHeaderCell", package: "main", tag: "ui5-table-header-cell" },
  { name: "TableRow", package: "main", tag: "ui5-table-row" },
  { name: "TableCell", package: "main", tag: "ui5-table-cell" },
  { name: "TableGrowing", package: "main", tag: "ui5-table-growing" },
  { name: "TableSelection", package: "main", tag: "ui5-table-selection" },
  { name: "Tree", package: "main", tag: "ui5-tree" },
  { name: "TreeItem", package: "main", tag: "ui5-tree-item" },
  { name: "TreeItemCustom", package: "main", tag: "ui5-tree-item-custom" },
  { name: "Panel", package: "main", tag: "ui5-panel" },
  { name: "Toolbar", package: "main", tag: "ui5-toolbar" },
  { name: "ToolbarButton", package: "main", tag: "ui5-toolbar-button" },
  { name: "ToolbarSpacer", package: "main", tag: "ui5-toolbar-spacer" },
  { name: "ToolbarSeparator", package: "main", tag: "ui5-toolbar-separator" },
  { name: "ToolbarSelect", package: "main", tag: "ui5-toolbar-select" },
  { name: "ToolbarSelectOption", package: "main", tag: "ui5-toolbar-select-option" },
  { name: "SegmentedButton", package: "main", tag: "ui5-segmented-button" },
  { name: "SegmentedButtonItem", package: "main", tag: "ui5-segmented-button-item" },
  { name: "ComboBox", package: "main", tag: "ui5-combobox" },
  { name: "ComboBoxItem", package: "main", tag: "ui5-cb-item" },
  { name: "ComboBoxItemGroup", package: "main", tag: "ui5-cb-item-group" },
  { name: "MultiComboBox", package: "main", tag: "ui5-multi-combobox" },
  { name: "MultiComboBoxItem", package: "main", tag: "ui5-mcb-item" },
  { name: "MultiComboBoxItemGroup", package: "main", tag: "ui5-mcb-item-group" },
  { name: "Token", package: "main", tag: "ui5-token" },
  { name: "Tokenizer", package: "main", tag: "ui5-tokenizer" },
  { name: "MultiInput", package: "main", tag: "ui5-multi-input" },
  { name: "Breadcrumbs", package: "main", tag: "ui5-breadcrumbs" },
  { name: "BreadcrumbsItem", package: "main", tag: "ui5-breadcrumbs-item" },
  { name: "Calendar", package: "main", tag: "ui5-calendar" },
  { name: "CalendarLegend", package: "main", tag: "ui5-calendar-legend" },
  { name: "CalendarLegendItem", package: "main", tag: "ui5-calendar-legend-item" },
  { name: "SpecialCalendarDate", package: "main", tag: "ui5-special-date" },
  { name: "ColorPicker", package: "main", tag: "ui5-color-picker" },
  { name: "ColorPalette", package: "main", tag: "ui5-color-palette" },
  { name: "ColorPaletteItem", package: "main", tag: "ui5-color-palette-item" },
  { name: "ColorPalettePopover", package: "main", tag: "ui5-color-palette-popover" },
  { name: "FileUploader", package: "main", tag: "ui5-file-uploader" },
  { name: "SplitButton", package: "main", tag: "ui5-split-button" },
  { name: "Title", package: "main", tag: "ui5-title" },
  { name: "Text", package: "main", tag: "ui5-text" },
  { name: "ExpandableText", package: "main", tag: "ui5-expandable-text" },
  { name: "SuggestionItem", package: "main", tag: "ui5-suggestion-item" },
  { name: "SuggestionItemCustom", package: "main", tag: "ui5-suggestion-item-custom" },
  { name: "SuggestionGroupItem", package: "main", tag: "ui5-suggestion-item-group" },
  { name: "Carousel", package: "main", tag: "ui5-carousel" },
  { name: "ToggleButton", package: "main", tag: "ui5-toggle-button" },
  { name: "Form", package: "main", tag: "ui5-form" },
  { name: "FormItem", package: "main", tag: "ui5-form-item" },
  { name: "FormGroup", package: "main", tag: "ui5-form-group" },
  { name: "Bar", package: "main", tag: "ui5-bar" },
  // fiori package
  { name: "ShellBar", package: "fiori", tag: "ui5-shellbar" },
  { name: "ShellBarItem", package: "fiori", tag: "ui5-shellbar-item" },
  { name: "SideNavigation", package: "fiori", tag: "ui5-side-navigation" },
  { name: "SideNavigationItem", package: "fiori", tag: "ui5-side-navigation-item" },
  { name: "SideNavigationSubItem", package: "fiori", tag: "ui5-side-navigation-sub-item" },
  { name: "SideNavigationGroup", package: "fiori", tag: "ui5-side-navigation-group" },
  { name: "NotificationList", package: "fiori", tag: "ui5-notification-list" },
  { name: "NotificationListItem", package: "fiori", tag: "ui5-li-notification" },
  { name: "NotificationListGroupItem", package: "fiori", tag: "ui5-li-notification-group" },
  { name: "UploadCollection", package: "fiori", tag: "ui5-upload-collection" },
  { name: "UploadCollectionItem", package: "fiori", tag: "ui5-upload-collection-item" },
  { name: "Wizard", package: "fiori", tag: "ui5-wizard" },
  { name: "WizardStep", package: "fiori", tag: "ui5-wizard-step" },
  { name: "IllustratedMessage", package: "fiori", tag: "ui5-illustrated-message" },
  { name: "Timeline", package: "fiori", tag: "ui5-timeline" },
  { name: "TimelineItem", package: "fiori", tag: "ui5-timeline-item" },
  { name: "TimelineGroupItem", package: "fiori", tag: "ui5-timeline-group-item" },
  { name: "Page", package: "fiori", tag: "ui5-page" },
  { name: "DynamicPage", package: "fiori", tag: "ui5-dynamic-page" },
  { name: "DynamicPageTitle", package: "fiori", tag: "ui5-dynamic-page-title" },
  { name: "DynamicPageHeader", package: "fiori", tag: "ui5-dynamic-page-header" },
  { name: "DynamicSideContent", package: "fiori", tag: "ui5-dynamic-side-content" },
  { name: "FlexibleColumnLayout", package: "fiori", tag: "ui5-flexible-column-layout" },
  { name: "MediaGallery", package: "fiori", tag: "ui5-media-gallery" },
  { name: "MediaGalleryItem", package: "fiori", tag: "ui5-media-gallery-item" },
  { name: "ProductSwitch", package: "fiori", tag: "ui5-product-switch" },
  { name: "ProductSwitchItem", package: "fiori", tag: "ui5-product-switch-item" },
  { name: "ViewSettingsDialog", package: "fiori", tag: "ui5-view-settings-dialog" },
  { name: "SortItem", package: "fiori", tag: "ui5-sort-item" },
  { name: "FilterItem", package: "fiori", tag: "ui5-filter-item" },
  { name: "FilterItemOption", package: "fiori", tag: "ui5-filter-item-option" },
  { name: "Search", package: "fiori", tag: "ui5-search" },
  { name: "SearchItem", package: "fiori", tag: "ui5-search-item" },
  { name: "SearchMessageArea", package: "fiori", tag: "ui5-search-message-area" },
  { name: "UserMenu", package: "fiori", tag: "ui5-user-menu" },
  { name: "UserMenuItem", package: "fiori", tag: "ui5-user-menu-item" },
  { name: "UserMenuAccount", package: "fiori", tag: "ui5-user-menu-account" },
  { name: "BarcodeScannerDialog", package: "fiori", tag: "ui5-barcode-scanner-dialog" },
  // ai package - these extend base components, so we inherit their props
  { name: "AIButton", package: "ai", tag: "ui5-ai-button", className: "Button", extends: "Button" },
  { name: "AIButtonState", package: "ai", tag: "ui5-ai-button-state", className: "ButtonState" },
  { name: "AIInput", package: "ai", tag: "ui5-ai-input", className: "Input", extends: "Input" },
  { name: "AITextArea", package: "ai", tag: "ui5-ai-textarea", className: "TextArea", extends: "TextArea" },
  { name: "AIPromptInput", package: "ai", tag: "ui5-ai-prompt-input", className: "PromptInput", extends: "Input" },
];

// Base class definitions - these are parsed once and reused
const baseClassProps = new Map();

/**
 * Parse a base class .d.ts file and cache its properties
 */
function parseBaseClass(baseClassName, packagesDir) {
  if (baseClassProps.has(baseClassName)) {
    return baseClassProps.get(baseClassName);
  }

  // Search paths for base classes
  const searchPaths = [
    path.join(packagesDir, "main", "dist", `${baseClassName}.d.ts`),
    path.join(packagesDir, "fiori", "dist", `${baseClassName}.d.ts`),
    path.join(packagesDir, "ai", "dist", `${baseClassName}.d.ts`),
    path.join(packagesDir, "base", "dist", `${baseClassName}.d.ts`),
  ];

  for (const basePath of searchPaths) {
    if (fs.existsSync(basePath)) {
      const content = fs.readFileSync(basePath, "utf-8");
      const result = parseDeclarationFile(content, baseClassName, packagesDir, false);
      baseClassProps.set(baseClassName, result.properties);
      return result.properties;
    }
  }

  baseClassProps.set(baseClassName, []);
  return [];
}

/**
 * Parse a .d.ts file to extract ALL public properties and events from the class
 */
function parseDeclarationFile(dtsContent, componentName, packagesDir = null, includeInherited = true) {
  const properties = [];
  const events = [];

  // Find the class declaration block - handle extends and implements
  const classStartRegex = new RegExp(`declare (?:abstract )?class ${componentName}(?:\\s+extends\\s+([A-Za-z0-9_]+))?[^{]*\\{`);
  const classStartMatch = dtsContent.match(classStartRegex);

  if (!classStartMatch) {
    return { properties, events };
  }

  // Extract base class name if present
  const baseClassName = classStartMatch[1];

  // If we should include inherited props and there's a base class, parse it first
  if (includeInherited && baseClassName && packagesDir) {
    // Skip UI5Element as it's too generic
    if (baseClassName !== "UI5Element" && baseClassName !== "HTMLElement") {
      const inheritedProps = parseBaseClass(baseClassName, packagesDir);
      for (const prop of inheritedProps) {
        properties.push({ ...prop, inherited: true });
      }
    }
  }

  if (!classStartMatch) {
    return { properties, events };
  }

  // Find the matching closing brace by counting braces
  const startIndex = classStartMatch.index + classStartMatch[0].length;
  let braceCount = 1;
  let endIndex = startIndex;

  for (let i = startIndex; i < dtsContent.length && braceCount > 0; i++) {
    if (dtsContent[i] === '{') braceCount++;
    if (dtsContent[i] === '}') braceCount--;
    endIndex = i;
  }

  const classBody = dtsContent.substring(startIndex, endIndex);

  // Extract eventDetails to get event names
  // Match eventDetails: { ... } or eventDetails: ParentType["eventDetails"] & { ... }
  const eventDetailsMatch = classBody.match(/eventDetails\s*:[^{]*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/);
  if (eventDetailsMatch) {
    const eventBody = eventDetailsMatch[1];
    // Match event names (kebab-case strings in quotes or simple identifiers)
    const eventMatches = eventBody.matchAll(/["']?([a-z][a-z0-9-]*)["']?\s*:/gi);
    for (const match of eventMatches) {
      const eventName = match[1];
      // Skip internal events starting with _
      if (!eventName.startsWith('_')) {
        events.push({ name: eventName });
      }
    }
  }

  // Extract ALL property declarations with JSDoc comments marked as @public
  // Pattern: /** ... @public ... */ propertyName: type; or propertyName?: type;
  const publicPropRegex = /\/\*\*[\s\S]*?@public[\s\S]*?\*\/\s*\n\s*([a-zA-Z][a-zA-Z0-9]*)(\??)\s*:\s*([^;]+);/g;

  let match;
  while ((match = publicPropRegex.exec(classBody)) !== null) {
    const propName = match[1];
    const optional = match[2] === "?";
    let propType = match[3].trim();

    // Skip internal/private properties and complex types
    if (propName.startsWith("_") ||
        propName === "eventDetails" ||
        propType.includes("I18nBundle") ||
        propType.includes("Map<") ||
        propType.includes("Promise<")) {
      continue;
    }

    properties.push({
      name: propName,
      type: propType,
      optional: optional || propType.includes("undefined"),
    });
  }

  // Extract getter/setter properties with JSDoc @public
  // Pattern: /** ... @public ... */ set propertyName(value: type); get propertyName(): type;
  const getterSetterRegex = /\/\*\*[\s\S]*?@public[\s\S]*?\*\/\s*\n\s*set\s+([a-zA-Z][a-zA-Z0-9]*)\s*\(\s*\w+\s*:\s*([^)]+)\)/g;
  while ((match = getterSetterRegex.exec(classBody)) !== null) {
    const propName = match[1];
    let propType = match[2].trim();

    // Skip if already added or internal
    if (properties.some(p => p.name === propName) || propName.startsWith("_")) {
      continue;
    }

    properties.push({
      name: propName,
      type: propType,
      optional: true,
    });
  }

  // Also extract simple property declarations without JSDoc but that look like public props
  // These are properties declared as: propertyName: type; (without _ prefix, not methods)
  const simplePropRegex = /^\s{4}([a-z][a-zA-Z0-9]*)(\??):\s*([^;(]+);/gm;
  while ((match = simplePropRegex.exec(classBody)) !== null) {
    const propName = match[1];
    const optional = match[2] === "?";
    let propType = match[3].trim();

    // Skip if already added, internal, or complex types
    if (properties.some(p => p.name === propName) ||
        propName.startsWith("_") ||
        propType.includes("I18nBundle") ||
        propType.includes("Map<") ||
        propType.includes("Promise<") ||
        propType.includes("=>") ||
        propType.includes("(")) {
      continue;
    }

    // Check if the previous line has @private or @internal
    const propIndex = classBody.indexOf(match[0]);
    const prevContent = classBody.substring(Math.max(0, propIndex - 200), propIndex);
    if (prevContent.includes("@private") || prevContent.includes("@internal")) {
      continue;
    }

    properties.push({
      name: propName,
      type: propType,
      optional: optional || propType.includes("undefined"),
    });
  }

  // Extract slot names from Slot<T> and DefaultSlot<T> declarations
  const slots = [];
  const slotRegex = /^\s{4}([a-z][a-zA-Z0-9]*)(?:\??):\s*(Default)?Slot<[^>]+>/gm;
  while ((match = slotRegex.exec(classBody)) !== null) {
    const slotName = match[1];
    const isDefault = match[2] === "Default";
    slots.push({
      name: slotName,
      isDefault,
    });
  }

  return { properties, events, slots };
}

/**
 * Convert TypeScript type to Monaco-friendly type
 */
function convertType(typeStr) {
  // Handle template literal types like `${ButtonDesign}`
  const templateMatch = typeStr.match(/`\$\{([A-Za-z]+)\}`/);
  if (templateMatch) {
    const enumName = templateMatch[1];
    // Try to get actual enum values
    const enumValues = extractEnumValues(enumName, packagesDir);
    if (enumValues && enumValues.length > 0) {
      return enumValues.map(v => `"${v}"`).join(" | ");
    }
    return "string";
  }

  // Handle Array<HTMLElement> and similar - these are slots
  if (typeStr.includes("Array<") &&
      (typeStr.includes("HTMLElement") || typeStr.includes("Item") || typeStr.includes("Element"))) {
    return "React.ReactNode";
  }

  // Handle Slot types
  if (typeStr.startsWith("Slot<") || typeStr.startsWith("DefaultSlot<")) {
    return "React.ReactNode";
  }

  // Handle union types with undefined
  if (typeStr.includes(" | undefined")) {
    return typeStr.replace(" | undefined", "").trim();
  }

  // Handle basic types
  if (typeStr === "boolean") return "boolean";
  if (typeStr === "string") return "string";
  if (typeStr === "number") return "number";
  if (typeStr === "object") return "object";

  // Handle HTMLElement
  if (typeStr === "HTMLElement" || typeStr.includes("HTMLElement")) {
    return "HTMLElement | string";
  }

  // Handle custom accessibility attributes and other complex object types
  if (typeStr.includes("AccessibilityAttributes") || typeStr.includes("Attributes")) {
    return "object";
  }

  // Default to any for complex types
  if (typeStr.includes("<") || typeStr.includes("{") || typeStr.includes("Record") || typeStr.includes("Pick") || typeStr.includes("Omit")) {
    return "any";
  }

  // For custom types that aren't defined, use any
  if (/^[A-Z][a-zA-Z]+$/.test(typeStr)) {
    return "any";
  }

  return typeStr;
}

/**
 * Convert kebab-case to PascalCase for event handlers
 */
function kebabToPascal(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Generate Monaco types from parsed component info
 */
function generateMonacoTypes(components) {
  let output = `// Auto-generated Monaco types for UI5 Web Components
// Generated by scripts/generate-monaco-types.mjs
// DO NOT EDIT MANUALLY

// React types
declare namespace React {
  type ReactNode = string | number | boolean | null | undefined | ReactElement<any> | ReactNode[];
  interface ReactElement<P = any> {
    type: any;
    props: P;
    key: string | number | null;
  }
  interface CSSProperties {
    [key: string]: string | number | undefined;
  }
  // FC = FunctionComponent - TypeScript understands this for JSX type checking
  interface FunctionComponent<P = {}> {
    (props: P): ReactElement<any> | null;
    displayName?: string;
  }
  type FC<P = {}> = FunctionComponent<P>;
  type ComponentType<P = {}> = FunctionComponent<P>;
  function createElement<P extends {}>(
    type: ComponentType<P> | string,
    props?: P | null,
    ...children: ReactNode[]
  ): ReactElement<P>;
  function useState<S>(initialState: S | (() => S)): [S, (newState: S | ((prevState: S) => S)) => void];
  function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
  function useMemo<T>(factory: () => T, deps: readonly any[]): T;
  function useRef<T>(initialValue: T): { current: T };
  const Fragment: ComponentType<{ children?: ReactNode }>;
}

// Global hooks
declare const useState: typeof React.useState;
declare const useEffect: typeof React.useEffect;
declare const useCallback: typeof React.useCallback;
declare const useMemo: typeof React.useMemo;
declare const useRef: typeof React.useRef;
declare const Fragment: typeof React.Fragment;

// JSX namespace - critical for TypeScript JSX type checking
declare namespace JSX {
  interface Element extends React.ReactElement<any> {}
  // LibraryManagedAttributes handles how React processes props
  type LibraryManagedAttributes<C, P> = P;
  // Intrinsic elements are standard HTML tags
  interface IntrinsicElements {
    div: any;
    span: any;
    p: any;
    br: any;
    hr: any;
    img: any;
    button: any;
    input: any;
    label: any;
    a: any;
    h1: any;
    h2: any;
    h3: any;
    h4: any;
    h5: any;
    h6: any;
  }
}

// Base props shared by all UI5 components
interface UI5BaseProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties | string;
  slot?: string;
  key?: string | number;
  ref?: any;
  children?: React.ReactNode;
}

`;

  // Generate interface for each component
  for (const comp of components) {
    output += `/** ${comp.name} component props */\n`;
    output += `interface ${comp.name}Props extends UI5BaseProps {\n`;

    for (const prop of comp.properties) {
      const monacoType = convertType(prop.type);
      output += `  ${prop.name}?: ${monacoType};\n`;
    }

    for (const event of comp.events) {
      const handlerName = `on${kebabToPascal(event.name)}`;
      output += `  ${handlerName}?: (event: CustomEvent<any>) => void;\n`;
    }

    output += `}\n\n`;
  }

  // Generate module declarations for imports used in samples
  output += `// Module declarations for sample imports\n`;
  output += `declare module "@ui5/webcomponents-base/dist/createReactComponent.js" {\n`;
  output += `  export function createReactComponent<P>(ComponentClass: { _jsxProps: P }): (props: P & { children?: React.ReactNode }) => JSX.Element;\n`;
  output += `}\n\n`;

  // Also declare the short path that samples use
  output += `declare module "@ui5/webcomponents-base" {\n`;
  output += `  export function createReactComponent<P>(ComponentClass: { _jsxProps: P }): (props: P & { children?: React.ReactNode }) => JSX.Element;\n`;
  output += `}\n\n`;

  // Generate module for each component's import
  const mainComponents = components.filter(c => c.tag && !c.tag.includes("fiori"));
  const fioriComponents = components.filter(c => c.tag && c.tag.includes("fiori"));

  for (const comp of components) {
    const compConfig = COMPONENTS.find(c => c.name === comp.name);
    const packageName = compConfig?.package || "main";
    const packagePath = packageName === "main" ? "@ui5/webcomponents" : `@ui5/webcomponents-${packageName}`;
    // Use className if specified (for AI components where file name differs from type name)
    const fileName = compConfig?.className || comp.name;

    // Each component module exports a class-like object with _jsxProps for type inference
    output += `declare module "${packagePath}/dist/${fileName}.js" {\n`;
    output += `  const ${comp.name}: { _jsxProps: ${comp.name}Props };\n`;
    output += `  export default ${comp.name};\n`;
    output += `}\n\n`;
  }

  // Add icon imports module
  output += `declare module "@ui5/webcomponents-icons/dist/*.js" {\n`;
  output += `  const icon: any;\n`;
  output += `  export default icon;\n`;
  output += `}\n\n`;

  // Global component declarations for samples that don't use imports
  // Using function types directly - TypeScript's JSX uses the first parameter as props
  output += `// Global component declarations\n`;
  for (const comp of components) {
    output += `declare function ${comp.name}(props: ${comp.name}Props): JSX.Element;\n`;
  }

  return output;
}

function main() {
  // Set global packagesDir for enum extraction
  packagesDir = path.resolve(__dirname, "../..");

  console.log("Extracting component types from .d.ts files...\n");

  const componentInfos = [];

  // First pass: collect all component infos
  for (const comp of COMPONENTS) {
    const packagePath = path.join(packagesDir, comp.package);
    // Use className if specified (for AI components where file name differs from type name)
    const fileName = comp.className || comp.name;
    const dtsPath = path.join(packagePath, "dist", `${fileName}.d.ts`);

    if (!fs.existsSync(dtsPath)) {
      console.log(`  ✗ ${comp.name} (not found: ${dtsPath})`);
      continue;
    }

    const dtsContent = fs.readFileSync(dtsPath, "utf-8");
    const { properties, events, slots } = parseDeclarationFile(dtsContent, fileName, packagesDir, true);

    componentInfos.push({
      name: comp.name,
      tag: comp.tag,
      properties,
      events,
      slots: slots || [],
      extends: comp.extends,
    });

    console.log(`  ✓ ${comp.name} (${properties.length} props, ${events.length} events, ${(slots || []).length} slots)`);
  }

  // Second pass: merge inherited properties and slots from parent components
  for (const comp of componentInfos) {
    if (comp.extends) {
      const parent = componentInfos.find(c => c.name === comp.extends);
      if (parent) {
        // Add parent properties that aren't already defined
        const existingPropNames = new Set(comp.properties.map(p => p.name));
        for (const prop of parent.properties) {
          if (!existingPropNames.has(prop.name)) {
            comp.properties.push(prop);
          }
        }
        // Add parent events that aren't already defined
        const existingEventNames = new Set(comp.events.map(e => e.name));
        for (const event of parent.events) {
          if (!existingEventNames.has(event.name)) {
            comp.events.push(event);
          }
        }
        // Add parent slots that aren't already defined
        const existingSlotNames = new Set(comp.slots.map(s => s.name));
        for (const slot of parent.slots || []) {
          if (!existingSlotNames.has(slot.name)) {
            comp.slots.push(slot);
          }
        }
        console.log(`  → ${comp.name} inherits from ${comp.extends} (now ${comp.properties.length} props, ${comp.events.length} events, ${comp.slots.length} slots)`);
      }
    }
  }

  console.log(`\nGenerating Monaco types for ${componentInfos.length} components...`);

  const types = generateMonacoTypes(componentInfos);

  const outputPath = path.join(__dirname, "..", "src", "components", "Editor", "monaco-ui5-types.d.ts");
  fs.writeFileSync(outputPath, types);

  console.log(`\nGenerated: ${outputPath}`);
  console.log("Done!");
}

main();
