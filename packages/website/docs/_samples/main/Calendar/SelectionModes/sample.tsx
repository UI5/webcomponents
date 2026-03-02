import { createReactComponent } from "@ui5/webcomponents-base";
import CalendarClass from "@ui5/webcomponents/dist/Calendar.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Calendar = createReactComponent(CalendarClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "1rem" }}>
            <Title level="H5">Single</Title>
            <Calendar selection-mode="Single" />
            <Title level="H5">Multiple</Title>
            <Calendar selection-mode="Multiple" />
            <Title level="H5">Range</Title>
            <Calendar selection-mode="Range" />
        </div>
    </>
  );
}

export default App;
