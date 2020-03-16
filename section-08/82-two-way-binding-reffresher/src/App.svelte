<script>
  export let value = "foo";
</script>

<!--
  create a two-way binding between the value state variable and attribute on the
  input
-->
<h1>{value}</h1>

<input type="text" bind:value />

