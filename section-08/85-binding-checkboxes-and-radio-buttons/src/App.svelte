<script>
  let agreedValueBinding;
  let agreedCheckedBinding;

  let radioGroupValue = "red";
  let checkboxGroupValues = ["red"];
</script>

<h1>Checkboxes</h1>

<!--
  Checkboxes do not bind to value, they bind to the `checked` attribute
-->
<label>
  <input type="checkbox" bind:value={agreedValueBinding} />
  does not bind to value:
  <code>agreedValueBinding === {agreedValueBinding}</code>
</label>

<label>
  <input type="checkbox" bind:checked={agreedCheckedBinding} />
  binds to checked:
  <code>agreedCheckedBinding === {agreedCheckedBinding}</code>
</label>

<h1>Radios</h1>

<p>Active value: {radioGroupValue}</p>

<!--
  Radio groups are bound to a value via the `bind:group` syntax

  Only a single value may be used at a time for a radio group
-->
<label>
  <input type="radio" value="red" bind:group={radioGroupValue} />
  red
</label>

<label>
  <input type="radio" value="green" bind:group={radioGroupValue} />
  green
</label>

<label>
  <input type="radio" value="blue" bind:group={radioGroupValue} />
  blue
</label>

<h1>Checkbox groups</h1>

<p>Active values: {JSON.stringify(checkboxGroupValues)}</p>

<!--
  Checkboxes may also be bound via a group value, in a similar way to radios

  Instead of a single value, the value they bind to is an array
-->
<label>
  <input type="checkbox" value="red" bind:group={checkboxGroupValues} />
  red
</label>

<label>
  <input type="checkbox" value="green" bind:group={checkboxGroupValues} />
  green
</label>

<label>
  <input type="checkbox" value="blue" bind:group={checkboxGroupValues} />
  blue
</label>
