import highlightText from "../../../src/util/highlightText.js";

const CLASS = "hl";
const wrap = (text: string) => `<span class="${CLASS}">${text}</span>`;

// highlightText encodes its output via encodeXML, so spaces and other special
// characters are returned as XML numeric entities (e.g. " " -> "&#x20;").
const SP = "&#x20;";

describe("highlightText", () => {
	describe("no highlighting", () => {
		it("returns the encoded original text when there is no match", () => {
			expect(highlightText("Hello World", "xyz", CLASS)).to.equal(`Hello${SP}World`);
		});

		it("returns the encoded original text when the highlight is empty", () => {
			expect(highlightText("Hello World", "", CLASS)).to.equal(`Hello${SP}World`);
		});

		it("returns an empty string when the text is null", () => {
			expect(highlightText(null, "abc", CLASS)).to.equal("");
		});

		it("returns an empty string when the text is empty", () => {
			expect(highlightText("", "abc", CLASS)).to.equal("");
		});

		it("returns the encoded original text when the highlight is null", () => {
			expect(highlightText("Hello World", null, CLASS)).to.equal(`Hello${SP}World`);
		});

		it("returns an empty string when both arguments are null", () => {
			expect(highlightText(null, null, CLASS)).to.equal("");
		});
	});

	describe("single match", () => {
		it("highlights a match in the middle of the text", () => {
			expect(highlightText("Hello World", "lo W", CLASS)).to.equal(`Hel${wrap(`lo${SP}W`)}orld`);
		});

		it("highlights a match at the start of the text", () => {
			expect(highlightText("Hello World", "Hello", CLASS)).to.equal(`${wrap("Hello")}${SP}World`);
		});

		it("highlights a match at the end of the text", () => {
			expect(highlightText("Hello World", "World", CLASS)).to.equal(`Hello${SP}${wrap("World")}`);
		});

		it("highlights the whole text when it fully matches", () => {
			expect(highlightText("Hello", "Hello", CLASS)).to.equal(wrap("Hello"));
		});
	});

	describe("case insensitivity", () => {
		it("matches regardless of case and preserves the original casing", () => {
			expect(highlightText("Hello World", "hello", CLASS)).to.equal(`${wrap("Hello")}${SP}World`);
		});

		it("matches an upper-case query against lower-case text", () => {
			expect(highlightText("hello world", "WORLD", CLASS)).to.equal(`hello${SP}${wrap("world")}`);
		});
	});

	describe("multiple matches", () => {
		it("highlights all non-overlapping occurrences", () => {
			expect(highlightText("aXaXa", "a", CLASS)).to.equal(`${wrap("a")}X${wrap("a")}X${wrap("a")}`);
		});

		it("highlights consecutive occurrences", () => {
			expect(highlightText("aaa", "a", CLASS)).to.equal(`${wrap("a")}${wrap("a")}${wrap("a")}`);
		});

		it("does not re-match inside an already matched region (overlapping)", () => {
			// "aa" is searched again from the end of the previous match, so only two matches in "aaaa"
			expect(highlightText("aaaa", "aa", CLASS)).to.equal(`${wrap("aa")}${wrap("aa")}`);
		});

		it("highlights multiple occurrences of a word", () => {
			expect(highlightText("cat dog cat", "cat", CLASS)).to.equal(`${wrap("cat")}${SP}dog${SP}${wrap("cat")}`);
		});
	});

	describe("special characters", () => {
		it("treats the highlight as a literal string, not a regex", () => {
			expect(highlightText("a.b.c", ".", CLASS)).to.equal(`a${wrap(".")}b${wrap(".")}c`);
		});

		it("highlights regex special characters literally and encodes the output", () => {
			expect(highlightText("price is $5 (approx)", "$5", CLASS)).to.equal(`price${SP}is${SP}${wrap("&#x24;5")}${SP}&#x28;approx&#x29;`);
		});

		it("does not treat the highlight as a wildcard", () => {
			expect(highlightText("abc", "a*c", CLASS)).to.equal("abc");
		});
	});

	describe("unicode handling", () => {
		it("keeps the original casing aligned when lowercasing expands a character (Turkish dotted İ)", () => {
			// "İ".toLowerCase() expands to two code units; the index map keeps slices aligned.
			expect(highlightText("İstanbul", "i", CLASS)).to.equal(`${wrap("İ")}stanbul`);
		});

		it("highlights an emoji made of surrogate pairs", () => {
			expect(highlightText("a😀b", "😀", CLASS)).to.equal(`a${wrap("😀")}b`);
		});
	});

	describe("XML encoding (XSS safety)", () => {
		it("encodes HTML in the non-matching parts", () => {
			expect(highlightText("<b>hi</b>", "zzz", CLASS)).to.equal("&lt;b&gt;hi&lt;&#x2f;b&gt;");
		});

		it("encodes HTML around and inside a match", () => {
			expect(highlightText("<script>alert(1)</script>", "alert", CLASS))
				.to.equal(`&lt;script&gt;${wrap("alert")}&#x28;1&#x29;&lt;&#x2f;script&gt;`);
		});

		it("encodes quotes and ampersands", () => {
			expect(highlightText(`a"b`, "z", CLASS)).to.equal("a&quot;b");
			expect(highlightText("a&b", "z", CLASS)).to.equal("a&amp;b");
		});
	});
});
