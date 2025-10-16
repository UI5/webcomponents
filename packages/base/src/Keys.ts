const KeyCodes = {
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	SHIFT: 16,
	CONTROL: 17,
	ALT: 18,
	BREAK: 19,
	CAPS_LOCK: 20,
	ESCAPE: 27,
	SPACE: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	ARROW_LEFT: 37,
	ARROW_UP: 38,
	ARROW_RIGHT: 39,
	ARROW_DOWN: 40,
	PRINT: 44,
	INSERT: 45,
	DELETE: 46,
	DIGIT_0: 48,
	DIGIT_1: 49,
	DIGIT_2: 50,
	DIGIT_3: 51,
	DIGIT_4: 52,
	DIGIT_5: 53,
	DIGIT_6: 54,
	DIGIT_7: 55,
	DIGIT_8: 56,
	DIGIT_9: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	WINDOWS: 91,
	CONTEXT_MENU: 93,
	TURN_OFF: 94,
	SLEEP: 95,
	NUMPAD_0: 96,
	NUMPAD_1: 97,
	NUMPAD_2: 98,
	NUMPAD_3: 99,
	NUMPAD_4: 100,
	NUMPAD_5: 101,
	NUMPAD_6: 102,
	NUMPAD_7: 103,
	NUMPAD_8: 104,
	NUMPAD_9: 105,
	NUMPAD_ASTERISK: 106,
	NUMPAD_PLUS: 107,
	NUMPAD_MINUS: 109,
	NUMPAD_COMMA: 110,
	NUMPAD_SLASH: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	NUM_LOCK: 144,
	SCROLL_LOCK: 145,
	COLON: 186,
	PLUS: 187,
	COMMA: 188,
	SLASH: 189,
	DOT: 190,
	PIPE: 191,
	SEMICOLON: 192,
	MINUS: 219,
	GREAT_ACCENT: 220,
	EQUALS: 221,
	SINGLE_QUOTE: 222,
	BACKSLASH: 226,
} as const;
type KeyCodes = typeof KeyCodes[keyof typeof KeyCodes];

const isEnter = (event: KeyboardEvent): boolean => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event);

const isEnterCtrl = (event: KeyboardEvent): boolean => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && checkModifierKeys(event, true, false, false);

const isEnterAlt = (event: KeyboardEvent): boolean => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && checkModifierKeys(event, false, true, false);

const isEnterShift = (event: KeyboardEvent): boolean => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && checkModifierKeys(event, false, false, true);

const isCtrl = (event: KeyboardEvent): boolean => checkModifierKeys(event, true, false, false);

const isSpace = (event: KeyboardEvent): boolean => (event.key ? (event.key === "Spacebar" || event.key === " ") : event.keyCode === KeyCodes.SPACE) && !hasModifierKeys(event);

const isSpaceShift = (event: KeyboardEvent): boolean => (event.key ? (event.key === "Spacebar" || event.key === " ") : event.keyCode === KeyCodes.SPACE) && checkModifierKeys(event, false, false, true);

const isSpaceCtrl = (event: KeyboardEvent): boolean => (event.key ? (event.key === "Spacebar" || event.key === " ") : event.keyCode === KeyCodes.SPACE) && checkModifierKeys(event, true, false, false);

const isLeft = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && !hasModifierKeys(event);

const isRight = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && !hasModifierKeys(event);

const isUp = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && !hasModifierKeys(event);

const isDown = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && !hasModifierKeys(event);

const isLeftCtrl = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && checkModifierKeys(event, true, false, false);

const isRightCtrl = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && checkModifierKeys(event, true, false, false);

const isUpCtrl = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event, true, false, false);

const isDownCtrl = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event, true, false, false);

const isUpShift = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event, false, false, true);

const isDownShift = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event, false, false, true);

const isUpAlt = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event, false, true, false);

const isDownAlt = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event, false, true, false);

const isLeftShift = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && checkModifierKeys(event, false, false, true);

const isRightShift = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && checkModifierKeys(event, false, false, true);

const isLeftShiftCtrl = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && checkModifierKeys(event, true, false, true);

const isRightShiftCtrl = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && checkModifierKeys(event, true, false, true);

const isUpShiftCtrl = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event, true, false, true);

const isDownShiftCtrl = (event: KeyboardEvent): boolean => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event, true, false, true);

