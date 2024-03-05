<script lang="ts">
 import profilPic from '$lib/assets/images/profile.png';
 import background from '$lib/assets/images/backgrond.jpg';


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
            <a href="/skid" class="card bg-base-200 p-8 rounded-lg">
                <h3 class="text-2xl font-bold">Skid</h3>
                <p class="text-lg">A link shortener with a focus on privacy.</p>
            </a>
            <a href="/skid" class="card bg-base-200 p-8 rounded-lg">
                <h3 class="text-2xl font-bold">Skid</h3>
                <p class="text-lg">A link shortener with a focus on privacy.</p>
            </a>
            <a href="/skid" class="card bg-base-200 p-8 rounded-lg">
                <h3 class="text-2xl font-bold">Skid</h3>
                <p class="text-lg">A link shortener with a focus on privacy.</p>
            </a>
        </div>
    </section>
</main>
