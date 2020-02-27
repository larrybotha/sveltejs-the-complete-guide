<script>
  let age = 30;
  let name = "Joe";

  $: uppercaseName = name.toUpperCase();

  /**
   * We can also reactively assign functions
   *
   * This console.log will run only when uppercaseName is invalidated - check
   * build.js
   */
  $: console.log(uppercaseName);

  /**
   * if statements can also be used in reactive assignment
   *
   * Only the variables contained inside the if statement's condition itself are
   * evaluated.  * The contents of the block may change variables, but they won't
   * result in * the reactive assignment executing again.
   *
   * This is because of the $$self.$$.dirty check that the compiled code performs
   * on the values inside the if statement's condition
   */
  $: if (/someone else/i.test(name)) {
    /**
     * This will only log 'changing age' once - when `name` changes. Because
     * `changeName` doesn't change the name to anything else, the reactive
     * assignment will never be evaluated for exection again
     */
    console.log("changing age");
    age = 31;
  }

  /**
   * despite this always being true, Svelte is smart enough to compile this to
   * something that only compiles once
   *
   * The condition doesn't contain anything specific to the component, so the
   * reactive assignment can only be executed based on the initial condition,
   * and thus, only once
   *
   * This is the same as writing a console statement directly into the root
   * level of the component. The same applies to for loops
   */
  $: if (true) {
    console.log("only logs once");
  }

  function incrementAge() {
    age += 1;
  }

  function changeName() {
    name = "Someone else";
  }
</script>

<main>
  <h1>Hello {uppercaseName}, you're {age}!</h1>

  <button on:click={incrementAge}>inc age</button>
  <button on:click={changeName}>change name</button>
</main>
