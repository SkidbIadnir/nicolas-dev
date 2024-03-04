<script lang="ts">
    import "../app.css"
    import { user, userData, auth } from "$lib/firebase";
    import { signOut } from "firebase/auth";
    import Header from "$lib/components/Header.svelte";

    $user;
    $userData;


    async function signOutSSR() {
      const res = await fetch("/api/signin", { method: "DELETE" });
      await signOut(auth);
    }
</script>

<Header logout={signOutSSR}/>
<div class="min-h-screen flex flex-col">
    <slot></slot>

</div>
