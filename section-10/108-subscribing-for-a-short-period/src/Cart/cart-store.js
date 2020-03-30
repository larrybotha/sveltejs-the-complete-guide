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

/**
 * A writable store accepts the default store value as its first argument
 */
const cartStore = writable(defaultCartItems);

export { cartStore };
