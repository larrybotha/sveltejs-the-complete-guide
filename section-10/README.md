# Section 10: Managing state and data with stores


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [102. Creating a writable store and subscribing](#102-creating-a-writable-store-and-subscribing)
- [103. Updating store data](#103-updating-store-data)
- [105. Managing store subscriptions](#105-managing-store-subscriptions)
- [106. Using autosubscriptions](#106-using-autosubscriptions)
- [107. A second store](#107-a-second-store)
- [108. Subscribing for a short period](#108-subscribing-for-a-short-period)
- [109. Understanding readable stores](#109-understanding-readable-stores)

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


## 108. Subscribing for a short period

```bash
$ npm run dev --prefix ./108-subscribing-for-a-short-period
```

[CartItem.svelte](./108-subscribing-for-a-short-period/src/Cart/CartItem.svelte)

- for components where we only need to retrieve a value from the store once, we
    may want to unsubscribe from the store immediately. We could manually handle
    this inside Svelte's `onMount` lifecycle hook:

    ```svelte
    <script>
      import {onMount} from 'svelte'

      import {myStore} from './store'

      let val;

      onMount(() => {
        const unsubscribe = myStore.subscribe(value => {
          val = value
        })

        unsubscribe()
      })
    </script>
    ```

    This is a lot of boilerplate every time we want a value from a store, but
    Svelte provides a convenience function to recreate this behaviour...
- we can import `get` from Svelte's `store` export. `get` does the following:

    - accepts a store as an argument
    - subscribes to that store
    - returns the value inside that store
    - unsubscribes from the store

    ```svelte
    <script>
      import {onMount} from 'svelte'
      import {get} from 'svelte/store'

      import {myStore} from './store'

      let val;

      onMount(() => {
        val = get(myStore)
      })
    </script>
    ```

## 109. Understanding readable stores

```bash
$ npm run dev --prefix ./109-understanding-readable-stores
```

[App.svelte](./109-understanding-readable-stores/src/App.svelte)

- readable stores are useful for values that should or can only be read by
    components
    - timer values
    - mouse positions
    - browser dimensions
- a readable store accepts two arguments
  1. the initial value of the store
  2. a callback with a `set` function
    - the `set` function is what is responsible for updating the value of the
        store

##. 110. Unlimited power with custom stores

```bash
$ npm run dev --prefix ./110-unlimited-power-with-custom-stores
```

[App.svelte](./110-unlimited-power-with-custom-stores/src/App.svelte)

- when creating a writable store, the object returned provides `set`,
    `update`, and `subscribe` methods. The only method required here is
    `subscribe`
- with this knowledge, we can create custom stores that need only adhere to
    returning an object that has a `subscribe` method
- we can then abstract other logic that would have to be done inside components
    using the `set` and `update` methods to the store itself:

    ```javascript
    import {writable} from 'svelte/store'

    const counterStore = writable(0)

    return {
      subscribe: counterStore.subscribe,
      increment: () => {counterStore.update(n => n + 1)},
      decrement: () => {counterStore.update(n => n - 1)},
    }
    ```

##. 112. Derived store and store bindings

```bash
$ npm run dev --prefix ./112-derived-store-and-store-bindings
```

[App.svelte](./112-derived-store-and-store-bindings/src/App.svelte)

- derived stores accept an existing arbitrary number of stores, and allow one to
    create a new store derived from those values
- this is much the same as with creating a simple observable from which more
    complex observables can be derived
- one can use the `bind:[attribute]={$store}` syntax to bind a store's value to
    an attribute
