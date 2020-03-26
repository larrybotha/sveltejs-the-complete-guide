<script>
  let boundValue;
  let unboundValue;

  function handleInput(ev) {
    unboundValue = ev.target.value;
  }
</script>

<input type="number" value={unboundValue} on:input={handleInput} />

<p>typeof unboundValue: {typeof unboundValue}</p>

<hr />

<!--
  Svelte automatically converts values in number fields from strings to numbers
  whn using two-way binding
-->
<input type="number" bind:value={boundValue} />

<p>typeof boundValue: {typeof boundValue}</p>
