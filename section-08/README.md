# Section 8: Working with bindings and forms


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [82. Two-way binding refresher](#82-two-way-binding-refresher)
- [83. Understanding custom component bindings](#83-understanding-custom-component-bindings)
- [84. Relying on automatic number conversion](#84-relying-on-automatic-number-conversion)
- [85. Binding checkboxes and radio buttons](#85-binding-checkboxes-and-radio-buttons)
- [86. Binding `<select>` dropdowns](#86-binding-select-dropdowns)
- [87. Binding to element references](#87-binding-to-element-references)
- [88. Binding to component references](#88-binding-to-component-references)
- [89. Validating forms and inputs](#89-validating-forms-and-inputs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 82. Two-way binding refresher

```bash
$ npm run dev --prefix ./82-two-way-binding-refresher
```

[App.svelte](./82-two-way-binding-reffresher/src/App.svelte)

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

[App.svelte](./83-understanding-custom-component-bindings/src/App.svelte)

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

[App.svelte](./84-relying-on-automatic-number-conversion/src/App.svelte)

- for inputs of type number, if the value is 2-way bound, Svelte will convert
    the value from the default `string` type to `number`

## 85. Binding checkboxes and radio buttons

```bash
$ npm run dev --prefix ./85-binding-checkboxes-and-radio-buttons
```

[App.svelte](./85-binding-checkboxes-and-radio-buttons/src/App.svelte)

- `checkbox` inputs are not bound using the `value` attribute as `text` inputs
    are
    - instead, one binds to the `checked` attribute:

        ```svelte
        <script>
          let isChecked;
        </script>

        <input type="checkbox" bind:checked={isChecked} />
        ```
- `radio` inputs are grouped together using the `bind:group={someValue}` syntax

    ```svelte
    <script>
      // set initial group value
      let groupValue = 'value-1';
    </script>

    <label>
      <input type="radio" value="value-1" bind:group={groupValue} />
      value 1
    </label>

    <label>
      <input type="radio" value="value-2" bind:group={groupValue} />
      value 2
    </label>

    <label>
      <input type="radio" value="value-3" bind:group={groupValue} />
      value 3
    </label>
    ```
- groups of checkboxes can be managed in a similar way to grouped radios.
    Instead of binding to a single value, they are bound to an array:

    ```svelte
    <script>
      let checkboxValues = ['value-1']
    </script>

    <label>
      <input type="checkbox" value="value-1" bind:group={checkboxValues} />
      value 1
    </label>

    <label>
      <input type="checkbox" value="value-2" bind:group={checkboxValues} />
      value 2
    </label>

    <label>
      <input type="checkbox" value="value-3" bind:group={checkboxValues} />
      value 3
    </label>
    ```

## 86. Binding `<select>` dropdowns

```bash
$ npm run dev --prefix ./86-binding-select-dropdowns
```

[App.svelte](./86-binding-select-dropdowns/src/App.svelte)

- `select` bind to the value attribute in the same way text inputs are

## 87. Binding to element references

```bash
$ npm run dev --prefix ./87-binding-to-element-references
```

[App.svelte](./87-binding-to-element-references/src/App.svelte)

- one can create a reference to an element in the DOM using the `bind:this`
    syntax:

    ```svelte
    <script>
      let elementRef;

      $: console.dir(elementRef)
    </script>

    <div bind:this={elementRef}>
      my div
    </div>
    ```
- this is useful for reading values from the DOM, such as classes, attributes,
    DOM properties
- this should not be used to manipulate the DOM - Svelte should only be used for
    performing any state changes
- `console.dir` is useful for printing out objects. This is especially useful
    for DOM nodes, as developer consoles generally print them out as html when
    using `console.log`

## 88. Binding to component references

```bash
$ npm run dev --prefix ./88-binding-to-component-references
```

[App.svelte](./88-binding-to-component-references/src/App.svelte)

- components can be bound to in the same way that elements are bound to with
    the `bind:this` syntax
- components can export values that can be accessed via the reference in the
    parent component
- this should generally be avoided, and a uni-directional dataflow approach
    favoured to maintain sanity of the components

## 89. Validating forms and inputs

```bash
$ npm run dev --prefix ./89-validating-forms-and-inputs
```

[App.svelte](./89-validating-forms-and-inputs/src/App.svelte)

- Svelte provides no form validation; it's up to the developer to write their
    own validation, or to use an existing validation library
