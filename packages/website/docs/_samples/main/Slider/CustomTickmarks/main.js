import "@ui5/webcomponents/dist/Slider.js";

document.getElementById("custom-values-temp").tickmarks = [
    { value: 0, label: "Freezing" },
    { value: 2.5, label: "Room Temp" },
    { value: 5, label: "Warm" },
    { value: 7.5, label: "Hot" },
    { value: 10, label: "Boiling" }
];
