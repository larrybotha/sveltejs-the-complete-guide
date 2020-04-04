# Section 12: Motion, transitions, and animations


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [129. Animating values with a tweened store](#129-animating-values-with-a-tweened-store)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 129. Animating values with a tweened store

```bash
$ npm run dev --prefix ./129-using-a-spring-store
```

[App.svelte](./129-using-a-spring-store/src/App.svelte)

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
    import {cubicIn} from 'svelte/easings'

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
