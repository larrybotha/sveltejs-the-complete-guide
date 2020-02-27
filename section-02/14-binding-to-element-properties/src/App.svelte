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

  <!--
    We assign the `value` property of the input to our `name` variable for
    output

    We assign the `input` event to our `handleInput` function, which results in
    `name` being reassigned

    This is unidirectional data flow.
  -->
  <input type="text" value={name} on:input={handleInput} />
</main>
