<script>
  let age = 30;
  let name = "Joe";

  $: uppercaseName = name.toUpperCase();

  function incrementAge() {
    age += 1;
  }

  function handleInput({ target }) {
    name = target.value;
  }
</script>

<main>
  <h1>Hello {uppercaseName}, you're {age}!</h1>

  <button on:click={incrementAge}>inc age</button>

  <input type="text" value={name} on:input={handleInput} />
</main>
