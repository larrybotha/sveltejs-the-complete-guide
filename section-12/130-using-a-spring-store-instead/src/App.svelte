<script>
  import { spring } from "svelte/motion";
  import { writable } from "svelte/store";

  const svgWidth = 300;
  const svgHeight = 200;
  const circleRad = 10;
  let hard = true;

  /**
   * `spring` can replace `writable` in-place
   */
  /*let circlePositions = writable(*/
  let circlePositions = spring(
    Array.from({ length: 5 }).map((_, i) => ({
      end: svgWidth - 5 * circleRad,
      start: 5 * circleRad,
      x: 5 * circleRad,
      y: 5 * circleRad + i * circleRad * 3
    })),
    { hard, soft: !hard }
  );

  function animate(index) {
    return async () => {
      console.log(`animating circle ${index}`);

      /**
       * updating a spring store returns a promise
       */
      await circlePositions.update(xs =>
        xs.map((pos, i) => {
          return i === index
            ? {
                ...pos,
                x: pos.x === pos.start ? pos.end : pos.start
              }
            : pos;
        })
      );

      console.log(`done animating circle ${index}`);
    };
  }
</script>

<label for="">
  stiffness: {circlePositions.stiffness}
  <br />
  <input
    type="range"
    min="-1"
    max="1"
    step=".05"
    bind:value={circlePositions.stiffness} />
</label>

<label for="">
  damping: {circlePositions.damping}
  <br />
  <input
    type="range"
    min="-1"
    max="1"
    step=".05"
    bind:value={circlePositions.damping} />
</label>

<label for="">
  precision: {circlePositions.precision}
  <br />
  <input
    type="range"
    min="0"
    max=".01"
    step=".0005"
    bind:value={circlePositions.precision} />
</label>

<label for="">
  hard: {hard}
  <br />
  <input type="checkbox" bind:checked={hard} />
</label>

<svg viewBox="0 0 {svgWidth} {svgHeight}">
  {#each $circlePositions as pos, i}
    <circle cx={pos.x} cy={pos.y} r={circleRad} on:click={animate(i)} />
  {/each}
</svg>
