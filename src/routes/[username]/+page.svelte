<script lang="ts">
  import UserLink from "$lib/components/UserLink.svelte";
  import { user } from "$lib/firebase";
  import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>@{data.username} Links</title>
    <meta name="description" content={data.bio}/>
</svelte:head>

<main class="prose text-center mx-auto mt-8">
    <h1 class="text-5xl font-bold text-primary">@{data.username}</h1>

    <img 
        src={data.photoURL ?? "/user.png"}
        alt="photoURL"
        width="256"
        height="256"
        class="mx-auto mt-4 rounded-md"/>
    <p class="text-xl my-8">{data.bio ?? "no bio yet..."}</p>
    <ul class="list-none">
        {#each data.links as item}
        <li class="my-2">
          <UserLink {...item} />
        </li>
        {/each}
      </ul>
</main>