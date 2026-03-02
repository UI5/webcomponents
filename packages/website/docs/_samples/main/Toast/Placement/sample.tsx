import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

const Button = createReactComponent(ButtonClass);
const Toast = createReactComponent(ToastClass);

function App() {

  const handleClick = () => {
    toast.open = true;
  };

  return (
    <>
      <Button>Show Toast</Button>
        <Toast placement="MiddleCenter">Toast message, displayed in the "MiddleCenter".</Toast>
    </>
  );
}

export default App;
