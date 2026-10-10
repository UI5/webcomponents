/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
declare const nextFallbackLocale: (locale: string) => string;
export default nextFallbackLocale;
