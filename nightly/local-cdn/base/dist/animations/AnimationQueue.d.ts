type TaskType = () => Promise<void>;
declare class AnimationQueue {
    static get tasks(): WeakMap<HTMLElement, TaskType[]>;
    static enqueue(element: HTMLElement, task: TaskType): void;
    static run(element: HTMLElement, task: TaskType): Promise<void>;
    static push(element: HTMLElement, task: TaskType): void;
}
export default AnimationQueue;
