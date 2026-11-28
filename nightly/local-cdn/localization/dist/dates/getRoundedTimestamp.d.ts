/**
 * Returns a timestamp with only the year, month and day (with zero hours, minutes and seconds) and without 000 for milliseconds
 * @param { number } millisecondsUTC
 * @returns { number }
 */
declare const getRoundedTimestamp: (millisecondsUTC: number) => number;
export default getRoundedTimestamp;
