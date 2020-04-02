<script>
  import { onDestroy } from "svelte";

  import { mouseStore } from "./mouse-store";

  import Timer from "./timer-output.svelte";

  let timers = [];
  let mousePosition;

  function addTimer() {
    timers = timers.concat(timers.length);
  }

  function removeTimer(i) {
    return function reduceTimerClosure() {
      timers = timers.filter((_, j) => i !== j);
    };
  }

  /**
   * Manually subscribe to this store
   */
  const unsubscribe = mouseStore.subscribe(val => {
    mousePosition = val;
  });

  onDestroy(unsubscribe);
</script>

mouse position:
<pre>{JSON.stringify(mousePosition, null, 2)}</pre>

<hr />

<button on:click={addTimer}>add timer</button>
<hr />

{#each timers as timer, i}
  <div>
    <Timer />

    <button on:click={removeTimer(i)}>remove timer</button>
  </div>
{/each}
