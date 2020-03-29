<script>
  import { onDestroy } from "svelte";

  import CartItem from "./CartItem.svelte";
  import { cartStore } from "./cart-store.js";

  let items = [];

  /**
   * Subscribing to a store returns an unsubscribe function that should be
   * called when the component is being destroyed to prevent memory leaks
   */
  const unsubscribe = cartStore.subscribe(xs => {
    items = xs;
  });

  onDestroy(unsubscribe);
</script>

<style>
  section {
    width: 30rem;
    max-width: 90%;
    margin: 2rem auto;
    border-bottom: 2px solid #ccc;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<section>
  <h1>Cart</h1>
  <ul>
    {#each items as item (item.id)}
      <CartItem id={item.id} title={item.title} price={item.price} />
    {:else}
      <p>No items in cart yet!</p>
    {/each}
  </ul>
</section>
