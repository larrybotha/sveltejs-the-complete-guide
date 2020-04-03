import { readable } from "svelte/store";

function createMouseMoveSetter(set) {
  return function handleMouseMove(ev) {
    const { clientX, clientY } = ev;

    set({ clientX, clientY });
  };
}

const mouseMoveStore = readable({ clientX: 0, clientY: 0 }, set => {
  window.addEventListener("mousemove", createMouseMoveSetter(set));

  return () => {
    window.removeEventListener("mousemove", createMouseMoveSetter(set));
  };
});

export { mouseMoveStore };
