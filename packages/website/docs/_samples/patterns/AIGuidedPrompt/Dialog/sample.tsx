import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState, useRef, useCallback, useEffect } from "react";
import AIButtonClass from "@ui5/webcomponents-ai/dist/Button.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/ButtonState.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import RangeSliderClass from "@ui5/webcomponents/dist/RangeSlider.js";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";

const AIButton = createReactComponent(AIButtonClass);
const AIButtonState = createReactComponent(AIButtonStateClass);
const BusyIndicator = createReactComponent(BusyIndicatorClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Dialog = createReactComponent(DialogClass);
const Label = createReactComponent(LabelClass);
const Option = createReactComponent(OptionClass);
const RangeSlider = createReactComponent(RangeSliderClass);
const SegmentedButton = createReactComponent(SegmentedButtonClass);
const SegmentedButtonItem = createReactComponent(SegmentedButtonItemClass);
const Select = createReactComponent(SelectClass);
const TextArea = createReactComponent(TextAreaClass);
const Toast = createReactComponent(ToastClass);
const Token = createReactComponent(TokenClass);

export const Example = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [aiButtonState, setAiButtonState] = useState("generate");
  const [busyActive, setBusyActive] = useState(false);
  const [outputValue, setOutputValue] = useState("");
  const [outputDisabled, setOutputDisabled] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);

  const optionsRef = useRef({
    structure: "paragraph",
    language: "en",
    toneOfVoice: 2,
  });
  const textsRef = useRef(null);
  const generationIdRef = useRef(null);
  const generationStoppedRef = useRef(false);
  const delayTimeoutRef = useRef(null);

  useEffect(() => {
    fetch("../assets/data/predefinedTexts.json")
      .then((res) => res.json())
      .then((data) => {
        textsRef.current = {
          paragraph: data.predefinedTexts,
          bulleted: data.predefinedTextsBulleted,
        };
      });
  }, []);

  const stopGenerating = useCallback(() => {
    generationStoppedRef.current = true;
    setBusyActive(false);
    setAiButtonState("generate");
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
    if (generationIdRef.current) {
      clearInterval(generationIdRef.current);
      generationIdRef.current = null;
    }
    setSendDisabled(false);
    setOutputDisabled(false);
  }, []);

  const startGenerating = useCallback(() => {
    if (!textsRef.current) return;
    const opts = optionsRef.current;
    const text =
      textsRef.current[opts.structure][opts.language][opts.toneOfVoice];
    setBusyActive(true);
    setOutputValue("");
    setAiButtonState("generating");
    generationStoppedRef.current = false;
    setSendDisabled(true);
    setOutputDisabled(true);
    setDialogOpen(false);

    delayTimeoutRef.current = setTimeout(() => {
      if (generationStoppedRef.current) return;

      const words = text.split(" ");
      let currentWordIndex = 0;
      let accumulated = "";

      const id = setInterval(() => {
        if (currentWordIndex < words.length && !generationStoppedRef.current) {
          accumulated += words[currentWordIndex] + " ";
          setOutputValue(accumulated);
          currentWordIndex++;
        } else {
          if (!generationStoppedRef.current) {
            setAiButtonState("generate");
          }
          setBusyActive(false);
          clearInterval(id);
          generationIdRef.current = null;
          setSendDisabled(false);
          setOutputDisabled(false);
        }
      }, 75);
      generationIdRef.current = id;
    }, 2000);
  }, []);

  const handleOpenDialogButtonClick = useCallback(() => {
    if (aiButtonState === "generate") {
      setDialogOpen(true);
    } else if (aiButtonState === "generating") {
      stopGenerating();
    }
  }, [aiButtonState, stopGenerating]);

  const handleApplyClick = useCallback(() => {
    startGenerating();
  }, [startGenerating]);

  const handleCloseDialogClick = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleStructureChange = useCallback(
    (e: UI5CustomEvent<SelectClass, "change">) => {
      optionsRef.current!.structure = e.detail.selectedOption.value;
    },
    [],
  );

  const handleLanguageChange = useCallback(
    (e: UI5CustomEvent<SelectClass, "change">) => {
      optionsRef.current!.language = e.detail.selectedOption.value;
    },
    [],
  );

  const handleToneOfVoiceChange = useCallback(
    (e: UI5CustomEvent<SegmentedButtonClass, "selection-change">) => {
      const value = e.detail.selectedItems[0].innerText;
      switch (value) {
        case "Formal":
          optionsRef.current!.toneOfVoice = 1;
          break;
        case "Neutral":
          optionsRef.current!.toneOfVoice = 2;
          break;
        case "Casual":
          optionsRef.current!.toneOfVoice = 3;
          break;
      }
    },
    [],
  );

  const handleSendClick = useCallback(() => {
    if (outputValue) {
      setToastOpen(true);
      setOutputValue("");
    }
  }, [outputValue]);

  return (
    <>
      <style>{`
        [ui5-card] {
          width: 600px;
        }
        .guidedPromptSection {
          display: flex;
          height: 450px;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
          border-start-start-radius: 0.625rem;
          border-start-end-radius: 0.625rem;
          gap: 0.5rem;
        }
        .guidedPromptLblBtn {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .guidedPromptForm,
        .guidedPromptFormGroup {
          display: flex;
          flex-direction: column;
        }
        .guidedPromptFormGroup:not(:first-child) {
          margin-top: 1rem;
        }
        .guidedPromptForm [ui5-select] {
          width: 100%;
        }
        .guidedPromptForm [ui5-range-slider] {
          margin-top: 1.5rem;
        }
        [ui5-dialog] {
          width: 20rem;
        }
        .guidedPromptDialogFooter,
        .guidedPromptCardFooter {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          gap: 0.25rem;
          padding: 0 0.75rem 0.75rem 0.75rem;
        }
        .guidedPromptDialogFooter {
          align-items: center;
          padding: 0.25rem 0;
          width: 100%;
        }
      `}</style>
      <Dialog open={dialogOpen} headerText="Improve Text">
        <div className="content">
          <div className="guidedPromptForm">
            <div className="guidedPromptFormGroup">
              <Label showColon={true}>Structure</Label>
              <Select onChange={handleStructureChange}>
                <Option value="paragraph">Paragraph</Option>
                <Option value="bulleted"> Bullet list</Option>
              </Select>
            </div>
            <div className="guidedPromptFormGroup">
              <Label showColon={true}>Length</Label>
              <RangeSlider
                min={50}
                max={150}
                startValue={75}
                endValue={125}
                showTooltip={true}
              />
            </div>
            <div className="guidedPromptFormGroup">
              <Label showColon={true}>Language</Label>
              <Select onChange={handleLanguageChange}>
                <Option value="en">English</Option>
                <Option value="de">German</Option>
              </Select>
            </div>
            <div className="guidedPromptFormGroup">
              <Label showColon={true}>Tone Of Voice</Label>
              <SegmentedButton onSelectionChange={handleToneOfVoiceChange}>
                <SegmentedButtonItem>Formal</SegmentedButtonItem>
                <SegmentedButtonItem selected={true}>
                  Neutral
                </SegmentedButtonItem>
                <SegmentedButtonItem>Casual</SegmentedButtonItem>
              </SegmentedButton>
            </div>
          </div>
        </div>

        <div slot="footer" className="guidedPromptDialogFooter">
          <Button design="Emphasized" icon="ai" onClick={handleApplyClick}>
            Apply
          </Button>
          <Button onClick={handleCloseDialogClick}>Close</Button>
        </div>
      </Dialog>

      <Card>
        <CardHeader
          slot="header"
          titleText="Monique Legrand"
          subtitleText="Senior Sales Executive"
        >
          <img
            src="https://ui5.github.io/webcomponents/images/avatars/woman_avatar_1.png"
            slot="avatar"
			alt="Monique Legrand"
          />
        </CardHeader>
        <section className="guidedPromptSection">
          <Label showColon={true} required={true}>To</Label>
          <div style={{ display: "flex", gap: "0.125rem" }}>
            <Token
              style={{ width: "fit-content", marginBlockEnd: "1rem" }}
              selected={true}
              text="DL Marketing Sector SAP"
            />
          </div>
          <div className="guidedPromptLblBtn">
            <Label showColon={true} style={{ alignSelf: "flex-end" }} required={true}>
              Offer
            </Label>
            <AIButton
              state={aiButtonState}
              onClick={handleOpenDialogButtonClick}
            >
              <AIButtonState name="generate" text="Compose Text" icon="ai" />
              <AIButtonState
                name="generating"
                text="Stop Generating"
                icon="stop"
              />
            </AIButton>
          </div>
          <BusyIndicator style={{ height: "100%" }} active={busyActive}>
            <TextArea
              style={{ height: "100%" }}
              value={outputValue}
              disabled={outputDisabled}
            />
          </BusyIndicator>
        </section>
        <div className="guidedPromptCardFooter">
          <Button
            design="Emphasized"
            disabled={sendDisabled}
            onClick={handleSendClick}
          >
            Send
          </Button>
          <Button design="Transparent">Cancel</Button>
        </div>
        <Toast placement="MiddleCenter" open={toastOpen} duration={3000}>
          Your message was sent successfully!
        </Toast>
      </Card>
    </>
  );
}
