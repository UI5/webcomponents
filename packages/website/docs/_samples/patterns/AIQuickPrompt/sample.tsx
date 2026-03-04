import { createReactComponent } from "@ui5/webcomponents-base";
import { useState, useRef, useCallback, useEffect } from "react";
import AIButtonClass from "@ui5/webcomponents-ai/dist/Button.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/ButtonState.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparatorClass from "@ui5/webcomponents/dist/MenuSeparator.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";

const AIButton = createReactComponent(AIButtonClass);
const AIButtonState = createReactComponent(AIButtonStateClass);
const BusyIndicator = createReactComponent(BusyIndicatorClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Label = createReactComponent(LabelClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const MenuSeparator = createReactComponent(MenuSeparatorClass);
const TextArea = createReactComponent(TextAreaClass);
const Toast = createReactComponent(ToastClass);
const Token = createReactComponent(TokenClass);

function App() {
  const [buttonState, setButtonState] = useState("generate");
  const [busyActive, setBusyActive] = useState(false);
  const [outputValue, setOutputValue] = useState("");
  const [outputDisabled, setOutputDisabled] = useState(false);
  const [outputValueState, setOutputValueState] = useState("None");
  const [sendDisabled, setSendDisabled] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const aiButtonRef = useRef(null);
  const textsRef = useRef(null);
  const generationIdRef = useRef(null);
  const generationStoppedRef = useRef(false);
  const translationKeyRef = useRef("en");
  const currentTextKeyRef = useRef(null);

  useEffect(() => {
    fetch("../assets/data/predefinedTexts.json")
      .then(res => res.json())
      .then(data => {
        textsRef.current = data;
      });
  }, []);

  const stopGeneration = useCallback(() => {
    if (generationIdRef.current) {
      clearInterval(generationIdRef.current);
      generationIdRef.current = null;
    }
    generationStoppedRef.current = true;
    setSendDisabled(false);
    setOutputDisabled(false);
    setBusyActive(false);
  }, []);

  const generateText = useCallback((text, finalState) => {
    if (generationIdRef.current) {
      clearInterval(generationIdRef.current);
    }
    const words = text.split(" ");
    let currentWordIndex = 0;
    let accumulated = "";
    setOutputValue("");

    generationIdRef.current = setInterval(() => {
      if (currentWordIndex < words.length) {
        accumulated += words[currentWordIndex] + " ";
        setOutputValue(accumulated);
        currentWordIndex++;
        setSendDisabled(true);
        setOutputDisabled(true);
      } else {
        if (!generationStoppedRef.current) {
          setButtonState("revise");
          setOutputValueState("None");
          setBusyActive(false);
        }
        clearInterval(generationIdRef.current);
        generationIdRef.current = null;
        setSendDisabled(false);
        setOutputDisabled(false);
        setBusyActive(false);
      }
    }, 75);
  }, []);

  const startQuickPromptGeneration = useCallback((finalState) => {
    generationStoppedRef.current = false;
    const timeoutId = setTimeout(() => {
      setButtonState(finalState || "revise");
    }, 2000);
    generationIdRef.current = timeoutId;
  }, []);

  const stopBusyIndicatorAndGenerateText = useCallback((textMap, textKey) => {
    if (!textsRef.current) return;
    const key = translationKeyRef.current;
    const tKey = textKey || currentTextKeyRef.current;
    setTimeout(() => {
      generateText(textMap[key][tKey], "revise");
    }, 2000);
    generationStoppedRef.current = false;
  }, [generateText]);

  const handleAiButtonClick = useCallback(() => {
    switch (buttonState) {
      case "":
      case "generate": {
        setButtonState("generating");
        setBusyActive(true);
        setSendDisabled(true);
        const predefinedTexts = textsRef.current?.predefinedTexts;
        if (!predefinedTexts) return;
        const keys = Object.keys(predefinedTexts[translationKeyRef.current]);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        currentTextKeyRef.current = randomKey;
        stopBusyIndicatorAndGenerateText(predefinedTexts);
        break;
      }
      case "generating":
        setButtonState("revise");
        stopGeneration();
        break;
      case "revise":
        setMenuOpen(true);
        break;
      case "reviseGenerating":
        setButtonState("revise");
        stopGeneration();
        break;
    }
  }, [buttonState, stopGeneration, stopBusyIndicatorAndGenerateText]);

  const isTextWrong = useCallback(() => {
    if (!textsRef.current) return true;
    const key = translationKeyRef.current;
    const tKey = currentTextKeyRef.current;
    const trimmed = outputValue.trim();
    return trimmed !== textsRef.current.predefinedTexts?.[key]?.[tKey]
      && trimmed !== textsRef.current.predefinedTextsExpanded?.[key]?.[tKey]
      && trimmed !== textsRef.current.predefinedTextsBulleted?.[key]?.[tKey]
      && trimmed !== textsRef.current.predefinedTextsRephrased?.[key]?.[tKey]
      && trimmed !== textsRef.current.predefinedTextsSimplified?.[key]?.[tKey];
  }, [outputValue]);

  const startTextGeneration = useCallback((state, textMap) => {
    setBusyActive(true);
    setButtonState(state);
    stopBusyIndicatorAndGenerateText(textMap);
  }, [stopBusyIndicatorAndGenerateText]);

  const setStateAndGenerate = useCallback((state, textKey, textMap) => {
    setBusyActive(true);
    setButtonState(state);
    stopBusyIndicatorAndGenerateText(textMap, textKey);
  }, [stopBusyIndicatorAndGenerateText]);

  const handleMenuItemClick = useCallback((e) => {
    if (!textsRef.current) return;
    const predefinedTexts = textsRef.current.predefinedTexts;
    const predefinedTextsBulleted = textsRef.current.predefinedTextsBulleted;
    const predefinedTextsExpanded = textsRef.current.predefinedTextsExpanded;
    const predefinedTextsRephrased = textsRef.current.predefinedTextsRephrased;
    const predefinedTextsSimplified = textsRef.current.predefinedTextsSimplified;
    const predefinedTextsSummarized = textsRef.current.predefinedTextsSummarized;

    switch (e.detail.text) {
      case "Regenerate": {
        const keys = Object.keys(predefinedTexts[translationKeyRef.current]);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        currentTextKeyRef.current = randomKey;
        setStateAndGenerate("generating", randomKey, predefinedTexts);
        break;
      }
      case "Make Bulleted List":
        startTextGeneration("reviseGenerating", predefinedTextsBulleted);
        break;
      case "Clear Error":
        setOutputValueState("None");
        break;
      case "Fix Spelling and Grammar":
        if (isTextWrong()) {
          setStateAndGenerate("generating", currentTextKeyRef.current, predefinedTexts);
          setOutputValueState("Negative");
        } else {
          setOutputValueState("Positive");
          setTimeout(() => {
            setOutputValueState("None");
          }, 3000);
        }
        break;
      case "Generate Error":
        setOutputValueState("Negative");
        break;
      case "Simplify":
        startTextGeneration("reviseGenerating", predefinedTextsSimplified);
        break;
      case "Expand":
        startTextGeneration("reviseGenerating", predefinedTextsExpanded);
        break;
      case "Rephrase":
        startTextGeneration("reviseGenerating", predefinedTextsRephrased);
        break;
      case "Summarize":
        startTextGeneration("reviseGenerating", predefinedTextsSummarized);
        break;
      case "Bulgarian":
        translationKeyRef.current = "bg";
        startTextGeneration("reviseGenerating", predefinedTexts);
        break;
      case "English":
        translationKeyRef.current = "en";
        startTextGeneration("reviseGenerating", predefinedTexts);
        break;
      case "German":
        translationKeyRef.current = "de";
        startTextGeneration("reviseGenerating", predefinedTexts);
        break;
    }
  }, [isTextWrong, setStateAndGenerate, startTextGeneration]);

  const handleSendClick = useCallback(() => {
    if (outputValue) {
      setToastOpen(true);
      setOutputValueState("None");
      setOutputValue("");
    }
  }, [outputValue]);

  return (
    <>
      <style>{`
        [ui5-card] {
          width: 600px;
        }
        .quickPromptSection {
          display: flex;
          height: 450px;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
          border-start-start-radius: 0.625rem;
          border-start-end-radius: 0.625rem;
          gap: 0.5rem;
        }
        .quickPromptAiButton {
          align-self: flex-end;
        }
        .quickPromptLblBtn {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .quickPromptCardFooter {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          gap: 0.25rem;
          padding: 0 0.75rem 0.75rem 0.75rem;
        }
        .quickPromptBusyIndicator {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <Card>
        <CardHeader slot="header" title-text="Michael Adams" subtitle-text="Senior Sales Executive">
          <img src="https://ui5.github.io/webcomponents/images/avatars/man_avatar_1.png" slot="avatar" alt="avatar" />
        </CardHeader>
        <section className="quickPromptSection">
          <Label required={true}>To: </Label>
          <div style={{ display: "flex", gap: "0.125rem" }}>
            <Token style={{ width: "fit-content", marginBlockEnd: "1rem" }} selected={true} text="Diana Mihaylova" />
            <Token style={{ width: "fit-content", marginBlockEnd: "1rem" }} selected={true} text="DL Marketing Sector SAP" />
          </div>
          <div className="quickPromptLblBtn">
            <Label style={{ alignSelf: "flex-end" }} required={true}>Offer: </Label>
            <AIButton
              ref={aiButtonRef}
              className="quickPromptAiButton"
              state={buttonState}
              onClick={handleAiButtonClick}
            >
              <AIButtonState name="generate" text="Generate" icon="ai" />
              <AIButtonState name="generating" text="Stop Generating" icon="stop" />
              <AIButtonState name="reviseGenerating" text="Stop Generating" icon="stop" />
              <AIButtonState name="revise" text="Revise" icon="ai" end-icon="navigation-down-arrow" />
            </AIButton>
          </div>
          <BusyIndicator className="quickPromptBusyIndicator" active={busyActive}>
            <TextArea
              style={{ height: "100%" }}
              value={outputValue}
              disabled={outputDisabled}
              value-state={outputValueState}
            />
          </BusyIndicator>
        </section>
        <div className="quickPromptCardFooter">
          <Button design="Emphasized" disabled={sendDisabled} onClick={handleSendClick}>Send</Button>
          <Button design="Transparent">Cancel</Button>
        </div>
        <Toast placement="MiddleCenter" open={toastOpen} duration={3000}>Your message was sent successfully!</Toast>
      </Card>

      <Menu
        open={menuOpen}
        opener={aiButtonRef.current}
        horizontal-align="End"
        onItemClick={handleMenuItemClick}
        onClose={() => setMenuOpen(false)}
      >
        <MenuItem text="Regenerate" />
        <MenuSeparator />
        <MenuItem text="Fix Spelling and Grammar" />
        <MenuItem text="Rewrite Text">
          <MenuItem text="Simplify" />
          <MenuItem text="Expand" />
          <MenuItem text="Rephrase" />
          <MenuItem text="Summarize" />
        </MenuItem>
        <MenuItem text="Make Bulleted List" />
        <MenuItem text="Translate">
          <MenuItem text="Bulgarian" />
          <MenuItem text="English" />
          <MenuItem text="German" />
        </MenuItem>
        <MenuSeparator />
        <MenuItem text="Generate Error" />
        <MenuItem text="Clear Error" />
      </Menu>
    </>
  );
}

export default App;
