import "@ui5/webcomponents-ai/dist/TextArea.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/Button.js";

// Sample AI responses for different actions
const SAMPLE_TEXTS = {
	en: "Innovation managers operate with both creativity and business acumen, driving initiatives that cultivate an innovation-friendly culture, streamline the execution of new ideas, and ultimately unlock value for the organization and its customers.",
	bg: "Мениджърите по иновации действат с креативност и бизнес усет, като насърчават инициативи, които изграждат култура, благоприятстваща иновациите, улесняват реализирането на нови идеи и в крайна сметка създават стойност за организацията и нейните клиенти.",
	de: "Innovationsmanager agieren mit sowohl Kreativität als auch unternehmerischem Geschick. Sie treiben Initiativen voran, die eine innovationsfreundliche Unternehmenskultur fördern, die Umsetzung neuer Ideen optimieren und letztlich Mehrwert für das Unternehmen und seine Kunden schaffen.",
	bulleted: `Innovation managers:
• Operate with creativity and business acumen
• Drive initiatives that cultivate an innovation-friendly culture
• Streamline the execution of new ideas
• Unlock value for the organization and its customers`,
	expanded: "Innovation managers play a pivotal role in organizations by blending creativity with strategic business acumen. They are not just responsible for generating innovative ideas but also for fostering a culture that encourages experimentation, collaboration, and out-of-the-box thinking among teams. These professionals work tirelessly to identify opportunities for improvement, anticipate market trends, and develop solutions that align with the organization's goals and customer needs. In their efforts to promote an innovation-friendly environment, they implement frameworks and processes that remove barriers to creativity, making it easier for teams to brainstorm, prototype, and refine new concepts. Beyond idea generation, innovation managers ensure that these ideas are systematically evaluated and effectively executed, transforming them into tangible value propositions. This requires them to bridge the gap between visionary thinking and practical implementation, often by collaborating with cross-functional teams, securing resources, and navigating organizational dynamics. Ultimately, the work of innovation managers unlocks significant value, driving growth, enhancing customer satisfaction, and ensuring the organization remains competitive in a rapidly evolving landscape. Their dual focus on creativity and business results positions them as key drivers of sustainable innovation and long-term success.",
	simplified: "Innovation managers use creativity and business skills to promote innovation, simplify the development of new ideas, and deliver value to the organization and its customers.",
	summarized: "Innovation managers blend creativity and business skills to foster innovation, simplify idea implementation, and create value for organizations and customers."
};

const TIMING_CONFIG = {
	processingDelay: 3000,      // Milliseconds to simulate AI processing time
	typingSpeed: 10             // Milliseconds between each character in typing animation
};

// Configuration for AI action menu - customize this to add/remove AI capabilities
const MENU_CONFIG = [
	{
		text: "Regenerate",
		action: "regenerate",
		processingLabel: "Regenerating text...",
		completedLabel: "Regenerated text",
		textKey: "en",
		replaces: "generate"
	},
	{
		text: "Fix spelling and grammar",
		action: "fixSpelling",
		processingLabel: "Fixing spelling and grammar...",
		completedLabel: "Fixed spelling and grammar",
		textKey: "en",
		startsSection: true
	},
	{
		text: "Rewrite text",
		children: [
			{ text: "Simplify", action: "simplify", processingLabel: "Simplifying text...", completedLabel: "Simplified text", textKey: "simplified" },
			{ text: "Expand", action: "expand", processingLabel: "Expanding text...", completedLabel: "Expanded text", textKey: "expanded" },
			{ text: "Summarize", action: "summarize", processingLabel: "Summarizing text...", completedLabel: "Summarized text", textKey: "summarized" }
		]
	},
	{
		text: "Make bulleted list",
		action: "bullets",
		processingLabel: "Making bulleted list...",
		completedLabel: "Made bulleted list",
		textKey: "bulleted"
	},
	{
		text: "Translate",
		children: [
			{ text: "English", action: "translateEN", processingLabel: "Translating to English...", completedLabel: "Translated to English", textKey: "en" },
			{ text: "German", action: "translateDE", processingLabel: "Translating to German...", completedLabel: "Translated to German", textKey: "de" },
			{ text: "Bulgarian", action: "translateBG", processingLabel: "Translating to Bulgarian...", completedLabel: "Translated to Bulgarian", textKey: "bg" }
		]
	}
];

// State management for version control and operations
let versionHistory = [];
let currentIndexHistory = 0;
let currentActionInProgress = null;
let typingInterval = null;
let currentGenerationIndex = 0;
let contentBeforeGeneration = "";

const textarea = document.getElementById('ai-textarea');
const menu = document.getElementById('ai-menu');
const resetBtn = document.getElementById('reset-btn');
const readonlyToggle = document.getElementById('readonly-toggle');
const disabledToggle = document.getElementById('disabled-toggle');

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function saveCurrentVersion() {
	if (versionHistory.length > 0 && versionHistory[currentIndexHistory]) {
		versionHistory[currentIndexHistory].value = textarea.value;
	}
}

function updateComponentState(versionIndex = null) {
	if (versionIndex !== null && versionHistory[versionIndex]) {
		currentIndexHistory = versionIndex;
		textarea.value = versionHistory[versionIndex].value;
	}

	textarea.currentVersion = currentIndexHistory + 1;
	textarea.totalVersions = versionHistory.length;

	if (versionHistory[currentIndexHistory]) {
		textarea.promptDescription = versionHistory[currentIndexHistory].endAction;
	} else {
		textarea.promptDescription = "";
	}
}

