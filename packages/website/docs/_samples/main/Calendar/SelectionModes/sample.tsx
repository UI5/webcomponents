import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Calendar = createReactComponent(CalendarClass);
const Title = createReactComponent(TitleClass);

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
