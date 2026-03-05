import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

const Button = createComponent(ButtonClass);
const Toast = createComponent(ToastClass);

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Toast</Button>
      <Toast open={open} placement="MiddleCenter" onClose={() => setOpen(false)}>Toast message, displayed in the "MiddleCenter".</Toast>
    </>
  );
}

export default App;