function createMenuItem(configItem) {
	const item = document.createElement('ui5-menu-item');
	item.setAttribute('text', configItem.text || '');

	if (configItem.action) {
		item.dataset.action = configItem.action;

		if (configItem.processingLabel) {
			item.dataset.processingLabel = configItem.processingLabel;
		}

		if (configItem.completedLabel) {
			item.dataset.completedLabel = configItem.completedLabel;
		}

		if (configItem.textKey) {
			item.dataset.textKey = configItem.textKey;
		}
	}

	if (configItem.startsSection) {
		item.setAttribute('starts-section', '');
	}

	return item;
}

function buildMenuFromConfig() {
	const hasHistory = versionHistory.length > 0;

	menu.innerHTML = '';
	
	// Add initial "Generate text" option if no history
	if (!hasHistory) {
		const generateItem = document.createElement('ui5-menu-item');
		generateItem.setAttribute('text', 'Generate text');
		generateItem.dataset.action = 'generate';
		generateItem.dataset.processingLabel = 'Generating text...';
		generateItem.dataset.completedLabel = 'Generated text';
		generateItem.dataset.textKey = 'en';
		menu.appendChild(generateItem);
	}

	MENU_CONFIG.forEach(configItem => {
		if (configItem.replaces && !hasHistory) {
			return;
		}

		if (configItem.children && Array.isArray(configItem.children)) {
			const group = createMenuItem(configItem);
			configItem.children.forEach(child => {
				const childItem = createMenuItem(child);
				group.appendChild(childItem);
			});
			menu.appendChild(group);
		} else {
			menu.appendChild(createMenuItem(configItem));
		}
	});
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
		value: textarea.value,
		action,
		endAction: completedLabel,
		timestamp: new Date().toISOString()
	});

	currentIndexHistory = versionHistory.length - 1;
	currentActionInProgress = null;

	buildMenuFromConfig();
	updateComponentState();
	textarea.loading = false;
}

function animateTextGeneration(text, action, menuItem) {
	return new Promise(resolve => {
		const chars = text.split('');
		let i = 0;
		textarea.value = "";
		textarea.loading = true;

		typingInterval = setInterval(() => {
			if (i < chars.length) {
				textarea.value += chars[i++];
			} else {
				completeGeneration(action, menuItem);
				resolve();
			}
		}, TIMING_CONFIG.typingSpeed);
	});
}

function setLoadingState(promptDescription) {
	textarea.loading = true;
	textarea.value = "Analyzing request...";
	textarea.promptDescription = promptDescription || '';
}

function resetGenerationState() {
	stopTypingAnimation();
	currentActionInProgress = null;
	textarea.loading = false;
}

function findMenuItemByAction(action) {
	return menu.querySelector(`ui5-menu-item[data-action="${action}"]`);
}

// Main function to execute AI actions - replace the delay/sample logic with actual API calls
async function executeAction(action) {
	if (textarea.loading) {
		return;
	}

	const menuItem = findMenuItemByAction(action);

	if (!menuItem) {
		return;
	}

	const processingLabel = menuItem.dataset.processingLabel || 'Processing...';
	const textKey = menuItem.dataset.textKey || 'en';

	saveCurrentVersion();
	contentBeforeGeneration = textarea.value;
	currentActionInProgress = action;
	currentGenerationIndex += 1;
	const generationIdForThisRun = currentGenerationIndex;

	setLoadingState(processingLabel);

	// Replace this delay with actual API call
	await delay(TIMING_CONFIG.processingDelay);

	if (!textarea.loading || generationIdForThisRun !== currentGenerationIndex) {
		resetGenerationState();
		return;
	}

	const text = SAMPLE_TEXTS[textKey] || SAMPLE_TEXTS.en;
	await animateTextGeneration(text, action, menuItem);
}

function stopGeneration() {
	if (!textarea.loading) {
		return;
	}

	stopTypingAnimation();
	currentGenerationIndex += 1;
	
	// Save the stopped generation if there is content
	const stoppedValue = textarea.value;
	if (stoppedValue.trim()) {
		const action = currentActionInProgress || 'generate';
		const menuItem = findMenuItemByAction(action);
		const completedLabel = (menuItem && menuItem.dataset.completedLabel) ? menuItem.dataset.completedLabel : 'Action completed';

		versionHistory.push({
			value: stoppedValue,
			action,
			endAction: completedLabel + " (stopped)",
			timestamp: new Date().toISOString()
		});

		// Restore the previous content
		textarea.value = contentBeforeGeneration;
		currentIndexHistory = versionHistory.length - 1;
		buildMenuFromConfig();
		updateComponentState();
	}

	currentActionInProgress = null;
	textarea.loading = false;
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
	const action = event?.detail?.item?.dataset?.action;

	if (!action) {
		return;
	}

	await executeAction(action);
}

function handleStopGeneration() {
	stopGeneration();
}

function handleKeydown(event) {
	if (event.key === 'Escape' && textarea.loading) {
		event.preventDefault();
		stopGeneration();
	}
}


function init() {
	buildMenuFromConfig();

	menu.addEventListener('item-click', handleMenuItemClick);
	textarea.addEventListener('version-change', handleVersionChange);
	textarea.addEventListener('stop-generation', handleStopGeneration);			
	document.addEventListener('keydown', handleKeydown);
	
	// Prevent memory leaks on page unload
	window.addEventListener('beforeunload', () => {
		stopTypingAnimation();
		resetGenerationState();
	});
}

document.addEventListener('DOMContentLoaded', init);
