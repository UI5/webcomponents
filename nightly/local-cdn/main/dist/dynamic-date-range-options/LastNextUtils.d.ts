import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
type LastNextOption = {
    operator: string;
    text: string;
    unitText: string;
};
/**
 * Interface for Last/Next options that have additional methods
 */
interface ILastNextOption extends IDynamicDateRangeOption {
    availableOptions: Array<LastNextOption>;
    options?: Array<string>;
    _operator: string;
}
/**
 * Parses a string value for Last/Next options
 * @param value - The string to parse (e.g., "Last 7 Days")
 * @param option - The option instance
 * @returns Parsed DynamicDateRangeValue
 */
export declare function parseLastNext(value: string, option: IDynamicDateRangeOption): DynamicDateRangeValue | undefined;
/**
 * Formats a DynamicDateRangeValue for Last/Next options
 * @param value - The value to format
 * @param option - The option instance
 * @returns Formatted string
 */
export declare function formatLastNext(value: DynamicDateRangeValue, option: IDynamicDateRangeOption): string;
/**
 * Validates if a string is valid for Last/Next options
 * @param value - The string to validate
 * @param option - The option instance
 * @returns True if valid, false otherwise
 */
export declare function isValidStringLastNext(value: string, option: IDynamicDateRangeOption): boolean;
/**
 * Handles selection change events for Last/Next options
 * @param e - The custom event
 * @param option - The option instance
 * @returns Updated DynamicDateRangeValue
 */
export declare function handleSelectionChangeLastNext(e: CustomEvent, option: IDynamicDateRangeOption): DynamicDateRangeValue | undefined;
/**
 * Checks if a date range represents a single day
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns True if the range is a single day
 */
export declare function isSingleDayRange(startDate: Date, endDate: Date): boolean;
/**
 * Formats date values for Last/Next options
 * @param startDate - The start date
 * @param endDate - The end date
 * @param operator - The operator (used to check for DAYS operations)
 * @returns Formatted date string
 */
export declare function formatDateRange(startDate: Date, endDate: Date, operator: string): string;
/**
 * Complete format function for Last/Next options that handles all value types
 * @param value - The value to format
 * @param option - The Last/Next option instance
 * @returns Formatted string
 */
export declare function formatLastNextValue(value: DynamicDateRangeValue, option: ILastNextOption): string;
export {};
