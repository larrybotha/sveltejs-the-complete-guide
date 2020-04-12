<script>
  import { spring } from "svelte/motion";

  import { draggable } from "./actions/draggable";

  const carStates = {
    moving: "moving",
    idle: "idle",
    stopping: "stopping"
  };
  let stageBounds = { offsetHeight: 0, offsetWidth: 0 };
  let mouseDownPos = { x: 0, y: 0 };
  let controlCoords = spring({ x: 0, y: 0 });
  let carCoords = { x: 0, y: 0, rotation: { z: 0 } };
  let carPhysics = spring({ velX: 0, velY: 0 });
  let carState = carStates.idle;

  $: if (carState === carStates.moving) {
    render();
  }

  function handleDragStart(ev) {
    const { x: x, y: y } = ev.detail;

    mouseDownPos = { x, y };
  }

  function handleDragMove(ev) {
    const { x, y } = ev.detail;

    carState = carStates.moving;

    controlCoords.damping = controlCoords.stiffness = 1;
    controlCoords.set({
      x: x - mouseDownPos.x,
      y: y - mouseDownPos.y
    });

    carPhysics.update(coords => ({
      velX: (x - mouseDownPos.x) / 7.5,
      velY: (y - mouseDownPos.y) / 7.5
    }));
  }

  async function handleDragEnd(ev) {
    mouseDownPos = { x: 0, y: 0 };

    controlCoords.damping = 0.3;
    controlCoords.stiffness = 0.1;

    carPhysics.damping = 0.8;
    carPhysics.stiffness = 0.05;

    controlCoords.set({ x: 0, y: 0 });

    carState = carStates.stopping;

    await carPhysics.set({
      velX: 0,
      velY: 0
    });

    carState = carStates.idle;
  }

  function updateCarCoords() {
    const { velX, velY } = $carPhysics;

    carCoords = {
      x: Math.min(
        Math.max(carCoords.x + velX, -stageBounds.offsetWidth / 2),
        stageBounds.offsetWidth / 2
      ),
      y: Math.min(
        Math.max(carCoords.y + velY, -stageBounds.offsetHeight / 2),
        stageBounds.offsetHeight / 2
      )
      /*rotation: {*/
      /*z:*/
      /*carState === carStates.stopping*/
      /*? carCoords.rotation.z*/
      /*: carCoords.rotation.z + (velX + velY - carCoords.rotation.z)*/
      /*}*/
    };
  }

  function render() {
    updateCarCoords();

    if (carState !== carStates.idle) {
      window.requestAnimationFrame(render);
    }
  }
</script>

<style>
  .stage {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .controls {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 15vh;
    width: 15vh;
    border-radius: 100%;
    border: 1px solid;
    transform: translateX(-50%);
  }

  .circle {
    background-color: skyblue;
    border-radius: 2em;
    font-size: 3rem;
    height: 1em;
    width: 1em;
  }

  .box {
    background-color: hotpink;
    font-size: 3rem;
    height: 1em;
    width: 1em;
    position: relative;
  }
  .box:after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0.25em;
    height: 0.25em;
    background-color: black;
  }
</style>

<div
  class="stage"
  bind:offsetWidth={stageBounds.offsetWidth}
  bind:offsetHeight={stageBounds.offsetHeight}>
  <div
    class="box"
    style={`
    transform:
      translate3d(${carCoords.x}px, ${carCoords.y}px, 0)
     `} />
</div>

<div class="controls">
  <div
    use:draggable
    on:dragstart={handleDragStart}
    on:dragmove={handleDragMove}
    on:dragend={handleDragEnd}
    style={`
    transform: translate3d(${$controlCoords.x}px, ${$controlCoords.y}px, 0);
    `}
    class="circle" />
</div>
