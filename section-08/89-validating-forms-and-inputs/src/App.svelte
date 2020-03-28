<script>
  import { isValidEmail } from "./helpers";

  let email = "";
  let formIsValid = false;

  $: if (isValidEmail(email)) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }
</script>

<style>
  .valid {
    border-color: green;
  }

  .invalid {
    border-color: red;
  }
</style>

<form on:submit|preventDefault>
  <input
    type="email"
    bind:value={email}
    class={isValidEmail(email) ? 'valid' : 'invalid'} />

  <button type="submit" disabled={!formIsValid}>submit</button>
</form>
