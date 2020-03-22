# Section 8: Working with bindings and forms


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [82. Two-way binding refresher](#82-two-way-binding-refresher)
- [83. Understanding custom component bindings](#83-understanding-custom-component-bindings)

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

-
