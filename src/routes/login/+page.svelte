<script lang="ts">
  import { auth, user } from "$lib/firebase";
  import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { onMount } from "svelte";
  import { getCookie } from "$lib/utils/cookies";
  import translation from "$lib/translation/SignIn.json";

  let lang: string = "en";
  let tranTexts = translation as Record<string, Record<string, string>>;
  onMount(() => {
    lang = getCookie("lang") || "en";
  });
  let errMessage = "";

  async function signInWithGoogle() {
    try {
      errMessage = "";
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);

      const idToken = await credential.user.getIdToken();

      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
        },
        body: JSON.stringify({ idToken }),
      });
    } catch (error: any) {
      console.error(error);
      errMessage = error.message;
    }
  }

  async function signInWithGitHub() {
    try {
      errMessage = "";
      const provider = new GithubAuthProvider();
      const credential = await signInWithPopup(auth, provider);

      const idToken = await credential.user.getIdToken();

      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
        },
        body: JSON.stringify({ idToken }),
      });
    } catch (error: any) {
      console.error(error);
      errMessage = error.message;
    }
  }

  async function signOutSSR() {
    const res = await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }
</script>

<h2>{tranTexts["signIn"][lang]}</h2>
{#if errMessage !== ""}
  <h3 class="text-danger">{errMessage}</h3>
{/if}
<h3 class="text-danger">{errMessage}</h3>
{#if $user}
  <h2 class="card-title">{tranTexts["welcome"][lang]}, {$user.displayName}</h2>
  <p class="text-center text-success">{tranTexts["message1"][lang]}</p>
  <button class="btn btn-warning" on:click={signOutSSR}>{tranTexts["signOut"][lang]}</button>
  <div class="divider"></div>
  <a href="/login/username" class="btn btn-primary"
    >{tranTexts["continue"][lang]}<i class="fas fa-arrow-right"></i></a
  >
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}
    ><i class="fa-brands fa-google"></i>{tranTexts["signInWithGoogle"][lang]}</button
  >
  <button class="btn btn-primary" on:click={signInWithGitHub}
    ><i class="fa-brands fa-github"></i>{tranTexts["signInWithGitHub"][lang]}</button
  >
{/if}
