import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import MultiComboBoxClass from "@ui5/webcomponents/dist/MultiComboBox.js";
import MultiComboBoxItemCustomClass from "@ui5/webcomponents/dist/MultiComboBoxItemCustom.js";

const MultiComboBox = createReactComponent(MultiComboBoxClass);
const MultiComboBoxItemCustom = createReactComponent(MultiComboBoxItemCustomClass);

const countries = [
	{ text: "Germany", value: "DE", flag: "🇩🇪" },
	{ text: "France", value: "FR", flag: "🇫🇷" },
	{ text: "Spain", value: "ES", flag: "🇪🇸" },
	{ text: "Italy", value: "IT", flag: "🇮🇹" },
	{ text: "United Kingdom", value: "GB", flag: "🇬🇧" },
];

function App() {
	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	const handleSelectionChange = (e: UI5CustomEvent<MultiComboBoxClass, "selection-change">) => {
		const items = e.currentTarget.items;
		setSelectedValues(
			items
				.filter((item: any) => item.selected)
				.map((item: any) => item.text)
		);
	};

	return (
		<>
			<style>{`
				.flag {
					margin-right: 0.5rem;
				}
			`}</style>
			<MultiComboBox
				placeholder="Select countries"
				style={{ width: "400px" }}
				onSelectionChange={handleSelectionChange}
			>
				{countries.map((country) => (
					<MultiComboBoxItemCustom
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
					</MultiComboBoxItemCustom>
				))}
			</MultiComboBox>
			{selectedValues.length > 0 && (
				<div style={{ marginTop: "1rem" }}>
					Selected: {selectedValues.join(", ")}
				</div>
			)}
		</>
	);
}

export default App;
