<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";
  import Modal from "$lib/components/ModalWhisky.svelte";

  export let data: PageData;

  let isBrowser = typeof window !== "undefined";
  let dialog: any;
  let selectedWhisky: any = null;

  let handleScroll: () => void;
  let scrollToTop: () => void;

  let filters = {
    region: "",
    type: [] as { name: string }[], // Update the type of the array
    minAge: 0,
    maxAge: 100,
    minAbv: 0,
    maxAbv: 100,
    status: "",
  };

  const minAge = Math.min(...data.props.whiskiesListAll.map((w: any) => w.age));
  const maxAge = Math.max(...data.props.whiskiesListAll.map((w: any) => w.age));
  const minAbv = Math.min(...data.props.whiskiesListAll.map((w: any) => w.abv));
  const maxAbv = Math.max(...data.props.whiskiesListAll.map((w: any) => w.abv));
  filters.minAge = minAge;
  filters.maxAge = maxAge;
  filters.minAbv = minAbv;
  filters.maxAbv = maxAbv;

  function toggleType(type: string) {
    const index = filters.type.findIndex((t) => t.name === type);
    if (index === -1) {
      filters.type = [...filters.type, { name: type }];
    } else {
      filters.type = filters.type.filter((t) => t.name !== type);
    }
  }

  let filteredWhiskies = data.props.whiskiesListAll;

  function applyFilters() {
    filteredWhiskies = data.props.whiskiesListAll.filter((whisky: any) => {
      const matchesRegion = filters.region
        ? whisky.region === filters.region
        : true;
      const matchesType = filters.type.length
        ? filters.type.some((filterType) =>
            whisky.type.some((t: any) => t.name === filterType.name)
          )
        : true;
      const matchesAge =
        whisky.age >= filters.minAge && whisky.age <= filters.maxAge;
      const matchesAbv =
        whisky.abv >= filters.minAbv && whisky.abv <= filters.maxAbv;
      const matchesStatus = filters.status
        ? whisky.status === filters.status
        : true;
      return (
        matchesRegion &&
        matchesType &&
        matchesAge &&
        matchesAbv &&
        matchesStatus
      );
    });
  }

  if (isBrowser) {
    handleScroll = () => {
      const buttonElement = document.querySelector(".floating-button");
      if (buttonElement) {
        if (window.scrollY > 200) {
          buttonElement.classList.remove("hidden");
        } else {
          buttonElement.classList.add("hidden");
        }
      }
    };

    onMount(() => {
      dialog = document.getElementById("my_modal_3");
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    });

    onDestroy(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  function showWhiskyDetails(whisky: any) {
    selectedWhisky = whisky;
  }

  function closeModal() {
    selectedWhisky = null;
  }
</script>

<div class="flex flex-col md:flex-row">
  <!-- Sidebar -->
  <aside class="w-full md:w-1/4 bg-base-200 p-4">
    <h2 class="text-xl font-bold">Filter Whiskies</h2>
    <div class="mt-4 space-y-4">
      <button
        class="btn btn-secondary w-full"
        on:click={() => {
          filters = {
            region: "",
            type: [],
            minAge: 0,
            maxAge: 100,
            minAbv: 0,
            maxAbv: 100,
            status: "",
          };
          applyFilters();
        }}>Reset Filters</button
      >
      <button class="btn btn-primary w-full mt-2" on:click={applyFilters}
        >Apply Filters</button
      >
      <div class="form-control">
        <label for="whisky-number" class="label">Total whiskies</label>
        <span class="badge">{filteredWhiskies.length}</span>
      </div>

      <div class="form-control">
        <label for="region-select" class="label">Region</label>
        <select
          id="region-select"
          class="select select-bordered"
          bind:value={filters.region}
        >
          <option value="">All regions</option>
          {#each data.props.regions as region}
            <option value={region}>{region}</option>
          {/each}
        </select>
      </div>
      <div class="form-control col-span-2">
        <label for="type-input" class="label">Type</label>
        <div class="grid grid-cols-2 gap-2">
          {#each data.props.types as type}
            <div class="form-control flex items-center flex-row">
              <input
                type="checkbox"
                class="checkbox checkbox-primary"
                on:change={() => toggleType(type)}
              />
              <label class="label-text ml-2" for="type-input">{type}</label>
            </div>
          {/each}
        </div>
        <div class="form-control">
          <label for="age-range" class="label">Age Range</label>
          <input
            id="age-range"
            type="range"
            class="range"
            min={minAge}
            max={maxAge}
            bind:value={filters.minAge}
          />
          <input
            id="age-range"
            type="range"
            class="range"
            min={minAge}
            max={maxAge}
            bind:value={filters.maxAge}
          />
          <div class="range-labels">
            <span>{filters.minAge}</span>
            <span>{filters.maxAge}</span>
          </div>
        </div>

        <div class="form-control">
          <label for="abv-range" class="label">ABV Range</label>
          <input
            id="abv-range"
            type="range"
            class="range"
            min={minAbv}
            max={maxAbv}
            bind:value={filters.minAbv}
          />
          <input
            id="abv-range"
            type="range"
            class="range"
            min={minAbv}
            max={maxAbv}
            bind:value={filters.maxAbv}
          />
          <div class="range-labels">
            <span>{filters.minAbv}</span>
            <span>{filters.maxAbv}</span>
          </div>
        </div>
        <div class="form-control">
          <label for="status-select" class="label">Status</label>
          <select
            id="status-select"
            class="select select-bordered"
            bind:value={filters.status}
          >
            <option value="">All statuses</option>
            {#each data.props.statuses as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="w-full md:w-3/4 p-4">
    <div
      class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {#each filteredWhiskies as whisky}
        <div class="card bg-base-200 shadow-md">
          <figure>
            <img
              src={whisky.image}
              alt={whisky.name}
              class="w-full h-48 object-cover"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{whisky.name}</h2>
            <p><strong>Region:</strong> {whisky.region}</p>
            <div class="card-actions justify-end">
              <button
                class="btn btn-primary"
                on:click={() => showWhiskyDetails(whisky)}>see more</button
              >
            </div>
          </div>
        </div>
      {/each}
    </div>
  </main>
</div>

<button on:click={scrollToTop} class="floating-button btn btn-primary hidden">
  To the top
</button>

{#if selectedWhisky}
  <Modal whisky={selectedWhisky} on:close={closeModal} />
{/if}

<style>
  .floating-button {
    @apply fixed bottom-4 right-4;
  }
  .range-labels {
    display: flex;
    justify-content: space-between;
  }
  .modal {
    display: none;
  }
  .modal-open {
    display: block;
  }
</style>
