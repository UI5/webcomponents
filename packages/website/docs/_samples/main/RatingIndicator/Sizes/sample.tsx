import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import RatingIndicatorClass from "@ui5/webcomponents/dist/RatingIndicator.js";
import "@ui5/webcomponents-icons/dist/favorite.js";
import "@ui5/webcomponents-icons/dist/unfavorite.js";

const RatingIndicator = createComponent(RatingIndicatorClass);

function App() {

  return (
    <>
        <RatingIndicator Size="S" value="2.5" readonly={true} /><br />
        <RatingIndicator size="M" /><br />
        <RatingIndicator size="L" value={3} disabled={true} />
    </>
  );
}

export default App;
