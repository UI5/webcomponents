import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Text.js";

const select = document.getElementById("countrySelect");
const output = document.getElementById("output");

select.addEventListener("change", (e) => {
    output.textContent = e.target.value;
});
