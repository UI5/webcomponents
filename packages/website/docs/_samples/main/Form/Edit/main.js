import "@ui5/webcomponents/dist/Form.js";
import "@ui5/webcomponents/dist/FormGroup.js";
import "@ui5/webcomponents/dist/FormItem.js";


// The following code is required only for the sample
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Slider.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/SegmentedButtonItem.js";

const swEditable = document.getElementById("swEditable");
const editableForm = document.getElementById("editableForm");

swEditable.addEventListener("selection-change", function () {
	const selectedItem = swEditable.selectedItems[0].textContent;
	const editable = selectedItem === "Edit";

	// clear previous form items
	while (editableForm.firstChild) {
		editableForm.removeChild(editableForm.firstChild);
	}

	// append texts or inputs depending on the edit/display mode
	editableForm.insertAdjacentHTML("afterbegin", editable ? editTemplate : displayTemplate);

	// set itemSpacing Normal/Large to avoid jumping when switching from texts to inputs.
	editableForm.itemSpacing =  editable ? "Normal" : "Large";

	// set accessibleMode Edit/Display for best screen reader experience
	editableForm.accessibleMode =  editable ? "Edit" : "Display";
});

const displayTemplate = `
	<ui5-form-item>
		<ui5-label slot="labelContent">Name:</ui5-label>
		<ui5-text>Red Point Stores</ui5-text>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">Country:</ui5-label>
		<ui5-text>Germany</ui5-text>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
		<ui5-text>411 Maintown</ui5-text>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label for="wsInp" slot="labelContent">WebSite:</ui5-label>
		<ui5-link href="sap.com">sap.com</ui5-link>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">Street:</ui5-label>
		<ui5-text>Main St 1618</ui5-text>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label for="delInp" slot="labelContent">Delivery address:</ui5-label>
		<ui5-text>Newtown</ui5-text>
	</ui5-form-item>
`;

const editTemplate = `
	<ui5-form-item>
		<ui5-label for="nameInp" slot="labelContent">Name:</ui5-label>
		<ui5-input value="Red Point Stores" id="nameInp"></ui5-input>
	</ui5-form-item>
	
	<ui5-form-item>
		<ui5-label id="countryLbl" for="countrySel" slot="labelContent">Country:</ui5-label>
		<ui5-select id="countrySel" accessible-name-ref="countryLbl">
			<ui5-option>Australia</ui5-option>
			<ui5-option selected>Germany</ui5-option>
			<ui5-option>England</ui5-option>
		</ui5-select>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label id="cityLbl" for="cityInp" slot="labelContent">ZIP Code/City:</ui5-label>
		<ui5-input id="cityInp" value="411" accessible-name-ref="cityLbl"></ui5-input>
		<ui5-input value="Maintown" accessible-name-ref="cityLbl"></ui5-input>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label for="wsInp" slot="labelContent">WebSite:</ui5-label>
		<ui5-input value="sap.com" id="wsInp"></ui5-input>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label id="streetLbl" for="streetInp" slot="labelContent">Street:</ui5-label>
		<ui5-input id="streetInp" value="Main St" accessible-name-ref="streetLbl"></ui5-input>
		<ui5-input id="streetNumberInp" value="1618" accessible-name-ref="streetLbl"></ui5-input>
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label for="delInp" slot="labelContent">Delivery address:</ui5-label>
		<ui5-input value="Newtown" id="delInp"></ui5-input>
	</ui5-form-item>
`;