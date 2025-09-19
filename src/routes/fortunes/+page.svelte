<script lang="ts">
    type PokemonSprites = {
        front_default: string
    }
    type PokemonCries = {
        latest: string
    }
    type PokemonData = {
        id: number,
        name: string,
        cries: PokemonCries
        sprites: PokemonSprites
    }

    // Magic function i stole >:)
    function dayOfTheYear(date: Date): number {
        console.log(date);
        const start = Date.UTC(date.getUTCFullYear(), 0, 1);
        const current = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        const diffDays = Math.floor((current - start) / (24 * 60 * 60 * 1000));
        return diffDays + 1;
    }

    let pokeImage: HTMLImageElement
    let birthday: Date | null = $state(null)
    let pokemon: PokemonData | null = $state(null)
    const fetchMon = async () => {
        if (birthday == null || birthday == undefined) return;
        
        // Fetching
        const day = dayOfTheYear(new Date(birthday));
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${day}`);
        const data = await res.json()
        pokemon = data as PokemonData;

        // Image
        const imageUrl = pokemon?.sprites?.front_default;
        if (imageUrl != null && imageUrl != undefined) {

        }

        // Audio
        const cryUrl = pokemon?.cries?.latest;
        if (cryUrl != null && cryUrl != undefined) {
            const audio = new Audio(cryUrl);
            audio.volume = 0.1;
            await audio.play();
        }
    }
</script>

<p>
    The episode
    <a href="https://bulbapedia.bulbagarden.net/wiki/EP157">Fortune Hunters</a>
    shows a book that can tell you what your lucky Pokemon is based on the date of your birthday.
</p>
<p>
    The contents of this book aren't released to the public, and it was just made as a gag.
</p>
<p>
    However, if mapping the day of the year to Pokedex entries via the national Pokemon ID system,
    we can achieve a similar effect!
</p>

<form onsubmit={fetchMon}>
    <label>
        Birthday date
        <input type="date" bind:value={birthday} required />
    </label>
    <button type="submit">Give me my Pokemon</button>
</form>

{#if pokemon != null}
    <h3>You are a {pokemon.name}!</h3>
    <p>Pokedex national ID '{pokemon.id}'</p>
    <img src="{pokemon?.sprites?.front_default}" alt="An image sprite of {pokemon.name}" id="poke-sprite" />
{/if}

<style lang="scss">
    #poke-sprite {
        width: 400pt;
        image-rendering: pixelated;
    }
</style>
