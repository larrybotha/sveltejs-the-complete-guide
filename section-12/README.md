# Section 12: Motion, transitions, and animations


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [128. Animating values with a tweened store](#128-animating-values-with-a-tweened-store)
- [129. Using a spring store instead](#129-using-a-spring-store-instead)
- [131. Element transitions](#131-element-transitions)
- [132. More on transitions](#132-more-on-transitions)
- [133. Using different in and out animations](#133-using-different-in-and-out-animations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 128. Animating values with a tweened store

```bash
$ npm run dev --prefix ./128-using-a-spring-store
```

[App.svelte](./128-using-a-spring-store/src/App.svelte)

- Svelte allows one to import a function from `svelte/motion` that creates a
    store for tweening values.

    ```svelte
    <script>
      import {tweened} from 'svelte/motion'

      const tweenedValue = tweened(0, options)
    </script>

    {$tweenedValue}
    ```
- the store accepts an initial value, and tweening options:

    ```javascript
    import {tweened} from 'svelte/motion'
    import {cubicIn} from 'svelte/easing'

    const options = {
      delay: 0,
      duration: 1000,
      easing: cubicIn,
    }
    const tweenedValue = tweened(0, options)
    ```
- the `tweened` store factory can accept numbers, dates, objects, and arrays, as
    the shape of the objects and arrays contents are consistent
- an additional option, `interpolate` allows one to provide a custom
    interpolation function which will be used instead of the easing function.

    The interpolation function expects the starting value, the final value, and
    returns a function that accepts the current time of the tween, and expects a
    value to be returned:

    ```javascript
      const customInterpolation => (start, end) => (t) => {
        // do something with start and end based on time
      }
    ```
- a `tweened` store returns a promise when `update` or `set` are used

## 129. Using a spring store instead

```bash
$ npm run dev --prefix ./129-using-a-spring-store-instead
```

[App.svelte](./129-using-a-spring-store-instead/src/App.svelte)

- `spring` can replace a `writable` store in place:

    ```javascript
    import {writable} from 'svelte/store'
    import {spring} from 'svelte/motion'

    const writableValue = writable({ x: 0 })
    const springableValue = spring({ x: 0 })
    ```
- `spring` accepts `damping`, `stiffness`, and `precision` values in its options
    config
- unlike the `tweened` store, `damping`, `stiffness`, and `precision` are
    updated on the store directly:

    ```javascript
    import {spring} from 'svelte/motion'

    const springableValue = spring({ x: 0 }, {damping: .5})

    springableValue.damping = .2
    ```

    Updating these properties takes effect immediately
- like `tweened` stores, `update` and `set` returns a promise that is resolved
    once the animation completes

## 131. Element transitions

```bash
$ npm run dev --prefix ./131-element-transitions
```

[App.svelte](./131-element-transitions/src/App.svelte)

- Svelte has a number of helpers for element transitions - when elements are
    added to and removed from the DOM
- transitions are imported from `svelte/transition`
- fade, blur, fly, slide, and scale can all be used in the same manner
- crossfade returns a tuple to be used with the `in:` and `out:` props
- draw is a transition used specifically for animating svg paths

## 132. More on transitions

```bash
$ npm run dev --prefix ./132-more-on-transitions
```

[App.svelte](./132-more-on-transitions/src/App.svelte)

- transitions are cancelable, and will unwind from their current position
- transitions have events that can be subscribed to using the same `on:` syntax:
    - `on:introstart` - when an element is transitioning in
    - `on:introend` - when an element has transitioned in
    - `on:outrostart` - when an element is transitioning out
    - `on:outrostart` - when an element has transitioned out
- transitions can be scoped only to the visibility of the element on which the
    transition is defined. By default, if an element has a transition property,
    and its containing scope is added to the dom, that element will transition
    in. To ensure that the element only transitions when it is itself added to
    the dom, the `local` modifier can be added to the transition:

    ```svelte
    <div transition:fly|local>
      content
    </div>
    ```

## 133. Using different in and out animations

```bash
$ npm run dev --prefix ./133-using-different-in-and-out-transitions
```

[App.svelte](./133-using-different-in-and-out-transitions/src/App.svelte)

- `in:` and `out:` can be used instead of `transition:` to define different
    transitions for entering and exiting the dom
- different in and out transitions do not unwind like animations defined using
    the `transition` property
