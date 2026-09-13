/**
 * The GridWalker object represents the elements of a two-dimensional grid system and a position within them.
 *
 * @class
 * @private
 */
declare class GridWalker {
    grid: unknown[][];
    rowPos: number;
    colPos: number;
    pageSize: number;
    firstRowPos: number;
    lastRowPos: number;
    constructor(grid?: unknown[][]);
    left(): void;
    right(): void;
    up(): void;
    down(): void;
    pageup(): void;
    pagedown(): void;
    home(): void;
    end(): void;
    setGrid(grid: unknown[][]): void;
    getCurrent(): unknown;
    setCurrent(current: unknown): void;
    setRowPos(rowPos: number): void;
    getRowPos(): number;
    setColPos(colPos: number): void;
    getColPos(): number;
    setFirstRowPos(firstRowPos: number): void;
    getFirstRowPos(): number;
    setLastRowPos(lastRowPos: number): void;
    getLastRowPos(): number;
}
export default GridWalker;
