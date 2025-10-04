declare const fetchTextOnce: (url: string) => Promise<string | undefined>;
declare const fetchJsonOnce: (url: string) => Promise<any>;
export { fetchTextOnce, fetchJsonOnce };
