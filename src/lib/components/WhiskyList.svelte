<script lang="ts">
  export let data: {
    props: { whiskies: { name: string; age: number | null }[] };
  };
  export let title: string;
</script>

<h2 class="text-xl font-bold mb-4">{title}</h2>
<ul>
  {#each data.props.whiskies as whisky}
    <a href="/whisky/{whisky.name}" class="no-underline">
      <li
        class="mb-2 p-2 bg-secondary text-secondary-content rounded shadow hover:bg-accent hover:text-accent-content transition-colors duration-300 ease-in-out"
      >
        <div class="flex justify-between font-semibold">
          <span class="truncate">{whisky.name}</span>
          {#if whisky.age !== null}
            <span>{whisky.age}</span>
          {:else}
            <span>N/D</span>
          {/if}
        </div>
      </li>
    </a>
  {/each}
</ul>