const isHome = (event: KeyboardEvent): boolean => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && !hasModifierKeys(event);

const isEnd = (event: KeyboardEvent): boolean => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && !hasModifierKeys(event);

const isHomeCtrl = (event: KeyboardEvent): boolean => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && checkModifierKeys(event, true, false, false);

const isHomeShift = (event: KeyboardEvent): boolean => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && checkModifierKeys(event, false, false, true);

const isEndCtrl = (event: KeyboardEvent): boolean => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && checkModifierKeys(event, true, false, false);

const isEndShift = (event: KeyboardEvent): boolean => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && checkModifierKeys(event, false, false, true);

const isEscape = (event: KeyboardEvent): boolean => (event.key ? event.key === "Escape" || event.key === "Esc" : event.keyCode === KeyCodes.ESCAPE) && !hasModifierKeys(event);

const isTabNext = (event: KeyboardEvent): boolean => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && !hasModifierKeys(event);

const isTabPrevious = (event: KeyboardEvent): boolean => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ false, /* Shift */ true);

const isBackSpace = (event: KeyboardEvent): boolean => (event.key ? event.key === "Backspace" : event.keyCode === KeyCodes.BACKSPACE) && !hasModifierKeys(event);

const isDelete = (event: KeyboardEvent): boolean => (event.key ? event.key === "Delete" : event.keyCode === KeyCodes.DELETE) && !hasModifierKeys(event);

const isDeleteShift = (event: KeyboardEvent): boolean => (event.key ? event.key === "Delete" : event.keyCode === KeyCodes.DELETE) && checkModifierKeys(event, false, false, true);

const isInsertShift = (event: KeyboardEvent): boolean => (event.key ? event.key === "Insert" : event.keyCode === KeyCodes.DELETE) && checkModifierKeys(event, false, false, true);

const isInsertCtrl = (event: KeyboardEvent): boolean => (event.key ? event.key === "Insert" : event.keyCode === KeyCodes.DELETE) && checkModifierKeys(event, true, false, false);

const isPageUp = (event: KeyboardEvent): boolean => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && !hasModifierKeys(event);

const isPageDown = (event: KeyboardEvent): boolean => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && !hasModifierKeys(event);

const isPageUpShift = (event: KeyboardEvent): boolean => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && checkModifierKeys(event, false, false, true);

const isPageUpAlt = (event: KeyboardEvent): boolean => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && checkModifierKeys(event, false, true, false);

const isPageDownShift = (event: KeyboardEvent): boolean => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && checkModifierKeys(event, false, false, true);

const isPageDownAlt = (event: KeyboardEvent): boolean => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && checkModifierKeys(event, false, true, false);

const isPageUpShiftCtrl = (event: KeyboardEvent): boolean => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && checkModifierKeys(event, true, false, true);

const isPageDownShiftCtrl = (event: KeyboardEvent): boolean => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && checkModifierKeys(event, true, false, true);

const isPlus = (event: KeyboardEvent): boolean => (event.key ? event.key === "+" : event.keyCode === KeyCodes.PLUS) || (event.keyCode === KeyCodes.NUMPAD_PLUS && !hasModifierKeys(event));

const isMinus = (event: KeyboardEvent): boolean => (event.key ? event.key === "-" : event.keyCode === KeyCodes.MINUS) || (event.keyCode === KeyCodes.NUMPAD_MINUS && !hasModifierKeys(event));

const isShow = (event: KeyboardEvent): boolean => {
	if (event.key) {
		return isF4(event) || isShowByArrows(event);
	}

	return (event.keyCode === KeyCodes.F4 && !hasModifierKeys(event)) || (event.keyCode === KeyCodes.ARROW_DOWN && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ true, /* Shift */ false));
};

const isF2 = (event: KeyboardEvent): boolean => {
	return event.key === "F2" && !hasModifierKeys(event);
};

const isF4 = (event: KeyboardEvent): boolean => {
	return event.key === "F4" && !hasModifierKeys(event);
};

const isF4Shift = (event: KeyboardEvent): boolean => (event.key ? event.key === "F4" : event.keyCode === KeyCodes.F4) && checkModifierKeys(event, false, false, true);

const isF10Shift = (event: KeyboardEvent): boolean => (event.key ? event.key === "F10" : event.keyCode === KeyCodes.F10) && checkModifierKeys(event, false, false, true);

