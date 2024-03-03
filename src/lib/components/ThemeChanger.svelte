<script lang="ts">
    import { themes } from "$lib/themes/index";
    import { getCookie } from "$lib/utils/cookies";
    import { onMount } from "svelte";
  
    let current_theme = "";
  
    onMount(() => {
      current_theme = getCookie("theme") || "winter";
    });
  
    function set_theme(event: Event) {
      const select = event.target as HTMLSelectElement;
      const theme = select.value;
      
      if (themes.includes(theme)) {
        const one_year = 60 * 60 * 24 * 365;
        window.localStorage.setItem("theme", theme);
        document.cookie = `theme=${theme}; max-age=${one_year}; path=/;`;
        document.documentElement.setAttribute("data-theme", theme);
        current_theme = theme;
      }
    }
  
    function capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
  </script>
  
  <div class="dropdown">
    <div tabindex="0" role="button" class="btn m-1">
      {capitalizeFirstLetter(current_theme)}<i class="fas fa-palette"></i>
    </div>
  
    <ul
      class="dropdown-content z-[1] menu p-2 gap-1 shadow bg-base-200 rounded-box w-52"
    >
      {#each themes as theme}
        <li><button on:click={set_theme} value={theme} class="capitalize">{capitalizeFirstLetter(theme)}</button></li>
      {/each}
    </ul>
  </div>
