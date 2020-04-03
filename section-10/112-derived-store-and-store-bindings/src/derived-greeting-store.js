import { derived } from "svelte/store";

import { nameStore } from "./name-store";

/**
 * Derive our greeting from the value in the name store
 */
const derivedGreetingStore = derived(nameStore, $name => `Howdy, ${$name}`);

export { derivedGreetingStore };