const isF6Next = (event: KeyboardEvent): boolean => ((event.key ? event.key === "F6" : event.keyCode === KeyCodes.F6) && checkModifierKeys(event, false, false, false))
	|| ((event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event, true, true, false));

const isF6Previous = (event: KeyboardEvent): boolean => ((event.key ? event.key === "F6" : event.keyCode === KeyCodes.F6) && checkModifierKeys(event, false, false, true))
	|| ((event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event, true, true, false));

const isF7 = (event: KeyboardEvent): boolean => (event.key ? event.key === "F7" : event.keyCode === KeyCodes.F7) && !hasModifierKeys(event);

const isCtrlAltF8 = (event: KeyboardEvent): boolean => (event.key ? event.key === "F8" : event.keyCode === KeyCodes.F8) && checkModifierKeys(event, true, true, false);

const isShowByArrows = (event: KeyboardEvent): boolean => {
	return ((event.key === "ArrowDown" || event.key === "Down") || (event.key === "ArrowUp" || event.key === "Up")) && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ true, /* Shift */ false);
};

const isShift = (event: KeyboardEvent): boolean => event.key === "Shift" || event.keyCode === KeyCodes.SHIFT;

const isCtrlA = (event: KeyboardEvent): boolean => ((event.key === "A" || event.key === "a") || event.which === KeyCodes.A) && checkModifierKeys(event, true, false, false);

const isCtrlV = (event: KeyboardEvent): boolean => ((event.key === "V" || event.key === "v") || event.which === KeyCodes.V) && checkModifierKeys(event, true, false, false);

const isKeyA = (event: KeyboardEvent): boolean => ((event.key === "A" || event.key === "a") || event.which === KeyCodes.A) && checkModifierKeys(event, false, false, false);

const isKeyP = (event: KeyboardEvent): boolean => ((event.key === "P" || event.key === "p") || event.which === KeyCodes.P) && checkModifierKeys(event, false, false, false);

const hasModifierKeys = (event: KeyboardEvent): boolean => event.shiftKey || event.altKey || getCtrlKey(event);

const getCtrlKey = (event: KeyboardEvent): boolean => !!(event.metaKey || event.ctrlKey); // double negation doesn't have effect on boolean but ensures null and undefined are equivalent to false.

const checkModifierKeys = (event: KeyboardEvent, bCtrlKey: boolean, bAltKey: boolean, bShiftKey: boolean):boolean => event.shiftKey === bShiftKey && event.altKey === bAltKey && getCtrlKey(event) === bCtrlKey;

const isNumber = (event: KeyboardEvent): boolean => ((event.key ? "0123456789".indexOf(event.key) !== -1 : event.keyCode >= KeyCodes.DIGIT_0 && event.keyCode <= KeyCodes.DIGIT_9) && checkModifierKeys(event, false, false, false));

const isColon = (event: KeyboardEvent): boolean => ((event.key ? event.key === ":" : event.keyCode === KeyCodes.COLON) && checkModifierKeys(event, false, false, true));

export {
	isEnter,
	isEnterCtrl,
	isEnterAlt,
	isEnterShift,
	isCtrl,
	isSpace,
	isSpaceShift,
	isSpaceCtrl,
	isLeft,
	isRight,
	isUp,
	isDown,
	isLeftCtrl,
	isRightCtrl,
	isUpCtrl,
	isDownCtrl,
	isUpShift,
	isDownShift,
	isUpAlt,
	isDownAlt,
	isLeftShift,
	isRightShift,
	isLeftShiftCtrl,
	isRightShiftCtrl,
	isUpShiftCtrl,
	isDownShiftCtrl,
	isHome,
	isEnd,
	isPlus,
	isMinus,
	isHomeCtrl,
	isEndCtrl,
	isHomeShift,
	isEndShift,
	isEscape,
	isTabNext,
	isTabPrevious,
	isBackSpace,
	isDelete,
	isShow,
	isF2,
	isF4,
	isF4Shift,
	isF10Shift,
	isF6Previous,
	isF6Next,
	isF7,
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageUpAlt,
	isPageDownShift,
	isPageDownAlt,
	isPageUpShiftCtrl,
	isPageDownShiftCtrl,
	isShift,
	isCtrlA,
	isCtrlV,
	isKeyA,
	isKeyP,
	isDeleteShift,
	isInsertShift,
	isInsertCtrl,
	isNumber,
	isColon,
	isCtrlAltF8,
};
