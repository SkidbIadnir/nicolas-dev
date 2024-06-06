<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let formData = {
    name: "",
    region: "",
    taste: "",
    age: 0,
    type: "",
    price: 0,
    placePurchased: "",
  };

  onMount(async () => {});

  async function handleSubmit() {
    console.log("Form data: ", formData);

    const res = await fetch("/api/notion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.status === "ok") {
      location.reload();
    }
  }

  function scrollToForm() {
    const formElement = document.getElementById("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<div class="flex flex-col md:flex-row">
  <aside class="w-full md:w-1/4 bg-base-200 p-4">
    <h2 class="text-xl font-bold mb-4">Whiskies</h2>
    <ul>
      {#each data.props.whiskies as whisky}
        <li class="mb-2 p-2 bg-secondary text-secondary-content rounded shadow">
          <div class="flex justify-between">
            <span class="truncate">{whisky.name}</span>
            {#if whisky.age !== null}
              <span>{whisky.age}</span>
            {:else}
              <span>N/A</span>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </aside>

  <main id="form" class="w-full md:w-3/4 p-4">
    <h1 class="text-2xl font-bold mb-4">Add a New Whisky</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div class="form-control">
        <label for="name-input" class="label">Name</label>
        <input
          type="text"
          bind:value={formData.name}
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control">
        <label for="region-select" class="label">Region</label>

        <select
          bind:value={formData.region}
          class="select select-bordered"
          required
        >
          <option value="" disabled>Select region</option>
          {#each data.props.regions as region}
            <option value={region}>{region}</option>
          {/each}
          <!-- Add other regions as needed -->
        </select>
      </div>
      <div class="form-control">
        <label for="taste-input" class="label">Taste</label>
        <input
          type="text"
          bind:value={formData.taste}
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control">
        <label for="age-input" class="label">Age</label>
        <input
          type="number"
          bind:value={formData.age}
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control">
        <label for="type-select" class="label">Type</label>
        <select
          bind:value={formData.type}
          class="select select-bordered"
          required
        >
          <option value="" disabled>Select type</option>
          {#each data.props.types as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </div>
      <div class="form-control">
        <label for="price-input" class="label">Price</label>
        <input
          type="number"
          bind:value={formData.price}
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control">
        <label for="place-purchased-input" class="label">Place Purchased</label>
        <input
          type="text"
          bind:value={formData.placePurchased}
          class="input input-bordered"
          required
          id="place-purchased-input"
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Whisky</button>
    </form>
  </main>
</div>
<button on:click={scrollToForm} class="floating-button btn btn-secondary">
  To the form
</button>

<style>
  /* Optional: Additional styling for the floating button */
  .floating-button {
    @apply fixed bottom-4 right-4;
  }
</style>
