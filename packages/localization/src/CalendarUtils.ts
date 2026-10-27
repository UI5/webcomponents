import type CaledndarUtilsOpenui5T from "@ui5/openui5-types/sap/ui/core/date/CalendarUtils";
// @ts-ignore
import CalendarUtilsNative from "./sap/ui/core/date/CalendarUtils.js";

const CalendarUtilsWrapped = CalendarUtilsNative as typeof CaledndarUtilsOpenui5T;
const CalendarUtils = CalendarUtilsWrapped;

export default CalendarUtils;
