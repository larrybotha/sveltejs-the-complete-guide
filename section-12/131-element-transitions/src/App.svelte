<script>
  import * as transitions from "svelte/transition";
  import * as easings from "svelte/easing";

  let easing = Object.values(easings).find(Boolean);
  let transition = Object.values(transitions).find(Boolean);
  /**
   * draw is specific to animating svg paths
   *
   * crossfade returns 2 functions which are used with the in: and out: attributes
   */
  let validTransitions = Object.values(transitions).filter(
    t => t.name !== "draw" && t.name !== "crossfade"
  );
  let value = "apple";
  let options = { delay: 0, duration: 400, easing };
  let otherOptions;
  let items = [];

  function setParams() {
    let additionalParams = {};

    switch (transition.name) {
      case "blur": {
        additionalParams = {
          opacity: 0,
          amount: 5
        };
        break;
      }

      case "fly": {
        additionalParams = {
          x: 0,
          y: 0,
          opacity: 0
        };
        break;
      }

      case "scale": {
        additionalParams = { start: 0, opacity: 0 };
        break;
      }

      case "slide":
      case "fade":
      default:
        break;
    }

    const { delay, duration, easing } = options;
    options = { delay, duration, easing, ...additionalParams };
    otherOptions = additionalParams;
  }

  function addItem() {
    if (value) {
      items = items.concat({ id: new Date(), value });
    }
  }

  function removeItem(id) {
    return () => {
      items = items.filter(item => item.id !== id);
    };
  }

  setParams();
</script>

<style>
  .box {
    height: 10rem;
    width: 10rem;
    background-color: skyblue;
    margin-bottom: 1rem;
  }
</style>

<label for="">
  duration: {options.duration}
  <br />
  <input type="range" min="0" max="1000" bind:value={options.duration} />
</label>

<label for="">
  delay: {options.delay}
  <br />
  <input type="range" min="0" max="1000" bind:value={options.delay} />
</label>

{#if otherOptions}
  {#each Object.entries(otherOptions) as [key, value]}
    <label for="">
      {key}: {value}
      <br />

      <input type="number" bind:value={options[key]} />
    </label>
  {/each}
{/if}

<label for="">
  easing:
  <select bind:value={options.easing}>
    {#each Object.entries(easings) as [key, fn]}
      <option value={fn}>{key}</option>
    {/each}
  </select>
</label>

<label for="">
  transition:
  <select bind:value={transition} on:change={setParams}>
    {#each validTransitions as fn}
      <option value={fn}>{fn.name}</option>
    {/each}
  </select>
</label>

<input type="text" bind:value />

<button on:click={addItem}>add item</button>

{#each items as item, i (item.id)}
  <div
    transition:transition={options}
    class="box"
    on:click={removeItem(item.id)}>
    {item.value}
  </div>
{/each}

