function draggable(node) {
  console.log("draggable node mounted");

  function handleMouseDown(ev) {
    const { clientX: x, clientY: y } = ev.touches ? ev.touches[0] : ev;

    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchcancel", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    node.dispatchEvent(new CustomEvent("dragstart", { detail: { x, y } }));
  }

  function handleMouseMove(ev) {
    const { clientX: x, clientY: y } = ev.touches ? ev.touches[0] : ev;

    node.dispatchEvent(new CustomEvent("dragmove", { detail: { x, y } }));
  }

  function handleMouseUp(ev) {
    const { clientX: x, clientY: y } =
      ev.touches && ev.touches.length ? ev.touches[0] : ev;

    node.dispatchEvent(new CustomEvent("dragend", { x, y }));

    window.removeEventListener("touchmove", handleMouseMove);
    window.removeEventListener("touchend", handleMouseUp);
    window.removeEventListener("touchcancel", handleMouseUp);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("touchstart", handleMouseDown);

  return {
    update() {
      console.log("updated");
    },

    destroy() {
      console.log("draggable element destroyed");
      node.removeEventListener("mousedown", handleMouseDown);
      node.removeEventListener("touchstart", handleMouseDown);
    },
  };
}

export { draggable };
