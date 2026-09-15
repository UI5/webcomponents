declare const scroll: (element: HTMLElement, dx: number, dy: number) => {
    promise: () => Promise<void | Error>;
    stop: () => () => void;
};
export default scroll;
