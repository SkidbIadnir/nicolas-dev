<script lang="ts">
  import { goto } from "$app/navigation";

  export let data;
  const whisky = data.props.whisky;
  const satData = data.props.satData.pageContent;
  if (satData.nose.other_notes === "null") {
    satData.nose.other_notes = "N/A";
  }
  if (satData.conclusion.other_observations === "null") {
    satData.conclusion.other_observations = "N/A";
  }

  const placeholderImage =
    "https://via.placeholder.com/400x300?text=No+Image+Available"; // Placeholder image URL

  function goBack() {
    goto("/whisky");
  }
</script>

<div class="flex flex-col md:flex-row">
  <main class="w-full p-4">
    <div class="card bg-base-100 shadow-xl">
      <div class="flex flex-col md:flex-row">
        <figure class="md:w-1/2">
          <img
            src={whisky.image || placeholderImage}
            alt={whisky.name}
            class="w-full h-full object-cover"
          />
        </figure>
        <div class="card-body md:w-1/2">
          <h1 class="card-title text-3xl font-bold">{whisky.name}</h1>
          <p class="text-gray-600">{whisky.region}</p>
          <p class="mt-4">
            <span class="font-semibold">Age:</span>
            {whisky.age ? whisky.age : "N/A"} years
          </p>
          <p><span class="font-semibold">ABV:</span> {whisky.abv * 100}%</p>
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
          <div class="card-actions justify-end mt-4">
            <button on:click={goBack} class="btn btn-secondary">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl mt-4">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold mb-4">{satData.title}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="card bg-base-200 shadow-md">
            <div class="card-body">
              <h3 class="card-title text-xl font-semibold">Nose</h3>
              <p>Clarity: {satData.nose.clarity}</p>
              <p>Viscosity: {satData.nose.viscosity}</p>
              <p>Color: {satData.nose.color}</p>
              <p>Condition: {satData.nose.condition}</p>
              <p>Intensity: {satData.nose.intensity}</p>
              <p>
                Fruits: {satData.nose.fruits
                  .map((fruit) => fruit.name)
                  .join(", ")}
              </p>
              <p>
                Floral: {satData.nose.floral
                  .map((flower) => flower.name)
                  .join(", ")}
              </p>
              <p>
                Spices: {satData.nose.spices
                  .map((spice) => spice.name)
                  .join(", ")}
              </p>
              <p>Oak: {satData.nose.oak.map((oak) => oak.name).join(", ")}</p>
              <p>Other Notes: {satData.nose.other_notes}</p>
            </div>
          </div>

          <div class="card bg-base-200 shadow-md">
            <div class="card-body">
              <h3 class="card-title text-xl font-semibold">Palate</h3>
              <p>Sweetness: {satData.palate.sweetness}</p>
              <p>Bitterness: {satData.palate.bitterness}</p>
              <p>Alcohol: {satData.palate.alcohol}</p>
              <p>Body: {satData.palate.body}</p>
              <p>Flavor Intensity: {satData.palate.flavor_intensity}</p>
              <p>
                Flavor Characteristics: {satData.palate.flavor_characteristics
                  .map((flavor) => flavor.name)
                  .join(", ")}
              </p>
            </div>
          </div>

          <div class="card bg-base-200 shadow-md">
            <div class="card-body">
              <h3 class="card-title text-xl font-semibold">Finish</h3>
              <p>Length: {satData.finish.length}</p>
              <p>Character: {satData.finish.character}</p>
            </div>
          </div>

          <div class="card bg-base-200 shadow-md">
            <div class="card-body">
              <h3 class="card-title text-xl font-semibold">Conclusion</h3>
              <p>Quality: {satData.conclusion.quality}</p>
              <p>Other Observations: {satData.conclusion.other_observations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
