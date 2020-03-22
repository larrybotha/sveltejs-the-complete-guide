<script>
  export let current = 0;
</script>

<button disabled={current === 0} on:click={() => (current = 0)}>0</button>

<button disabled={current === 1} on:click={() => (current = 1)}>1</button>
