# Section 3: Working with conditionals and loops


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [29. `each`, `else`, and extracting the index](#29-each-else-and-extracting-the-index)
- [30. Lists and keys](#30-lists-and-keys)
- [35. Updating arrays and objects immutably](#35-updating-arrays-and-objects-immutably)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 29. `each`, `else`, and extracting the index

```bash
$ npm run dev --prefix ./29-each-else-and-extracting-the-index
```

- Svelte's `each` block allows for an `else` statement which outputs content if
    the array we're iterating over is empty

## 30. Lists and keys

```bash
$ npm run dev --prefix ./30-lists-and-keys
```

- by default Svelte assumes items removed from lists are done so from the end of
    the list. Because of this, if components in the list depend on internal data,
    that internal data may become stale if items are removed from the list. Without
    indicating to Svelte that items are unique in an array, Svelte can do little
    to diff items
- to address this, we provide the `each` block with a key that identifies each item
    in the array uniquely

    ```svelte
    {#each items as item, i (item.id)}
      // do stuff
    {/each}
    ```

## 35. Updating arrays and objects immutably

```bash
$ npm run dev --prefix ./35-updating-arrays-and-objects-immutably
```

- Svelte only invalidates variables when they are updated immutably through
    assignment. Attempting to mutate objects, such as with `[].push`, will not
    work in Svelte
- the `=` sign when reassigning values to variables is a trigger for Svelte to
    reactively update a variable
