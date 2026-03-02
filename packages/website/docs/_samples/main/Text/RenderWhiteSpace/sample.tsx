import { createReactComponent } from "@ui5/webcomponents-base";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Text = createReactComponent(TextClass);

function App() {

  return (
    <>
      <!-- playground-fold-end -->

    	<Text style={{ whiteSpace: "pre", width: "300px" }}>     White spaces are preserved on this line.

    This line is preceded by an empty line.
    	This line is preceded by a tab.
    	</Text>

    	<!-- playground-fold-end -->
    	<script type="module" src="main.js"></script>
    </>
  );
}

export default App;
