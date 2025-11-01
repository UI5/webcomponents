type ShellBarV2BreakpointType = "S" | "M" | "L" | "XL" | "XXL";

interface ShellBarV2BreakpointParams {
	width: number;
}

class ShellBarV2Breakpoint {
	private readonly breakpoints = [599, 1023, 1439, 1919, 10000];
	private readonly breakpointMap: Record<number, ShellBarV2BreakpointType> = {
		599: "S",
		1023: "M",
		1439: "L",
		1919: "XL",
		10000: "XXL",
	};

	calculate(params: ShellBarV2BreakpointParams): ShellBarV2BreakpointType {
		const { width } = params;
		const bp = this.breakpoints.find(b => width <= b) || 10000;
		return this.breakpointMap[bp];
	}
}

export default ShellBarV2Breakpoint;
export type {
	ShellBarV2BreakpointType,
	ShellBarV2BreakpointParams,
};
