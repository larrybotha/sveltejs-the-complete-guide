<script>
  import faker from "faker";

  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Header from "./UI/Header.svelte";

  function createMeetup() {
    return {
      id: faker.random.uuid(),
      title: faker.lorem.words(),
      subtitle: faker.lorem.words(),
      description: faker.lorem.words(),
      imageUrl: faker.image.imageUrl(),
      address: faker.address.streetName(),
      contactEmail: faker.internet.email()
    };
  }

  let meetups = Array.from({ length: 3 }).map(createMeetup);
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  <MeetupGrid {meetups} />
</main>
