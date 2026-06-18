import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemCustomClass from "@ui5/webcomponents/dist/ComboBoxItemCustom.js";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItemCustom = createReactComponent(ComboBoxItemCustomClass);

const countries = [
	{ text: "Germany", value: "DE", flag: "🇩🇪" },
	{ text: "France", value: "FR", flag: "🇫🇷" },
	{ text: "Spain", value: "ES", flag: "🇪🇸" },
	{ text: "Italy", value: "IT", flag: "🇮🇹" },
	{ text: "United Kingdom", value: "GB", flag: "🇬🇧" },
];

function App() {
	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (e: UI5CustomEvent<ComboBoxClass, "change">) => {
		setSelectedValue(e.currentTarget.value);
	};

	return (
		<>
			<style>{`
				.flag {
					margin-right: 0.5rem;
				}
			`}</style>
			<ComboBox
				placeholder="Select country"
				style={{ width: "400px" }}
				onChange={handleChange}
			>
				{countries.map((country) => (
					<ComboBoxItemCustom
						key={country.value}
						text={country.text}
						value={country.value}
					>
						<span
							role="img"
							aria-label="Flag"
							className="flag"
						>
							{country.flag}
						</span>
						{country.text}
					</ComboBoxItemCustom>
				))}
			</ComboBox>
			{selectedValue && (
				<div style={{ marginTop: "1rem" }}>
					Selected: {selectedValue}
				</div>
			)}
		</>
	);
}

export default App;
