<script>
  export let current = 0;
  export let ariaHidden = false;
</script>

<button
  aria-hidden={ariaHidden}
  disabled={current === 0}
  on:click={() => (current = 0)}>
  0
</button>

<button
  aria-hidden={ariaHidden}
  disabled={current === 1}
  on:click={() => (current = 1)}>
  1
</button>
