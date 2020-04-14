# Section 17: Routing and server-side rendering with Sapper

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [173. Filenames and routes](#173-filenames-and-routes)
- [174. Error and layout pages](#174-error-and-layout-pages)
- [175. Preloading in components](#175-preloading-in-components)
- [176. Pre-fetching data](#176-pre-fetching-data)

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

## 174. Error and layout pages

```bash
$ cd 174-error-and-layout-pages && node --inspect $(npm bin)/sapper dev
```

[App.svelte](./174-error-and-layout-pages/src/App.svelte)

- Layouts define the structure for the tree below where they are defined. A
    layout file is defined by naming it `_layout.svelte`
- Layouts can be nested within the tree structure
- a top level Error file can be defined which displays errors. It is defined
    using `_error.svelte`, and resides in the root of the `src/routes` folder
- nesting errors doesn't work in the same way as nesting layouts. Error
    components further down the tree are treated in the same way as other
    components, and need to be explicitly imported

## 175. Preloading in components

- use Sapper's `export async function preload() { // fetch data from server }` when
    preloading data that needs to be available for SEO reasons
- for everything else, one can use `onMount` to fetch data

## 176. Pre-fetching data

- Sapper's `preload` function is run on both the server and the client
- When a page is requested from the client, content is loaded by the server by
    calling `preload`.  Once that page renders, and is hydrated, the client then
    takes over, and any new page loads will result in `preload` being called
    from the client
- `preload` uses `this.fetch` instead of `fetch` because the `fetch` API is not
    available on the server. Sapper addresses this by providing its own fetch
    implementation which polyfills that server-side requests with the same API.
