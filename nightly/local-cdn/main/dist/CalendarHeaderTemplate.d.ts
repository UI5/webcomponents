import type Calendar from "./Calendar.js";
interface CalendarHeaderOptions {
    headerText?: {
        monthText: string;
        yearText: string;
        secondMonthText?: string;
        secondYearText?: string;
    };
    isFirst?: boolean;
    isLast?: boolean;
    isMultiple?: boolean;
}
export default function CalendarHeaderTemplate(this: Calendar, options?: CalendarHeaderOptions): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
export {};
