/**
 * ReactPlayground - Live React editor with Monaco and UI5 component preview
 * Features: editable code, syntax highlighting, TS checks, autocomplete, live preview
 */
import React, { useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { ThemeContext, ContentDensityContext, TextDirectionContext } from "@site/src/theme/Root";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./ReactPlayground.module.css";

// Import generated Monaco types
// @ts-ignore - raw-loader import
import generatedTypes from "!!raw-loader!./monaco-ui5-types.d.ts";

import { createReactComponent } from "@ui5/webcomponents-base";

// Theme support - apply theme changes to UI5 Web Components rendered in-document
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";

// Import ALL component classes - main package
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ButtonBadgeClass from "@ui5/webcomponents/dist/ButtonBadge.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparatorClass from "@ui5/webcomponents/dist/MenuSeparator.js";
import MenuItemGroupClass from "@ui5/webcomponents/dist/MenuItemGroup.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import OptionCustomClass from "@ui5/webcomponents/dist/OptionCustom.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import ListItemCustomClass from "@ui5/webcomponents/dist/ListItemCustom.js";
import ListItemGroupClass from "@ui5/webcomponents/dist/ListItemGroup.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import AvatarGroupClass from "@ui5/webcomponents/dist/AvatarGroup.js";
import AvatarBadgeClass from "@ui5/webcomponents/dist/AvatarBadge.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";
import ProgressIndicatorClass from "@ui5/webcomponents/dist/ProgressIndicator.js";
import RatingIndicatorClass from "@ui5/webcomponents/dist/RatingIndicator.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import RangeSliderClass from "@ui5/webcomponents/dist/RangeSlider.js";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TabSeparatorClass from "@ui5/webcomponents/dist/TabSeparator.js";
import TableClass from "@ui5/webcomponents/dist/Table.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import TreeClass from "@ui5/webcomponents/dist/Tree.js";
import TreeItemClass from "@ui5/webcomponents/dist/TreeItem.js";
import TreeItemCustomClass from "@ui5/webcomponents/dist/TreeItemCustom.js";
import PanelClass from "@ui5/webcomponents/dist/Panel.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";
import ToolbarSpacerClass from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import ToolbarSeparatorClass from "@ui5/webcomponents/dist/ToolbarSeparator.js";
import ToolbarSelectClass from "@ui5/webcomponents/dist/ToolbarSelect.js";
import ToolbarSelectOptionClass from "@ui5/webcomponents/dist/ToolbarSelectOption.js";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import ComboBoxItemGroupClass from "@ui5/webcomponents/dist/ComboBoxItemGroup.js";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemClass from "@ui5/webcomponents/dist/MultiComboBoxItem.js";
import MultiComboBoxItemGroupClass from "@ui5/webcomponents/dist/MultiComboBoxItemGroup.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import TokenizerClass from "@ui5/webcomponents/dist/Tokenizer.js";
import MultiInputClass from "@ui5/webcomponents/dist/MultiInput.js";
import BreadcrumbsClass from "@ui5/webcomponents/dist/Breadcrumbs.js";
import BreadcrumbsItemClass from "@ui5/webcomponents/dist/BreadcrumbsItem.js";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";
import CalendarLegendClass from "@ui5/webcomponents/dist/CalendarLegend.js";
import CalendarLegendItemClass from "@ui5/webcomponents/dist/CalendarLegendItem.js";
import SpecialCalendarDateClass from "@ui5/webcomponents/dist/SpecialCalendarDate.js";
import ColorPickerClass from "@ui5/webcomponents/dist/ColorPicker.js";
import ColorPaletteClass from "@ui5/webcomponents/dist/ColorPalette.js";
import ColorPaletteItemClass from "@ui5/webcomponents/dist/ColorPaletteItem.js";
import ColorPalettePopoverClass from "@ui5/webcomponents/dist/ColorPalettePopover.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import SplitButtonClass from "@ui5/webcomponents/dist/SplitButton.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";
import SuggestionItemCustomClass from "@ui5/webcomponents/dist/SuggestionItemCustom.js";
import CarouselClass from "@ui5/webcomponents/dist/Carousel.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import FormGroupClass from "@ui5/webcomponents/dist/FormGroup.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import DynamicDateRangeClass from "@ui5/webcomponents/dist/DynamicDateRange.js";
import SuggestionItemGroupClass from "@ui5/webcomponents/dist/SuggestionItemGroup.js";
import TableGrowingClass from "@ui5/webcomponents/dist/TableGrowing.js";
import TableSelectionClass from "@ui5/webcomponents/dist/TableSelection.js";
import TableSelectionMultiClass from "@ui5/webcomponents/dist/TableSelectionMulti.js";
import TableSelectionSingleClass from "@ui5/webcomponents/dist/TableSelectionSingle.js";
import TableVirtualizerClass from "@ui5/webcomponents/dist/TableVirtualizer.js";
import ExpandableTextClass from "@ui5/webcomponents/dist/ExpandableText.js";
import TableRowActionClass from "@ui5/webcomponents/dist/TableRowAction.js";
import TableRowActionNavigationClass from "@ui5/webcomponents/dist/TableRowActionNavigation.js";
import TableHeaderCellActionAIClass from "@ui5/webcomponents/dist/TableHeaderCellActionAI.js";
import ToolbarItemClass from "@ui5/webcomponents/dist/ToolbarItem.js";
import DateRangeClass from "@ui5/webcomponents/dist/CalendarDateRange.js";

// Import fiori package
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import NotificationListClass from "@ui5/webcomponents-fiori/dist/NotificationList.js";
import NotificationListItemClass from "@ui5/webcomponents-fiori/dist/NotificationListItem.js";
import NotificationListGroupItemClass from "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";
import UploadCollectionClass from "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import UploadCollectionItemClass from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";
import WizardClass from "@ui5/webcomponents-fiori/dist/Wizard.js";
import WizardStepClass from "@ui5/webcomponents-fiori/dist/WizardStep.js";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import TimelineGroupItemClass from "@ui5/webcomponents-fiori/dist/TimelineGroupItem.js";
import PageClass from "@ui5/webcomponents-fiori/dist/Page.js";
import DynamicPageClass from "@ui5/webcomponents-fiori/dist/DynamicPage.js";
import DynamicPageTitleClass from "@ui5/webcomponents-fiori/dist/DynamicPageTitle.js";
import DynamicPageHeaderClass from "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js";
import DynamicSideContentClass from "@ui5/webcomponents-fiori/dist/DynamicSideContent.js";
import FlexibleColumnLayoutClass from "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import MediaGalleryClass from "@ui5/webcomponents-fiori/dist/MediaGallery.js";
import MediaGalleryItemClass from "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";
import ProductSwitchClass from "@ui5/webcomponents-fiori/dist/ProductSwitch.js";
import ProductSwitchItemClass from "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";
import ViewSettingsDialogClass from "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";
import SortItemClass from "@ui5/webcomponents-fiori/dist/SortItem.js";
import FilterItemClass from "@ui5/webcomponents-fiori/dist/FilterItem.js";
import FilterItemOptionClass from "@ui5/webcomponents-fiori/dist/FilterItemOption.js";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import SearchItemClass from "@ui5/webcomponents-fiori/dist/SearchItem.js";
import SearchMessageAreaClass from "@ui5/webcomponents-fiori/dist/SearchMessageArea.js";
import UserMenuClass from "@ui5/webcomponents-fiori/dist/UserMenu.js";
import UserMenuItemClass from "@ui5/webcomponents-fiori/dist/UserMenuItem.js";
import UserMenuAccountClass from "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";
import BarcodeScannerDialogClass from "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";
import NavigationLayoutClass from "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import SearchFieldClass from "@ui5/webcomponents-fiori/dist/SearchField.js";
import SearchItemGroupClass from "@ui5/webcomponents-fiori/dist/SearchItemGroup.js";
import SearchItemShowMoreClass from "@ui5/webcomponents-fiori/dist/SearchItemShowMore.js";
import SearchScopeClass from "@ui5/webcomponents-fiori/dist/SearchScope.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarSearchClass from "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import ShellBarSpacerClass from "@ui5/webcomponents-fiori/dist/ShellBarSpacer.js";
import UserSettingsDialogClass from "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js";
import UserSettingsItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsItem.js";
import UserSettingsViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsView.js";
import UserSettingsAccountViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsAccountView.js";
import UserSettingsAppearanceViewClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js";
import UserSettingsAppearanceViewGroupClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewGroup.js";
import UserSettingsAppearanceViewItemClass from "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js";

// Import AI package
import AIButtonClass from "@ui5/webcomponents-ai/dist/Button.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/ButtonState.js";
import AIInputClass from "@ui5/webcomponents-ai/dist/Input.js";
import AITextAreaClass from "@ui5/webcomponents-ai/dist/TextArea.js";
import AIPromptInputClass from "@ui5/webcomponents-ai/dist/PromptInput.js";

// Import compat package
import TableColumnClass from "@ui5/webcomponents-compat/dist/TableColumn.js";
import TableGroupRowClass from "@ui5/webcomponents-compat/dist/TableGroupRow.js";

// Import icons commonly used in samples
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";

// Import illustrations for IllustratedMessage
import "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js";

// Import localization for calendar/date components
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

// Import DynamicDateRange options
import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/DateTimeRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js";

// Import theme assets for all packages - registers theme property loaders
// so that setTheme() can actually apply themes
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-ai/dist/Assets.js";

// Map component class names to their classes for dynamic lookup
const ComponentClasses: Record<string, any> = {
  // main package
  ButtonClass, ButtonBadgeClass, InputClass, LinkClass, LabelClass, CheckBoxClass, SwitchClass,
  CardClass, CardHeaderClass, TagClass, MenuClass, MenuItemClass, MenuSeparatorClass, MenuItemGroupClass,
  SelectClass, OptionClass, OptionCustomClass, ListClass, ListItemStandardClass, ListItemCustomClass,
  ListItemGroupClass, DialogClass, IconClass, AvatarClass, AvatarGroupClass, AvatarBadgeClass,
  DatePickerClass, TimePickerClass, DateTimePickerClass, DateRangePickerClass, TextAreaClass,
  RadioButtonClass, ProgressIndicatorClass, RatingIndicatorClass, SliderClass, RangeSliderClass,
  StepInputClass, PopoverClass, ResponsivePopoverClass, ToastClass, MessageStripClass, BusyIndicatorClass,
  TabContainerClass, TabClass, TabSeparatorClass, TableClass, TableHeaderRowClass, TableHeaderCellClass,
  TableRowClass, TableCellClass, TreeClass, TreeItemClass, TreeItemCustomClass, PanelClass,
  ToolbarClass, ToolbarButtonClass, ToolbarSpacerClass, ToolbarSeparatorClass, ToolbarSelectClass,
  ToolbarSelectOptionClass, SegmentedButtonClass, SegmentedButtonItemClass, ComboBoxClass,
  ComboBoxItemClass, ComboBoxItemGroupClass, MultiComboBoxClass, MultiComboBoxItemClass,
  MultiComboBoxItemGroupClass, TokenClass, TokenizerClass, MultiInputClass, BreadcrumbsClass,
  BreadcrumbsItemClass, CalendarClass, CalendarLegendClass, CalendarLegendItemClass,
  SpecialCalendarDateClass, ColorPickerClass, ColorPaletteClass, ColorPaletteItemClass,
  ColorPalettePopoverClass, FileUploaderClass, SplitButtonClass, TitleClass, TextClass,
  SuggestionItemClass, SuggestionItemCustomClass, SuggestionItemGroupClass, CarouselClass, ToggleButtonClass, FormClass,
  FormItemClass, FormGroupClass, BarClass, DynamicDateRangeClass, TableGrowingClass,
  TableSelectionClass, TableSelectionMultiClass, TableSelectionSingleClass, TableVirtualizerClass,
  ExpandableTextClass, TableRowActionClass, TableRowActionNavigationClass,
  TableHeaderCellActionAIClass, ToolbarItemClass, DateRangeClass,
  // fiori package
  ShellBarClass, ShellBarItemClass, SideNavigationClass, SideNavigationItemClass,
  SideNavigationSubItemClass, SideNavigationGroupClass, NotificationListClass, NotificationListItemClass,
  NotificationListGroupItemClass, UploadCollectionClass, UploadCollectionItemClass, WizardClass,
  WizardStepClass, IllustratedMessageClass, TimelineClass, TimelineItemClass, TimelineGroupItemClass,
  PageClass, DynamicPageClass, DynamicPageTitleClass, DynamicPageHeaderClass, DynamicSideContentClass,
  FlexibleColumnLayoutClass, MediaGalleryClass, MediaGalleryItemClass, ProductSwitchClass,
  ProductSwitchItemClass, ViewSettingsDialogClass, SortItemClass, FilterItemClass, FilterItemOptionClass,
  SearchClass, SearchItemClass, SearchMessageAreaClass, UserMenuClass, UserMenuItemClass,
  UserMenuAccountClass, BarcodeScannerDialogClass, NavigationLayoutClass, SearchFieldClass,
  SearchItemGroupClass, SearchItemShowMoreClass, SearchScopeClass, ShellBarBrandingClass,
  ShellBarSearchClass, ShellBarSpacerClass, UserSettingsDialogClass, UserSettingsItemClass,
  UserSettingsViewClass, UserSettingsAccountViewClass, UserSettingsAppearanceViewClass,
  UserSettingsAppearanceViewGroupClass, UserSettingsAppearanceViewItemClass,
  // ai package
  AIButtonClass, AIButtonStateClass, AIInputClass, AITextAreaClass, AIPromptInputClass,
  // compat package
  TableColumnClass, TableGroupRowClass,
};

interface ReactPlaygroundProps {
  code: string;
  editorVisible?: boolean;
}

// Error Boundary to catch render errors without crashing the page
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; onError?: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ReactPlayground] Render error:", error, errorInfo);
    this.props.onError?.(error);
  }

  // Reset error state when children change (new code)
  componentDidUpdate(prevProps: { children: React.ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "var(--sapNegativeColor)", padding: "1rem", fontFamily: "monospace", fontSize: "13px" }}>
          <strong>Render Error:</strong> {this.state.error?.message || "Unknown error"}
        </div>
      );
    }

    return this.props.children;
  }
}

