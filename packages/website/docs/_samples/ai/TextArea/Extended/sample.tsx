import { useState, useRef, useCallback, useEffect } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import AITextAreaClass from "@ui5/webcomponents-ai/dist/TextArea.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";

const AITextArea = createReactComponent(AITextAreaClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

const SAMPLE_TEXTS: Record<string, string> = {
  en: "Innovation managers operate with both creativity and business acumen, driving initiatives that cultivate an innovation-friendly culture, streamline the execution of new ideas, and ultimately unlock value for the organization and its customers.",
  bg: "\u041C\u0435\u043D\u0438\u0434\u0436\u044A\u0440\u0438\u0442\u0435 \u043F\u043E \u0438\u043D\u043E\u0432\u0430\u0446\u0438\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0430\u0442 \u0441 \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u043E\u0441\u0442 \u0438 \u0431\u0438\u0437\u043D\u0435\u0441 \u0443\u0441\u0435\u0442, \u043A\u0430\u0442\u043E \u043D\u0430\u0441\u044A\u0440\u0447\u0430\u0432\u0430\u0442 \u0438\u043D\u0438\u0446\u0438\u0430\u0442\u0438\u0432\u0438, \u043A\u043E\u0438\u0442\u043E \u0438\u0437\u0433\u0440\u0430\u0436\u0434\u0430\u0442 \u043A\u0443\u043B\u0442\u0443\u0440\u0430, \u0431\u043B\u0430\u0433\u043E\u043F\u0440\u0438\u044F\u0442\u0441\u0442\u0432\u0430\u0449\u0430 \u0438\u043D\u043E\u0432\u0430\u0446\u0438\u0438\u0442\u0435, \u0443\u043B\u0435\u0441\u043D\u044F\u0432\u0430\u0442 \u0440\u0435\u0430\u043B\u0438\u0437\u0438\u0440\u0430\u043D\u0435\u0442\u043E \u043D\u0430 \u043D\u043E\u0432\u0438 \u0438\u0434\u0435\u0438 \u0438 \u0432 \u043A\u0440\u0430\u0439\u043D\u0430 \u0441\u043C\u0435\u0442\u043A\u0430 \u0441\u044A\u0437\u0434\u0430\u0432\u0430\u0442 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0437\u0430 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F\u0442\u0430 \u0438 \u043D\u0435\u0439\u043D\u0438\u0442\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u0438.",
  de: "Innovationsmanager agieren mit sowohl Kreativit\u00E4t als auch unternehmerischem Geschick. Sie treiben Initiativen voran, die eine innovationsfreundliche Unternehmenskultur f\u00F6rdern, die Umsetzung neuer Ideen optimieren und letztlich Mehrwert f\u00FCr das Unternehmen und seine Kunden schaffen.",
  bulleted: "Innovation managers:\n\u2022 Operate with creativity and business acumen\n\u2022 Drive initiatives that cultivate an innovation-friendly culture\n\u2022 Streamline the execution of new ideas\n\u2022 Unlock value for the organization and its customers",
  expanded: "Innovation managers play a pivotal role in organizations by blending creativity with strategic business acumen. They are not just responsible for generating innovative ideas but also for fostering a culture that encourages experimentation, collaboration, and out-of-the-box thinking among teams. These professionals work tirelessly to identify opportunities for improvement, anticipate market trends, and develop solutions that align with the organization's goals and customer needs. In their efforts to promote an innovation-friendly environment, they implement frameworks and processes that remove barriers to creativity, making it easier for teams to brainstorm, prototype, and refine new concepts. Beyond idea generation, innovation managers ensure that these ideas are systematically evaluated and effectively executed, transforming them into tangible value propositions. This requires them to bridge the gap between visionary thinking and practical implementation, often by collaborating with cross-functional teams, securing resources, and navigating organizational dynamics. Ultimately, the work of innovation managers unlocks significant value, driving growth, enhancing customer satisfaction, and ensuring the organization remains competitive in a rapidly evolving landscape. Their dual focus on creativity and business results positions them as key drivers of sustainable innovation and long-term success.",
  simplified: "Innovation managers use creativity and business skills to promote innovation, simplify the development of new ideas, and deliver value to the organization and its customers.",
  summarized: "Innovation managers blend creativity and business skills to foster innovation, simplify idea implementation, and create value for organizations and customers.",
};

const TIMING_CONFIG = {
  processingDelay: 3000,
  typingSpeed: 10,
};

interface MenuConfigItem {
  text: string;
  action?: string;
  processingLabel?: string;
  completedLabel?: string;
  textKey?: string;
  replaces?: string;
  startsSection?: boolean;
  children?: MenuConfigItem[];
}

const MENU_CONFIG: MenuConfigItem[] = [
  {
    text: "Regenerate",
    action: "regenerate",
    processingLabel: "Regenerating ...",
    completedLabel: "Regenerated text",
    textKey: "en",
    replaces: "generate",
  },
  {
    text: "Fix spelling and grammar",
    action: "fixSpelling",
    processingLabel: "Fixing spelling and grammar...",
    completedLabel: "Fixed spelling and grammar",
    textKey: "en",
    startsSection: true,
  },
  {
    text: "Rewrite text",
    children: [
      { text: "Simplify", action: "simplify", processingLabel: "Simplifying text...", completedLabel: "Simplified text", textKey: "simplified" },
      { text: "Expand", action: "expand", processingLabel: "Expanding text...", completedLabel: "Expanded text", textKey: "expanded" },
      { text: "Summarize", action: "summarize", processingLabel: "Summarizing text...", completedLabel: "Summarized text", textKey: "summarized" },
    ],
  },
  {
    text: "Make bulleted list",
    action: "bullets",
    processingLabel: "Making bulleted list...",
    completedLabel: "Made bulleted list",
    textKey: "bulleted",
  },
  {
    text: "Translate",
    children: [
      { text: "English", action: "translateEN", processingLabel: "Translating to English...", completedLabel: "Translated to English", textKey: "en" },
      { text: "German", action: "translateDE", processingLabel: "Translating to German...", completedLabel: "Translated to German", textKey: "de" },
      { text: "Bulgarian", action: "translateBG", processingLabel: "Translating to Bulgarian...", completedLabel: "Translated to Bulgarian", textKey: "bg" },
    ],
  },
];

interface VersionEntry {
  value: string;
  action: string;
  endAction: string;
  timestamp: string;
}

function App() {
  const textareaRef = useRef<any>(null);
  const [textValue, setTextValue] = useState(
    "Innovation managers operate with both creativity and business acumen, driving initiatives that cultivate an innovation-friendly culture."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(0);
  const [totalVersions, setTotalVersions] = useState(0);
  const [promptDescription, setPromptDescription] = useState("");
  const [hasHistory, setHasHistory] = useState(false);

  const versionHistoryRef = useRef<VersionEntry[]>([]);
  const currentIndexRef = useRef(0);
  const currentActionRef = useRef<string | null>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const generationIndexRef = useRef(0);
  const contentBeforeGenRef = useRef("");

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const stopTypingAnimation = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }, []);

  const saveCurrentVersion = useCallback(() => {
    const history = versionHistoryRef.current;
    if (history.length > 0 && history[currentIndexRef.current]) {
      const textarea = textareaRef.current;
      history[currentIndexRef.current].value = textarea ? textarea.value : "";
    }
  }, []);

  const updateComponentState = useCallback((versionIndex: number | null = null) => {
    const history = versionHistoryRef.current;
    if (versionIndex !== null && history[versionIndex]) {
      currentIndexRef.current = versionIndex;
      setTextValue(history[versionIndex].value);
      if (textareaRef.current) {
        textareaRef.current!.value = history[versionIndex].value;
      }
    }

    setCurrentVersion(currentIndexRef.current + 1);
    setTotalVersions(history.length);

    if (history[currentIndexRef.current]) {
      setPromptDescription(history[currentIndexRef.current].endAction);
    } else {
      setPromptDescription("");
    }
  }, []);

  const findActionConfig = useCallback((action: string): MenuConfigItem | null => {
    // Also check the initial generate action
    if (action === "generate") {
      return {
        text: "Generate",
        action: "generate",
        processingLabel: "Generating ...",
        completedLabel: "Generated text",
        textKey: "en",
      };
    }
    for (const item of MENU_CONFIG) {
      if (item.action === action) return item;
      if (item.children) {
        for (const child of item.children) {
          if (child.action === action) return child;
        }
      }
    }
    return null;
  }, []);

  const completeGeneration = useCallback((action: string, config: MenuConfigItem | null) => {
    stopTypingAnimation();
    const completedLabel = config?.completedLabel || "Action completed";
    const textarea = textareaRef.current;

    versionHistoryRef.current!.push({
      value: textarea ? textarea.value : "",
      action,
      endAction: completedLabel,
      timestamp: new Date().toISOString(),
    });

    currentIndexRef.current = versionHistoryRef.current!.length - 1;
    currentActionRef.current = null;

    setHasHistory(true);
    updateComponentState(null);
    setIsLoading(false);
  }, [stopTypingAnimation, updateComponentState]);

  const animateTextGeneration = useCallback((text: string, action: string, config: MenuConfigItem | null) => {
    return new Promise<void>((resolve) => {
      const chars = text.split("");
      let i = 0;
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.value = "";
      }
      setIsLoading(true);

      typingIntervalRef.current = setInterval(() => {
        if (i < chars.length) {
          if (textarea) {
            textarea.value = (textarea.value || "") + chars[i];
          }
          i++;
        } else {
          completeGeneration(action, config);
          resolve();
        }
      }, TIMING_CONFIG.typingSpeed);
    });
  }, [completeGeneration]);

  const executeAction = useCallback(async (action: string) => {
    if (isLoading) return;

    const config = findActionConfig(action);
    if (!config) return;

    const processingLabel = config.processingLabel || "Processing...";
    const textKey = config.textKey || "en";

    saveCurrentVersion();
    contentBeforeGenRef.current = textareaRef.current?.value || "";
    currentActionRef.current = action;
    generationIndexRef.current += 1;
    const genId = generationIndexRef.current;

    // Set loading state
    setIsLoading(true);
    if (textareaRef.current) {
      textareaRef.current!.value = "Analyzing request...";
    }
    setPromptDescription(processingLabel);

    await new Promise((resolve) => setTimeout(resolve, TIMING_CONFIG.processingDelay));

    if (genId !== generationIndexRef.current) {
      stopTypingAnimation();
      currentActionRef.current = null;
      setIsLoading(false);
      return;
    }

    const text = SAMPLE_TEXTS[textKey] || SAMPLE_TEXTS.en;
    await animateTextGeneration(text, action, config);
  }, [isLoading, findActionConfig, saveCurrentVersion, stopTypingAnimation, animateTextGeneration]);

  const stopGeneration = useCallback(() => {
    if (!isLoading) return;

    stopTypingAnimation();
    generationIndexRef.current += 1;

    const textarea = textareaRef.current;
    const stoppedValue = textarea ? textarea.value : "";

    if (stoppedValue.trim()) {
      const action = currentActionRef.current || "generate";
      const config = findActionConfig(action);
      const completedLabel = config?.completedLabel || "Action completed";

      versionHistoryRef.current!.push({
        value: stoppedValue,
        action,
        endAction: completedLabel + " (stopped)",
        timestamp: new Date().toISOString(),
      });

      currentIndexRef.current = versionHistoryRef.current!.length - 1;
      setHasHistory(true);
      updateComponentState(null);
    }

    currentActionRef.current = null;
    setIsLoading(false);
  }, [isLoading, stopTypingAnimation, findActionConfig, updateComponentState]);

  const handleVersionChange = useCallback((e: any) => {
    const backwards = e.detail?.backwards;
    const history = versionHistoryRef.current;

    if (backwards && currentIndexRef.current > 0) {
      saveCurrentVersion();
      updateComponentState(currentIndexRef.current - 1);
    } else if (!backwards && currentIndexRef.current < history.length - 1) {
      saveCurrentVersion();
      updateComponentState(currentIndexRef.current + 1);
    }
  }, [saveCurrentVersion, updateComponentState]);

  const handleMenuItemClick = useCallback(async (e: any) => {
    const action = e?.detail?.item?.dataset?.action;
    if (!action) return;
    await executeAction(action);
  }, [executeAction]);

  const handleStopGeneration = useCallback(() => {
    stopGeneration();
  }, [stopGeneration]);

  const renderMenuItems = () => {
    const items: JSX.Element[] = [];

    if (!hasHistory) {
      items.push(
        <MenuItem
          key="generate"
          text="Generate"
          data-action="generate"
          data-processing-label="Generating ..."
          data-completed-label="Generated text"
          data-text-key="en"
        />
      );
    }

    MENU_CONFIG.forEach((configItem, index) => {
      if (configItem.replaces && !hasHistory) return;

      if (configItem.children) {
        items.push(
          <MenuItem key={configItem.text + index} text={configItem.text} startsSection={configItem.startsSection || false}>
            {configItem.children.map((child) => (
              <MenuItem
                key={child.action}
                text={child.text}
                data-action={child.action}
                data-processing-label={child.processingLabel}
                data-completed-label={child.completedLabel}
                data-text-key={child.textKey}
              />
            ))}
          </MenuItem>
        );
      } else {
        items.push(
          <MenuItem
            key={(configItem.action || configItem.text) + index}
            text={configItem.text}
            startsSection={configItem.startsSection || false}
            data-action={configItem.action}
            data-processing-label={configItem.processingLabel}
            data-completed-label={configItem.completedLabel}
            data-text-key={configItem.textKey}
          />
        );
      }
    });

    return items;
  };

  return (
    <div className="demo-container">
      <AITextArea
        ref={textareaRef}
        id="ai-textarea"
        value={textValue}
        rows={8}
        placeholder="Write your content here..."
        loading={isLoading}
        currentVersion={currentVersion}
        totalVersions={totalVersions}
        promptDescription={promptDescription}
        onVersionChange={handleVersionChange}
        onStopGeneration={handleStopGeneration}
      >
        <Menu
          slot="menu"
          id="ai-menu"
          onItemClick={handleMenuItemClick}
        >
          {renderMenuItems()}
        </Menu>
      </AITextArea>
    </div>
  );
}

export default App;
