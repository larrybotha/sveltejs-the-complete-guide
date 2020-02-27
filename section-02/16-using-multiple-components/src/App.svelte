<script>
  import ContactCard from "./contact-card.svelte";

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

  <input type="text" bind:value={name} />

  <ContactCard />
</main>
