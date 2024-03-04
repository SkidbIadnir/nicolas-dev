<script lang="ts">
    import type { PageData } from "../$types";
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";

    export let data: PageData;
</script>

<main class="max-w-lg prose text-center mx-auto my-6">
    <p>
        Curent Bio: <span class="text-info">{data.bio}</span>
    </p>
    <p>
        Status Code: {$page.status}
    </p>
    <p class="text-error">
        {$page.form?.problem ?? ""}
    </p>

    <form method="post" use:enhance>
        <div class="form-control">
            <label for="bio" class="label">
               <span>
                Your bio
               </span>
            </label>
            <textarea name="bio" class="textarea textarea-bordered textarea-accent" value={data.bio}/>
        </div>
        <p id="errMessage" class="text-error">
            
        </p>
        <button type="submit" class="btn btn-primary my-5">Save</button>
    </form>
</main>