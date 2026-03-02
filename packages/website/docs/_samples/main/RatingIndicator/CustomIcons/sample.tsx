import { createReactComponent } from "@ui5/webcomponents-base";
import RatingIndicatorClass from "@ui5/webcomponents/dist/RatingIndicator.js";

const RatingIndicator = createReactComponent(RatingIndicatorClass);

function App() {

  return (
    <>
      <!-- playground-hide-end -->
        <RatingIndicator value={3} icon-selected="heart" icon-unselected="heart-2" /></br>
        <RatingIndicator value={4} icon-selected="thumb-up" icon-unselected="border" /></br>
        <RatingIndicator value="2.5" icon-selected="circle-task-2" icon-unselected="border" readonly={true} />
        <!-- playground-hide -->
        <script type="module" src="main.js"></script>
    </>
  );
}

export default App;
