<script>
  import { tweened } from "svelte/motion";
  /**
   * see https://github.com/sveltejs/svelte/blob/master/src/runtime/easing/index.ts
   * for easing functions
   */
  import * as easings from "svelte/easing";

  let duration = 500;
  let delay = 0;
  let easing = Object.values(easings).find(Boolean);

  /**
   * tweened returns a store
   *
   * it accepts an initial value, which can be a number, date, array, or object
   * (as long as the arrays or objects have consistent shapes)
   */
  const progress = tweened(0, {
    delay,
    easing,
    duration
  });
  const finalValue = 0.5;
</script>

<progress value={$progress} />

<label for="">
  duration: {duration}
  <input type="range" min="100" max="2000" step="50" bind:value={duration} />
</label>

<label for="">
  delay: {delay}
  <input type="range" min="0" max="1000" step="100" bind:value={delay} />
</label>

<label for="">
  easing
  <select bind:value={easing}>
    {#each Object.entries(easings) as [k, fn]}
      <option value={fn}>{k}</option>
    {/each}
  </select>
</label>

<button
  on:click={$progress === finalValue ? () => progress.set(0, {
          delay,
          duration,
          easing
        }) : progress.set(finalValue, { delay, duration, easing })}>
  {$progress === finalValue ? 'back' : 'forward'}
</button>
