import "@ui5/webcomponents-ai/dist/Input.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";

const SAMPLE_TEXTS = {
    en: "Innovation managers lead with creativity.",
    bg: "Мениджърите по иновации водят с креативност.",
    de: "Innovationsmanager führen mit Kreativität.",
    expanded: "They combine creative ideas with strategic action.",
    simplified: "They lead using creativity.",
    summarized: "Driving innovation creatively."
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

const TIMING_CONFIG = {
    processingDelay: 3000,      // Milliseconds to simulate AI processing time
    typingSpeed: 10             // Milliseconds between each character in typing animation
};

let versionHistory = [];
let currentIndexHistory = 0;
let currentActionInProgress = null;
let typingInterval = null;
let currentGenerationIndex = 0;
let animationHasStarted = false;

const aiInput = document.getElementById("ai-input");

aiInput.addEventListener('version-change', handleVersionChange);
aiInput.addEventListener('stop-generation', stopGeneration);

aiInput.addEventListener('item-click', handleMenuItemClick);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

function createMenuItem(configItem) {
    const item = document.createElement('ui5-menu-item');
    item.setAttribute('text', configItem.text || '');

    if (!configItem.isChild) {
        item.setAttribute('slot', 'actions');
    }

    if (configItem.action) {
        item.dataset.action = configItem.action;
        if (configItem.processingLabel) item.dataset.processingLabel = configItem.processingLabel;
        if (configItem.completedLabel) item.dataset.completedLabel = configItem.completedLabel;
        if (configItem.textKey) item.dataset.textKey = configItem.textKey;
    }
    if (configItem.shortcut) item.setAttribute('additional-text', configItem.shortcut);
    if (configItem.startsSection) item.setAttribute('starts-section', '');
    return item;
}

function buildMenuFromConfig() {
    const hasHistory = versionHistory.length > 0;

    if (hasHistory) {
        aiInput.querySelectorAll("ui5-menu-item").forEach(item => item.remove());
        MENU_CONFIG.forEach(configItem => {
            if (configItem.replaces && !hasHistory) return;

            if (configItem.isGroup && Array.isArray(configItem.children)) {
                const group = createMenuItem(configItem);
                configItem.children.forEach(child => {
                    const childItem = createMenuItem(child);
                    group.appendChild(childItem);
                });
                aiInput.appendChild(group);
            } else {
                aiInput.appendChild(createMenuItem(configItem));
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

    versionHistory.push({
        value: aiInput.value,
        action,
        endAction: completedLabel,
        timestamp: new Date().toISOString()
    });

    currentIndexHistory = versionHistory.length - 1;
    currentActionInProgress = null;

    if (versionHistory.length === 1) buildMenuFromConfig();

    updateComponentState();
    aiInput.loading = false;
    aiInput.placeholder = "Write your title";
    aiInput.focus();
}

function animateTextGeneration(text, action, menuItem) {
    return new Promise(resolve => {
        const chars = text.split('');
        let i = 0;
        aiInput.value = "";
        aiInput.loading = true;
        animationHasStarted = true;

        typingInterval = setInterval(() => {
            if (i < chars.length) {
                aiInput.value += chars[i++];
            } else {
                completeGeneration(action, menuItem);
                resolve();
            }
        }, TIMING_CONFIG.typingSpeed);
    });
}

function setLoadingState(promptDescription) {
    aiInput.value = ""
    aiInput.loading = true;
    aiInput.placeholder = "";
    aiInput.promptDescription = promptDescription || '';
}

function resetGenerationState() {
    stopTypingAnimation();
    currentActionInProgress = null;
    aiInput.loading = false;
}

function findMenuItemByAction(action) {
    return aiInput.querySelector(`ui5-menu-item[data-menu-action="${action}"]`) || aiInput.querySelector(`ui5-menu-item[data-action="${action}"]`);
}

async function executeAction(action) {
    if (aiInput.loading) return;

    const menuItem = findMenuItemByAction(action);
    if (!menuItem) return;

    const processingLabel = menuItem.dataset.processingLabel || 'Processing...';
    const textKey = menuItem.dataset.textKey || 'en';

    saveCurrentVersion();
    currentActionInProgress = action;
    const generationIdForThisRun = currentGenerationIndex;
    animationHasStarted = false;

    setLoadingState(processingLabel);

    await delay(TIMING_CONFIG.processingDelay);

    if (!aiInput.loading || generationIdForThisRun !== currentGenerationIndex) {
        resetGenerationState();
        return;
    }

    const text = SAMPLE_TEXTS[textKey] || SAMPLE_TEXTS.en;
    await animateTextGeneration(text, action, menuItem);
}

function stopGeneration() {
    if (!aiInput.loading) return;

    stopTypingAnimation();
    currentGenerationIndex += 1;
    const action = currentActionInProgress || 'generate';
    const menuItem = findMenuItemByAction(action);
    const completedLabel = (menuItem && menuItem.dataset.completedLabel) ? menuItem.dataset.completedLabel : 'Action completed';

    if (animationHasStarted) {
        versionHistory.push({
            value: aiInput.value,
            action,
            endAction: completedLabel + " (stopped)",
            timestamp: new Date().toISOString()
        });

        currentIndexHistory = versionHistory.length - 1;
        versionHistory.length && buildMenuFromConfig();
        updateComponentState();
    } else {
        // If animation hasn't started, restore the previous value
        if (versionHistory.length > 0 && versionHistory[currentIndexHistory]) {
            aiInput.value = versionHistory[currentIndexHistory].value;
        }
    }
    currentActionInProgress = null;
    aiInput.loading = false;
    aiInput.placeholder = "Write your title";
    aiInput.focus();
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