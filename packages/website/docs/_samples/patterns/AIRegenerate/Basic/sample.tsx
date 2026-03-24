import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState, useRef, useCallback, useEffect } from "react";
import AIButtonClass from "@ui5/webcomponents-ai/dist/Button.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/ButtonState.js";
import DynamicPageClass from "@ui5/webcomponents-fiori/dist/DynamicPage.js";
import DynamicPageHeaderClass from "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";

const AIButton = createReactComponent(AIButtonClass);
const AIButtonState = createReactComponent(AIButtonStateClass);
const DynamicPage = createReactComponent(DynamicPageClass);
const DynamicPageHeader = createReactComponent(DynamicPageHeaderClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const Avatar = createReactComponent(AvatarClass);
const BusyIndicator = createReactComponent(BusyIndicatorClass);
const Button = createReactComponent(ButtonClass);
const CheckBox = createReactComponent(CheckBoxClass);
const Dialog = createReactComponent(DialogClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);

const DEFAULT_OUTPUT1 =
  "Discover the ultimate solution for home organization with our versatile storage bins. These durable containers come in various sizes to fit any space, from closets to garages. Their stackable design maximizes your storage capacity while keeping your items easily accessible. Each bin features a transparent body, allowing you to quickly identify contents without opening them. Perfect for seasonal items, toys, or tools, these storage bins are the key to a clutter-free home. Start organizing today and enjoy a more spacious and tidy living environment.";
const DEFAULT_OUTPUT2 =
  "Experience the future of cooking with our state-of-the-art smart oven. This innovative appliance offers a range of features to enhance your culinary skills, including precise temperature control and multiple cooking modes. The smart oven connects to your smartphone, allowing you to monitor and adjust settings remotely. With its sleek design and intuitive interface, cooking has never been easier or more enjoyable. Whether you're baking, roasting, or broiling, this smart oven ensures perfect results every time. Upgrade your kitchen and transform the way you cook.";

export const Example = () => {
  const [aiButtonState, setAiButtonState] = useState("regenerate");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [skipDialog, setSkipDialog] = useState(false);
  const [busy1, setBusy1] = useState(false);
  const [busy2, setBusy2] = useState(false);
  const [output1Text, setOutput1Text] = useState(DEFAULT_OUTPUT1);
  const [output2Text, setOutput2Text] = useState(DEFAULT_OUTPUT2);

  const textsRef = useRef(null);
  const generationIntervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const checkboxRef = useRef(null);

  useEffect(() => {
    fetch("../assets/data/predefinedTexts.json")
      .then((res) => res.json())
      .then((data) => {
        textsRef.current = data.predefinedTexts;
      });
  }, []);

  const getRandomPredefinedText = useCallback((texts: any, count: number) => {
    const keys = Object.keys(texts);
    const selectedTexts = [];
    for (let i = 0; i < count; i++) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      selectedTexts.push(texts[randomKey]);
    }
    return selectedTexts;
  }, []);

  const setBusyIndicator = useCallback((isActive: boolean) => {
    setBusy1(isActive);
    setBusy2(isActive);
  }, []);

  const stopTextGeneration = useCallback(() => {
    generationIntervalsRef.current!.forEach(clearInterval);
    generationIntervalsRef.current = [];
    setBusyIndicator(false);
  }, [setBusyIndicator]);

  const typeText = useCallback((text: string, setter: (val: string) => void) => {
    const words = text.split(" ");
    setter("");
    return new Promise((resolve) => {
      let index = 0;
      let accumulated = "";
      const interval = setInterval(() => {
        if (index < words.length) {
          accumulated += words[index] + " ";
          setter(accumulated);
          index++;
        } else {
          clearInterval(interval);
          const intervals = generationIntervalsRef.current;
          const idx = intervals.indexOf(interval);
          if (idx !== -1) intervals.splice(idx, 1);
          resolve(null);
        }
      }, 50);
      generationIntervalsRef.current!.push(interval);
    });
  }, []);

  const startTextGeneration = useCallback(async () => {
    if (!textsRef.current) return;
    setBusyIndicator(true);
    try {
      const texts = textsRef.current["en"];
      const [text1, text2] = getRandomPredefinedText(texts, 2);
      await typeText(text1, setOutput1Text);
      await typeText(text2, setOutput2Text);
      setBusyIndicator(false);
      setAiButtonState("regenerate");
    } catch (error) {
      stopTextGeneration();
    }
  }, [setBusyIndicator, getRandomPredefinedText, typeText, stopTextGeneration]);

  const startGenerationHandler = useCallback(() => {
    if (aiButtonState === "" || aiButtonState === "regenerate") {
      setAiButtonState("generating");
      startTextGeneration();
    }
  }, [aiButtonState, startTextGeneration]);

  const handleAiButtonClick = useCallback(() => {
    if (aiButtonState === "generating") {
      setAiButtonState("regenerate");
      stopTextGeneration();
      return;
    }
    if (skipDialog) {
      startGenerationHandler();
    } else {
      setDialogOpen(true);
    }
  }, [aiButtonState, skipDialog, startGenerationHandler, stopTextGeneration]);

  const handleDialogProceed = useCallback(() => {
    if (checkboxRef.current && checkboxRef.current!.checked) {
      setSkipDialog(true);
    }
    setDialogOpen(false);
    startGenerationHandler();
  }, [startGenerationHandler]);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <>
      <style>{`
        .page {
          height: 31.25rem;
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .header {
          height: 7.8125rem;
          position: relative;
          width: 100%;
          background-color: white;
        }
        .ai-button {
          position: absolute;
          bottom: 0.625rem;
          right: 2rem;
        }
        .section {
          border-radius: 0.25rem;
          background: white;
          padding: 2rem 3rem;
          margin: 2rem;
        }
        .busy-indicator {
          width: 100%;
        }
        .output-text {
          width: 100%;
          height: 10rem;
        }
        .dialog-footer {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          align-items: center;
          gap: 0.25rem;
        }
      `}</style>
      <DynamicPage class="page">
        <DynamicPageHeader style={{ height: "9.375rem" }}>
          <ShellBar>
            <ShellBarBranding slot="branding">
              Your Application
              <img
                slot="logo"
                src="https://ui5.github.io/webcomponents/nightly/images/sap-logo-svg.svg"
                alt="SAP Logo"
              />
            </ShellBarBranding>
            <Avatar slot="profile">
              <img
                src="https://ui5.github.io/webcomponents/nightly/images/avatars/woman_avatar_3.png"
                alt="avatar"
              />
            </Avatar>
          </ShellBar>
          <AIButton
            style={{ float: "inline-end", margin: "1.375rem" }}
            state={aiButtonState}
            onClick={handleAiButtonClick}
          >
            <AIButtonState name="regenerate" text="Regenerate" icon="ai" />
            <AIButtonState
              name="generating"
              text="Stop Generating"
              icon="stop"
            />
          </AIButton>
        </DynamicPageHeader>

        <div className="content">
          <div className="section">
            <Title level="H1" size="H4">
              Article 1
            </Title>
            <Title level="H2" size="H5">
              Informative Subtitle for Article 1
            </Title>
            <br />
            <hr />
            <BusyIndicator delay={0} class="busy-indicator" active={busy1}>
              <Text class="output-text">{output1Text}</Text>
            </BusyIndicator>
            <Title level="H1" size="H4">
              Article 2
            </Title>
            <Title level="H2" size="H5">
              Informative Subtitle for Article 2
            </Title>
            <br />
            <hr />
            <BusyIndicator delay={0} class="busy-indicator" active={busy2}>
              <Text class="output-text">{output2Text}</Text>
            </BusyIndicator>
          </div>
        </div>
      </DynamicPage>

      <Dialog open={dialogOpen} state="Critical" headerText="Warning">
        <Text>
          Regenerating will overwrite all fields with AI-generated content.
          <br />
          Do you want to continue?
        </Text>
        <CheckBox
          ref={checkboxRef}
          style={{ marginInlineStart: "-0.625rem" }}
          text="Don't ask me again"
        />
        <div slot="footer" className="dialog-footer">
          <Button design="Emphasized" onClick={handleDialogProceed}>
            Regenerate
          </Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </div>
      </Dialog>
    </>
  );
}
