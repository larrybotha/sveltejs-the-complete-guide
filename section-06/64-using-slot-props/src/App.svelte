<script>
  import Product from "./Product.svelte";
  import Modal from "./Modal.svelte";

  let products = [
    {
      id: "p1",
      title: "A book",
      price: 9.99
    }
  ];

  let showModal = false;
  let closeable = false;

  function addToCart(event) {
    console.log(event);
  }

  function deleteProduct(event) {
    console.log(event.detail);
  }
</script>

{#each products as product}
  <Product {...product} on:add-to-cart={addToCart} on:delete={deleteProduct} />
{/each}

<button on:click={() => (showModal = true)}>Show Modal</button>

{#if showModal}
  <Modal
    on:cancel={() => (showModal = false)}
    on:close={() => (showModal = false)}>
    <h1 slot="header">Hello!</h1>

    <p>This works!</p>

    <!--
    didAgree is a property bound specifically onto the 'footer' named slot inside
    Modal

    It is exposed to this component because it is set as a prop on the named slot

    By exposing that prop, we can bind the value of that prop to a value inside this
    file
  -->
    <button
      let:didAgree={closeable}
      slot="footer"
      on:click={() => (showModal = false)}
      disabled={!closeable}>
      Confirm
    </button>
  </Modal>
{/if}
