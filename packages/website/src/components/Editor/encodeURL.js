import pako from "pako";

function encodeURL(str) {
  const optimized = str.replace(/\s+/g, ' ').trim();
  
  // compress with maximum settings
  const compressed = pako.deflate(optimized, { 
    level: 9, 
    windowBits: 15, 
    memLevel: 9 
  });
  
  // convert to url-safe base64
  let binary = "";
  for (let i = 0; i < compressed.length; i++) {
    binary += String.fromCharCode(compressed[i]);
  }
  
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeURL(str) {
  // restore base64 format
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  
  return pako.inflate(bytes, { to: "string" });
}

// const testString = 'helljkh"ao⛳❤️🧀';
// const encoded = encodeURL(testString);
// const decoded = decodeURL(encoded);
// console.log({testString, encoded, decoded});

export { encodeURL, decodeURL }
