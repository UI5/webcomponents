import "@ui5/webcomponents/dist/Assets-fetch.js";
import "@ui5/webcomponents/dist/DatePicker.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";

sel.addEventListener("change", async (e) => {
   dp.calendarWeekNumbering = e.detail.selectedOption.getAttribute("data-calendar-week-numbering");
});