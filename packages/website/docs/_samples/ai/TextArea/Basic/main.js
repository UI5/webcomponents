import "@ui5/webcomponents-ai/dist/TextArea.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";

// Sample text for generation
const SAMPLE_TEXT = "Innovation managers operate with both creativity and business acumen, driving initiatives that cultivate an innovation-friendly culture, streamline the execution of new ideas, and ultimately unlock value for the organization and its customers.";


// State management
let versionHistory = [];
let currentVersionIndex = 0;
let typingInterval = null;
let currentGenerationId = 0;

const textarea = document.getElementById('ai-textarea');
const menu = document.getElementById('ai-menu');

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function stopTypingAnimation() {
	if (typingInterval) {
		clearInterval(typingInterval);
		typingInterval = null;
	}
}

function animateTextGeneration(text) {
	return new Promise(resolve => {
		const chars = text.split('');
		let i = 0;
		textarea.value = "";

		typingInterval = setInterval(() => {
			if (i < chars.length) {
				textarea.value += chars[i++];
			} else {
				stopTypingAnimation();
				completeGeneration();
				resolve();
			}
		}, 10);
	});
}

function completeGeneration() {
	versionHistory.push({
		value: textarea.value,
		promptDescription: "Generated text",
		timestamp: new Date().toISOString()
	});

	currentVersionIndex = versionHistory.length - 1;
	updateComponentState();
	textarea.loading = false;
}

function updateComponentState() {
	textarea.currentVersion = currentVersionIndex + 1;
	textarea.totalVersions = versionHistory.length;
	
	if (versionHistory[currentVersionIndex]) {
		textarea.promptDescription = versionHistory[currentVersionIndex].promptDescription;
	}
}

async function executeGeneration() {
	if (textarea.loading) {
		return;
	}

	currentGenerationId++;
	const generationIdForThisRun = currentGenerationId;

	// Set loading state
	textarea.loading = true;
	textarea.promptDescription = "Generating text...";

	try {
		// Simulate processing delay
		await delay(3000);

		// Check if generation was cancelled
		if (!textarea.loading || generationIdForThisRun !== currentGenerationId) {
			return;
		}

		// Start typing animation
		await animateTextGeneration(SAMPLE_TEXT);

	} catch (error) {
		console.error('Generation failed:', error);
		textarea.loading = false;
		textarea.promptDescription = 'Generation failed';
	}
}

function stopGeneration() {
	if (!textarea.loading) {
		return;
	}

	stopTypingAnimation();
	currentGenerationId++;

	if (textarea.value.trim()) {
		versionHistory.push({
			value: textarea.value,
			promptDescription: "Generated text (stopped)",
			timestamp: new Date().toISOString()
		});

		currentVersionIndex = versionHistory.length - 1;
		updateComponentState();
	}

	textarea.loading = false;
}

function handleVersionChange(event) {
	const { backwards } = event.detail || {};

	if (backwards && currentVersionIndex > 0) {
		currentVersionIndex--;
		textarea.value = versionHistory[currentVersionIndex].value;
		updateComponentState();
	} else if (!backwards && currentVersionIndex < versionHistory.length - 1) {
		currentVersionIndex++;
		textarea.value = versionHistory[currentVersionIndex].value;
		updateComponentState();
	}
}

function handleMenuItemClick(event) {
	const action = event?.detail?.item?.dataset?.action;
	
	if (action === 'generate') {
		executeGeneration();
	}
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

// Initialize
function init() {
	// Event listeners
	menu.addEventListener('item-click', handleMenuItemClick);
	textarea.addEventListener('version-change', handleVersionChange);
	textarea.addEventListener('stop-generation', handleStopGeneration);
	document.addEventListener('keydown', handleKeydown);

	// Cleanup on page unload
	window.addEventListener('beforeunload', () => {
		stopTypingAnimation();
	});
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
