<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let agreed = false;
</script>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    padding: 1rem;
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
  }

  header {
    border-bottom: 1px solid #ccc;
  }
</style>

<div class="backdrop" on:click={() => dispatch('cancel')} />
<div class="modal">
  <header>
    <slot name="header" />
  </header>

  <div class="content">
    <slot />
  </div>

  <div class="disclaimer">
    <p>Before you close, you need to agree to our terms!</p>
    <button on:click={() => (agreed = true)}>Agree</button>
  </div>

  <footer>
    <!--
    This 'didAgree' slot prop allows for the component that consumes this prop
    to bind a value to this prop

    We don't expose the prop in the same way that component props are exposed,
    i.e. no export statement
  -->
    <slot name="footer" didAgree={agreed}>
      <button on:click={() => dispatch('close')} disabled={!agreed}>
        Close
      </button>
    </slot>
  </footer>
</div>
