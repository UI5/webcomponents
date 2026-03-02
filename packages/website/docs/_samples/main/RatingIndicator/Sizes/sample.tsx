import { createReactComponent } from "@ui5/webcomponents-base";
import RatingIndicatorClass from "@ui5/webcomponents/dist/RatingIndicator.js";

const RatingIndicator = createReactComponent(RatingIndicatorClass);

function App() {

  return (
    <>
      <!-- playground-hide-end -->
        <RatingIndicator Size="S" value="2.5" readonly={true} /></br>
        <RatingIndicator size="M" /></br>
        <RatingIndicator size="L" value={3} disabled={true} />
        <!-- playground-hide -->
        <script type="module" src="main.js"></script>
    </>
  );
}

export default App;
