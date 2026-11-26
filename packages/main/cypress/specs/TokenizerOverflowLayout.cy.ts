/**
 * Unit tests for the pure calculateLayout function.
 *
 * These run in the Cypress browser context so real CSS pixel arithmetic is used,
 * but no DOM components are involved.  The tests cover the pure function in
 * isolation from the Tokenizer component.
 */
import { calculateLayout } from "../../src/TokenizerOverflowLayout.js";

// ── helpers ──────────────────────────────────────────────────────────────────

/** Build a nMoreWidth lookup from a { count → width } map, falling back to 50. */
const nMore = (map: Record<number, number> = {}) =>
	(count: number) => map[count] ?? 50;

const GAP = 5;         // --_ui5_token_right_margin default
const PADDING = 5;     // --_ui5_tokenizer_padding default

// ── State A: all tokens fit ───────────────────────────────────────────────────

describe("calculateLayout – State A (all tokens fit)", () => {
	it("returns state=all for an empty token list", () => {
		const result = calculateLayout(300, [], GAP, PADDING, nMore());
		expect(result).to.deep.equal({ state: "all", visibleCount: 0, hiddenCount: 0 });
	});

	it("returns state=all for one token that exactly fits", () => {
		// padding(5) + token(40) = 45 ≤ 45
		const result = calculateLayout(45, [40], GAP, PADDING, nMore());
		expect(result).to.deep.equal({ state: "all", visibleCount: 1, hiddenCount: 0 });
	});

	it("returns state=all when all tokens plus gaps fit", () => {
		// padding(5) + 40 + 5 + 40 + 5 + 40 - 5 (no trailing gap) = 5+40+5+40+5+40 - 5 = 130
		// prefix[3] - gap = (5 + 45*3) - 5 = (5+135) - 5 = 135 → actually:
		// prefix[3] = 5 + (40+5)*3 = 5 + 135 = 140; 140 - 5 = 135
		const result = calculateLayout(135, [40, 40, 40], GAP, PADDING, nMore());
		expect(result).to.deep.equal({ state: "all", visibleCount: 3, hiddenCount: 0 });
	});

	it("returns state=all when container is exactly 1px wider than needed", () => {
		const result = calculateLayout(136, [40, 40, 40], GAP, PADDING, nMore());
		expect(result).to.deep.equal({ state: "all", visibleCount: 3, hiddenCount: 0 });
	});
});

// ── State B: some tokens fit ──────────────────────────────────────────────────

describe("calculateLayout – State B (some tokens fit)", () => {
	it("returns state=some when first token + n-more fits but not all tokens", () => {
		// 3 tokens of 40px, gap 5, padding 5.  All tokens = 130px > 100px container.
		// K=2: prefix[2] = 5+(40+5)*2 = 95; 95 + nMore(1)=50 = 145 > 100 → no
		// K=1: prefix[1] = 5+(40+5)*1 = 50; 50 + nMore(2)=50 = 100 ≤ 100 → yes
		const result = calculateLayout(100, [40, 40, 40], GAP, PADDING, nMore());
		expect(result).to.deep.equal({ state: "some", visibleCount: 1, hiddenCount: 2 });
	});

	it("shows the largest prefix of tokens that fits", () => {
		// widths=[30,30,30,30], gap=5, padding=5, nMore always 40.
		// All: prefix[4]-gap = 5+(35*4)-5 = 140-5=135 > 120.
		// K=3: prefix[3]=5+35*3=110; 110+40=150 > 120.
		// K=2: prefix[2]=5+35*2=75;  75+40=115 ≤ 120 → fits.
		const result = calculateLayout(120, [30, 30, 30, 30], GAP, PADDING, nMore({ 2: 40 }));
		expect(result).to.deep.equal({ state: "some", visibleCount: 2, hiddenCount: 2 });
	});

	it("handles a wide n-more button for a specific count (non-uniform nMoreWidth)", () => {
		// widths=[50,50,50], gap=5, padding=5, container=150.
		// State A: padding(5) + 3*50 + 2*5 = 165 > 150 → not all fit.
		// K=2: prefix[2]=5+55*2=115; +nMore(1)=120 → 235 > 150.
		// K=1: prefix[1]=5+55=60;    +nMore(2)=30  → 90 ≤ 150 → fits.
		const result = calculateLayout(150, [50, 50, 50], GAP, PADDING, nMore({ 1: 120, 2: 30 }));
		expect(result).to.deep.equal({ state: "some", visibleCount: 1, hiddenCount: 2 });
	});

	it("always shows at least one token in state B", () => {
		// 5 tokens of 60px. K=1: prefix[1]=5+65=70; +nMore(4)=50 → 120 ≤ 130.
		const result = calculateLayout(130, [60, 60, 60, 60, 60], GAP, PADDING, nMore());
		expect(result.visibleCount).to.be.gte(1);
	});

	it("hiddenCount equals total minus visibleCount", () => {
		const result = calculateLayout(120, [40, 40, 40, 40], GAP, PADDING, nMore());
		expect(result.hiddenCount).to.equal(4 - result.visibleCount);
	});

	it("uses prefix sums correctly for 10 tokens", () => {
		const widths = Array(10).fill(20);  // 10 tokens of 20px each
		// All = 5 + (20+5)*10 - 5 = 5+250-5 = 250 > 120
		// K=1: 5+25=30; +nMore(9)=50 → 80 ≤ 120 → fits.
		// K=2: 5+25*2=55; +50=105 ≤ 120 → fits.
		// K=3: 5+25*3=80; +50=130 > 120.
		// Expected: K=2 (largest that fits iterating from 9 down to 1).
		// Actually iterating from K=9 down:
		//   K=9: 5+225+50=280>120
		//   ...
		//   K=2: 5+50+50=105≤120 → first match
		const result = calculateLayout(120, widths, GAP, PADDING, nMore());
		expect(result).to.deep.equal({ state: "some", visibleCount: 2, hiddenCount: 8 });
	});

	it("accounts for fractional pixel widths without rounding errors", () => {
		// Use fractional widths to verify we don't accidentally round and miss a fit.
		// padding=5, token=39.5, gap=5, nMore=50.
		// K=1: 5+44.5+50 = 99.5 ≤ 100 → fits.
		const result = calculateLayout(100, [39.5, 39.5], GAP, PADDING, nMore());
		expect(result.visibleCount).to.be.gte(1);
	});
});

