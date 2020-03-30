# Section 10: Managing state and data with stores


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [102. Creating a writable store and subscribing](#102-creating-a-writable-store-and-subscribing)
- [103. Updating store data](#103-updating-store-data)
- [105. Managing store subscriptions](#105-managing-store-subscriptions)
- [106. Using autosubscriptions](#106-using-autosubscriptions)
- [107. A second store](#107-a-second-store)

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

## 103. Updating store data

```bash
$ npm run dev --prefix ./103-updating-store-data
```

[App.svelte](./103-updating-store-data/src/App.svelte)

- the values in writable stores can be updated in 2 ways, either through
    `store.set`, or `store.update`
- `store.set` accepts a single value that replaces the value in the store
- `store.update` works in a similar way to React's `setState(callback)` callback
    syntax - it accepts a function which has the current value of the store as
    an argument, and expects a new value to be returned to update the store's
    value with

## 105. Managing store subscriptions

```bash
$ npm run dev --prefix ./105-managing-store-subscriptions
```

[App.svelte](./105-managing-store-subscriptions/src/App.svelte)

- every store that is subscribed to should be unsubscribed from when the
    component is destroyed
- this can be done using Svelte's `onDestroy` export

    ```svelte
    <script>
      import {onDestroy} from 'svelte';

      import {myStore} from './store'

      const unsubscribe = myStore.subscribe(//...)

      onDestroy(unsubscribe)
    </script>
    ```

## 106. Using autosubscriptions

```bash
$ npm run dev --prefix ./106-using-autosubscriptions
```

[App.svelte](./106-using-autosubscriptions/src/App.svelte)

- instead of manually subscribing to a store using `store.subscribe`, Svelte
    allows one to automatically subscribe by prepending the store with a `$`

    ```svelte
    <script>
      import {myStore} from './store'
    </script>

    <div>
      {$myStore}
    </div>
    ```
- this also automatically unsubscribes the store when the component is destroyed

## 107. A second store

```bash
$ npm run dev --prefix ./107-a-second-store
```

[App.svelte](./107-a-second-store/src/App.svelte)

