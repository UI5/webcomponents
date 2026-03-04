import { useRef } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

const Button = createComponent(ButtonClass);
const Toast = createComponent(ToastClass);

function App() {
  const toastRef = useRef(null);

  return (
    <>
      <Button onClick={() => { toastRef.current!.open = true; }}>Show Toast</Button>
      <Toast ref={toastRef} placement="MiddleCenter">Toast message, displayed in the "MiddleCenter".</Toast>
    </>
  );
}

export default App;
