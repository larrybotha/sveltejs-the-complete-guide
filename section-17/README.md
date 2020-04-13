# Section 17: Routing and server-side rendering with Sapper

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [173. Filenames and routes](#173-filenames-and-routes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 173. Filenames and routes

```bash
$ cd 173-filenames-and-routes && node --inspect $(npm bin)/sapper dev
```

[App.svelte](./173-filenames-and-routes/src/App.svelte)

- with Sapper, routes are stored in the `src/routes` folder
- `src/my-route.svelte` is the same as `src/my-route/index.svelte`
- Sapper routes extend `context=module` script blocks by allowing data to be
    preloaded using an exported async `preload` function:

    ```svelte
    <script context=module>
    export async function preload({params, query}) {
      const res = await this.fetch(/* some url */)
      const result = await res.json();

      return {result};
    }
    </script>

    <script>
      let result;
    </script>

    // do something with result
    ```

    This allows data to be loaded and provided to a component before it renders,
    eliminating the need to use Svelte's `onMount` lifecycle hook inside the
    components initialisation

- `src/my-route/[slug].svelte` represents a dynamic parameterised path
    - e.g. `my-route/1` would render the above file
    - `slug` would be available in the `preload` function inside the
        `context=module` script block, which accepts an argument that holds the
        parameters and query for the current request

        ```svelte
        <script context=module>
          function preload({params, query}) {
            const {slug} = params;

            // make request with slug
          }
        </script>
        ```