// ── State C: no tokens fit ────────────────────────────────────────────────────

describe("calculateLayout – State C (no tokens fit)", () => {
	it("returns state=none when container is too narrow for even one token + n-more", () => {
		// 1 token of 60px, container=60px. padding(5)+token(60)=65 > 60 → State A fails.
		// n=1 so State B loop never runs (k starts at n-1=0, condition k≥1 is false). → State C.
		const result = calculateLayout(60, [60], GAP, PADDING, nMore({ 1: 60 }));
		expect(result).to.deep.equal({ state: "none", visibleCount: 0, hiddenCount: 1 });
	});

	it("returns hiddenCount equal to total token count in state C", () => {
		// Very wide n-more so nothing fits.
		const result = calculateLayout(50, [40, 40, 40], GAP, PADDING, nMore({ 1: 200, 2: 200 }));
		expect(result.hiddenCount).to.equal(3);
		expect(result.visibleCount).to.equal(0);
	});

	it("returns state=none for zero-width container", () => {
		const result = calculateLayout(0, [40, 40], GAP, PADDING, nMore());
		expect(result.state).to.equal("none");
	});
});

// ── Boundary / edge cases ────────────────────────────────────────────────────

describe("calculateLayout – edge cases", () => {
	it("handles a single token exactly matching the container minus padding", () => {
		// padding(5) + token(95) = 100 ≤ 100
		const result = calculateLayout(100, [95], GAP, PADDING, nMore());
		expect(result).to.deep.equal({ state: "all", visibleCount: 1, hiddenCount: 0 });
	});

	it("handles a single token that is 1px too wide (no n-more possible, state C)", () => {
		// padding(5) + token(96) = 101 > 100.
		// State B K=1: impossible (only 1 token, can't show 1 visible + n-more for 0 hidden).
		// So state C.
		const result = calculateLayout(100, [96], GAP, PADDING, nMore());
		expect(result.state).to.equal("none");
		expect(result.hiddenCount).to.equal(1);
	});

	it("handles duplicate token widths correctly", () => {
		const widths = [40, 40, 40, 40];
		const result = calculateLayout(200, widths, GAP, PADDING, nMore());
		// All: 5+45*4-5=180≤200 → state A
		expect(result.state).to.equal("all");
		expect(result.visibleCount).to.equal(4);
	});

	it("returns consistent results across multiple calls with same inputs", () => {
		const args = [200, [40, 40, 40], GAP, PADDING, nMore()] as const;
		const r1 = calculateLayout(...args);
		const r2 = calculateLayout(...args);
		expect(r1).to.deep.equal(r2);
	});

	it("nMoreWidth is not called for state A (all tokens fit)", () => {
		let called = false;
		const spy = (_: number) => { called = true; return 50; };
		calculateLayout(1000, [40, 40, 40], GAP, PADDING, spy);
		expect(called).to.be.false;
	});

	it("nMoreWidth is not called for an empty token list", () => {
		let called = false;
		const spy = (_: number) => { called = true; return 50; };
		calculateLayout(100, [], GAP, PADDING, spy);
		expect(called).to.be.false;
	});

	it("handles very long token labels (large widths) gracefully", () => {
		const widths = [500, 600, 700];   // each token is huge
		// K=1: 5+505+50=560 > 200 → no.  State C.
		const result = calculateLayout(200, widths, GAP, PADDING, nMore());
		expect(result.state).to.equal("none");
	});

	it("handles container exactly 1px narrower than all-fit threshold", () => {
		// All fit at 135 (see state A test above).  At 134 it should overflow.
		const result = calculateLayout(134, [40, 40, 40], GAP, PADDING, nMore());
		expect(result.state).not.to.equal("all");
	});

	it("gap of 0 still produces correct results", () => {
		// padding(5) + 3*30 = 95 ≤ 100 → all fit
		const result = calculateLayout(100, [30, 30, 30], 0, PADDING, nMore());
		expect(result).to.deep.equal({ state: "all", visibleCount: 3, hiddenCount: 0 });
	});
});
