<script>
  import Product from "./Product.svelte";

  const products = [
    {
      id: 1,
      title: "product 1",
      price: 5.0,
      bestSeller: true
    },
    {
      id: 2,
      title: "product 2",
      price: 5.0
    }
  ];
</script>

{#each products as product}
  <Product
    {...product}
    on:click={ev => console.log(`clicked
    "${ev.target.textContent}"`)}
    on:add-to-cart={() => console.log('add to cart')}
    on:delete={() => console.log('delete')} />
{/each}
