import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
/**
 * Parses a string value for Last/Next options
 * @param value - The string to parse (e.g., "Last 7 Days")
 * @param option - The option instance
 * @returns Parsed DynamicDateRangeValue
 */
export function parseLastNext(value, option) {
    const returnValue = { operator: "", values: [] };
    returnValue.operator = option.operator;
    // Extract number from text like "Last 7 Days" or "Next 3 Months"
    const match = value.match(/(\d+)/);
    if (match) {
        returnValue.values = [Number.parseInt(match[1])];
    }
    else {
        returnValue.values = [1];
    }
    return returnValue;
}
/**
 * Formats a DynamicDateRangeValue for Last/Next options
 * @param value - The value to format
 * @param option - The option instance
 * @returns Formatted string
 */
export function formatLastNext(value, option) {
    const amount = value?.values?.[0] || 1;
    return option.text.replace("X", amount.toString());
}
/**
 * Validates if a string is valid for Last/Next options
 * @param value - The string to validate
 * @param option - The option instance
 * @returns True if valid, false otherwise
 */
export function isValidStringLastNext(value, option) {
    // Check if string matches the pattern "Last X Days" or "Next X Months"
    const pattern = option.text.replace("X", "\\d+");
    const regex = new RegExp(`^${pattern}$`, "i");
    return regex.test(value);
}
/**
 * Handles selection change events for Last/Next options
 * @param e - The custom event
 * @param option - The option instance
 * @returns Updated DynamicDateRangeValue
 */
export function handleSelectionChangeLastNext(e, option) {
    const currentValue = { operator: "", values: [] };
    currentValue.operator = option.operator;
    // For StepInput, the value is accessed from the target element itself
    const stepInputValue = e.target?.value;
    currentValue.values = [stepInputValue || 1];
    return currentValue;
}
/**
 * Checks if a date range represents a single day
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns True if the range is a single day
 */
export function isSingleDayRange(startDate, endDate) {
    const normalizedStart = UI5Date.getInstance(startDate.getTime());
    const normalizedEnd = UI5Date.getInstance(endDate.getTime());
    const diffInDays = Math.round((normalizedEnd.getTime() - normalizedStart.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays + 1 === 1;
}
/**
 * Formats date values for Last/Next options
 * @param startDate - The start date
 * @param endDate - The end date
 * @param operator - The operator (used to check for DAYS operations)
 * @returns Formatted date string
 */
export function formatDateRange(startDate, endDate, operator) {
    const dateFormat = DateFormat.getDateInstance({ strictParsing: true });
    // Single day check for DAYS operations
    const isSingleDay = operator.includes("DAYS") && isSingleDayRange(startDate, endDate);
    const isSameDay = startDate.getFullYear() === endDate.getFullYear()
        && startDate.getMonth() === endDate.getMonth()
        && startDate.getDate() === endDate.getDate();
    if (isSingleDay || isSameDay) {
        return dateFormat.format(startDate);
    }
    return `${dateFormat.format(startDate)} - ${dateFormat.format(endDate)}`;
}
/**
 * Complete format function for Last/Next options that handles all value types
 * @param value - The value to format
 * @param option - The Last/Next option instance
 * @returns Formatted string
 */
export function formatLastNextValue(value, option) {
    // for empty/default values, convert to actual dates and format them
    if (!value.values || value.values.length === 0) {
        const firstOption = option.availableOptions.find(info => option.options?.includes(info.operator) || info.operator === option._operator);
        if (firstOption) {
            // Create default value with numeric 1, convert to dates, then format the dates directly
            const defaultValue = { operator: firstOption.operator, values: [1] };
            const dates = option.toDates(defaultValue);
            // Format the dates directly
            if (dates && dates.length >= 2) {
                const [startDate, endDate] = dates;
                return formatDateRange(startDate, endDate, firstOption.operator);
            }
        }
    }
    // for date values
    if (value.values && value.values.length >= 2 && value.values[0] instanceof Date && value.values[1] instanceof Date) {
        const [startDate, endDate] = value.values;
        return formatDateRange(startDate, endDate, value.operator);
    }
    // for numeric values
    const optionInfo = option.availableOptions.find(info => info.operator === value.operator);
    if (optionInfo) {
        const numberValue = value.values?.[0] || 1;
        return formatLastNext({ operator: value.operator, values: [numberValue] }, { text: optionInfo.text });
    }
    return "";
}
//# sourceMappingURL=LastNextUtils.js.map