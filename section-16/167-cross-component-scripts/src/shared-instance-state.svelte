<script context="module">
  /**
    Setting a script to use context=module makes it behave similarly to a file
    import:

    - the script is only run once, regardless of the number of instances of the
    component
    - the script can export functions that can be used by the parent component

    Variables declared inside this block are available to component instances, and
    are shared across instances, instead of being initialised separately for all
    instances
  */

  console.log(
    `running only once from within shared-instance-state, despite multiple instances`
  );

  /**
   * Create a shared variable for all component instances
   *
   * When this variable is reassigned, all instances will reference the same value
   *
   * We'll use this to deactivate the most recently activated instance of this
   * component
   */
  let deactivateMostRecentActive;
  let totalInstances = 0;

  /**
   * We can export values from this module, too
   */
  function moduleExport() {
    console.log("hello from context=module");
  }

  export { moduleExport };
</script>

<script>
  import { onMount } from "svelte";

  export let id;

  const states = {
    active: "active",
    inactive: "inactive"
  };
  let state = states.inactive;

  function deactivate(index) {
    console.log(`deactivating: ${index}`);

    if (state === states.active) {
      state = states.inactive;
    }
  }

  function activate() {
    /**
     * If there is a function bound to deactivateMostRecentActive, call it
     *
     * This will be bound to the last instance that was activated. When a new
     * instance is activated, the old instance is deactivated, and we then
     * reassign deactivateMostRecentActive to this instance's deactivate function
     */
    if (deactivateMostRecentActive) {
      deactivateMostRecentActive(id);
    }

    if (state === states.inactive) {
      state = states.active;

      /**
       * Assign deactivateMostRecentActive to this instance's deactivate
       * function.
       *
       * When another component activates, this instance's deactivate function
       * is executed
       */
      deactivateMostRecentActive = deactivate;
    }
  }

  onMount(() => {
    totalInstances++;
    console.log(totalInstances);
  });
</script>

<div>
  <p>{state === states.active ? 'active' : 'inactive'}</p>

  <button on:click={activate} disabled={state === states.active}>
    set active
  </button>
</div>
