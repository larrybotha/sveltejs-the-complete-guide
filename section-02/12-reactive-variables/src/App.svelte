<script>
  let age = 30;
  let name = "Joe";

  /**
   * This is a reactive variable
   *
   * Instead of doing this in-line in the HTML, one can abstract logic into the
   * script section to keep markup clean and properly separate concerns
   *
   * When `name` changes, uppercaseName is invalidated, and a new value assigned
   */
  $: uppercaseName = name.toUpperCase();

  function incrementAge() {
    age += 1;
  }

  /**
   * When name is changed, the reactive assignment of uppercaseName above
   * processes the newly assigned `name` value
   */
  function changeName() {
    name = "Someone else";
  }
</script>

<main>
  <h1>Hello {uppercaseName}, you're {age}!</h1>

  <button on:click={incrementAge}>inc age</button>
  <button on:click={changeName}>change name</button>
</main>

