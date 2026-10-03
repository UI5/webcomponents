declare const applyCustomAnnouncement: (element: HTMLElement, text?: string | string[]) => void;
type CustomAnnouncementOptions = {
    lessDetails?: boolean;
};
declare const getCustomAnnouncement: (element: Node, options?: CustomAnnouncementOptions, _isRootElement?: boolean) => string;
export { getCustomAnnouncement, applyCustomAnnouncement, };
