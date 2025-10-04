declare const getElementSelection: (element: HTMLElement) => {
    selectedText: string;
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export default getElementSelection;
