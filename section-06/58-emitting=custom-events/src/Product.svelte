<script>
  export let title;
</script>

<!--
  event delegation works as expected, but only within a component

  Events, by default, do not cross component boundaries
-->
<article on:click={ev => console.log(`click event delegated: ${ev.target}`)}>
  <h1>{title}</h1>

  <!--
    This event is forwarded to the component immediately importing this
    component, because we don't define a handler
  -->
  <button on:click>add to cart</button>
  <button>delete</button>
</article>
