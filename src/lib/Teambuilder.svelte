<script>
	import PokemonSelector from '$lib/PokemonSelector.svelte';
	import Modal from '$lib/Modal.svelte';
	import { teams } from '$lib/stores.js';

	export let member = [];

	// Example Teams array [{name: Royal Pidgeons, members: [0,1,2,3,4,5]}]
</script>

<PokemonSelector teamPosition="1" bind:pokemon={member[0]}></PokemonSelector>
<PokemonSelector teamPosition="2" bind:pokemon={member[1]}></PokemonSelector>
<PokemonSelector teamPosition="3" bind:pokemon={member[2]}></PokemonSelector>
<PokemonSelector teamPosition="4" bind:pokemon={member[3]}></PokemonSelector>
<PokemonSelector teamPosition="5" bind:pokemon={member[4]}></PokemonSelector>
<PokemonSelector teamPosition="6" bind:pokemon={member[5]}></PokemonSelector>

<stlye> </stlye>
