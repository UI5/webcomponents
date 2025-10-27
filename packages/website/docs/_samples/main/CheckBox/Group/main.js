import "@ui5/webcomponents/dist/CheckBox.js";
import "@ui5/webcomponents/dist/Button.js";

const form = document.getElementById("form");
const output = document.getElementById("output");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const selectedLanguages = formData.getAll("languages");
    output.textContent = "Selected languages: " + selectedLanguages.join(", ");
});