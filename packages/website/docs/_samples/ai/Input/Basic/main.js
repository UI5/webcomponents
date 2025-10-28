import "@ui5/webcomponents-ai/dist/Input.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";

const SAMPLE_TEXTS = {
    en: "AI can help you write faster.",
    bg: "ИИ може да ви помогне да пишете по-бързо.",
    de: "KI kann Ihnen beim schnelleren Schreiben helfen.",
    expanded: "AI assists in generating detailed content quickly.",
    rephrased: "AI helps reword sentences clearly.",
    simplified: "AI makes text simpler.",
    summarized: "AI shortens long content."
};

const MENU_CONFIG = [
    {
        text: "Regenerate",
        action: "regenerate",
        processingLabel: "Regenerating text",
        completedLabel: "Regenerated text",
        textKey: "en",
        replaces: "generate"
    },
    {
        text: "Fix spelling and grammar",
        action: "fixSpelling",
        processingLabel: "Fixing spelling and grammar",
        completedLabel: "Fixed spelling and grammar",
        textKey: "en",
        startsSection: true
    },
    {
        text: "Rewrite text",
        isGroup: true,
        children: [
            { text: "Simplify", action: "simplify", processingLabel: "Simplifying text", completedLabel: "Simplified text", textKey: "simplified", isChild: true },
            { text: "Expand", action: "expand", processingLabel: "Expanding text", completedLabel: "Expanded text", textKey: "expanded", isChild: true },
            { text: "Rephrase", action: "rephrase", processingLabel: "Rephrasing text", completedLabel: "Rephrased text", textKey: "rephrased", isChild: true },
            { text: "Summarize", action: "summarize", processingLabel: "Summarizing text", completedLabel: "Summarized text", textKey: "summarized", isChild: true }
        ]
    },
    {
        text: "Translate",
        isGroup: true,
        children: [
            { text: "English", action: "translateEN", processingLabel: "Translating to English", completedLabel: "Translated to English", textKey: "en", isChild: true },
            { text: "German", action: "translateDE", processingLabel: "Translating to German", completedLabel: "Translated to German", textKey: "de", isChild: true },
            { text: "Bulgarian", action: "translateBG", processingLabel: "Translating to Bulgarian", completedLabel: "Translated to Bulgarian", textKey: "bg", isChild: true }
        ]
    }
];

let versionHistory = [];
let currentIndexHistory = 0;
let currentActionInProgress = null;
let typingInterval = null;
let isGenerating = false;
let currentGenerationId = 0;  // used to cancel stale runs

const aiInput = document.getElementById("ai-input");

aiInput.addEventListener('version-change', handleVersionChange);
aiInput.addEventListener('stop-generation', stopGeneration);

aiInput.addEventListener('item-click', handleMenuItemClick);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addToHistory(entry) {
    if (versionHistory.length > 50) {
        versionHistory.shift();
        if (currentIndexHistory > 0) currentIndexHistory--;
    }
}

function saveCurrentVersion() {
    if (versionHistory.length > 0 && versionHistory[currentIndexHistory]) {
        versionHistory[currentIndexHistory].value = aiInput.value;
    }
}

function updateComponentState(versionIndex = null) {
    if (versionIndex !== null && versionHistory[versionIndex]) {
        currentIndexHistory = versionIndex;
        aiInput.value = versionHistory[versionIndex].value;
    }

    aiInput.currentVersion = currentIndexHistory + 1;
    aiInput.totalVersions = versionHistory.length;

    if (versionHistory[currentIndexHistory]) {
        aiInput.promptDescription = versionHistory[currentIndexHistory].endAction;
    } else {
        aiInput.promptDescription = "";
    }
}

function createMenuItem(cfg) {
    const item = document.createElement('ui5-menu-item');
    item.setAttribute('text', cfg.text || '');

    if (!cfg.isChild) {
        item.setAttribute('slot', 'actions');
    }

    if (cfg.action) {
        item.dataset.action = cfg.action;
        if (cfg.processingLabel) item.dataset.processingLabel = cfg.processingLabel;
        if (cfg.completedLabel) item.dataset.completedLabel = cfg.completedLabel;
        if (cfg.textKey) item.dataset.textKey = cfg.textKey;
    }
    if (cfg.shortcut) item.setAttribute('additional-text', cfg.shortcut);
    if (cfg.startsSection) item.setAttribute('starts-section', '');
    return item;
}

