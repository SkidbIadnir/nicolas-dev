<script lang="ts">
    export let icon = 'default';
    export let url = 'foo';
    export let title = 'bar';
</script>

<a href={url} class="stack max-w-md text-center bg-base-300 flex justify-center items-center p-4 rounded-lg not-prose no-underline">
    <img src={`/${icon}.png`} alt={icon} width="32" height="32" class="w-8" />
    <span class="text-lg text-base-content font-bold">{title}</span>
</a>