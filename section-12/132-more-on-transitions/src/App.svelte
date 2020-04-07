<script>
  import { fly } from "svelte/transition";

  const uiStates = {
    visible: "visible",
    hidden: "hidden"
  };
  let transitionState;
  let value = "Apple";
  let items = [];
  let uiState = uiStates.hidden;
  let useLocal = "local";

  function addItem() {
    items = items.concat({ value, id: new Date() });
  }

  function removeItem(id) {
    return () => {
      items = items.filter(item => item.id !== id);
    };
  }

  function setUiState(state) {
    uiState = state;
  }
</script>

<style>
  .box {
    height: 10rem;
    width: 10rem;
    background-color: skyblue;
    margin-bottom: 1rem;
  }
</style>

<div>
  <input type="text" bind:value />

  <button on:click={addItem}>add item</button>
</div>

<button
  on:click={() => setUiState(uiState === uiStates.visible ? uiStates.hidden : uiStates.visible)}>
  toggle uiState: {uiState}
</button>

<hr />
transition state: {transitionState}
{#if uiState === uiStates.visible}
  <!--
    Transitions can be canceled mid-animation, with the animation rewinding from
    its current position

    Transitions also have a number of events that can be subscribed to
  -->
  <p
    transition:fly={{ x: 100, duration: 1000 }}
    on:introstart={() => (transitionState = 'transitioning in')}
    on:introend={() => (transitionState = 'transitioned in')}
    on:outrostart={() => (transitionState = 'transitioning out')}
    on:outroend={() => (transitionState = 'transitioned out')}>
    Sit consequatur exercitationem cupiditate laboriosam modi Ullam porro porro
    deleniti laboriosam vitae Id cupiditate quaerat illum maxime laudantium
    tempore. Reprehenderit harum aperiam reiciendis libero ea Omnis quas
    expedita fugit similique.
  </p>

  <!--
    By default, if a containing element is hidden and shown, any children that
    have a transition property will be transitioned in

    This can be disabled so that transitions are scoped only to the element on
    which the property is defined take effect when that element, specifically,
    is added to or removed from the dom

    This can be achieved using the |local modifier on the transition property
  -->
  <h2>Transitions without local</h2>

  {#each items as item, i (item.id)}
    <div
      transition:fly={{ x: 100, duration: 1000 }}
      class="box"
      on:click={removeItem(item.id)}>
      {item.value}
    </div>
  {/each}

  <h2>Transitions with local</h2>

  {#each items as item, i (item.id)}
    <div
      transition:fly|local={{ x: 100, duration: 1000 }}
      class="box"
      on:click={removeItem(item.id)}>
      {item.value}
    </div>
  {/each}
{/if}
