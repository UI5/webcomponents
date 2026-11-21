import CalendarDate from "./CalendarDate.js";
const cache = new Map();
const getMinCalendarDate = (primaryCalendarType) => {
    const key = `min ${primaryCalendarType}`;
    if (!cache.has(key)) {
        const minDate = new CalendarDate(1, 0, 1, primaryCalendarType);
        minDate.setYear(1);
        minDate.setMonth(0);
        minDate.setDate(1);
        cache.set(key, minDate);
    }
    return cache.get(key);
};
const getMaxCalendarDate = (primaryCalendarType) => {
    const key = `max ${primaryCalendarType}`;
    if (!cache.has(key)) {
        const maxDate = new CalendarDate(1, 0, 1, primaryCalendarType);
        maxDate.setYear(9999);
        maxDate.setMonth(11);
        const tempDate = new CalendarDate(maxDate, primaryCalendarType);
        tempDate.setDate(1);
        tempDate.setMonth(tempDate.getMonth() + 1, 0);
        maxDate.setDate(tempDate.getDate()); // 31st for Gregorian Calendar
        cache.set(key, maxDate);
    }
    return cache.get(key);
};
export { getMinCalendarDate, getMaxCalendarDate, };
//# sourceMappingURL=ExtremeDates.js.map