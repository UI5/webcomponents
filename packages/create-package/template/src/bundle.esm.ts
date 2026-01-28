// used in test pages
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";

import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";

// Enable additional themes and i18n texts
import "./Assets.js";

// Import your web components here from the src/ directory
import "./{{INIT_PACKAGE_VAR_CLASS_NAME}}.js";

// @ts-expect-error
window["sap-ui-webcomponents-bundle"] = {
	renderFinished,
	configuration: {
		getAnimationMode,
		getLanguage,
		getTheme,
		setTheme,
		getNoConflict,
		setNoConflict,
		getCalendarType,
		getFirstDayOfWeek,
	},
};
