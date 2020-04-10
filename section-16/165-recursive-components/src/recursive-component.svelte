<script>
  let items = [];

  function add() {
    items = items.concat(Date.now());
  }
</script>

<style>
  div {
    margin-left: 1em;
  }
</style>

<button on:click={add}>add child</button>

<div>
  {#each items as item}
    item added: {item}
    <div>
      <svelte:self />
    </div>
  {/each}
</div>