// Monaco Editor and Babel - dynamically imported
let MonacoEditor: any = null;
let Babel: any = null;

if (ExecutionEnvironment.canUseDOM) {
  const monacoReact = require("@monaco-editor/react");
  MonacoEditor = monacoReact.default;

  // Import Babel standalone
  Babel = require("@babel/standalone");
}

// Transpile JSX code to JavaScript - returns { code, error }
function transpileCode(code: string): { code: string | null; error: string | null } {
  if (!Babel) {
    return { code: null, error: "Babel not available" };
  }

  try {
    // Remove import statements (we provide components via scope)
    let cleanedCode = code
      .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, "")
      .replace(/^import\s+['"].*?['"];?\s*$/gm, "");

    // Keep createReactComponent declarations - they will use our provided classes

    // Remove export statements
    cleanedCode = cleanedCode
      .replace(/^export\s+default\s+\w+;?\s*$/gm, "")
      .replace(/^export\s+/gm, "");

    const result = Babel.transform(cleanedCode, {
      presets: ["react", "typescript"],
      filename: "sample.tsx",
    });
    return { code: result.code, error: null };
  } catch (error) {
    // Return error message instead of throwing
    const message = (error as Error).message || "Unknown transpilation error";
    return { code: null, error: message };
  }
}

// Execute transpiled code and return a React element or error
function executeCode(transpiledCode: string): { element: React.ReactNode | null; error: string | null } {
  try {
    // Build the scope - all component classes + createReactComponent + React
    const scopeNames = ["React", "createReactComponent", ...Object.keys(ComponentClasses)];
    const scopeValues = [React, createReactComponent, ...Object.values(ComponentClasses)];

    const fn = new Function(
      ...scopeNames,
      `
      const { useState, useEffect, useCallback, useMemo, useRef, Fragment } = React;
      ${transpiledCode}
      // Return the default export or last expression
      if (typeof App !== 'undefined') return React.createElement(App);
      if (typeof Example !== 'undefined') return React.createElement(Example);
      if (typeof Demo !== 'undefined') return React.createElement(Demo);
      return null;
      `
    );

    return { element: fn(...scopeValues), error: null };
  } catch (error) {
    const message = (error as Error).message || "Unknown execution error";
    return { element: null, error: message };
  }
}

export default function ReactPlayground({ code, editorVisible = false }: ReactPlaygroundProps) {
  const themeCtx = useContext(ThemeContext);
  const densityCtx = useContext(ContentDensityContext);
  const directionCtx = useContext(TextDirectionContext);
  const { colorMode } = useColorMode();

  const theme = themeCtx?.theme || "sap_horizon";
  const contentDensity = densityCtx?.contentDensity || "Cozy";
  const textDirection = directionCtx?.textDirection || "LTR";

  // Store the original code
  const [editorCode, setEditorCode] = useState(code);
  const previewRef = useRef<HTMLDivElement>(null);

  // Generate unique ID for this editor instance to avoid model conflicts
  const editorId = useRef(`sample-${Math.random().toString(36).substr(2, 9)}.tsx`);

  // Reset editor code when the code prop changes (switching samples)
  useEffect(() => {
    setEditorCode(code);
  }, [code]);

  // Apply theme changes to UI5 Web Components
  useEffect(() => {
    if (getTheme() !== theme) {
      setTheme(theme);
    }
  }, [theme]);

  // Apply text direction
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.setAttribute("dir", textDirection === "RTL" ? "rtl" : "ltr");
    }
    applyDirection();
  }, [textDirection]);

  // Babel is now imported synchronously, so it's always ready
  const babelReady = !!Babel;

  // Compile and render preview - catches errors gracefully
  const previewContent = useMemo(() => {
    if (!babelReady) {
      return <div style={{ padding: "1rem", color: "var(--sapNeutralTextColor)" }}>Loading...</div>;
    }

    const transpileResult = transpileCode(editorCode);
    if (transpileResult.error) {
      // Show transpilation error inline, don't crash
      return (
        <div style={{ color: "var(--sapNegativeColor)", padding: "1rem", fontFamily: "monospace", fontSize: "13px", whiteSpace: "pre-wrap" }}>
          <strong>Syntax Error:</strong> {transpileResult.error}
        </div>
      );
    }

    if (!transpileResult.code) {
      return <div style={{ padding: "1rem", color: "var(--sapNegativeColor)" }}>Transpilation failed</div>;
    }

    const execResult = executeCode(transpileResult.code);
    if (execResult.error) {
      // Show execution error inline, don't crash
      return (
        <div style={{ color: "var(--sapNegativeColor)", padding: "1rem", fontFamily: "monospace", fontSize: "13px", whiteSpace: "pre-wrap" }}>
          <strong>Error:</strong> {execResult.error}
        </div>
      );
    }

    return execResult.element;
  }, [editorCode, babelReady]);

  const monacoTheme = colorMode === "dark" ? "vs-dark" : "light";

  // Monaco configuration - runs before editor mounts
  const configureMonaco = useCallback((monaco: any) => {
    // Check if TypeScript is available
    if (!monaco.languages.typescript) {
      console.error("[ReactPlayground] TypeScript language not available!");
      return;
    }

    const tsDefaults = monaco.languages.typescript.typescriptDefaults;

    // TypeScript compiler options for TSX with strict type checking
    tsDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
      typeRoots: ["node_modules/@types"],
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
    });

    // Enable eager model sync for better autocomplete
    tsDefaults.setEagerModelSync(true);

    // Enable semantic and syntax validation
    tsDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [
        2307, // Cannot find module
        7016, // Could not find declaration file
        1259, // Module can only be default-imported
        1046, // Top-level await
        1208, // Cannot compile namespaces in isolation
        2686, // 'React' refers to a UMD global
      ],
    });

    // Add the type definitions as an extra lib
    const libUri = "file:///node_modules/@types/ui5-components/index.d.ts";

    // Remove existing lib if present to avoid duplicates
    const existingLibs = tsDefaults.getExtraLibs();
    if (!existingLibs[libUri]) {
      tsDefaults.addExtraLib(generatedTypes, libUri);
    }
  }, []);

  if (!ExecutionEnvironment.canUseDOM) {
    return <div className={styles.container}>Loading...</div>;
  }

  // Force re-render preview
  const reloadPreview = () => {
    setEditorCode((prev) => prev + " ");
    setTimeout(() => setEditorCode((prev) => prev.trim()), 0);
  };

  return (
    <div className={styles.container}>
      {/* Reload bar at top */}
      <div className={styles.reloadBar}>
        <button
          className={styles.reloadButton}
          onClick={reloadPreview}
          type="button"
          title="Reload preview"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
          </svg>
        </button>
      </div>
      <div className={styles.previewContainer}>
        <div
          ref={previewRef}
          dir={textDirection === "RTL" ? "rtl" : "ltr"}
          className={`${styles.preview} ${contentDensity === "Compact" ? "ui5-content-density-compact" : ""}`}
          data-ui5-theme={theme}
        >
          <PreviewErrorBoundary key={editorCode}>
            {previewContent}
          </PreviewErrorBoundary>
        </div>
      </div>
      {editorVisible && MonacoEditor && (
        <div className={styles.editorContainer}>
          <div className={styles.tabBar}>
            <span className={styles.tab}>App.tsx</span>
          </div>
          <MonacoEditor
            height="300px"
            language="typescript"
            theme={monacoTheme}
            value={editorCode}
            path={editorId.current}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              readOnly: false,
              quickSuggestions: true,
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnEnter: "on",
              tabCompletion: "on",
              wordBasedSuggestions: "off",
              scrollbar: {
                alwaysConsumeMouseWheel: false,
              },
            }}
            beforeMount={configureMonaco}
            onChange={(value: string | undefined) => setEditorCode(value || "")}
          />
        </div>
      )}
    </div>
  );
}
