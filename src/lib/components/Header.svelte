<script lang="ts">
  import ThemeChanger from "./ThemeChanger.svelte";
  import LanguageDropdown from "./LanguageDropdown.svelte";
  import { user, userData } from "$lib/firebase";

  $: u_data = $userData;
  export let logout = () => {};
</script>

<div class="navbar bg-base-300">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          /></svg
        >
      </div>
      <ul
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a href="#projects" class="duration-200">Projects</a></li>
        <li><a href="/skid" class="">Nicolas's links</a></li>

      </ul>
    </div>
    <a href="/" class="btn btn-ghost text-xl">Nicolas Jurdyc</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li>
        <a class="duration-200 font-semibold" href="/#projects">Projects</a>
      </li>
      <li><a class="font-semibold" href="/skid">Nicolas's links</a></li>
      {#if $user}
      <li>
        <details>
          <summary class="font-semibold">Edit</summary>
          <ul class="p-2 z-10">
            <li><a href="/{u_data?.username}/bio" class="font-semibold">Bio</a></li>
            <li><a href="/{u_data?.username}/edit" class="font-semibold">Links</a></li>
            <li><a href="/login/photo" class="font-semibold">Photo</a></li>
          </ul>
        </details>
      </li>
      <li><a href="/{u_data?.username}" class="font-semibold">My page</a></li>

      {/if}
    </ul>
  </div>
  <div class="navbar-end gap-4">
    <div class="hidden lg:flex">
      <LanguageDropdown />
      <ThemeChanger />
    </div>
    {#if $user}
      <a href="/" on:click={logout} class="btn hover:text-error"
        >Sign out<i class="fas fa-right-from-bracket"></i></a
      >
    {:else}
      <a href="/login" class="btn">Sign in<i class="fas fa-right-to-bracket"></i></a>
    {/if}
  </div>
</div>
