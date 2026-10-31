"use strict";const n=t=>{let e=0;return(t.selectionStart||t.selectionStart===0)&&(e=t.selectionDirection==="backward"?t.selectionStart:t.selectionEnd),e},o=(t,e)=>{t.selectionStart?(t.focus(),t.setSelectionRange(e,e)):t.focus()};export{n as getCaretPosition,o as setCaretPosition};
//# sourceMappingURL=Caret.js.map
