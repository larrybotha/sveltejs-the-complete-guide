# Section 8: Working with bindings and forms


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [82. Two-way binding refresher](#82-two-way-binding-refresher)
- [83. Understanding custom component bindings](#83-understanding-custom-component-bindings)
- [84. Relying on automatic number conversion](#84-relying-on-automatic-number-conversion)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 82. Two-way binding refresher

```bash
$ npm run dev --prefix ./82-two-way-binding-reffresher
```

- a shortcut for binding a value to an prop of the same name is to use
    curly braces

    ```svelte
    <script>
    let value = ''
    </script>

    <input type="text" {value}>
    ```
- two-way binding, which mitigates an explicit handler, can be achieved using
    the `bind:[prop]={valueName}` syntax, which can also make use of the
    shortened syntax above if the value and prop name are same:

    ```svelte
    <script>
    let value = ''
    </script>

    <input type="text" bind:value>
    ```

## 83. Understanding custom component bindings

```bash
$ npm run dev --prefix ./83-understanding-custom-component-bindings
```

- two-way component binding can be configured via a parent component using the
    `bind` keyword on the child component

    ```svelte
    // child.svelte
    <script>
      export let valInChild;
    </script>

    <input type="text" bind:value={valInChild} />

    // parent.svelte
    <script>
      import Child from './child.svelte'

      let valInParent;

      $: console.log(valInParent)
    </script>

    <Child bind:valInChild={valInParent} />
    ```
- components that make use of two-way binding internally can't accept other
    props - this is not supported by Svelte

    ```svelte
    // child.svelte
    <script>
    export let valInChild;

    /**
     * Svelte will throw an error here because valInChild has a two-way binding
     */
    export let type = 'text';
    </script>

    <input {type} bind:value={valInChild} />

    // parent.svelte
    <script>
    import Child from './child.svelte'
    </script>

    <Child type="email" />
    ```
- components that don't use two-way binding internally may have dynamic
    properties

## 84. Relying on automatic number conversion

```bash
$ npm run dev --prefix ./84-relying-on-automatic-number-conversion
```

- for inputs of type number, if the value is 2-way bound, Svelte will convert
    the value from the default `string` type to `number`
