<script>
  import { fade, fly } from "svelte/transition";

  const uiStates = {
    visible: "visible",
    hidden: "hidden"
  };
  let uiState = uiStates.visible;

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

<button
  on:click={() => setUiState(uiState === uiStates.visible ? uiStates.hidden : uiStates.visible)}>
  toggle uiState: {uiState}
</button>

<!--
  Different transitions can be used when transitioning in and out

  These animations can't be canceled, however
-->
{#if uiState === uiStates.visible}
  <div class="box" in:fade out:fly={{ x: 100 }}>Apple</div>
{/if}
