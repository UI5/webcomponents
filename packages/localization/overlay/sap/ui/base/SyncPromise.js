sap.ui.define([], function() {
	"use strict";

	function SyncPromise(fn) {
		this._value = undefined;
		this._error = undefined;
		this._fulfilled = false;
		this._rejected = false;

		var self = this;
		try {
			fn(
				function(v) {
					if (v && typeof v.then === "function") {
						// If resolving with a thenable, remain pending
						return;
					}
					self._value = v;
					self._fulfilled = true;
				},
				function(e) {
					self._error = e;
					self._rejected = true;
				}
			);
		} catch (e) {
			self._error = e;
			self._rejected = true;
		}
	}

	SyncPromise.resolve = function(v) {
		if (v instanceof SyncPromise) {
			return v;
		}
		return new SyncPromise(function(resolve) { resolve(v); });
	};

	SyncPromise.reject = function(e) {
		return new SyncPromise(function(resolve, reject) { reject(e); });
	};

	SyncPromise.all = function(arr) {
		var results = [];
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] instanceof SyncPromise) {
				if (arr[i]._rejected) {
					return SyncPromise.reject(arr[i]._error);
				}
				results.push(arr[i]._value);
			} else {
				results.push(arr[i]);
			}
		}
		return SyncPromise.resolve(results);
	};

	SyncPromise.prototype.then = function(onFulfilled, onRejected) {
		if (this._fulfilled) {
			if (typeof onFulfilled === "function") {
				try {
					return SyncPromise.resolve(onFulfilled(this._value));
				} catch (e) {
					return SyncPromise.reject(e);
				}
			}
			return this;
		}
		if (this._rejected) {
			if (typeof onRejected === "function") {
				try {
					return SyncPromise.resolve(onRejected(this._error));
				} catch (e) {
					return SyncPromise.reject(e);
				}
			}
			return this;
		}
		return this;
	};

	SyncPromise.prototype.catch = function(onRejected) {
		return this.then(undefined, onRejected);
	};

	SyncPromise.prototype.finally = function(onFinally) {
		if (typeof onFinally === "function") {
			onFinally();
		}
		return this;
	};

	SyncPromise.prototype.unwrap = function() {
		if (this._rejected) {
			throw this._error;
		}
		return this._value;
	};

	SyncPromise.prototype.isFulfilled = function() { return this._fulfilled; };
	SyncPromise.prototype.isPending = function() { return !this._fulfilled && !this._rejected; };
	SyncPromise.prototype.isRejected = function() { return this._rejected; };

	return SyncPromise;
});
