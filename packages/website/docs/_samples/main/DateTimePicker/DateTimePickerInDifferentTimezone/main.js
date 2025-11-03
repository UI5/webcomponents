import "@ui5/webcomponents/dist/Assets-fetch.js";
import "@ui5/webcomponents/dist/DateTimePicker.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import {setTimezone} from "@ui5/webcomponents-base/dist/config/Timezone.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";


sel.addEventListener("change", async (e) => {
    const dateFormat = DateFormat.getDateTimeInstance({"style": "medium"});
    const value = dateFormat.parse(dtp.value);
    setTimezone(e.detail.selectedOption.getAttribute("data-timezone"));
    dtp.value = dateFormat.format(value);
});