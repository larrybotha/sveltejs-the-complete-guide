import { writable } from "svelte/store";

const defaultCartItems = [
  {
    id: "p1",
    title: "Test 1",
    price: 9.99,
  },
  {
    id: "p2",
    title: "Test 2",
    price: 9.99,
  },
];

function createCartStore(initialItems = defaultCartItems) {
  const cartStore = writable(initialItems);

  return {
    subscribe: cartStore.subscribe,
    addItem: item => {
      cartStore.update(items => {
        const isInStore = items.some(({ id }) => item.id === id);

        return isInStore ? items : items.concat(item);
      });
    },
    removeItem: id => {
      cartStore.update(items => {
        return items.filter(item => item.id !== id);
      });
    },
  };
}

const cartStore = createCartStore();

export { cartStore };
