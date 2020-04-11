<script>
  import SharedInstanceState, {
    moduleExport
  } from "./shared-instance-state.svelte";

  let items = [{ id: 0 }];

  function addItem() {
    items = items.concat({ id: items.length });
    moduleExport();
  }
</script>

{#each items as item}
  <SharedInstanceState id={item.id} />
  <hr />
{/each}

<button on:click={addItem}>add</button>
