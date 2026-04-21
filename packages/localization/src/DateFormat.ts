import type DateFormatT from "sap/ui/core/format/DateFormat";
// @ts-ignore
import DateFormatNative from "./sap/ui/core/format/DateFormat.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import LocaleWrapped from "./Locale.js";
import type CalendarWeekNumbering from "sap/base/i18n/date/CalendarWeekNumbering";
import type CalendarType from "sap/base/i18n/date/CalendarType";

type DateFormatOptions = {
	calendarWeekNumbering?: CalendarWeekNumbering | keyof typeof CalendarWeekNumbering;
	firstDayOfWeek?: int;
	minimalDaysInFirstWeek?: int;
	format?: string;
	pattern?: string;
	style?: string;
	strictParsing?: boolean;
	relative?: boolean;
	relativeRange?: int[];
	relativeScale?: string;
	relativeStyle?: string;
	interval?: boolean;
	intervalDelimiter?: string;
	singleIntervalValue?: boolean;
	UTC?: boolean;
	calendarType?: CalendarType | keyof typeof CalendarType;
};

const DateFormatWrapped = DateFormatNative as typeof DateFormatT;

class DateFormat extends DateFormatWrapped {
	/**
	 * Central cache for all DateFormat instances across the entire library.
	 * Shared by Calendar, DatePicker, TimePicker, and all other date components.
	 * Key format: "type:JSON.stringify(options):locale"
	 * @private
	 */
	private static _cache = new Map<string, DateFormat>();
	
	private static _stats = {
		totalCalls: 0,
		cacheHits: 0,
		cacheMisses: 0,
		uniqueInstances: 0,
	};

	static logCacheStats() {
		console.log("===== DateFormat Cache Statistics =====");
		console.log(`Total calls:        ${DateFormat._stats.totalCalls}`);
		console.log(`Cache hits:         ${DateFormat._stats.cacheHits} (${DateFormat._stats.totalCalls > 0 ? ((DateFormat._stats.cacheHits / DateFormat._stats.totalCalls) * 100).toFixed(1) : 0}%)`);
		console.log(`Cache misses:       ${DateFormat._stats.cacheMisses} (${DateFormat._stats.totalCalls > 0 ? ((DateFormat._stats.cacheMisses / DateFormat._stats.totalCalls) * 100).toFixed(1) : 0}%)`);
		console.log(`Unique instances:   ${DateFormat._cache.size}`);
		console.log(`Total instances:    ${(window as any).dateformatinstances?.size || 0}`);
		console.log("Cache keys:");
		Array.from(DateFormat._cache.keys()).forEach((key, index) => {
			console.log(`  ${index + 1}. ${key}`);
		});
		console.log("=========================================\n");
		
		return {
			totalCalls: DateFormat._stats.totalCalls,
			cacheHits: DateFormat._stats.cacheHits,
			cacheMisses: DateFormat._stats.cacheMisses,
			uniqueInstances: DateFormat._cache.size,
			totalInstances: (window as any).dateformatinstances?.size || 0,
		};
	}

	static getDateInstance(oFormatOptions?: DateFormatOptions, oLocale?: LocaleWrapped): DateFormat;
	static getDateInstance(oLocale?: LocaleWrapped): DateFormat;
	static getDateInstance(oFormatOptionsOrLocale?: DateFormatOptions | LocaleWrapped, oLocale?: LocaleWrapped): DateFormat {
		DateFormat._stats.totalCalls++;
		
		if (oFormatOptionsOrLocale instanceof LocaleWrapped) {
         return DateFormatWrapped.getDateInstance(undefined, oFormatOptionsOrLocale);
		}
		
		const nativeLocale = oLocale ?? new LocaleWrapped(getLocale().toString());
		const cacheKey = `date:${JSON.stringify(oFormatOptionsOrLocale || {})}:${nativeLocale.toString()}`;
		
		if (!DateFormat._cache.has(cacheKey)) {
			DateFormat._stats.cacheMisses++;
			console.log(`[DateFormat CACHE MISS #${DateFormat._stats.cacheMisses}] Creating NEW date instance | Total instances: ${DateFormat._cache.size + 1}`);
			console.log(`  Key: ${cacheKey}`);
			const date = DateFormatWrapped.getDateInstance(oFormatOptionsOrLocale, nativeLocale);
			DateFormat._cache.set(cacheKey, date);
		} else {
			DateFormat._stats.cacheHits++;
			console.log(`[DateFormat CACHE HIT #${DateFormat._stats.cacheHits}] Reusing CACHED date instance`);
		}
		
		return DateFormat._cache.get(cacheKey)!;
	}

