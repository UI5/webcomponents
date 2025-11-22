import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
declare const dateOptionToDates: (value: DynamicDateRangeValue) => Array<Date>;
declare const dateRangeOptionToDates: (value: DynamicDateRangeValue) => Array<Date>;
declare const dateTimeRangeOptionToDates: (value: DynamicDateRangeValue) => Array<Date>;
declare const todayToDates: () => Array<Date>;
declare const yesterdayToDates: () => Array<Date>;
declare const tomorrowToDates: () => Array<Date>;
declare const lastNextToDates: (value: DynamicDateRangeValue, unit: string, direction: "last" | "next") => Array<Date>;
/**
 * Converts DynamicDateRangeValue to dates for Last/Next options.
 * Uses operator name to determine time unit and direction.
 */
declare const toDatesLastNext: (value: DynamicDateRangeValue, option: IDynamicDateRangeOption) => Array<Date>;
declare const dateTimeOptionToDates: (value: DynamicDateRangeValue) => Array<Date>;
export { dateOptionToDates, dateRangeOptionToDates, dateTimeRangeOptionToDates, todayToDates, tomorrowToDates, yesterdayToDates, lastNextToDates, toDatesLastNext, dateTimeOptionToDates, };
