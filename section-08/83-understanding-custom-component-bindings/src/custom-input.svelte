<script>
  export let val;
</script>

<!--
  We have a two-way binding here, binding the value attribute to the `val` variable

  In Svelte, once a component has two-way binding, it can't receive dynamic variables.

  e.g. on this input, because value is 2-way bound, we can't set the `type` attribute
  via the parent component. Svelte currently doesn't support this
-->
<input type="text" bind:value={val} />
