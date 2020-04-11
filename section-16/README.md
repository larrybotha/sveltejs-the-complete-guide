# Section 12: Motion, transitions, and animations


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [164. Dynamic components](#164-dynamic-components)
- [165. Recursive components](#165-recursive-components)
- [166. Accessing window, body, and head](#166-accessing-window-body-and-head)
- [167. Cross-component scripts](#167-cross-component-scripts)

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

## 166. Accessing window, body, and head

```bash
$ npm run dev --prefix ./166-accessing-window-body-and-head
```

[App.svelte](./166-accessing-window-body-and-head/src/App.svelte)

- Svelte has a number of internal components making it easier to work with
    document elements and the window:
    - `<svelte:window />`
    - `<svelte:body />`
    - `<svelte:head />`
- `<svelte:window />` makes it convenient to bind to window-level events without
    relying on Svelte's `onMount` lifecycle hook. You may also bind to the
    following properties:
    - `scrollY` and `scrollX`
    - `innerWidth` and `innerHeight`
    - `outerWidth` and `outerHeight`
    - `online`
- `<svelte:body />` makes it convenient to bind to events which may be more
    applicable to the body of the document, such as the height of the document
- `<svelte:head />` allows one to manipulate head-level content, such as the
    `title` tag

## 167. Cross-component scripts

```bash
$ npm run dev --prefix ./167-cross-component-scripts
```

[App.svelte](./167-cross-component-scripts/src/App.svelte)

- Svelte allows for scripts to be run only once for a component, even if that
    component has multiple instances. This is achieved as follows:

    ```svelte
    <script context=module>
      console.log('I will only execute one for an arbitrary number of instances')
    </script>
    ```
- This block allows for variables to be shared across instances:

    ```svelte
    <script context=module>
      let totalInstances = 0;
    </script>

    <script>
      import {onMount} from 'svelte'

      onMount(() => {
        totalinstances++;
        console.log(totalInstances);
      })
    </script>
    ```
- Values can also be exported from this block, which can then be imported in the
    parent:

    ```svelte
    // child.svelte
    <script context=module>
      export {
        myFunction: () => {
          console.log('hello from inside child.svelte')
        }
      }
    </script>


    // parent.svelte
    <script>
      import {myFunction} from './child.svelte'

      myFunction()
    </script>
    ```
- `context=module` is most useful for sharing data between component instances,
    although it's likely clearer to favour using stores to manage state across
    instances for most cases

