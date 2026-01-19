let supportsStyleQueries: boolean | null = null;

const detectStyleQuerySupport = () => {
	if (supportsStyleQueries === null) {
		const c = document.createElement("div");
		c.style.setProperty("--x", "1");

		const ch = document.createElement("div");
		c.appendChild(ch);
		document.body.appendChild(c);

		const s = document.createElement("style");
		s.textContent = `
    @container style(--x: 1) { div { outline: 1px solid red; } }
  `;
		document.head.appendChild(s);

		supportsStyleQueries = getComputedStyle(ch).outlineStyle !== "none";

		s.remove();
		c.remove();
	}

	return supportsStyleQueries;
};

export default detectStyleQuerySupport;
