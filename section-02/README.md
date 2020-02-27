# Section 2: Base Syntax & Core Features

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [12. Reactive Variables](#12-reactive-variables)
- [13. More Reactivity](#13-more-reactivity)
- [14. Binding to element properties](#14-binding-to-element-properties)
- [15. Two-way binding shortcut](#15-two-way-binding-shortcut)
- [16. Using multiple components](#16-using-multiple-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 12. Reactive Variables

```bash
$ npm run dev --prefix ./12-reactive-variables
```

- instead of performing logic inside markup, abstract work to reactive variables
  - [build.js#418](./12-reactive-variables/public/build/bundle.js)
- reactive variables are just variables; Svelte assigns a variable when using
    `$: reactVarName`, and invalidates the reactive variable so that when the
    variables associated with the reactive variable change, the reactive
    variable is updated accordingly
- `$: ` is called a _labeled statement_

## 13. More Reactivity

```bash
$ npm run dev --prefix ./13-more-reactivity
```

- reactive assignment on `if` statements only evaluates variables inside the
    condition
- if there are no variables in the condition, the compiler compiles to a
    statement which only ever gets executed once if the condition is true

## 14. Binding to element properties

```bash
$ npm run dev --prefix ./14-binding-to-element-properties
```

- data flow in Svelte is by default unidirectional
  - if we bind the `value` attribute on an `input` to only the `name` variable,
      updating the input has no effect, because the input is only receiving the
      value from the component
  - we can bind the input event to a handler using `on:input`, which can then
      update the name property, but only if we explicitly define it to do so


## 15. Two-way binding shortcut

```bash
$ npm run dev --prefix ./15-two-way-binding-shortcut
```

- Svelte's `bind` syntax is useful for creating a 2-way binding between the
    property of an element, and a variable
- it eliminates the need to configure a binding on a property, and then create a
    listener responsible for updating the associated variable
- beware of overusing `bind`, as the explicit unidirectional bindings can help
    with code readability

## 16. Using multiple components

```bash
$ npm run dev --prefix ./16-using-multiple-components
```

