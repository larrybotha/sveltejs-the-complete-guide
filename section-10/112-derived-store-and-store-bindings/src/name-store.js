import { writable } from "svelte/store";

const nameStore = writable("Joe");

export { nameStore };
