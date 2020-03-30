<script>
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  import { cartStore } from "./cart-store.js";
  import { productStore } from "../Products/product-store.js";
  import Button from "../UI/Button.svelte";

  export let title;
  export let price;
  export let id;

  let showDescription = false;
  let description = "No description";

  function displayDescription() {
    showDescription = !showDescription;
  }

  function removeFromCart() {
    cartStore.update(items => items.filter(item => item.id !== id));
  }

  onMount(() => {
    /**
     * We only want the value of a product to get the product's description;
     * once we've done that, there's no need to keep the subscription active
     *
     * One way to address this is to subscribe to the store, get the product,
     * and then unsubscribe, but as in true Svelte spirit, this is a lot of
     * boilerplate.
     *
     * There's a superior method below, that has the same result, but abstracts
     * the work for us
     */
    /*const unsub = productStore.subscribe(items => {*/
    /*const product = items.find(item => item.id === id);*/

    /*description = product ? product.description : description;*/
    /*});*/

    /*unsub();*/

    /**
     * Instead of manually subscribing and unsubscribing, Svelte exports a `get`
     * function from the store export
     *
     * This function accepts a store, subscribes to that store, returns the value
     * of the store, and then unsubscribes from the store for us
     */
    const ps = get(productStore);
    const product = ps.find(p => p.id === id);
    description = product ? product.description : description;
  });
</script>

<style>
  li {
    margin: 1rem 0;
    border-radius: 5px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
  }

  h1,
  h2 {
    font-size: 1rem;
    margin: 0;
  }

  h2 {
    color: #494949;
    margin-bottom: 1rem;
  }
</style>

<li>
  <h1>{title}</h1>
  <h2>{price}</h2>
  <Button mode="outline" on:click={displayDescription}>
    {showDescription ? 'Hide Description' : 'Show Description'}
  </Button>
  <Button on:click={removeFromCart}>Remove from Cart</Button>
  {#if showDescription}
    <p>{description}</p>
  {/if}
</li>
