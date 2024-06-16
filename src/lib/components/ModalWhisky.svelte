<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let whisky: any;
  const dispatch = createEventDispatcher();

  const placeholderImage =
    "https://via.placeholder.com/400x300?text=No+Image+Available"; // Placeholder image URL

  function closeModal() {
    dispatch("close");
  }
</script>

<div class="modal modal-open">
  <main class="w-full md:w-2/3 lg:w-1/2 p-2 md:p-0">
    <div class="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={whisky.image || placeholderImage}
          alt={whisky.name}
          class="w-full h-64 object-cover"
        />
      </figure>
      <div class="card-body">
        <h1 class="card-title text-2xl md:text-3xl font-bold">{whisky.name}</h1>
        <p class="text-gray-600">{whisky.region}</p>
        <p class="mt-4">
          <span class="font-semibold">Age:</span>
          {whisky.age ? whisky.age : "N/A"} years
        </p>
        <p><span class="font-semibold">ABV:</span> {whisky.abv}%</p>
        <p><span class="font-semibold">Taste:</span> {whisky.taste}</p>
        <p><span class="font-semibold">Price:</span> ${whisky.price}</p>
        <p>
          <span class="font-semibold">Location Purchased:</span>
          {whisky.location}
        </p>
        <p><span class="font-semibold">Status:</span> {whisky.status}</p>
        <div>
          <span class="font-semibold">Type:</span>
          <ul class="list-disc list-inside">
            {#each whisky.type as t}
              <li>{t.name}</li>
            {/each}
          </ul>
        </div>
      </div>
      <div class="modal-action p-3">
        <button class="btn btn-primary" on:click={closeModal}>Close</button>
      </div>
    </div>
  </main>
</div>

<style>
  .modal {
    @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50;
  }
  .card {
    @apply w-full;
  }
  .modal-action {
    @apply flex justify-end;
  }
</style>
