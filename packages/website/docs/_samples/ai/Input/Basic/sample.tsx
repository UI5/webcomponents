import { useState, useRef, useCallback, useEffect } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import AIInputClass from "@ui5/webcomponents-ai/dist/Input.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparatorClass from "@ui5/webcomponents/dist/MenuSeparator.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";

const AIInput = createComponent(AIInputClass);
const MenuItem = createComponent(MenuItemClass);
const MenuSeparator = createComponent(MenuSeparatorClass);

const SAMPLE_TEXTS: Record<string, string> = {
  en: "Innovation managers lead with creativity.",
  bg: "\u041C\u0435\u043D\u0438\u0434\u0436\u044A\u0440\u0438\u0442\u0435 \u043F\u043E \u0438\u043D\u043E\u0432\u0430\u0446\u0438\u0438 \u0432\u043E\u0434\u044F\u0442 \u0441 \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u043E\u0441\u0442.",
  de: "Innovationsmanager f\u00FChren mit Kreativit\u00E4t.",
  expanded: "They combine creative ideas with strategic action.",
  simplified: "They lead using creativity.",
  summarized: "Driving innovation creatively.",
};

const INITIAL_MENU_CONFIG = [
  {
    text: "Generate",
    action: "generate",
    processingLabel: "Generating text",
    completedLabel: "Generated text",
    textKey: "en",
    slot: "actions",
  },
];

const FULL_MENU_CONFIG = [
  {
    text: "Regenerate",
    action: "regenerate",
    processingLabel: "Regenerating text",
    completedLabel: "Regenerated text",
    textKey: "en",
    slot: "actions",
  },
  {
    text: "Fix spelling and grammar",
    action: "fixSpelling",
    processingLabel: "Fixing spelling and grammar",
    completedLabel: "Fixed spelling and grammar",
    textKey: "en",
    separator: true,
    slot: "actions",
  },
  {
    text: "Rewrite text",
    slot: "actions",
    children: [
      {
        text: "Simplify",
        action: "simplify",
        processingLabel: "Simplifying text",
        completedLabel: "Simplified text",
        textKey: "simplified",
      },
      {
        text: "Expand",
        action: "expand",
        processingLabel: "Expanding text",
        completedLabel: "Expanded text",
        textKey: "expanded",
      },
      {
        text: "Summarize",
        action: "summarize",
        processingLabel: "Summarizing text",
        completedLabel: "Summarized text",
        textKey: "summarized",
      },
    ],
  },
  {
    text: "Translate",
    slot: "actions",
    children: [
      {
        text: "English",
        action: "translateEN",
        processingLabel: "Translating to English",
        completedLabel: "Translated to English",
        textKey: "en",
      },
      {
        text: "German",
        action: "translateDE",
        processingLabel: "Translating to German",
        completedLabel: "Translated to German",
        textKey: "de",
      },
      {
        text: "Bulgarian",
        action: "translateBG",
        processingLabel: "Translating to Bulgarian",
        completedLabel: "Translated to Bulgarian",
        textKey: "bg",
      },
    ],
  },
];

const TIMING_CONFIG = {
  processingDelay: 3000,
  typingSpeed: 10,
};

interface VersionEntry {
  value: string;
  action: string;
  endAction: string;
  timestamp: string;
}

