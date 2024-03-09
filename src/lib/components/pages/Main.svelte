<script lang="ts">
  import background from "$lib/assets/images/backgrond.jpg";
  import { onMount } from "svelte";
  import { getCookie } from "$lib/utils/cookies";
  import translation from "$lib/translation/Main.json";

  let lang: string = "en";
  let tranTexts = translation as Record<string, Record<string, string>>;
  onMount(() => {
    lang = getCookie("lang") || "en";
  });

  function scrollByAmount(amount: number) {
    window.scrollBy({
      top: amount,
      behavior: "smooth",
    });
  }
</script>

<main class="flex flex-1 flex-col">
  <section id="intropage" class="">
    <div class="hero min-h-screen" style="background-image: url({background})">
      <div class="hero-overlay bg-opacity-50"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">{tranTexts["hello"][lang]}</h1>
          <p class="mb-5">
            {tranTexts["intro1"][lang]}
            <span class="text-accent">{tranTexts["introName"][lang]}</span
            >{tranTexts["intro2"][lang]}
          </p>
          <button
            class="btn btn-primary"
            on:click={() => {
              scrollByAmount(1000);
            }}>{tranTexts["buttonProjects"][lang]}</button
          >
        </div>
      </div>
    </div>
  </section>
  <section id="projects" class="py-20 lg:p-32 flex flex-col gap-24">
    <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
      {tranTexts["projects"][lang]}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <a
        target="_blank"
        href="https://github.com/SkidbIadnir/nicolas-dev"
        class="card bg-base-200 p-8 rounded-lg hover:text-accent transition-colors duration-200"
      >
        <h3 class="text-2xl font-bold">{tranTexts["project1Title"][lang]}</h3>
        <p class="text-lg">{tranTexts["project1Desc"][lang]}</p>
        <i class="fas fa-arrow-right card-actions justify-end"></i>
      </a>
      <a
        href="/gamedev"
        class="card bg-base-200 p-8 rounded-lg hover:text-accent transition-colors duration-200"
      >
        <h3 class="text-2xl font-bold">{tranTexts["project2Title"][lang]}</h3>
        <p class="text-lg">{tranTexts["project2Desc"][lang]}</p>
        <i class="fas fa-arrow-right card-actions justify-end"></i>
      </a>
      <a
        href="/about"
        class="card bg-base-200 p-8 rounded-lg hover:text-accent transition-colors duration-200"
      >
        <h3 class="text-2xl font-bold">{tranTexts["project3Title"][lang]}</h3>
        <p class="text-lg">{tranTexts["project3Desc"][lang]}</p>
        <i class="fas fa-arrow-right card-actions justify-end"></i>
      </a>
    </div>
  </section>
</main>
