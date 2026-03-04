import { useState, useRef, useCallback, useEffect } from "react";
import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AITextAreaClass from "@ui5/webcomponents-ai/dist/TextArea.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";

const AITextArea = createReactComponent(AITextAreaClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);

const SAMPLE_TEXT = "Innovation managers operate with both creativity and business acumen, driving initiatives that cultivate an innovation-friendly culture, streamline the execution of new ideas, and ultimately unlock value for the organization and its customers.";

interface VersionEntry {
  value: string;
  promptDescription: string;
  timestamp: string;
}

function App() {
  const textareaRef = useRef<any>(null);
  const menuRef = useRef<any>(null);
  const [textValue, setTextValue] = useState(
    "Innovation managers operate with both creativity and business acumen, driving initiatives that cultivate an innovation-friendly culture."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(0);
  const [totalVersions, setTotalVersions] = useState(0);
  const [promptDescription, setPromptDescription] = useState("");

  const versionHistoryRef = useRef<VersionEntry[]>([]);
  const currentVersionIndexRef = useRef(0);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentGenerationIdRef = useRef(0);

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

  const updateComponentState = useCallback(() => {
    const history = versionHistoryRef.current;
    const idx = currentVersionIndexRef.current;

    setCurrentVersion(idx + 1);
    setTotalVersions(history.length);

    if (history[idx]) {
      setPromptDescription(history[idx].promptDescription);
    }
  }, []);

  const completeGeneration = useCallback(() => {
    stopTypingAnimation();
    const textarea = textareaRef.current;
    const currentVal = textarea ? textarea.value : "";

    versionHistoryRef.current!.push({
      value: currentVal,
      promptDescription: "Generated text",
      timestamp: new Date().toISOString(),
    });

    currentVersionIndexRef.current = versionHistoryRef.current!.length - 1;
    updateComponentState();
    setIsLoading(false);
  }, [stopTypingAnimation, updateComponentState]);

  const animateTextGeneration = useCallback((text: string) => {
    return new Promise<void>((resolve) => {
      const chars = text.split("");
      let i = 0;
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.value = "";
      }
      setTextValue("");

      typingIntervalRef.current = setInterval(() => {
        if (i < chars.length) {
          if (textarea) {
            textarea.value = (textarea.value || "") + chars[i];
          }
          i++;
        } else {
          completeGeneration();
          resolve();
        }
      }, 10);
    });
  }, [completeGeneration]);

  const executeGeneration = useCallback(async () => {
    if (isLoading) return;

    currentGenerationIdRef.current++;
    const genId = currentGenerationIdRef.current;

    setIsLoading(true);
    setPromptDescription("Generating text...");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (genId !== currentGenerationIdRef.current) {
      return;
    }

    await animateTextGeneration(SAMPLE_TEXT);
  }, [isLoading, animateTextGeneration]);

  const stopGeneration = useCallback(() => {
    if (!isLoading) return;

    stopTypingAnimation();
    currentGenerationIdRef.current++;

    const textarea = textareaRef.current;
    const stoppedValue = textarea ? textarea.value : "";

    if (stoppedValue.trim()) {
      versionHistoryRef.current!.push({
        value: stoppedValue,
        promptDescription: "Generated text (stopped)",
        timestamp: new Date().toISOString(),
      });

      currentVersionIndexRef.current = versionHistoryRef.current!.length - 1;
      updateComponentState();
    }

    setIsLoading(false);
  }, [isLoading, stopTypingAnimation, updateComponentState]);

  const handleVersionChange = useCallback((e: any) => {
    const backwards = e.detail?.backwards;
    const history = versionHistoryRef.current;

    if (backwards && currentVersionIndexRef.current > 0) {
      currentVersionIndexRef.current--;
      const entry = history[currentVersionIndexRef.current];
      setTextValue(entry.value);
      if (textareaRef.current) {
        textareaRef.current!.value = entry.value;
      }
      updateComponentState();
    } else if (!backwards && currentVersionIndexRef.current < history.length - 1) {
      currentVersionIndexRef.current++;
      const entry = history[currentVersionIndexRef.current];
      setTextValue(entry.value);
      if (textareaRef.current) {
        textareaRef.current!.value = entry.value;
      }
      updateComponentState();
    }
  }, [updateComponentState]);

  const handleMenuItemClick = useCallback((e: any) => {
    const action = e?.detail?.item?.dataset?.action;
    if (action === "generate") {
      executeGeneration();
    }
  }, [executeGeneration]);

  const handleStopGeneration = useCallback(() => {
    stopGeneration();
  }, [stopGeneration]);

  return (
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
        ref={menuRef}
        slot="menu"
        id="ai-menu"
        data-completed-label="Generation complete"
        onItemClick={handleMenuItemClick}
      >
        <MenuItem text="Generate" data-action="generate" />
      </Menu>
    </AITextArea>
  );
}

export default App;
