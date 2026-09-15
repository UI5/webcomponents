import type UI5Element from "./UI5Element.js";
type ConnectOptions = {
    host: UI5Element;
    propName: string;
    onConnect?: (friend: HTMLElement) => void;
    onDisconnect?: (friend: HTMLElement) => void;
};
declare const connectToComponent: (options: ConnectOptions) => HTMLElement | undefined;
export default connectToComponent;
