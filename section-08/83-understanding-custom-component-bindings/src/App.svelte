<script>
  import CustomInput from "./custom-input.svelte";
  import Toggle from "./toggle.svelte";

  let valInParent = "Joe Soap";
  let currentInParent = 1;

  $: console.log(valInParent);
  $: console.log(currentInParent);
</script>

<CustomInput bind:valInChild={valInParent} />

<!--
  We can bind to `current` inside the Toggle, and get values here

  This is a two-way component binding, and is strongly discouraged, as it makes
  debugging difficult - think Angular 1
-->
<Toggle ariaHidden={currentInParent === 1} bind:current={currentInParent} />

