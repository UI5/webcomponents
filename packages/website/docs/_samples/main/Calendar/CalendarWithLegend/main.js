import "@ui5/webcomponents/dist/Assets-fetch.js";
import "@ui5/webcomponents/dist/Calendar.js";
import "@ui5/webcomponents/dist/CalendarLegend.js";
import "@ui5/webcomponents/dist/CalendarLegendItem.js";
import "@ui5/webcomponents/dist/SpecialCalendarDate.js";

// Function that maps special dates to the current month
function updateSpecialDates() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const specialDates = document.querySelectorAll("ui5-special-date");
    const types = ["Type05", "Type07", "Type13", "NonWorking"];
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    let assignedDays = new Set();

    function generateUniqueRandomDay() {
        let randomDay;
        do {
            randomDay = Math.floor(Math.random() * daysInMonth) + 1;
        } while (assignedDays.has(randomDay));
        assignedDays.add(randomDay);
        return randomDay.toString().padStart(2, "0");
    }

    specialDates.forEach((specDate, index) => {
        specDate.setAttribute("value", year + "-" + formattedMonth + "-" + generateUniqueRandomDay());
        specDate.setAttribute("type", types[index % types.length]);
    });
}

updateSpecialDates();