	static getTimeInstance(oFormatOptions?: DateFormatOptions, oLocale?: LocaleWrapped): DateFormat;
	static getTimeInstance(oLocale?: LocaleWrapped): DateFormat;
	static getTimeInstance(oFormatOptionsOrLocale?: DateFormatOptions | LocaleWrapped, oLocale?: LocaleWrapped): DateFormat {
		DateFormat._stats.totalCalls++;
		
		if (oFormatOptionsOrLocale instanceof LocaleWrapped) {
         return DateFormatWrapped.getTimeInstance(undefined, oFormatOptionsOrLocale);
		}
		
		const nativeLocale = oLocale ?? new LocaleWrapped(getLocale().toString());
		const cacheKey = `time:${JSON.stringify(oFormatOptionsOrLocale || {})}:${nativeLocale.toString()}`;
		
		if (!DateFormat._cache.has(cacheKey)) {
			DateFormat._stats.cacheMisses++;
			console.log(`[DateFormat CACHE MISS #${DateFormat._stats.cacheMisses}] Creating NEW time instance | Total instances: ${DateFormat._cache.size + 1}`);
			console.log(`  Key: ${cacheKey}`);
			const time = DateFormatWrapped.getTimeInstance(oFormatOptionsOrLocale, nativeLocale);
			DateFormat._cache.set(cacheKey, time);
		} else {
			DateFormat._stats.cacheHits++;
			console.log(`[DateFormat CACHE HIT #${DateFormat._stats.cacheHits}] Reusing CACHED time instance`);
		}
		
		return DateFormat._cache.get(cacheKey)!;
	}

	static getDateTimeInstance(oFormatOptions?: DateFormatOptions, oLocale?: LocaleWrapped): DateFormat;
	static getDateTimeInstance(oLocale?: LocaleWrapped): DateFormat;
	static getDateTimeInstance(oFormatOptionsOrLocale?: DateFormatOptions | LocaleWrapped, oLocale?: LocaleWrapped): DateFormat {
		DateFormat._stats.totalCalls++;
		
		if (oFormatOptionsOrLocale instanceof LocaleWrapped) {
         return DateFormatWrapped.getDateTimeInstance(undefined, oFormatOptionsOrLocale);
		}
		
		const nativeLocale = oLocale ?? new LocaleWrapped(getLocale().toString());
		const cacheKey = `datetime:${JSON.stringify(oFormatOptionsOrLocale || {})}:${nativeLocale.toString()}`;
		
		if (!DateFormat._cache.has(cacheKey)) {
			DateFormat._stats.cacheMisses++;
			console.log(`[DateFormat CACHE MISS #${DateFormat._stats.cacheMisses}] Creating NEW datetime instance | Total instances: ${DateFormat._cache.size + 1}`);
			console.log(`  Key: ${cacheKey}`);
			const datetime = DateFormatWrapped.getDateTimeInstance(oFormatOptionsOrLocale, nativeLocale);
			DateFormat._cache.set(cacheKey, datetime);
		} else {
			DateFormat._stats.cacheHits++;
			console.log(`[DateFormat CACHE HIT #${DateFormat._stats.cacheHits}] Reusing CACHED datetime instance`);
		}
		
		return DateFormat._cache.get(cacheKey)!;
	}
}

// @ts-ignore
if (typeof window !== "undefined") {
	// @ts-ignore
	window.DateFormatStats = {
		log: () => DateFormat.logCacheStats(),
		get: () => ({
			totalCalls: DateFormat["_stats"].totalCalls,
			cacheHits: DateFormat["_stats"].cacheHits,
			cacheMisses: DateFormat["_stats"].cacheMisses,
			uniqueInstances: DateFormat["_cache"].size,
		}),
	};
}

export default DateFormat;
