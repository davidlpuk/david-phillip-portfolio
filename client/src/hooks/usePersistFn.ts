import { useRef } from "react";

/**
 * usePersistFn instead of useCallback to reduce cognitive load
 * Preserves function reference across renders while maintaining type safety
 */
export function usePersistFn<T extends (...args: never[]) => unknown>(fn: T) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T | null>(null);
  if (!persistFn.current) {
    persistFn.current = function (this: unknown, ...args: Parameters<T>) {
      return fnRef.current.apply(this, args);
    } as T;
  }

  return persistFn.current;
}
