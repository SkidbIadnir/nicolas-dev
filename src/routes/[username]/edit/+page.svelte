<script lang="ts">
  import { page } from "$app/stores";
  import UserLink from "$lib/components/UserLink.svelte";
  import SortableList from "$lib/components/SortableList.svelte";
  import { db, userData, user } from "$lib/firebase";
  import {
    arrayRemove,
    arrayUnion,
    doc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import { getCookie } from "$lib/utils/cookies";
  import translation from "$lib/translation/UserPage.json";

  let lang: string = "en";
  let tranTexts = translation as Record<string, Record<string, string>>;
  onMount(() => {
    lang = getCookie("lang") || "en";
  });

  const icons = [
    "YouTube",
    "Twitter",
    "TikTok",
    "LinkedIn",
    "Instagram",
    "GitHub",
    "Custom",
  ];

  const formDefaults = {
    icon: "custom",
    title: "",
    url: "https://",
  };

  const formData = writable(formDefaults);

  let showForm = false;

  $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
  $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
  $: formIsValid = urlIsValid && titleIsValid;

  async function addLink(e: SubmitEvent) {
    const userRef = doc(db, "users", $user!.uid);

    await updateDoc(userRef, {
      links: arrayUnion({
        ...$formData,
        id: Date.now().toString(),
      }),
    });
    formData.set({
      icon: "",
      title: "",
      url: "",
    });
    showForm = false;
  }

  async function deleteLink(item: any) {
    const userRef = doc(db, "users", $user!.uid);
    await updateDoc(userRef, {
      links: arrayRemove(item),
    });
  }

  function cancelLink() {
    formData.set(formDefaults);
    showForm = false;
  }

  function sortList(e: CustomEvent) {
    const newList = e.detail;
    const userRef = doc(db, "users", $user!.uid);
    setDoc(userRef, { links: newList }, { merge: true });
  }

</script>

<main class="card max-w-xl mx-auto ">
  {#if $userData?.username === $page.params.username}
    <h2 class="card-title justify-center text-2xl">{tranTexts["editLinks"][lang]}</h2>
    {#if showForm}
      <form
        on:submit|preventDefault={addLink}
        class="bg-base-200 p-6 w-full mx-auto rounded-xl"
      >
        <select
          name="icon"
          class="select select-sm"
          bind:value={$formData.icon}
        >
          {#each icons as icon}
            <option value={icon.toLowerCase()}>{icon}</option>
          {/each}
        </select>
        <input
          name="title"
          type="text"
          placeholder="Title"
          class="input input-sm"
          bind:value={$formData.title}
        />
        <input
          name="url"
          type="text"
          placeholder="URL"
          class="input input-sm"
          bind:value={$formData.url}
        />
        <div class="my-4">
          {#if !titleIsValid}
            <p class="text-error text-xs">{tranTexts["mustBeValid"][lang]}</p>
          {/if}
          {#if !urlIsValid}
            <p class="text-error text-xs">{tranTexts["mustBeValidUrl"][lang]}</p>
          {/if}
          {#if formIsValid}
            <p class="text-success text-xs">{tranTexts["good"][lang]}</p>
          {/if}
        </div>

        <button
          disabled={!formIsValid}
          type="submit"
          class="btn btn-success block">{tranTexts["addLink"][lang]}</button
        >

        <button type="button" class="btn btn-xs my-4" on:click={cancelLink}
          >{tranTexts["cancel"][lang]}</button
        >
      </form>
    {:else}
      <button
        on:click={() => (showForm = true)}
        class="btn btn-outline btn-info block mx-auto my-4 mt-5"
      >
      {tranTexts["addLink"][lang]}
      </button>
    {/if}
  {/if}
  <SortableList list={$userData?.links ?? []} on:sort={sortList} let:item let:index>
    <div class="group relative">
      <UserLink {...item} />
      <button
        on:click={() => deleteLink(item)}
        class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10"
        >{tranTexts["delete"][lang]}</button
      >
    </div>
  
  </SortableList>
</main>
