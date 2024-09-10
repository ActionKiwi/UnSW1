<script>
	import PokemonSelector from '$lib/PokemonSelector.svelte';
	import Modal from '$lib/Modal.svelte';
	import { teams } from '$lib/stores.js';

	let pokemon = {};

	function addMember() {
		console.log($teams);
		$teams.forEach((team) => (team.members = [...team.members, pokemon]));
	}

	// $: addMember(pokemon);
</script>

<PokemonSelector teamPosition="1"></PokemonSelector>
<PokemonSelector teamPosition="2"></PokemonSelector>
<PokemonSelector teamPosition="3"></PokemonSelector>
<PokemonSelector teamPosition="4"></PokemonSelector>
<PokemonSelector teamPosition="5"></PokemonSelector>
<PokemonSelector teamPosition="6"></PokemonSelector>

<stlye> </stlye>
