<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";

  const dispatch = createEventDispatcher();

  /**
   * dispatch a custom even when the form is submitted
   */
  function submitForm() {
    dispatch("save", {
      title: title,
      subtitle: subtitle,
      address: address,
      email: email,
      description: description,
      imageUrl: imageUrl
    });
  }
</script>

<style>
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<!--
  instead of simply forwardig the submit event, we can use a handler which
  dispatches a custom event

  this is great for state machines - if a form is in a submitting state, we can
  dispatch a cancel custom event
  -->
<form on:submit|preventDefault={submitForm}>
  <TextInput
    id="title"
    label="Title"
    value={title}
    on:input={event => (title = event.target.value)} />
  <TextInput
    id="subtitle"
    label="Subtitle"
    value={subtitle}
    on:input={event => (subtitle = event.target.value)} />
  <TextInput
    id="address"
    label="Address"
    value={address}
    on:input={event => (address = event.target.value)} />
  <TextInput
    id="imageUrl"
    label="Image URL"
    value={imageUrl}
    on:input={event => (imageUrl = event.target.value)} />
  <TextInput
    id="email"
    label="E-Mail"
    type="email"
    value={email}
    on:input={event => (email = event.target.value)} />
  <TextInput
    id="description"
    label="Description"
    controlType="textarea"
    value={description}
    on:input={event => (description = event.target.value)} />
  <Button type="submit" caption="Save" />
</form>
