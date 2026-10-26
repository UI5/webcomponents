import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ComboBoxClass from "@ui5/webcomponents/dist/ComboBox.js";
import ComboBoxItemClass from "@ui5/webcomponents/dist/ComboBoxItem.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState, useCallback, useRef } from "react";

const ComboBox = createReactComponent(ComboBoxClass);
const ComboBoxItem = createReactComponent(ComboBoxItemClass);

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
  "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia",
  "Croatia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany",
  "Greece", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "South Korea", "Malaysia",
  "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
  "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia",
  "Serbia", "Singapore", "South Africa", "Spain", "Sweden", "Switzerland", "Thailand",
  "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam",
];

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const abortControllerRef = useRef<AbortController>();

  // Simulates a server-side search: resolves after a delay with countries filtered
  // by "value" (an empty value returns all), and rejects with an "AbortError" when the
  // request is cancelled.
  const searchCountries = (value: string, signal: AbortSignal) =>
    new Promise<string[]>((resolve, reject) => {
      const timer = setTimeout(() => {
        if (value.trim().length > 0) {
          resolve(
            COUNTRIES.filter((c) => c.toLowerCase().includes(value.toLowerCase()))
          );
        } else {
          resolve(COUNTRIES);
        }
      }, 600);

      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });

  // This is a pure "search as you type" flow. With filter="None" every keystroke fires a
  // load-items event with reason "input"; the app aborts the previous request's
  // AbortController, so an outdated search is cancelled and only the latest query resolves.
  const handleLoadItems = useCallback(async (e: UI5CustomEvent<ComboBoxClass, "load-items">) => {
    const { value, reason } = e.detail;

    // Cancel any in-flight request and create a fresh signal for this one.
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setLoading(true);

    if (reason === "input") {
      setOpen(true);
    }

    try {
      const matches = await searchCountries(value, signal);
      setItems(matches);
      setLoading(false);
    } catch (err) {
      // Superseded by a newer search - the fresh request now owns the loading state.
      if ((err as any).name !== "AbortError") {
        throw err;
      }
    }
  }, []);

  return (
    <ComboBox
      placeholder="Type to search countries"
      filter="None"
      loading={loading}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onLoadItems={handleLoadItems}
    >
      {items.map((country: string) => (
        <ComboBoxItem key={country} text={country} />
      ))}
    </ComboBox>
  );
}

export default App;
