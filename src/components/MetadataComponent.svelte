<script lang="ts">
    type Props = {
        title: string
        description: string
    }

    let {
        title = "PokeThings",
        description = "A bunch of Pokemon things!"
    }: Props = $props();
</script>

<svelte:head>
    <meta name="url" content="https://pokethings.flooferland.com/" />
    <meta name="description" content={description} />
    <meta name="og:title" content={title} />
    <meta name="og:url" content="https://pokethings.flooferland.com/" />
    <meta name="og:description" content={description} />
    <meta name="og:type" content="website" />
</svelte:head>
