import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import RatingIndicatorClass from "@ui5/webcomponents/dist/RatingIndicator.js";
import "@ui5/webcomponents-icons/dist/heart.js";
import "@ui5/webcomponents-icons/dist/heart-2.js";
import "@ui5/webcomponents-icons/dist/thumb-up.js";
import "@ui5/webcomponents-icons/dist/border.js";
import "@ui5/webcomponents-icons/dist/circle-task-2.js";

const RatingIndicator = createComponent(RatingIndicatorClass);

function App() {
  return (
    <>
      <RatingIndicator value={3} ratedIcon="heart" unratedIcon="heart-2" />
      <br />
      <RatingIndicator value={4} ratedIcon="thumb-up" unratedIcon="border" />
      <br />
      <RatingIndicator
        value={2.5}
        ratedIcon="circle-task-2"
        unratedIcon="border"
        readonly={true}
      />
    </>
  );
}

export default App;
