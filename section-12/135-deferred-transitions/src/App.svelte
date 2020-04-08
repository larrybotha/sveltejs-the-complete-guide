<script>
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  let id = 0;
  let value = "Apple";
  let leftItems = Array.from({ length: 7 }).map(() => {
    const itemId = id++;

    return {
      id: itemId,
      text: itemId
    };
  });
  let rightItems = [];

  const [send, receive] = crossfade({
    /**
     * The duration of the animation from one list to another
     *
     * This can be a function of the distance the item needs to travel
     */
    duration: d => {
      console.log(`distance: ${d}`);

      return Math.sqrt(d * 200);
    },

    /**
     * If an item is being added or removed from a list, this fallback is used
     *
     * For items that are being transitioned to different lists, this function
     * isn't used, and Svelte instead uses its own internal handler to transition
     * items to their resulting positions
     */
    fallback: (node, params) => {
      const style = window.getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      /**
       * params defined on the in: out: props
       */
      console.log(`params:`, params);

      return {
        duration: 200,
        /**
         * Svelte expects an object literal for css values
         */
        css: t => {
          return `
            opacity: ${t};
            transform: ${transform} scale(${t});
          `;
        }
      };
    }
  });

  function moveToLeft(id) {
    const item = rightItems.find(item => item.id === id);

    rightItems = rightItems.filter(item => item.id !== id);
    leftItems = leftItems.concat(item);
  }

  function moveToRight(id) {
    const item = leftItems.find(item => item.id === id);

    leftItems = leftItems.filter(item => item.id !== id);
    rightItems = rightItems.concat(item);
  }

  function addItem() {
    const itemId = id++;
    const item = {
      id: itemId,
      text: itemId
    };

    leftItems = leftItems.concat(item);
  }

  function removeItem(id) {
    leftItems = leftItems.filter(item => item.id !== id);
    rightItems = rightItems.filter(item => item.id !== id);
  }
</script>

<style>
  .list-container {
    display: flex;
  }

  .list {
    width: 50%;
    display: inline-block;
  }

  .box {
    width: 100%;
    background-color: skyblue;
    margin-bottom: 1rem;
  }
</style>

<button on:click={addItem}>add item</button>

<hr />

<div class="list-container">
  <div class="list">
    {#each leftItems as item (item.id)}
      <div
        in:receive={{ key: item.id }}
        out:send={{ key: item.id }}
        animate:flip
        class="box">
        {item.text}
        <button on:click={() => moveToRight(item.id)}>move</button>

        <button on:click={() => removeItem(item.id)}>x</button>
      </div>
    {/each}
  </div>

  <div class="list">
    {#each rightItems as item (item.id)}
      <div
        in:receive={{ key: item.id }}
        out:send={{ key: item.id }}
        animate:flip
        class="box">
        {item.text}
        <button on:click={() => moveToLeft(item.id)}>move</button>

        <button on:click={() => removeItem(item.id)}>x</button>
      </div>
    {/each}
  </div>
</div>
