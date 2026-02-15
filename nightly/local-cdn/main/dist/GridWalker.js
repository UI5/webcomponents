/**
 * The GridWalker object represents the elements of a two-dimensional grid system and a position within them.
 *
 * @class
 * @private
 */
class GridWalker {
    constructor(grid = [[]]) {
        this.rowPos = 0;
        this.colPos = 0;
        this.pageSize = 20;
        this.firstRowPos = 0;
        this.lastRowPos = 0;
        this.grid = grid;
    }
    left() {
        this.colPos = Math.max(this.getColPos() - 1, 0);
    }
    right() {
        this.colPos = Math.min(this.getColPos() + 1, this.grid[this.getRowPos()].length - 1);
    }
    up() {
        this.rowPos = Math.max(this.getRowPos() - 1, 0);
    }
    down() {
        this.rowPos = Math.min(this.getRowPos() + 1, this.grid.length - 1);
    }
    pageup() {
        this.colPos = this.getColPos();
        const rowPos = this.getRowPos();
        this.rowPos = Math.max(rowPos > this.firstRowPos ? this.firstRowPos : 0, rowPos - this.pageSize);
    }
    pagedown() {
        this.colPos = this.getColPos();
        const rowPos = this.getRowPos();
        const endRowPos = this.grid.length - 1;
        const lastRowPos = endRowPos + this.lastRowPos;
        this.rowPos = Math.min(rowPos < lastRowPos ? lastRowPos : endRowPos, rowPos + this.pageSize);
    }
    home() {
        this.colPos = this.getColPos();
        if (this.colPos === 0) {
            this.rowPos = (this.rowPos > this.firstRowPos) ? this.firstRowPos : 0;
        }
        else {
            this.colPos = (this.colPos > 1) ? 1 : 0;
        }
    }
    end() {
        this.colPos = this.getColPos();
        if (this.colPos === 0) {
            const endRowPos = this.grid.length - 1;
            const lastRowPos = endRowPos + this.lastRowPos;
            this.rowPos = (this.rowPos < lastRowPos) ? lastRowPos : endRowPos;
        }
        else {
            const lastColPos = this.grid[this.rowPos].length - 1;
            this.colPos = (this.colPos < lastColPos) ? lastColPos : 0;
        }
    }
    setGrid(grid) {
        this.grid = grid;
    }
    getCurrent() {
        return this.grid[this.getRowPos()][this.getColPos()];
    }
    setCurrent(current) {
        this.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === current) {
                    this.rowPos = rowIndex;
                    this.colPos = colIndex;
                }
            });
        });
    }
    setRowPos(rowPos) {
        this.rowPos = rowPos;
    }
    getRowPos() {
        return Math.min(this.rowPos, this.grid.length - 1);
    }
    setColPos(colPos) {
        this.colPos = colPos;
    }
    getColPos() {
        return Math.min(this.colPos, this.grid[this.getRowPos()].length - 1);
    }
    setFirstRowPos(firstRowPos) {
        this.firstRowPos = firstRowPos;
    }
    getFirstRowPos() {
        return this.firstRowPos;
    }
    setLastRowPos(lastRowPos) {
        this.lastRowPos = lastRowPos;
    }
    getLastRowPos() {
        return this.lastRowPos;
    }
}
export default GridWalker;
//# sourceMappingURL=GridWalker.js.map