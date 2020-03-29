# Section 8: Working with bindings and forms


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [71. Adding default props](#71-adding-default-props)
- [82. Two-way binding refresher](#82-two-way-binding-refresher)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 71. Adding default props

- if a prop isn't required to be passed into a component, and none is passed,
    Svelte will emit a warning
- it's a good practice to provide a default for optional props, even if that
    default is `null`, to indicate both to Svelte and consumers of components
    that a prop is optional

## 82. Two-way binding refresher

```bash
$ npm run dev --prefix ./82-two-way-binding-refresher
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
