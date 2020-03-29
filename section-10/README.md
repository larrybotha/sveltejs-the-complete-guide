# Section 10: Managing state and data with stores


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [102. Creating a writable store and subscribing](#102-creating-a-writable-store-and-subscribing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 102. Creating a writable store and subscribing

```bash
$ npm run dev --prefix ./102-creating-a-writable-store-and-subscribing
```

[App.svelte](./102-creating-a-writable-store-and-subscribing/src/App.svelte)

- Svelte allows for state to be abstracted out of components via stores
- a store can be writable or readable
- any component can import a store
- all stores are subscribable
- writable stores allow for state to be `set` or `update`d via methods on the
    store of the same name
- writable stores accept a default value for the store
- stores are subscribed to, either explicitly, or implicitly. Implicit
    subcriptions will be shown in subsequent lessons. To subscribe to a store,
    we do the following:

    ```svelte
    // store.js
    import {writable} from 'svelte/store'

    const store = writable(0)

    // component.svelte

    <script>
      import {store} from './store.js'

      let value;

      store.subscribe(val => value = val)
    </script>

    <div>
      value is {value}
    </div>
    ```
