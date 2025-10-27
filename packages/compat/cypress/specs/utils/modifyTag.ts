const modifyTag = (tag: string, legacySuffix?: string, suffix?: string) => {
	return [tag, legacySuffix, suffix].filter(Boolean).join("-");
}

export default modifyTag;