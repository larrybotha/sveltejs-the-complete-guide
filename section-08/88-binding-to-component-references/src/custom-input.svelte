<script>
  export let value;

  /**
   * Export a function on the component instance that allows one to clear the
   * value via the component importing this component
   *
   * This is not a recommended strategy; values should instead be passed down to
   * this component so that we can follow a uni-directional dataflow approach as
   * much as makes sense.
   *
   * The intent is to show that this is possible. There are likely situations
   * where exporting a method on the component instance is useful
   */
  export function empty() {
    value = "";
  }
</script>

<input type="text" bind:value />
