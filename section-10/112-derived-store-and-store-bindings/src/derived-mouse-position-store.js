import { derived } from "svelte/store";

import { mouseMoveStore } from "./mouse-move-store";

/**
 * Derive the relative position of the mouse from the mouse move store
 *
 * This is similar to using a simple observable stream, and creating a more complex
 * stream from that stream
 */
const derivedMousePosition = derived(mouseMoveStore, $mousePos => {
  const { clientX, clientY } = $mousePos;
  const { offsetWidth, offsetHeight } = document.body;

  return {
    x: Math.round((clientX / offsetWidth) * 100, 2),
    y: Math.round((clientY / offsetHeight) * 100, 2),
  };
});

export { derivedMousePosition };
