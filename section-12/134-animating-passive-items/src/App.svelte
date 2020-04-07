<script>
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  let value = "Apple";
  let items = [];

  function addItem() {
    items = [{ value, id: new Date() }, ...items];
  }

  function removeItem(id) {
    return () => {
      items = items.filter(item => item.id !== id);
    };
  }
</script>

<style>
  .box {
    height: 10rem;
    width: 10rem;
    background-color: skyblue;
    margin-bottom: 1rem;
  }
</style>

<div>
  <input type="text" bind:value />

  <button on:click={addItem}>add item</button>
</div>

{#each items as item, i (item.id)}
  <div
    animate:flip
    transition:fly={{ x: 100, duration: 1000 }}
    class="box"
    on:click={removeItem(item.id)}>
    {item.value}
  </div>
{/each}
