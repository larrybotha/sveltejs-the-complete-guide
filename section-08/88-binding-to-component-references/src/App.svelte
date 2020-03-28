<script>
  import CustomInput from "./custom-input.svelte";

  let title;
  let value;
  let customInputRef;

  function handleClick() {
    title = value;

    /**
     * We have access to any exported values in the component via the reference
     * to the instance
     */
    customInputRef.empty();

    console.dir(customInputRef);
  }
</script>

<h1>Title: {title || 'not set'}</h1>

<!--
  In the same way we bind to elements, we can also bind to components using the
  bind:this syntax
-->
<CustomInput bind:this={customInputRef} bind:value />

<button on:click={handleClick}>set title</button>
