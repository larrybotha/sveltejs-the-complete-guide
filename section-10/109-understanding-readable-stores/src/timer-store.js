import { readable } from "svelte/store";

let count = 0;

/**
 * Provide a default value to readable
 */
const timer = readable(0, set => {
  const timerId = setInterval(() => {
    /**
     * set the value of the store
     */
    set(++count);
  }, 1000);

  /**
   * As soon as we have no subscribers, this store will no longer increment count
   */
  return () => {
    clearInterval(timerId);
  };
});

export { timer };
