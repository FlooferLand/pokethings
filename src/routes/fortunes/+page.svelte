<script lang="ts">
    import MetadataComponent from "$components/MetadataComponent.svelte";
    import { DateInput } from "date-picker-svelte";

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
        const start = Date.UTC(date.getUTCFullYear(), 0, 1);
        const current = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        const diffDays = Math.floor((current - start) / (24 * 60 * 60 * 1000));
        return diffDays + 2;
    }

    let birthday: Date | null = $state(null)
    let pokemon: Promise<PokemonData> | null = $state(null)
    $effect(() => {
        birthday;
        fetchMon();
    });
    const fetchMon = () => {
        if (birthday == null || birthday == undefined) return;
        
        // Fetching
        const day = dayOfTheYear(new Date(birthday));
        pokemon = new Promise((resolve, reject) => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${day}`)
                .then(res => {                    
                    res.json()
                        .then(data => {
                            resolve(data as PokemonData);
                        })
                        .catch(err => reject(err))
                })
                .catch(err => reject(err));
        });
    }
</script>

<MetadataComponent
    title="Fortune Hunters book recreation"
    description="Find out which Pokemon you would be lucky to be paired with."
/>

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

<div class="panel">
    <label>
        Your birthday:
        <DateInput bind:value={birthday} format="dd-MM-yyyy" placeholder="19-04-2006" required closeOnSelection />
    </label>
    <button onclick={fetchMon}>Give me my Pokemon</button>
</div>

{#if pokemon != null}
    {#await pokemon}
        <span></span>
    {:then pokemon} 
        <h3>You are a <a href="https://bulbapedia.bulbagarden.net/wiki/{pokemon.name.replaceAll(' ', '_')}_(Pok%C3%A9mon)">{pokemon.name}</a>!</h3>
        <p>Pokedex national ID '{pokemon.id}'</p>
        <img src="{pokemon?.sprites?.front_default}" alt="An image sprite of {pokemon.name}" id="poke-sprite" />
        <audio autoplay volume="{0.1}">
            <source src="{pokemon?.cries?.latest}" type="audio/ogg" />
        </audio>
    {/await}
{/if}

<style lang="scss">
    #poke-sprite {
        width: 400pt;
        image-rendering: pixelated;
    }
    form {
        input, button {
            display: block;
            margin: 0.3rem 0rem;
        }
    }

    :root {
        --date-picker-background: #1b1e27;
	    --date-picker-foreground: #f7f7f7;
    }
</style>
