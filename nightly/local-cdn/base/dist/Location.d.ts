declare const internals: {
    search(): string;
};
declare const getLocationHostname: () => string;
declare const getLocationPort: () => string;
declare const getLocationProtocol: () => string;
declare const getLocationHref: () => string;
declare const getLocationSearch: () => string;
declare const locationOpen: (url?: string | URL, target?: string, features?: string) => void;
declare const locationReload: () => void;
export { internals, locationReload, getLocationHref, getLocationSearch, getLocationHostname, getLocationPort, getLocationProtocol, locationOpen, };
