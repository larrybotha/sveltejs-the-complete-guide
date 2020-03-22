<script>
  import CustomInput from "./custom-input.svelte";
  import Toggle from "./toggle.svelte";

  let val = "Joe Soap";
  let curr = 1;

  $: console.log(val);
  $: console.log(curr);
</script>

<CustomInput bind:val />

<!--
  We can bind to `current` inside the Toggle, and get values here

  This is a two-way component binding, and is strongly discouraged, as it makes
  debugging difficult
-->
<Toggle bind:current={curr} />

