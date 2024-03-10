<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";
  import { onMount } from "svelte";
  import { getCookie } from "$lib/utils/cookies";
  import translation from "$lib/translation/SignInUsername.json";

  let lang: string = "en";
  let tranTexts = translation as Record<string, Record<string, string>>;
  onMount(() => {
    lang = getCookie("lang") || "en";
  });

  let username = "";
  let loading = false;
  let isAvailable = false;
  let debounceTimer: NodeJS.Timeout;

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  $: isValid =
    username?.length > 2 && username.length < 16 && re.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !loading;

  async function checkAvailability() {
    isAvailable = false;
    clearTimeout(debounceTimer);

    loading = true;

    debounceTimer = setTimeout(async () => {
      console.log("checking availability of", username);

      const ref = doc(db, "usernames", username);
      const exists = await getDoc(ref).then((doc) => doc.exists());

      isAvailable = !exists;
      loading = false;
    }, 500);
    if (username.length === 0) {
      isAvailable = false;
      loading = false;
    }
  }

  async function confirmUserName() {
    console.log("Confirming username", username);
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $user?.uid });
    batch.set(doc(db, "users", $user!.uid), {
      username,
      photoURL: $user?.photoURL ?? null,
      published: true,
      bio: "My bio",
      links: [
        {
          title: "Website",
          url: "https://svelte.dev",
          icon: "globe",
        },
      ],
    });

    await batch.commit();

    username = "";
    isAvailable = false;
  }
</script>

<AuthCheck>
  {#if $userData?.username}
    <p class="text-primary card-title">
      {tranTexts["signed"][lang]} <span class="font-bold text-success"
        >@{$userData.username}</span
      >
    </p>
    <p class="text-secondary text-lg p-2">{tranTexts["warn"][lang]}</p>
    <a href="/login/photo" class="btn btn-primary">{tranTexts["upload"][lang]}</a>
  {:else}
    <form class="w-2/5" on:submit={confirmUserName}>
      <br />
      <input
        type="text"
        placeholder="username"
        class="input w-full"
        bind:value={username}
        on:input={checkAvailability}
        class:input-error={!isValid && isTouched}
        class:input-warning={isTaken}
        class:input-success={isAvailable && isValid && !loading}
      />
      <div class="my-4 min-h-16 px-8 w-full">
        {#if loading}
          <p class="text-secondary">{tranTexts["checking"][lang]}</p>
        {/if}
        {#if !isValid && isTouched}
          <p class="text-error">
            {tranTexts["spec"][lang]}
          </p>
        {/if}
        {#if isValid && !isAvailable && !loading}
          <p class="text-warning">@{username} {tranTexts["notAvailable"][lang]}</p>
        {/if}
        {#if isAvailable}
          <button class="btn btn-success">{tranTexts["choose"][lang]} @{username}</button>
        {/if}
      </div>
    </form>
  {/if}
</AuthCheck>
