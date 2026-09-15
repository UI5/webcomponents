const fetchPromises = new Map();
const jsonPromises = new Map();
const textPromises = new Map();
const fetchTextOnce = async (url) => {
    if (!fetchPromises.get(url)) {
        fetchPromises.set(url, fetch(url));
    }
    const response = await fetchPromises.get(url);
    if (response && !textPromises.get(url)) {
        textPromises.set(url, response.text());
    }
    return textPromises.get(url);
};
const fetchJsonOnce = async (url) => {
    if (!fetchPromises.get(url)) {
        fetchPromises.set(url, fetch(url));
    }
    const response = await fetchPromises.get(url);
    if (response && !jsonPromises.get(url)) {
        jsonPromises.set(url, response.json());
    }
    return jsonPromises.get(url);
};
export { fetchTextOnce, fetchJsonOnce };
//# sourceMappingURL=FetchHelper.js.map