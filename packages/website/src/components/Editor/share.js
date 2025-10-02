// code adapted from https://web.dev/articles/base64-encoding

function _base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function _bytesToBase64(bytes) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}

const encodeToBase64 = (str) => {
    const base64 = _bytesToBase64(new TextEncoder().encode(str));
    // make it url safe and remove padding (supported browsers work without it)
    const base64url = base64.replaceAll('+', '-').replaceAll('/', '_').replaceAll("=", "");
    return base64url;
}

const decodeFromBase64 = (str) => {
    const base64 = str.replaceAll('-', '+').replaceAll('_', '/');
    return new TextDecoder().decode(_base64ToBytes(base64));
}

// const testString = 'helljkh"ao⛳❤️🧀';
// const encoded = encodeToBase64(testString);
// const decoded = decodeFromBase64(encoded);
// console.log({testString, encoded, decoded});

export { encodeToBase64, decodeFromBase64 }