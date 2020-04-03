<script>
  import { mouseMoveStore } from "./mouse-move-store";
  import { derivedMousePosition } from "./derived-mouse-position-store";

  import { nameStore } from "./name-store.js";
  import { derivedGreetingStore } from "./derived-greeting-store.js";
</script>

<h3>Mouse co-ordinates</h3>

<pre>{JSON.stringify($mouseMoveStore)}</pre>

<h3>Mouse position</h3>

<pre>{JSON.stringify($derivedMousePosition)}</pre>

<h3>{$derivedGreetingStore}</h3>

<!--
  We can bind the value of our form to the value in our writable nameStore
-->
<input type="text" bind:value={$nameStore} />

<button on:click={() => ($nameStore += '!')}>bang!</button>

