<script lang="ts">
    import { user } from '$lib/firebase';
</script>

{#if $user}
    <slot></slot>
{:else}
    <p class="text-error">Please sign in to continue</p>
        <a href="/login" class="btn btn-primary">Sign in</a>
{/if}