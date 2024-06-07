<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let formData = {
    name: "",
    region: "",
    taste: "",
    age: 0,
    abv: 0,
    type: [] as { name: string }[],
    price: 0,
    placePurchased: "",
  };

  let isBrowser = typeof window !== "undefined";

  let handleScroll: () => void;
  let scrollToForm: () => void;
  if (isBrowser) {
    handleScroll = () => {
      const formElement = document.getElementById("form");
      const buttonElement = document.querySelector(".floating-button");
      if (formElement && buttonElement) {
        const rect = formElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          buttonElement.classList.add("hidden");
        } else {
          buttonElement.classList.remove("hidden");
        }
      }
    };
    onMount(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    });

    onDestroy(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    scrollToForm = () => {
      const formElement = document.getElementById("form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    };
  }

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

  function toggleType(type: string) {
    const index = formData.type.findIndex((t) => t.name === type);
    if (index === -1) {
      formData.type = [...formData.type, { name: type }];
    } else {
      formData.type = formData.type.filter((t) => t.name !== type);
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
        <label for="abv-input" class="label">ABV %</label>
        <input
          type="number"
          min="0"
          max="100"
          bind:value={formData.abv}
          class="input input-bordered"
          required
        />
        <div class="form-control col-span-2">
          <label for="type-input" class="label">Type</label>
          <div class="grid grid-cols-2 gap-2">
            {#each data.props.types as type}
              <div class="form-control flex items-center flex-row">
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  checked={formData.type.some((t) => t.name === type)}
                  on:change={() => toggleType(type)}
                />
                <label class="label-text ml-2" for="type-input">{type}</label>
              </div>
            {/each}
          </div>
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
          <label for="place-purchased-input" class="label"
            >Place Purchased</label
          >
          <input
            type="text"
            bind:value={formData.placePurchased}
            class="input input-bordered"
            required
            id="place-purchased-input"
          />
        </div>
        <div class="form-control">
          <div class="flex justify-end">
            <button type="submit" class="btn btn-primary">Add Whisky</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</div>
<button
  on:click={scrollToForm}
  class="floating-button btn btn-primary lg:hidden"
>
  To the form
</button>

<style>
  /* Optional: Additional styling for the floating button */
  .floating-button {
    @apply fixed bottom-4 right-4;
  }
</style>
