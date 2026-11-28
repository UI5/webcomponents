declare const registerTag: (tag: string) => void;
declare const isTagRegistered: (tag: string) => boolean;
declare const hasRegisteredTags: () => boolean;
declare const getAllRegisteredTags: () => string[];
declare const recordTagRegistrationFailure: (tag: string) => void;
export { registerTag, isTagRegistered, hasRegisteredTags, getAllRegisteredTags, recordTagRegistrationFailure, };
