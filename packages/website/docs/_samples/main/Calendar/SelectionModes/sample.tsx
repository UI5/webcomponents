import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Calendar = createComponent(CalendarClass);
const Title = createComponent(TitleClass);

function App() {
  return (
    <>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "1rem" }}
      >
        <Title level="H5">Single</Title>
        <Calendar selectionMode="Single" />
        <Title level="H5">Multiple</Title>
        <Calendar selectionMode="Multiple" />
        <Title level="H5">Range</Title>
        <Calendar selectionMode="Range" />
      </div>
    </>
  );
}

export default App;
