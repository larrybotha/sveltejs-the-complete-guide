<script>
  import faker from "faker";

  import MeetupItem from "./Meetups/MeetupItem.svelte";
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

<Header />

{#each meetups as m, i (m.id)}
  <MeetupItem {...m} />
{/each}
