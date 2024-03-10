<script lang="ts">
  import { user } from "$lib/firebase";
  import { onMount } from "svelte";
  import { getCookie } from "$lib/utils/cookies";
  import translation from "$lib/translation/SignIn.json";

  let lang: string = "en";
  let tranTexts = translation as Record<string, Record<string, string>>;
  onMount(() => {
    lang = getCookie("lang") || "en";
  });
</script>

{#if $user}
  <slot />
{:else}
  <p class="text-error">{tranTexts["authCheck"][lang]}</p>
  <a href="/login" class="btn btn-primary">{tranTexts["signIn"][lang]}</a>
{/if}
