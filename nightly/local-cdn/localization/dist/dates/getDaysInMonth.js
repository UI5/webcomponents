import CalendarDate from "./CalendarDate.js";
const getDaysInMonth = (date) => {
    const tempCalendarDate = new CalendarDate(date);
    tempCalendarDate.setDate(1);
    tempCalendarDate.setMonth(tempCalendarDate.getMonth() + 1);
    tempCalendarDate.setDate(0);
    return tempCalendarDate.getDate();
};
export default getDaysInMonth;
//# sourceMappingURL=getDaysInMonth.js.map