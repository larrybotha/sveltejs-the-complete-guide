<script>
  import ContactCard from "./contact-card.svelte";

  let age = 30;
  let name = "Joe";
  let jobTitle = "Awesome show, great job";
  let description = `
      <strong>hey!</strong> that is bold, and here's an XSS attack in an img
      <img
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        onload="alert('You were hacked!');"
      >

  `;
  let imgUrl = "http://via.placeholder.com/150";
  let imgAlt = "img alt";

  $: uppercaseName = name.toUpperCase();

  function incrementAge() {
    age += 1;
  }
</script>

<main>
  <h1>Hello {uppercaseName}, you're {age}!</h1>

  <button on:click={incrementAge}>inc age</button>

  <div>
    <input type="text" bind:value={name} />
  </div>

  <div>
    <input type="text" bind:value={jobTitle} />
  </div>

  <div>
    <input type="text" bind:value={imgUrl} />
  </div>

  <div>
    <textarea bind:value={description} />
  </div>

  <ContactCard userName={name} {jobTitle} {description} {imgUrl} {imgAlt} />
</main>
