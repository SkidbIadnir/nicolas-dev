<script lang="ts">
 import profilPic from '$lib/assets/images/profile.png';
 import background from '$lib/assets/images/backgrond.jpg';
 import svelte_logo from '$lib/assets/images/svelte_logo.png';


    function scrollByAmount(amount: number) {
        window.scrollBy({
            top: amount,
            behavior: 'smooth'
        });
    }
</script>

<main class="flex flex-1 flex-col">
    <section id="intropage" class="">
        <div class="hero min-h-screen" style="background-image: url({background})">
            <div class="hero-overlay bg-opacity-50"></div>
            <div class="hero-content text-center text-neutral-content">
              <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
                <p class="mb-5">My name is <span class="text-accent">Nicolas</span>, I am a fullstack developer and I love building things.</p>
                <button class="btn btn-primary" on:click={() => {
                    scrollByAmount(1000);
                }} >Get Started</button>
              </div>
            </div>
          </div>
    </section>
    <section id="projects" class="py-20 lg:p-32 flex flex-col gap-24">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">Projects</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <a target="_blank" href="https://github.com/SkidbIadnir/nicolas-dev" class="card bg-base-200 p-8 rounded-lg hover:text-accent transition-colors duration-200">
                <h3 class="text-2xl font-bold">This web site</h3>
                <p class="text-lg">My own portfolio built with SvelteKit</p>
            </a>
            <a href="/gamedev" class="card bg-base-200 p-8 rounded-lg hover:text-accent transition-colors duration-200">
                <h3 class="text-2xl font-bold">Game Development</h3>
                <p class="text-lg">A page to showcase my game development projects</p>
                <i class="fas fa-arrow-right card-actions justify-end"></i>
            </a>
            <a href="/about" class="card bg-base-200 p-8 rounded-lg hover:text-accent transition-colors duration-200">
                <h3 class="text-2xl font-bold">Documents ?</h3>
                <p class="text-lg">Information about me and my downloadable resume</p>
            </a>
        </div>
    </section>
</main>
