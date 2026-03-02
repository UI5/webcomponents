import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const Input = createReactComponent(InputClass);

function App() {

  const handleInput = () => {
    const value = input.value;
    let suggestionItems = [];
    const ui5_database_entries = ["Argentina", "Albania", "Algeria", "Angola",
        "Austria", "Australia", "Bulgaria", "Canada", "Columbia", "Croatia", "Denmark",
        "England", "Finland", "France", "Germany", "Hungary", "Ireland", "Italy", "Kuwait",
        "Luxembourg", "Mexico", "Morocco", "Norway", "Paraguay", "Philippines", "Portugal",
        "Spain", "Sweden", "Sri Lanka", "Senegal", "Thailand", "The United Kingdom of Great Britain and Northern Ireland", "USA"];

    if (value) {
        suggestionItems = ui5_database_entries.filter((item) => {
            return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
  };

  return (
    <Input id="input" show-suggestions={true} placeholder="Type 'a'" />
  );
}

export default App;
