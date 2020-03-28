<script>
  let selectedColor = "red";
</script>

<p>Selected color: {selectedColor}</p>

<!--
  In the same manner as binding to text inputs, one binds to the value property
  on a select element

  One could also set the value of each option to an object
-->
<select bind:value={selectedColor}>
  <option value="red">red</option>
  <option value="green">green</option>
  <option value="blue">blue</option>
</select>
