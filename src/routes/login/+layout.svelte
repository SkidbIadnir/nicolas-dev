<script lang="ts">
  import { page } from '$app/stores'
  import AnimatedRoutes from '$lib/components/AnimatedRoutes.svelte';
  import { onMount } from "svelte";
  import { getCookie } from "$lib/utils/cookies";
  import translation from "$lib/translation/Steps.json";

  let lang: string = "en";
  let tranTexts = translation as Record<string, Record<string, string>>;
  onMount(() => {
    lang = getCookie("lang") || "en";
  });
</script>

<nav class="flex justify-center my-6">
    <ul class="steps">
        <a href="/login" class="step step-primary">{tranTexts["start"][lang]}</a>
        <a href="/login/username"
            class="step"
            class:step-primary={$page.route.id?.match(/username|photo/g)}>
        </a>
        <a
            href="/login/photo"
            class="step"
            class:step-primary={$page.route.id?.includes("photo")}>
            {tranTexts["end"][lang]}
        </a>
    </ul>
</nav>

<AnimatedRoutes>
    <main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
        <div class="card-body items-center text-center">
            <slot></slot>
        </div>
    </main>
</AnimatedRoutes>