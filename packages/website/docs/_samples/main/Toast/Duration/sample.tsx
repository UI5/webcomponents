import { useRef } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

const Button = createReactComponent(ButtonClass);
const Toast = createReactComponent(ToastClass);

function App() {
  const toastRef = useRef(null);

  return (
    <>
      <Button onClick={() => { toastRef.current.open = true; }}>Show Toast</Button>
      <Toast ref={toastRef} duration={5000}>Toast message, displayed for 5 seconds.</Toast>
    </>
  );
}

export default App;
