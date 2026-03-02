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
        <Toast>This is a Toast message.</Toast>
    </>
  );
}

export default App;
