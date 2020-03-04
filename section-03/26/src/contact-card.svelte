<script>
  export let userName;
  export let jobTitle;
  export let imgUrl;
  export let imgAlt;
  export let description;
</script>

<style>
  .thumb {
    max-width: 33%;
    width: 100%;
  }

  .thumb-placeholder {
    background-color: grey;
    height: 100px;
  }
</style>

<div>
  <header>
    <div class="thumb" class:thumb-placeholder={!imgUrl}>
      {#if imgUrl}
        <img src={imgUrl} alt={imgAlt} />
      {/if}
    </div>

    <div>
      <h1>{userName}</h1>
      <h2>{jobTitle}</h2>
    </div>
  </header>

  <p>{description}</p>
</div>
