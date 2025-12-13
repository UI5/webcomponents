type AnimateOptions = {
    beforeStart?: () => void;
    duration: number;
    element: HTMLElement;
    advance: (p: number) => void;
};
declare const animate: (options: AnimateOptions) => {
    promise: () => Promise<void | Error>;
    stop: () => () => void;
};
declare const duration = 400;
export { duration };
export type { AnimateOptions };
export default animate;
