<script lang="ts">
  import { goto } from "$app/navigation";
  import WhiskyList from "$lib/components/WhiskyList.svelte";

  export let data;
  const whisky = data.props.whisky;
  const placeholderImage =
    "https://via.placeholder.com/400x300?text=No+Image+Available"; // Placeholder image URL

  function goBack() {
    goto("/whisky");
  }
</script>

<div class="flex flex-col md:flex-row">
  <aside class="w-full md:w-1/4 bg-base-200 p-4">
    <WhiskyList
      data={{
        props: { whiskies: data.props.whiskiesBought },
      }}
      title="Whiskies Bought"
    />
    <WhiskyList
      data={{
        props: { whiskies: data.props.whiskiesTested },
      }}
      title="Whiskies Tested"
    />
    <WhiskyList
      data={{
        props: { whiskies: data.props.whiskiesWanted },
      }}
      title="Whiskies Wanted"
    />
  </aside>

  <main class="w-full md:w-3/4 p-4">
    <div class="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={whisky.image || placeholderImage}
          alt={whisky.name}
          class="w-full h-64 object-cover"
        />

        <button
          on:click={goBack}
          class="absolute top-4 right-4 btn btn-secondary"
        >
          Go Back
        </button>
      </figure>
      <div class="card-body">
        <h1 class="card-title text-3xl font-bold">{whisky.name}</h1>
        <p class="text-gray-600">{whisky.region}</p>
        <p class="mt-4">
          <span class="font-semibold">Age:</span>
          {whisky.age ? whisky.age : "N/A"} years
        </p>
        <p><span class="font-semibold">ABV:</span> {whisky.abv * 100}%</p>
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
    </div>
  </main>
</div>
