import { createReactComponent } from "@ui5/webcomponents-base";
import RatingIndicatorClass from "@ui5/webcomponents/dist/RatingIndicator.js";

const RatingIndicator = createReactComponent(RatingIndicatorClass);

function App() {

  return (
    <>
      <!-- playground-hide-end -->
        <RatingIndicator value={4} max={7} /></br>
        <RatingIndicator value={4} max={7} readonly={true} /></br>
        <RatingIndicator value={4} max={7} disabled={true} />
        <!-- playground-hide -->
        <script type="module" src="main.js"></script>
    </>
  );
}

export default App;
