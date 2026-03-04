import { useState, useRef, useCallback, useEffect } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import AIButtonClass from "@ui5/webcomponents-ai/dist/Button.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/ButtonState.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparatorClass from "@ui5/webcomponents/dist/MenuSeparator.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";

const AIButton = createReactComponent(AIButtonClass);
const AIButtonState = createReactComponent(AIButtonStateClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const MenuSeparator = createReactComponent(MenuSeparatorClass);

function App() {
  const [buttonState, setButtonState] = useState("generate");
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const generationIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (generationIdRef.current) {
        clearTimeout(generationIdRef.current);
      }
    };
  }, []);

  const startGeneration = useCallback(() => {
    generationIdRef.current = setTimeout(() => {
      setButtonState("revise");
      const btn = buttonRef.current;
      if (btn) {
        btn.accessibilityAttributes = {
          root: {
            hasPopup: "menu",
            roleDescription: "Menu Button",
          },
        };
      }
    }, 3000);
  }, []);

  const stopGeneration = useCallback(() => {
    if (generationIdRef.current) {
      clearTimeout(generationIdRef.current);
      generationIdRef.current = null;
    }
    const btn = buttonRef.current;
    if (btn) {
      btn.accessibilityAttributes = {
        root: {
          hasPopup: "false",
        },
      };
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    switch (buttonState) {
      case "generate":
        setButtonState("generating");
        startGeneration();
        break;
      case "generating":
        setButtonState("generate");
        stopGeneration();
        break;
      case "revise":
        if (menuRef.current && buttonRef.current) {
          menuRef.current!.opener = buttonRef.current;
          menuRef.current!.open = true;
          setMenuOpen(true);
        }
        break;
    }
  }, [buttonState, startGeneration, stopGeneration]);

  const handleMenuItemClick = useCallback((e: any) => {
    if (e.detail.text === "Regenerate") {
      setButtonState("generating");
      startGeneration();
    }
  }, [startGeneration]);

  return (
    <>
      <AIButton ref={buttonRef} id="myAiButton" state={buttonState} onClick={handleButtonClick}>
        <AIButtonState name="generate" text="Generate" icon="ai" />
        <AIButtonState name="generating" text="Stop Generating" icon="stop" />
        <AIButtonState name="revise" text="Revise" icon="ai" endIcon="navigation-down-arrow" />
      </AIButton>

      <Menu ref={menuRef} id="menu" onItemClick={handleMenuItemClick}>
        <MenuItem text="Regenerate" />
        <MenuSeparator />
        <MenuItem text="Fix Spelling & Grammar" />
        <MenuItem text="Change Tone">
          <MenuItem text="Option 1" />
          <MenuItem text="Option 2" />
          <MenuItem text="Option 3" />
        </MenuItem>
        <MenuItem text="Adjust Length">
          <MenuItem text="Shorten text" />
          <MenuItem text="Lengthen text" />
        </MenuItem>
        <MenuItem text="Bulleted List" />
        <MenuItem text="Translate">
          <MenuItem text="English" />
          <MenuItem text="German" />
          <MenuItem text="Spanish" />
        </MenuItem>
      </Menu>
    </>
  );
}

export default App;
