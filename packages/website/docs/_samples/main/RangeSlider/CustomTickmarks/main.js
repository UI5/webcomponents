import "@ui5/webcomponents/dist/RangeSlider.js";

document.getElementById("custom-tickmarks-temp").tickmarks = [
    { value: 0, label: "Freezing" },
    { value: 25, label: "Cool" },
    { value: 50, label: "Warm" },
    { value: 75, label: "Hot" },
    { value: 100, label: "Boiling" }
];
