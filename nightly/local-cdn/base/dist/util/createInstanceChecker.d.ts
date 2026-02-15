declare function createChecker<T, P extends keyof T = keyof T>(prop: P): (object: any) => object is T;
export default createChecker;
