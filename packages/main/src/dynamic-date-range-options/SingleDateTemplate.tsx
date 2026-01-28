import type DynamicDateRange from "../DynamicDateRange.js";
import Calendar from "../Calendar.js";
import CalendarDate from "../CalendarDate.js";

export default function SingleDateTemplate(this: DynamicDateRange) {
	return (
		<Calendar onSelectionChange={this.handleSelectionChange}>
			<CalendarDate
				value={this.value && this.getOption(this.value?.operator)?.format(this.value)}
			></CalendarDate>
		</Calendar>
	);
}
