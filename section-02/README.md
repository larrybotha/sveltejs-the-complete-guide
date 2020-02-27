# Section 2: Base Syntax & Core Features

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [12. Reactive Variables](#12-reactive-variables)
- [13. More Reactivity](#13-more-reactivity)

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
