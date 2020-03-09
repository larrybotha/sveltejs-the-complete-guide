# Sveltejs: The Complete Guide

Notes and annotations from https://www.udemy.com/course/sveltejs-the-complete-guide

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Section 2: Base Syntax & Core Features](#section-2-base-syntax--core-features)
  - [Takeaways](#takeaways)
- [Section 3: Working with conditionals and loops](#section-3-working-with-conditionals-and-loops)
  - [Takeaways](#takeaways-1)
- [Section 5: Course Project - First Steps](#section-5-course-project---first-steps)
- [Section 6: Diving deeper into components](#section-6-diving-deeper-into-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Section 2: Base Syntax & Core Features

[README.md](./section-02/README.md)

### Takeaways

- by default, Svelte binds properties uni-directionally
- `bind:[attribute]={someVar}` is a shortcut for 2-way binding
- 2-way binding should be used with caution; think of the Angular 1 nightmares
- inspecting the compiled javascript is useful
- reactive statements do not react to changes in the body of the statment; only
    the values inside the configuration section of the statement are evaluated
    and invalidated when a variable's value changes
- one should favour using reactive assignments to reduce logic inside templates


## Section 3: Working with conditionals and loops

[README.md](./section-03/README.md)

### Takeaways

- Svelte uses `=` as an indication that a variable should be reactively updated.
    Variables that are updated using mutable operators, such as `[].unshift`
    will not result in those values being invalidated and updated

    - to see this, inspect the built js - variables that are reassigned are
        invalidated, non-reassigned variables are not invalidated
- Svelte allows for some event shortcuts via event modifiers which can be added
    via piped arguments after the event name:

    ```svelte
    <button on:click|preventDefault={handleClick}>a button</button>
    ```

## Section 5: Course Project - First Steps

[README.md](./section-05/README.md)


## Section 6: Diving deeper into components

[README.md](./section-06/README.md)