function buildMenuFromConfig() {
    const hasHistory = versionHistory.length > 0;

    if (hasHistory) {
        aiInput.querySelectorAll("ui5-menu-item").forEach(item => item.remove());
        MENU_CONFIG.forEach(cfg => {
            if (cfg.replaces && !hasHistory) return;

            if (cfg.isGroup && Array.isArray(cfg.children)) {
                const group = createMenuItem(cfg);
                cfg.children.forEach(child => {
                    const childItem = createMenuItem(child);
                    group.appendChild(childItem);
                });
                aiInput.appendChild(group);
            } else {
                aiInput.appendChild(createMenuItem(cfg));
            }
        });
    }
}

function stopTypingAnimation() {
    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }
}

function completeGeneration(action, menuItem) {
    stopTypingAnimation();
    const completedLabel = (menuItem && menuItem.dataset.completedLabel) ? menuItem.dataset.completedLabel : 'Action completed';

    addToHistory({
        value: aiInput.value,
        action,
        endAction: completedLabel,
        timestamp: new Date().toISOString()
    });

    currentIndexHistory = versionHistory.length - 1;
    currentActionInProgress = null;
    isGenerating = false;

    if (versionHistory.length === 1) buildMenuFromConfig();

    updateComponentState();
    aiInput.loading = false;
    setTimeout(() => {
        aiInput.focus();
    }, 0);
}

function animateTextGeneration(text, action, menuItem) {
    return new Promise(resolve => {
        const chars = text.split('');
        let i = 0;
        aiInput.value = "";
        aiInput.loading = true;

        typingInterval = setInterval(() => {
            if (i < chars.length) {
                aiInput.value += chars[i++];
            } else {
                completeGeneration(action, menuItem);
                resolve();
            }
        }, 10);
    });
}

function setLoadingState(promptDescription) {
    aiInput.value = ""
    aiInput.loading = true;
    aiInput.promptDescription = promptDescription || '';
}

function resetGenerationState() {
    stopTypingAnimation();
    isGenerating = false;
    currentActionInProgress = null;
    aiInput.loading = false;
    setTimeout(() => {
        aiInput.focus();
    }, 0);
}

function findMenuItemByAction(action) {
    return aiInput.querySelector(`ui5-menu-item[data-menu-action="${action}"]`) || aiInput.querySelector(`ui5-menu-item[data-action="${action}"]`);
}

async function executeAction(action) {
    if (isGenerating) return;

    const menuItem = findMenuItemByAction(action);
    if (!menuItem) return;

    const processingLabel = menuItem.dataset.processingLabel || 'Processing...';
    const textKey = menuItem.dataset.textKey || 'en';

    saveCurrentVersion();
    currentActionInProgress = action;
    isGenerating = true;
    currentGenerationId += 1;
    const generationIdForThisRun = currentGenerationId;

    setLoadingState(processingLabel);

    await delay(3000);

    if (!isGenerating || generationIdForThisRun !== currentGenerationId) {
        resetGenerationState();
        return;
    }

    const text = SAMPLE_TEXTS[textKey] || SAMPLE_TEXTS.en;
    await animateTextGeneration(text, action, menuItem);
}

function stopGeneration() {
    if (!isGenerating) return;

    stopTypingAnimation();
    currentGenerationId += 1;
    const action = currentActionInProgress || 'generate';
    const menuItem = findMenuItemByAction(action);
    const completedLabel = (menuItem && menuItem.dataset.completedLabel) ? menuItem.dataset.completedLabel : 'Action completed';

    addToHistory({
        value: aiInput.value,
        action,
        endAction: completedLabel + " (stopped)",
        timestamp: new Date().toISOString()
    });

    currentIndexHistory = versionHistory.length - 1;
    currentActionInProgress = null;
    isGenerating = false;

    if (versionHistory.length === 1) buildMenuFromConfig();

    updateComponentState();
    aiInput.loading = false;
    setTimeout(() => {
        aiInput.focus();
    }, 0);
}

function handleVersionChange(event) {
    const { backwards } = event.detail || {};
    if (backwards && currentIndexHistory > 0) {
        saveCurrentVersion();
        updateComponentState(currentIndexHistory - 1);
    } else if (!backwards && currentIndexHistory < versionHistory.length - 1) {
        saveCurrentVersion();
        updateComponentState(currentIndexHistory + 1);
    }
}

async function handleMenuItemClick(event) {

    const action = event?.detail?.item?.dataset?.menuAction || event?.detail?.item?.dataset?.action;
    if (!action) return;
    await executeAction(action);
}
