<script>
  let age = 30;
  let name = "Joe";

  $: uppercaseName = name.toUpperCase();

  function incrementAge() {
    age += 1;
  }
</script>

<main>
  <h1>Hello {uppercaseName}, you're {age}!</h1>

  <button on:click={incrementAge}>inc age</button>

  <!--
    Instead of creating 2 explicit bindings on input and value, one can benefit
    from a shortcut that Svelte makes available through its `bind` syntax

    `bind` can be used with most HTML attributes, and sets up 2-way binding,
    eliminating the need for manually creating bindings

    Beware of overusing this 2-way binding, as the more explicit unidirectional
    bindings can be useful for making code easier to read
  -->
  <input type="text" bind:value={name} />
</main>
