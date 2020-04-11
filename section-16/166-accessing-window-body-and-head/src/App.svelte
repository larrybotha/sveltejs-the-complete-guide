<script>
  let dims;
  let mouseCoords;
  let title = "default title";
  let description = "description";
  let pageYOffset = 0;
  let offsetHeight;
  let online;
  $: scrollPercentage = (pageYOffset / offsetHeight) * 100;

  function handleResize() {
    const { innerWidth, innerHeight } = window;

    dims = { innerWidth, innerHeight };
  }

  function handleMouseMove(ev) {
    const { clientX, clientY } = ev;

    mouseCoords = { clientX, clientY };
  }
</script>

<style>
  div {
    min-height: 120vh;
  }
</style>

<!--
  Window-level events could be managed inside Svelte's onMount lifecycle hook,
  but Svelte provides an internal <svelte:window /> component where events can
  be bound
-->
<svelte:window
  on:DOMContentLoaded={() => {
    handleResize();
    console.log('DOMContentLoaded');
    offsetHeight = document.body.offsetHeight;
  }}
  on:resize={handleResize}
  bind:scrollY={pageYOffset}
  bind:online />

<!--
  Body-level events can be bound using Svelte's <svelte:body /> internal
  component
-->
<svelte:body on:mousemove={handleMouseMove} />

<!--
  Svelte allows manipulation of content in the head of the document through its
  <svelte:head /> internal component
-->
<svelte:head>
  <title>{title}</title>

</svelte:head>

<div class="container">
  <h1>Window dims</h1>

  <pre>{JSON.stringify(dims, null, 2)}</pre>

  <p>online status: {Boolean(online)}</p>

  <h1>Mouse coords</h1>

  <pre>{JSON.stringify(mouseCoords, null, 2)}</pre>

  <h1>Scroll percentage</h1>

  <pre>{scrollPercentage}%</pre>

  <h1>
    Dynamic
    <code>head</code>
  </h1>

  <label>
    title
    <br />
    <input type="text" bind:value={title} />
  </label>
</div>
