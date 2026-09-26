declare const slideDown: (element: HTMLElement) => {
    promise: () => Promise<void | Error>;
    stop: () => () => void;
};
export default slideDown;
