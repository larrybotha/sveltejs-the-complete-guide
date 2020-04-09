<script>
  import ComponentA from "./component-a.svelte";
  import ComponentB from "./component-b.svelte";

  const compAProps = { aa: "aa", ab: "ab" };
  const compBProps = { ba: "ba", bb: "bb" };
  const states = {
    compA: "a",
    compB: "b"
  };
  let state = states.compA;
  let comp = {
    component: ComponentA,
    props: compAProps
  };

  $: onStateChange(state);

  function onStateChange(st) {
    switch (st) {
      case states.compA:
        comp = { component: ComponentA, props: compAProps };
        break;

      case states.compB:
        comp = { component: ComponentB, props: compBProps };
        break;

      default:
        comp = comp;
        break;
    }
  }
</script>

<button
  on:click={() => (state = state === states.compA ? states.compB : states.compA)}>
  toggle component
</button>

<svelte:component this={comp.component} {...comp.props} />
