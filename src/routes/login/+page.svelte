<script lang="ts">
    import { auth, user } from "$lib/firebase";
    import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

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
    };

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
    };
  
    async function signOutSSR() {
      const res = await fetch("/api/signin", { method: "DELETE" });
      await signOut(auth);
    };
  </script>
<h2>Login</h2>
{#if errMessage !== ""}
  <h3 class="text-danger">{errMessage}</h3>
{/if}
<h3 class="text-danger">{errMessage}</h3>
{#if $user}
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in</p>
  <button class="btn btn-warning" on:click={signOutSSR}
    >Sign out</button
  >
  <div class="divider"></div>
  <a href="/login/username" class="btn btn-primary"
    >Continue to next step<i class="fas fa-arrow-right"></i></a
  >
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}
    ><i class="fa-brands fa-google"></i>Sign in with Google</button
  >
  <button class="btn btn-primary" on:click={signInWithGitHub}
    ><i class="fa-brands fa-github"></i>Sign in with GitHub</button
  >
{/if}