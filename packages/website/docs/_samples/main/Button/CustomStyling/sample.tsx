import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const Button = createReactComponent(ButtonClass);

function App() {
  return (
    <>
      <style>{`
            [ui5-button] {
                width: 10rem;
                color: DarkSlateBlue;
                background-color: #f4f2fd;
                border-color: DarkSlateBlue;
            }
            [ui5-button]:active,
            [ui5-button]:hover {
                background-color: #dad4f7;
            }
        `}</style>
      <Button>Custom Button</Button>
    </>
  );
}

export default App;
