import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import RatingIndicatorClass from "@ui5/webcomponents/dist/RatingIndicator.js";
import "@ui5/webcomponents-icons/dist/favorite.js";
import "@ui5/webcomponents-icons/dist/unfavorite.js";

const RatingIndicator = createReactComponent(RatingIndicatorClass);

function App() {

  return (
    <>
        <RatingIndicator value={4} max={7} /><br />
        <RatingIndicator value={4} max={7} readonly={true} /><br />
        <RatingIndicator value={4} max={7} disabled={true} />
    </>
  );
}

export default App;
