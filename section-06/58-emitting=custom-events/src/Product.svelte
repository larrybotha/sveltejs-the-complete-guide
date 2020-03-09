<script>
  import { createEventDispatcher } from "svelte";

  export let title;

  const dispatch = createEventDispatcher();
  const addToCart = () => {
    /**
     * The first parameter is the name of the event, the second is optional
     * data:
     */
    dispatch("add-to-cart", ["cart data"]);
  };
</script>

<article>
  <h1>{title}</h1>

  <!--
    Because both of these buttons forward only the click event, the parent
    component will require additional code to determine which button the event
    was emitted from

    To get around this, each button should instead emit a custom event
  -->
  <button on:click>add to cart, builtin event</button>
  <button on:click>delete, builtin event</button>

  <!--
    These buttons dispatch custom events, instead
  -->
  <button on:click={addToCart}>add to cart, custom event</button>
  <button on:click={() => dispatch('delete', ['custom data'])}>
    delete, custom event
  </button>
</article>
