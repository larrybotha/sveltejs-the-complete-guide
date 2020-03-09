<script>
  import { createEventDispatcher } from "svelte";

  export let title;
  export let price;
  // if a property is optional, set a default value
  export let bestSeller = false;

  const dispatch = createEventDispatcher();
  const addToCart = () => {
    dispatch("add-to-cart", ["cart data"]);
  };
</script>

<article>
  <h1>{title}</h1>
  <div>{price}</div>

  {#if bestSeller}
    <div>Bestseller</div>
  {/if}

  <button on:click={addToCart}>add to cart, custom event</button>
  <button on:click={() => dispatch('delete', ['custom data'])}>
    delete, custom event
  </button>
</article>
