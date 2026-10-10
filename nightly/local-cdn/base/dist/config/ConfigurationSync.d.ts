/**
 * Stores value in shared map and fires a cross-runtime config change event.
 * The firing runtime's own handler is skipped via the skip-guard pattern.
 */
declare const fireConfigChange: (name: string, value: unknown) => void;
/**
 * Registers a per-setting cross-runtime listener.
 * The handler is only called when another runtime fires the change.
 */
declare const attachConfigChange: (name: string, handler: (value: any) => void) => void;
/**
 * Reads the last-set value from the shared values map.
 * Used by late-booting runtimes to pick up values already set by others.
 */
declare const getSharedValue: <T>(name: string) => T | undefined;
export { fireConfigChange, attachConfigChange, getSharedValue };
