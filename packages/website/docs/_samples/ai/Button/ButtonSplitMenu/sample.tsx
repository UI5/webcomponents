import { useState, useRef, useCallback, useEffect } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AIButtonClass from "@ui5/webcomponents-ai/dist/Button.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/ButtonState.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";

const AIButton = createReactComponent(AIButtonClass);
const AIButtonState = createReactComponent(AIButtonStateClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

function App() {
  const [buttonState, setButtonState] = useState("generate");
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const generationIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTriggerStateRef = useRef("generate");

  useEffect(() => {
    return () => {
      if (generationIdRef.current) {
        clearTimeout(generationIdRef.current);
      }
    };
  }, []);

  const startGeneration = useCallback(() => {
    generationIdRef.current = setTimeout(() => {
      setButtonState("regenerate");
      const btn = buttonRef.current;
      if (btn) {
        btn.accessibilityAttributes = {
          root: {
            hasPopup: "menu",
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
      case "":
      case "generate":
        prevTriggerStateRef.current = "generate";
        setButtonState("generating");
        startGeneration();
        break;
      case "generating":
        setButtonState(prevTriggerStateRef.current);
        stopGeneration();
        break;
      case "regenerate":
        if (menuRef.current) {
          menuRef.current!.open = false;
        }
        prevTriggerStateRef.current = "regenerate";
        setButtonState("generating");
        startGeneration();
        break;
    }
  }, [buttonState, startGeneration, stopGeneration]);

  const handleArrowButtonClick = useCallback(() => {
    if (menuRef.current && buttonRef.current) {
      menuRef.current!.opener = buttonRef.current;
      menuRef.current!.open = true;
      setMenuOpen(true);
    }
  }, []);

  const handleMenuItemClick = useCallback(() => {
    prevTriggerStateRef.current = "regenerate";
    setButtonState("generating");
    startGeneration();
  }, [startGeneration]);

  const handleMenuOpen = useCallback(() => {
    const btn = buttonRef.current;
    if (btn) {
      btn.arrowButtonPressed = true;
    }
  }, []);

  const handleMenuClose = useCallback(() => {
    const btn = buttonRef.current;
    if (btn) {
      btn.arrowButtonPressed = false;
    }
    setMenuOpen(false);
  }, []);

  return (
    <>
      <AIButton
        ref={buttonRef}
        id="myAiButton"
        state={buttonState}
        onClick={handleButtonClick}
        onArrowButtonClick={handleArrowButtonClick}
      >
        <AIButtonState name="generate" text="Generate" icon="ai" />
        <AIButtonState name="generating" text="Stop Generating" icon="stop" />
        <AIButtonState
          name="regenerate"
          text="Regenerate"
          icon="ai"
          showArrowButton={true}
        />
      </AIButton>

      <Menu
        ref={menuRef}
        id="menu"
        onItemClick={handleMenuItemClick}
        onOpen={handleMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem text="Edit prompt" />
        <MenuItem text="Change tone" />
      </Menu>
    </>
  );
}

export default App;
