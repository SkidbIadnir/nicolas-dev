<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, userData, storage, user } from "$lib/firebase";
  import { doc, updateDoc } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { onMount } from "svelte";
  import { getCookie } from "$lib/utils/cookies";
  import translation from "$lib/translation/SignInPhoto.json";

  let lang: string = "en";
  let tranTexts = translation as Record<string, Record<string, string>>;
  onMount(() => {
    lang = getCookie("lang") || "en";
  });
  let previewURL: string;
  let uploading = false;

  $: href = `/${$userData?.username}/edit`;

  async function upload(e: any) {
    uploading = true;
    const file = e.target.files[0];
    previewURL = URL.createObjectURL(file);
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
    const result = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(result.ref);

    await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
    uploading = false;
  }
</script>

<AuthCheck>
  <h2 class="card-title">{tranTexts["title"][lang]}</h2>
  <form class="max-w-screen-md w-full">
    <div class="form-control w-full max-w-xs my-10 mx-auto text-center">
      <img
        src={previewURL ?? $userData?.photoURL ?? "/user.png"}
        alt="photoURL"
        width="256"
        height="256"
        class="mx-auto"
      />
      <label for="photoURL" class="label">
        <span class="label-text">{tranTexts["pick"][lang]}</span>
      </label>
      <input
        on:change={upload}
        name="photoURL"
        type="file"
        class="file-input file-input-bordered w-full max-w-xs file-input-primary"
        accept="image/png, image/jpeg, image/gif, image/webp"
      />
      {#if uploading}
        <p>{tranTexts["upload"][lang]}</p>
        <progress class="progress progress-info w-56 mt-6" />
      {/if}
    </div>
  </form>
  <a {href} class="btn btn-primary"> {tranTexts["finish"][lang]} </a>
</AuthCheck>
