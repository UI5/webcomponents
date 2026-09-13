declare const StartsWithPerTerm: <T>(value: string, items: Array<T>, propName: string) => T[];
declare const StartsWith: <T>(value: string, items: Array<T>, propName: string) => Array<T>;
declare const Contains: <T>(value: string, items: Array<T>, propName: string) => Array<T>;
declare const None: <T>(_: string, items: Array<T>) => Array<T>;
export { StartsWithPerTerm, StartsWith, Contains, None, };
