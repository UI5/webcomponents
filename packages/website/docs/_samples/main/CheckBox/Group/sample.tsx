import { useState, useRef, FormEvent } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";

const Button = createReactComponent(ButtonClass);
const CheckBox = createReactComponent(CheckBoxClass);

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const [output, setOutput] = useState("");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const selectedLanguages = formData.getAll("languages");
    setOutput("Selected languages: " + selectedLanguages.join(", "));
  };

  return (
    <>
      <style>{`
        .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 15px 0;
        }

        #output {
        	margin: 1rem 0;
        }
      `}</style>
      <form ref={formRef} id="form" method="post" onSubmit={handleFormSubmit}>
        <div className="checkbox-group">
          <CheckBox id="js" text="JavaScript" value="js" name="languages" />
          <CheckBox id="python" text="Python" value="python" name="languages" />
          <CheckBox id="java" text="Java" value="java" name="languages" />
          <CheckBox id="csharp" text="C#" value="csharp" name="languages" />
        </div>
        <Button type="Submit" design="Emphasized">
          Submit Form
        </Button>
      </form>
      <div id="output">{output}</div>
    </>
  );
}

export default App;
