import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";

const Button = createReactComponent(ButtonClass);
const CheckBox = createReactComponent(CheckBoxClass);

function App() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const selectedLanguages = formData.getAll("languages");
    output.textContent = "Selected languages: " + selectedLanguages.join(", ");
  };

  return (
    <>
      <form id="form" method="post">
            <div className="checkbox-group">
                <CheckBox id="js" text="JavaScript" value="js" name="languages" />
                <CheckBox id="python" text="Python" value="python" name="languages" />
                <CheckBox id="java" text="Java" value="java" name="languages" />
                <CheckBox id="csharp" text="C#" value="csharp" name="languages" />
            </div>
            <Button type="Submit" design="Emphasized" >Submit Form</Button>
        </form>
        <div id="output"></div>
    </>
  );
}

export default App;
