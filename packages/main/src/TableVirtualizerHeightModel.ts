/* eslint-disable no-bitwise */
const MEASURED = 1;
const PROVISIONAL = 2;
const ESTIMATE_TOLERANCE = 0.01;
// heights are stored with a precision of 1/64px, which is exact in a Float32Array for heights up to 262,144px
const HEIGHT_PRECISION = 64;

/**
 * Height model of the logical rows used by the `ui5-table-virtualizer`.
 *
 * Measured heights and the count of measured rows are stored in two Fenwick trees.
 * Unmeasured rows are represented by a single estimate, so that:
 * - the top offset of a row (prefix sum) is computed in O(log n),
 * - the row at a given offset is found in O(log n),
 * - updating a measured height is O(log n),
 * - changing the estimate is O(1), since the estimate is never stored per row.
 *
 * Memory: 4 bytes (height) + 1 byte (flags) + 8 bytes (height tree) + 4 bytes (count tree) = 17 bytes per row.
 *
 * Provisional heights (e.g. placeholder rows) take part in the layout like measured heights,
 * but they are excluded from the estimate and are dropped once the row is not rendered anymore.
 *
 * @class
 * @private
 */
class TableVirtualizerHeightModel {
	_count = 0;
	_heights = new Float32Array(0);
	_flags = new Uint8Array(0);
	_sumTree = new Float64Array(1);
	_cntTree = new Uint32Array(1);
	_topStep = 0;
	_estimate: number;
	_baseEstimate: number;
	_measuredSum = 0;
	_measuredCount = 0;
	_provisionalRows = new Set<number>();
	_lastEstimateCount = 0;

	constructor(estimate: number) {
		this._baseEstimate = estimate;
		this._estimate = estimate;
	}

	get count() {
		return this._count;
	}

	get estimate() {
		return this._estimate;
	}

	get measuredCount() {
		return this._measuredCount;
	}

	get provisionalCount() {
		return this._provisionalRows.size;
	}

	setBaseEstimate(estimate: number) {
		this._baseEstimate = estimate;
		this.updateEstimate();
	}

	/**
	 * Recomputes the estimate for unmeasured rows from the average of the measured ones.
	 * As every change shifts the positions of all unmeasured rows, the estimate is only updated
	 * once the measured sample has at least doubled, and small changes are ignored.
	 * @returns whether the estimate changed
	 */
	updateEstimate() {
		if (!this._measuredCount) {
			this._lastEstimateCount = 0;
			const changed = this._estimate !== this._baseEstimate;
			this._estimate = this._baseEstimate;
			return changed;
		}

		if (this._lastEstimateCount && this._measuredCount < 2 * this._lastEstimateCount) {
			return false;
		}

		this._lastEstimateCount = this._measuredCount;
		const estimate = Math.round((this._measuredSum / this._measuredCount) * 100) / 100;
		if (Math.abs(estimate - this._estimate) < this._estimate * ESTIMATE_TOLERANCE) {
			return false;
		}

		this._estimate = estimate;
		return true;
	}

	/**
	 * Resizes the model, keeps the measurements of the remaining rows.
	 */
	setCount(count: number) {
		count = Math.max(0, Math.floor(count));
		if (count === this._count) {
			return;
		}

		const heights = new Float32Array(count);
		const flags = new Uint8Array(count);
		const keep = Math.min(count, this._count);
		heights.set(this._heights.subarray(0, keep));
		flags.set(this._flags.subarray(0, keep));
		this._heights = heights;
		this._flags = flags;
		this._count = count;
		this._rebuild();
	}

	clear() {
		this._heights.fill(0);
		this._flags.fill(0);
		this._lastEstimateCount = 0;
		this._rebuild();
	}

	isMeasured(index: number) {
		return this._flags[index] !== 0;
	}

	isProvisional(index: number) {
		return this._flags[index] === PROVISIONAL;
	}

	height(index: number) {
		return this._flags[index] ? this._heights[index] : this._estimate;
	}

