<script lang="ts">
  import { goto } from "$app/navigation";

  const games = [
    {
      id: 1,
      title: "game 1",
      description: "description 1",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "game 2",
      description: "description 2",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "game 3",
      description: "description 3",
      thumbnail: "https://via.placeholder.com/150",
    },
  ];
</script>

<div class="container mx-auto p-6">
  <h1 class="text-3xl font-bold mb-4">My Games</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each games as game}
      <div class="card w-96 bg-base-200 shadow-xl">
        <figure class="px-10 pt-10">
          <img src={game.thumbnail} alt="game thumbnail" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{game.title}</h2>
          <p>{game.description}</p>
          <div class="card-actions">
            <button
              class="btn btn-primary"
              on:click={() => goto(`/gamedev/${game.id}`)}>View Details</button
            >
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
