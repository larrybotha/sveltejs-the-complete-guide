<script>
  import faker from "faker";
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

<pre>{JSON.stringify(meetups, null, 2)}</pre>