	/**
	 * Stores the rendered height of a row.
	 * @returns the height difference compared to the previously assumed height
	 */
	set(index: number, height: number, provisional = false) {
		if (index < 0 || index >= this._count) {
			return 0;
		}

		height = Math.round(height * HEIGHT_PRECISION) / HEIGHT_PRECISION;
		const oldFlag = this._flags[index];
		const oldStored = oldFlag ? this._heights[index] : 0;
		const oldHeight = oldFlag ? oldStored : this._estimate;
		const newFlag = provisional ? PROVISIONAL : MEASURED;
		if (oldFlag === newFlag && oldStored === height) {
			return 0;
		}

		this._track(index, -1);
		this._heights[index] = height;
		this._flags[index] = newFlag;
		this._track(index);
		this._update(index, height - oldStored, oldFlag ? 0 : 1);
		return height - oldHeight;
	}

	/**
	 * Drops the height of a row, so that it is represented by the estimate again.
	 * @returns the height difference compared to the previously assumed height
	 */
	unset(index: number) {
		if (index < 0 || index >= this._count || !this._flags[index]) {
			return 0;
		}

		const oldHeight = this._heights[index];
		this._track(index, -1);
		this._flags[index] = 0;
		this._heights[index] = 0;
		this._update(index, -oldHeight, -1);
		return this._estimate - oldHeight;
	}

	discardProvisionalOutside(first: number, last: number, beforeChange: () => void) {
		let changed = false;
		this._provisionalRows.forEach(index => {
			if (index < first || index >= last) {
				if (!changed) {
					beforeChange();
					changed = true;
				}
				this.unset(index);
			}
		});
	}

	/**
	 * Returns the summed height of all rows before the given index.
	 */
	prefix(index: number) {
		index = Math.max(0, Math.min(index, this._count));
		let sum = 0;
		let cnt = 0;
		for (let i = index; i > 0; i -= i & -i) {
			sum += this._sumTree[i];
			cnt += this._cntTree[i];
		}
		return sum + (index - cnt) * this._estimate;
	}

	total() {
		return this.prefix(this._count);
	}

	/**
	 * Returns the index of the row containing the given offset.
	 */
	indexAt(offset: number) {
		if (this._count === 0 || offset <= 0) {
			return 0;
		}

		let pos = 0;
		let sum = 0;
		let cnt = 0;
		const estimate = this._estimate;
		for (let step = this._topStep; step > 0; step >>= 1) {
			const next = pos + step;
			if (next <= this._count) {
				const nextSum = sum + this._sumTree[next];
				const nextCnt = cnt + this._cntTree[next];
				if (nextSum + (next - nextCnt) * estimate <= offset) {
					pos = next;
					sum = nextSum;
					cnt = nextCnt;
				}
			}
		}

		return Math.min(pos, this._count - 1);
	}

	_track(index: number, direction = 1) {
		if (this._flags[index] === MEASURED) {
			this._measuredSum += direction * this._heights[index];
			this._measuredCount += direction;
		} else if (this._flags[index] === PROVISIONAL) {
			if (direction > 0) {
				this._provisionalRows.add(index);
			} else {
				this._provisionalRows.delete(index);
			}
		}
	}

	_update(index: number, sumDelta: number, cntDelta: number) {
		for (let i = index + 1; i <= this._count; i += i & -i) {
			this._sumTree[i] += sumDelta;
			this._cntTree[i] += cntDelta;
		}
	}

	_rebuild() {
		const count = this._count;
		const sumTree = new Float64Array(count + 1);
		const cntTree = new Uint32Array(count + 1);
		this._measuredSum = 0;
		this._measuredCount = 0;
		this._provisionalRows.clear();
		for (let i = 0; i < count; i++) {
			if (this._flags[i]) {
				sumTree[i + 1] += this._heights[i];
				cntTree[i + 1] += 1;
				this._track(i);
			}
			const parent = (i + 1) + ((i + 1) & -(i + 1));
			if (parent <= count) {
				sumTree[parent] += sumTree[i + 1];
				cntTree[parent] += cntTree[i + 1];
			}
		}
		this._sumTree = sumTree;
		this._cntTree = cntTree;
		this._topStep = count ? 2 ** Math.floor(Math.log2(count)) : 0;
	}
}

export default TableVirtualizerHeightModel;
