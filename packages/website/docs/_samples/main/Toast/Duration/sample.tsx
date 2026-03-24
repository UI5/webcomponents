import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

const Button = createReactComponent(ButtonClass);
const Toast = createReactComponent(ToastClass);

export const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Toast</Button>
      <Toast open={open} duration={5000} onClose={() => setOpen(false)}>
        Toast message, displayed for 5 seconds.
      </Toast>
    </>
  );
}
