<script>
  let inputRef;
  let title;

  function handleClick() {
    /**
     * We only read from the value of the input via the reference to the input
     */
    title = inputRef.value;

    /**
     * Print the value of the input as an object
     */
    console.dir(inputRef);
  }
</script>

<p>title: {title}</p>

<!--
  Bind this input to a variable in this component.

  We'll have a reference to an actual dom node
-->
<input type="text" bind:this={inputRef} />

<button on:click={handleClick}>set text</button>
