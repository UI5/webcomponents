import type DynamicDateRange from "../DynamicDateRange.js";
import Calendar from "../Calendar.js";
import CalendarDateRange from "../CalendarDateRange.js";

export default function DateRangeTemplate(this: DynamicDateRange) {
	return (
		<Calendar onSelectionChange={this.handleSelectionChange} selectionMode="Range">
			<CalendarDateRange
				startValue={
					this.value?.operator === "DATERANGE"
						? this.getOption(this.value.operator)?.format(this.value)?.split("-")[0] || undefined
						: undefined
				}
				endValue={
					this.value?.operator === "DATERANGE"
						? this.getOption(this.value.operator)?.format(this.value)?.split("-")[1] || undefined
						: undefined
				}
			></CalendarDateRange>
		</Calendar>
	);
}
