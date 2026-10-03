declare const slideUp: (element: HTMLElement) => {
    promise: () => Promise<void | Error>;
    stop: () => () => void;
};
export default slideUp;
