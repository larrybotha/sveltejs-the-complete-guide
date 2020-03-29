<script>
  import CartItem from "./CartItem.svelte";
  import { cartStore } from "./cart-store.js";

  let items = [];

  /**
   * once imported, one can subscribe to a store, setting local variables to the
   * value in the store
   *
   * There's a way to automatically subscribe to the store, but this is at least
   * the naive approach underlying the automatic subscription covered later
   */
  cartStore.subscribe(xs => {
    items = xs;
  });
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
