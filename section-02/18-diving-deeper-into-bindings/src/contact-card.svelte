<script>
  export let userName;
  export let jobTitle;
  export let imgUrl;
  export let imgAlt;
  export let description;
</script>

<style>

</style>

<div>
  <header>
    <img src={imgUrl} alt={imgAlt} />

    <div>
      <h1>{userName}</h1>
      <h2>{jobTitle}</h2>
    </div>
  </header>

  <p>{description}</p>
</div>