function App() {
  const inputRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Write your title");
  const [currentVersion, setCurrentVersion] = useState(0);
  const [totalVersions, setTotalVersions] = useState(0);
  const [promptDescription, setPromptDescription] = useState("");
  const [menuConfig, setMenuConfig] = useState(INITIAL_MENU_CONFIG);

  const versionHistoryRef = useRef<VersionEntry[]>([]);
  const currentIndexRef = useRef(0);
  const currentActionRef = useRef<string | null>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const generationIndexRef = useRef(0);
  const animationStartedRef = useRef(false);

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

  const updateComponentState = useCallback(
    (versionIndex: number | null = null) => {
      const history = versionHistoryRef.current;
      if (versionIndex !== null && history[versionIndex]) {
        currentIndexRef.current = versionIndex;
        setInputValue(history[versionIndex].value);
      }

      setCurrentVersion(currentIndexRef.current + 1);
      setTotalVersions(history.length);

      if (history[currentIndexRef.current]) {
        setPromptDescription(history[currentIndexRef.current].endAction);
      } else {
        setPromptDescription("");
      }
    },
    [],
  );

  const findActionConfig = useCallback((action: string) => {
    for (const item of [...INITIAL_MENU_CONFIG, ...FULL_MENU_CONFIG]) {
      if ((item as any).action === action) return item;
      if ((item as any).children) {
        for (const child of (item as any).children) {
          if (child.action === action) return child;
        }
      }
    }
    return null;
  }, []);

  const completeGeneration = useCallback(
    (action: string, config: any) => {
      stopTypingAnimation();
      const completedLabel = config?.completedLabel || "Action completed";
      const input = inputRef.current;

      versionHistoryRef.current!.push({
        value: input ? input.value : "",
        action,
        endAction: completedLabel,
        timestamp: new Date().toISOString(),
      });

      currentIndexRef.current = versionHistoryRef.current!.length - 1;
      currentActionRef.current = null;

      if (versionHistoryRef.current!.length === 1) {
        setMenuConfig(FULL_MENU_CONFIG);
      }

      updateComponentState(null);
      setLoading(false);
      setPlaceholder("Write your title");
      if (input) input.focus();
    },
    [stopTypingAnimation, updateComponentState],
  );

  const animateTextGeneration = useCallback(
    (text: string, action: string, config: any) => {
      return new Promise<void>((resolve) => {
        const chars = text.split("");
        let i = 0;
        setInputValue("");
        setLoading(true);
        animationStartedRef.current = true;
        const input = inputRef.current;

        typingIntervalRef.current = setInterval(() => {
          if (i < chars.length) {
            if (input) {
              input.value = (input.value || "") + chars[i];
            }
            i++;
          } else {
            const finalValue = input ? input.value : text;
            completeGeneration(action, config);
            resolve();
          }
        }, TIMING_CONFIG.typingSpeed);
      });
    },
    [completeGeneration],
  );

  const executeAction = useCallback(
    async (action: string) => {
      if (loading) return;

      const config = findActionConfig(action);
      if (!config) return;

      const processingLabel =
        (config as any).processingLabel || "Processing...";
      const textKey = (config as any).textKey || "en";

      // Save current version
      const history = versionHistoryRef.current;
      if (history.length > 0 && history[currentIndexRef.current]) {
        history[currentIndexRef.current].value = inputRef.current?.value || "";
      }

      currentActionRef.current = action;
      const genId = generationIndexRef.current;
      animationStartedRef.current = false;

      // Set loading state
      setInputValue("");
      setLoading(true);
      setPlaceholder("");
      setPromptDescription(processingLabel);

      await new Promise((resolve) =>
        setTimeout(resolve, TIMING_CONFIG.processingDelay),
      );

      if (genId !== generationIndexRef.current) {
        stopTypingAnimation();
        currentActionRef.current = null;
        setLoading(false);
        return;
      }

      const text = SAMPLE_TEXTS[textKey] || SAMPLE_TEXTS.en;
      await animateTextGeneration(text, action, config);
    },
    [loading, findActionConfig, stopTypingAnimation, animateTextGeneration],
  );

  const handleStopGeneration = useCallback(() => {
    if (!loading) return;

    stopTypingAnimation();
    generationIndexRef.current += 1;
    const action = currentActionRef.current || "generate";
    const config = findActionConfig(action);
    const completedLabel = config
      ? (config as any).completedLabel
      : "Action completed";
    const input = inputRef.current;

    if (animationStartedRef.current) {
      versionHistoryRef.current!.push({
        value: input ? input.value : "",
        action,
        endAction: completedLabel + " (stopped)",
        timestamp: new Date().toISOString(),
      });

      currentIndexRef.current = versionHistoryRef.current!.length - 1;
      if (versionHistoryRef.current!.length > 0) {
        setMenuConfig(FULL_MENU_CONFIG);
      }
      updateComponentState(null);
    } else {
      // Restore previous value if animation hasn't started
      const history = versionHistoryRef.current;
      if (history.length > 0 && history[currentIndexRef.current]) {
        setInputValue(history[currentIndexRef.current].value);
      }
    }

    currentActionRef.current = null;
    setLoading(false);
    setPlaceholder("Write your title");
    if (input) input.focus();
  }, [loading, stopTypingAnimation, findActionConfig, updateComponentState]);

  const handleVersionChange = useCallback(
    (e: UI5CustomEvent<AIInputClass, "version-change">) => {
      const backwards = e.detail?.backwards;
      const history = versionHistoryRef.current;

      if (backwards && currentIndexRef.current > 0) {
        if (history.length > 0 && history[currentIndexRef.current]) {
          history[currentIndexRef.current].value =
            inputRef.current?.value || "";
        }
        updateComponentState(currentIndexRef.current - 1);
      } else if (!backwards && currentIndexRef.current < history.length - 1) {
        if (history.length > 0 && history[currentIndexRef.current]) {
          history[currentIndexRef.current].value =
            inputRef.current?.value || "";
        }
        updateComponentState(currentIndexRef.current + 1);
      }
    },
    [updateComponentState],
  );

  const handleMenuItemClick = useCallback(
    async (e: UI5CustomEvent<AIInputClass, "item-click">) => {
      const action =
        e?.detail?.item?.dataset?.menuAction ||
        e?.detail?.item?.dataset?.action;
      if (!action) return;
      await executeAction(action);
    },
    [executeAction],
  );

  const renderMenuItems = useCallback(() => {
    const items: any[] = [];
    menuConfig.forEach((item: any, index: number) => {
      if (item.separator)
        items.push(<MenuSeparator key={"sep-" + index} slot={item.slot} />);
      if (item.children) {
        items.push(
          <MenuItem key={item.text + index} text={item.text} slot={item.slot}>
            {item.children.map((child: any) => (
              <MenuItem
                key={child.action}
                text={child.text}
                data-action={child.action}
                data-processing-label={child.processingLabel}
                data-completed-label={child.completedLabel}
                data-text-key={child.textKey}
              />
            ))}
          </MenuItem>,
        );
      } else {
        items.push(
          <MenuItem
            key={item.action + index}
            text={item.text}
            slot={item.slot}
            data-action={item.action}
            data-menu-action={item.action}
            data-processing-label={item.processingLabel}
            data-completed-label={item.completedLabel}
            data-text-key={item.textKey}
          />,
        );
      }
    });
    return items;
  }, [menuConfig]);

  return (
    <>
      <div style={{ height: "200px" }}>
        <AIInput
          ref={inputRef}
          id="ai-input"
          placeholder={placeholder}
          style={{ width: "400px" }}
          value={inputValue}
          loading={loading}
          currentVersion={currentVersion}
          totalVersions={totalVersions}
          onVersionChange={handleVersionChange}
          onStopGeneration={handleStopGeneration}
          onItemClick={handleMenuItemClick}
        >
          {renderMenuItems()}
        </AIInput>
      </div>
    </>
  );
}

export default App;
