import { readable } from "svelte/store";

function handleMouseMove(set) {
  return function handleMouseMoveClosure(ev) {
    const { clientX, clientY } = ev;

    set({ clientX, clientY });
  };
}

const mouseStore = readable({ clientX: 0, clientY: 0 }, set => {
  window.addEventListener("mousemove", handleMouseMove(set));

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
});

export { mouseStore };
