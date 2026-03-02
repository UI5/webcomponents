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
        <Toast duration={5000}>Toast message, displayed for 5 seconds.</Toast>
    </>
  );
}

export default App;
