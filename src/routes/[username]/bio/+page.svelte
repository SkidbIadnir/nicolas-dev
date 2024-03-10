<script lang="ts">
  import type { PageData } from "../$types";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import { getCookie } from "$lib/utils/cookies";
  import translation from "$lib/translation/UserPage.json";

  let lang: string = "en";
  let tranTexts = translation as Record<string, Record<string, string>>;
  onMount(() => {
    lang = getCookie("lang") || "en";
  });

  export let data: PageData;
</script>

<main class="max-w-lg prose text-center mx-auto my-6">
  <h1 class="justify-center text-2xl mb-3">{tranTexts["enterBio"][lang]}</h1>
  <p>
    {tranTexts["currentBio"][lang]} <span class="text-info">{data.bio}</span>
  </p>
  <p>
    Status Code: {$page.status}
  </p>
  <p class="text-error">
    {$page.form?.problem ?? ""}
  </p>

  <form method="post" use:enhance>
    <div class="form-control">
      <label for="bio" class="label">
        <span> {tranTexts["yourBio"][lang]} </span>
      </label>
      <textarea
        name="bio"
        class="textarea text-base-content textarea-accent"
        value={data.bio}
      />
    </div>
    <p id="errMessage" class="text-error"></p>
    <button type="submit" class="btn btn-primary my-5">{tranTexts["save"][lang]}</button>
  </form>
</main>
