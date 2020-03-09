<script>
  import Product from "./Product.svelte";
</script>

<!--
  on:click is forwarded by more than 1 button inside this component

  The only way to differentiate the two events from each other is by inspecting
  the event itself. To address this, we can instead listen to custom events that
  the components can emit

  Custom events can be handled using the on:[event-name] syntax
-->
<Product
  title="A book"
  on:click={ev => console.log(`clicked
  "${ev.target.textContent}"`)}
  on:add-to-cart={() => console.log('add to cart')}
  on:delete={() => console.log('delete')} />
