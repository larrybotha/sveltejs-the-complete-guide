# Section 6: Diving deeper into components


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [57. Event forwarding](#57-event-forwarding)
- [58. Emitting custom events](#58-emitting-custom-events)
- [59. Using spread props and default props](#59-using-spread-props-and-default-props)
- [60. Working with slots](#60-working-with-slots)
- [61. Named and default slots](#61-named-and-default-slots)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 57. Event forwarding

```bash
$ npm run dev --prefix ./57-event-forwarding
```

- events that are not provided a handler are forwarded; i.e. the component where
    the handler would be defined does not handle the event

    ```svelte
    <button on:click>forwarded click</button>
    ```
- by default, events do not get forwarded; events do no propagate across
    component boundaries unless explicitly defined to do so
- event delegation within a component works as expected


## 58. Emitting custom events

```bash
$ npm run dev --prefix ./58-emitting=custom-events
```

- if multiple elements inside a single component emit the same event, then the
    parent component will need to use the `event` object received in the handler
    to determine which element emitted the event

    ```svelte
    <!--
      Both buttons forward the same event
    -->
    <button on:click>button 1</button>
    <button on:click>button 2</button>
    ```
- to address this, we can dispatch custom events using Svelte's
    `createEventDispatcher` helper

    ```svelte
    <script>
      import {createEventDispatcher} from 'svelte';

      const dispatch = createEventDispatcher();
    </script>

    <button on:click={() => dispatch('event 1', 'my data')}>button 1</button>
    <button on:click={() => dispatch('event 2', ['my data'])}>button 2</button>
    ```
- `dispatch` takes 2 arguments:

    - the name of the event
    - an optional data parameter which is received by the handler in the
        component listening to the event
- the component listening to the event subscribes to events using the same
    syntax as for built-in events:

    ```svelte
    <MyComponent on:my-custom-event={handleEvent}>
    ```
- `createEventDispatcher` is a wrapper around Javascript's `customEvent` method:

    ```javascript
    function custom_event(type, detail) {
      const e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, false, false, detail);

      return e;
    }
    ```

## 59. Using spread props and default props

```bash
$ npm run dev --prefix ./59-using-spread-props-and-default-props
```

- if a component isn't provided a default value for a prop, and that prop isn't
    provided, Svelte will output a warning in the console

    - provide defaults for optional props


## 60. Working with slots

- slots are an HTML standard

    ```html
    <slot name="slot-name">
    ```

## 61. Named and default slots

- components allow for named slots:

    ```svelte
    // parent.svelte

    <Child>
      <header slot="header">header text</header>
    </Child>

    // child.svelte

    <div>
      <slot name="header">
        <header>fallback content</header>
      </slot>
    </div>
    ```
- the existence of a named slot can be evaluated using the non-standard
    `$$props.$$slots` property:

    ```svelte
    {#if $$props.$$slots.header}
      <slot name="header" />
    {/if}
    ```
