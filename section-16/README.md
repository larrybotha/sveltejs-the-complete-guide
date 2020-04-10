# Section 12: Motion, transitions, and animations


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [164. Dynamic components](#164-dynamic-components)
- [165. Recursive components](#165-recursive-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 164. Dynamic components

```bash
$ npm run dev --prefix ./164-dynamic-components
```

[App.svelte](./164-dynamic-components/src/App.svelte)

- Svelte allows for components to be rendered dynamically using Svelte's
    internal component, `<svelte:component />`:

    ```svelte
    <script>
      import CompA from './comp-a.svelte'
      import CompB from './comp-b.svelte'

      let activeComponent = CompA

      function toggle() {
        activeComponent = activeComponent === CompA ? CompB : CompA
      }
    </script>

    <button on:click={toggle}>toggle</button>

    <svelte:component this={activeComponent} />
    ```
- the component is bound to the `this` prop, and props can be applied
    dynamically to `<svelte:component />` too

## 165. Recursive components

```bash
$ npm run dev --prefix ./165-recursive-components
```

[App.svelte](./165-recursive-components/src/App.svelte)

- Svelte allows for components to render themselves within themselves using the
    internal cusom component `<svelte:self />`
