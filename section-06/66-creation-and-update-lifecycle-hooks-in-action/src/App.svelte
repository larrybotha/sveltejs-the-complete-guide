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
      didAgree is a prop defind on the footer slot inside Modal

      By using Svelte's let syntax, we can get access to the value bound to that prop
      in the parent component
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
