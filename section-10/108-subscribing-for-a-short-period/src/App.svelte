<script>
  import Cart from "./Cart/Cart.svelte";
  import Products from "./Products/Products.svelte";
  import Button from "./UI/Button.svelte";

  let showCart = true;
</script>

<Button on:click={() => (showCart = !showCart)}>toggle cart</Button>

<!--
    Cart contains a subscription

    If that subscription is not unsubscribed, every time the cart is mounted it
    will create a new subscription alongside the old subscription.

    For any component that has a subscription, it should always unsubscribe from
    that subscription using Svelte's onDestroy export
  -->
{#if showCart}
  <Cart />
{/if}

<Products />
